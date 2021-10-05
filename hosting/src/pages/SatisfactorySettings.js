import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Container, Card, CardHeader, Divider, CardContent, TextField
} from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  deleteUser, getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider
} from 'firebase/auth';
import { useConfirm } from 'modules/ConfirmationDialog';
import { useSnackbar, useSnackbarNotifications } from 'modules/Snackbar';

const SatisfactorySettingsView = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { notifications } = useSnackbarNotifications();
  const navigate = useNavigate();
  const confirm = useConfirm();

  console.log(notifications);

  return (
    <>
      <Helmet>
        <title>Settings | Satisfactory: FICSIT! Management Console</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ pt: 3 }}>
            <Card>
              <Formik
                initialValues={{ password: '', confirm: '', oldpassword: '' }}
                validationSchema={
                Yup.object().shape({
                  oldpassword: Yup.string().max(255).min(6).required('Old password is required'),
                  password: Yup.string().max(255).min(6).required('Password is required')
                    .notOneOf([Yup.ref('oldpassword'), null], 'Passwords can not be the same'),
                  confirm: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')

                })
              }
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    const auth = getAuth();
                    const credential = EmailAuthProvider.credential(
                      auth.currentUser.email,
                      values.oldpassword
                    );
                    await reauthenticateWithCredential(auth.currentUser, credential);
                    await updatePassword(auth.currentUser, values.password);
                    // Update successful.
                    enqueueSnackbar('Successfully updated password', { variant: 'success' });
                  } catch (error) {
                    console.log(error);
                    let { message } = error;
                    if (error.code === 'auth/wrong-password') message = "Old password doesn't match";
                    enqueueSnackbar(`Error updating password: ${message}`, { variant: 'error' });
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {(
                  formik
                ) => (
                  <>

                    <CardHeader
                      subheader="Update password"
                      title="Password"
                    />
                    <Divider />
                    <CardContent>
                      <TextField
                        error={Boolean(formik.touched.oldpassword && formik.errors.oldpassword)}
                        fullWidth
                        helperText={formik.touched.oldpassword && formik.errors.oldpassword}
                        label="Old password"
                        margin="normal"
                        {...formik.getFieldProps('oldpassword')}
                        name="oldpassword"
                    // onChange={formik.handleChange}
                        type="password"
                      />
                      <TextField
                        error={Boolean(formik.touched.password && formik.errors.password)}
                        fullWidth
                        helperText={formik.touched.password && formik.errors.password}
                        label="New password"
                        margin="normal"
                        {...formik.getFieldProps('password')}
                        name="password"
                    // onChange={formik.handleChange}
                        type="password"
                      />
                      <TextField
                        error={Boolean(formik.touched.confirm && formik.errors.confirm)}
                        fullWidth
                        helperText={formik.touched.confirm && formik.errors.confirm}
                        label="Confirm new password"
                        margin="normal"
                        {...formik.getFieldProps('confirm')}
                        name="confirm"
                    // onChange={handleChange}
                        type="password"
                    // value={values.confirm}
                        variant="outlined"
                      />

                    </CardContent>
                    <Divider />
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2
                      }}
                    >
                      <Button
                        color="primary"
                        disabled={formik.isSubmitting || !formik.isValid}
                        onClick={formik.handleSubmit}
                        variant="contained"
                      >
                        Update
                      </Button>
                    </Box>
                  </>
                )}
              </Formik>

            </Card>
          </Box>
          <Box sx={{ pt: 3 }}>
            <Card>
              <Formik
                initialValues={{}}
                onSubmit={async () => {
                  try {
                    await confirm({ description: 'Are you sure you want to delete your user account? Any Games and Factories you own are deleted as well.' });
                    const auth = getAuth();

                    await deleteUser(auth.currentUser);
                    navigate('/', { replace: true });
                  } catch (error) {
                    console.log('User cancelled deletion', error);
                  }
                }}
              >
                {(formik) => (
                  <>
                    <CardHeader
                      subheader="Be careful :)"
                      title="Danger zone"
                    />
                    <Divider />
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2
                      }}
                    >
                      <Button
                        color="error"
                        disabled={formik.isSubmitting}
                        onClick={formik.handleSubmit}
                        variant="contained"
                      >
                        Delete user account
                      </Button>
                    </Box>
                  </>
                )}
              </Formik>
            </Card>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SatisfactorySettingsView;
