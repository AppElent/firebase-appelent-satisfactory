import { Helmet } from 'react-helmet';
import {
  Box, Button, Container, Card, CardHeader, Divider, CardContent, TextField
} from '@material-ui/core';
import { getAuth } from 'firebase/auth';

const SatisfactoryGames = () => {
  const auth = getAuth();
  console.log(auth);

  return (
    <>
      <Helmet>
        <title>Games | Satisfactory: FICSIT! Management Console</title>
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
              <CardHeader
                subheader="Subheader"
                title="Title"
              />
              <Divider />
              <CardContent>
                Content
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
                  variant="contained"
                >
                  Update
                </Button>

              </Box>
            </Card>

          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SatisfactoryGames;
