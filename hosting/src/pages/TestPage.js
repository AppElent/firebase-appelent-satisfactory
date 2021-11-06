import { Helmet } from 'react-helmet';
import { getFirestore } from 'firebase/firestore';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import { useAppCache } from 'modules/AppCache';
import AccountProfile from '../components/account/AccountProfile';
import AccountProfileDetails from '../components/account/AccountProfileDetails';

const Account = () => {
  const test = useAppCache();
  console.log(test);

  return (
    <>
      <Helmet>
        <title>TestPage</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        {JSON.stringify(getFirestore())}
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <AccountProfile />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <AccountProfileDetails />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Account;
