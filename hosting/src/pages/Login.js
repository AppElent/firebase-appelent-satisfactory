import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  signInWithEmailAndPassword, getAuth, FacebookAuthProvider, GoogleAuthProvider, signInWithPopup
} from 'firebase/auth';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import FacebookIcon from '../icons/Facebook';
import GoogleIcon from '../icons/Google';

const provider = new FacebookAuthProvider();
const googleprovider = new GoogleAuthProvider();
googleprovider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const Login = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  auth.useDeviceLanguage();
  const { enqueueSnackbar } = useSnackbar();

  const getErrorMessage = (error) => {
    console.log(error.code);
    let messageToDisplay;
    if (error.code === 'auth/user-not-found') {
      messageToDisplay = 'User cannot be found';
    } else if (error.code === 'auth/wrong-password') {
      messageToDisplay = 'Wrong password';
    } else {
      messageToDisplay = error.message;
    }
    enqueueSnackbar(messageToDisplay, { variant: 'error' });
  };

  return (
    <>
      <Helmet>
        <title>Login | FICSIT Management Console</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={(values, { setSubmitting }) => {
              signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                  // Signed in
                  // const { user } = userCredential;
                  console.log(userCredential);
                  navigate('/', { replace: true });
                })
                .catch((error) => {
                  // const errorCode = error.code;
                  // const errorMessage = error.message;
                  console.log(error, error.code);
                  getErrorMessage(error);
                  setSubmitting(false);
                });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={() => {
                        signInWithPopup(auth, provider)
                          .then((result) => {
                            console.log(result);
                            // The signed-in user info.
                            // const { user } = result;

                            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                            // const credential = FacebookAuthProvider.credentialFromResult(result);
                            // const { accessToken } = credential;

                            // ...
                          })
                          .catch((error) => {
                            console.log(error);
                            getErrorMessage(error);
                            // Handle Errors here.
                            // const errorCode = error.code;
                            // const errorMessage = error.message;
                            // The email of the user's account used.
                            // const { email } = error;
                            // The AuthCredential type that was used.
                            const credential = FacebookAuthProvider.credentialFromError(error);
                            console.log(error, credential);

                            // ...
                          });
                      }}
                      size="large"
                      variant="contained"
                    >
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={() => {
                        signInWithPopup(auth, googleprovider)
                          .then((result) => {
                            console.log(result);
                            // This gives you a Google Access Token. You can use it to access the Google API.
                            // const credential = GoogleAuthProvider.credentialFromResult(result);
                            // const token = credential.accessToken;
                            // The signed-in user info.
                            // const { user } = result;
                            // ...
                          }).catch((error) => {
                            console.log(error);
                            getErrorMessage(error);
                            // Handle Errors here.
                            // const errorCode = error.code;
                            // const errorMessage = error.message;
                            // The email of the user's account used.
                            // const { email } = error;
                            // The AuthCredential type that was used.
                            // const credential = GoogleAuthProvider.credentialFromError(error);
                            // ...
                          });
                      }}
                      size="large"
                      variant="contained"
                    >
                      Login with Google
                    </Button>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with email address
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link component={RouterLink} to="/register" variant="h6" underline="hover">
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
