import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Container, Card, CardHeader, Divider, CardContent, TextField
} from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { deleteUser, getAuth, updatePassword } from 'firebase/auth';

const SatisfactorySettingsView = () => {
  const navigate = useNavigate();

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
                initialValues={{ password: '', confirm: '' }}
                validationSchema={
                Yup.object().shape({
                  password: Yup.string().max(255).min(6).required('Password is required'),
                  confirm: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                })
              }
                onSubmit={(values, { setSubmitting }) => {
                  const auth = getAuth();
                  updatePassword(auth.currentUser, values.password).then(() => {
                  // Update successful.
                  }).then(() => {
                    setSubmitting(false);
                  }).catch((error) => {
                    console.log(error);
                  // An error ocurred
                  // ...
                  });
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
                        error={Boolean(formik.touched.password && formik.errors.password)}
                        fullWidth
                        helperText={formik.touched.password && formik.errors.password}
                        label="Password"
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
                        label="Confirm password"
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
                        disabled={formik.isSubmitting}
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
                onSubmit={() => {
                  const auth = getAuth();
                  deleteUser(auth.currentUser).then(() => {
                  // User deleted.
                  }).then(() => {
                    navigate('/', { replace: true });
                  }).catch((error) => {
                    console.log(error);
                  // An error ocurred
                  // ...
                  });
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
