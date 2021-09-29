import { Helmet } from 'react-helmet';
import {
  Box, Card, CardContent, Container
} from '@material-ui/core';
import PrivacyPolicy from 'modules/PrivacyPolicy';

const PrivacyPolicyView = () => (
  <>
    <Helmet>
      <title>Privacy Policy</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >

      <Container maxWidth="lg">
        <Card>
          {/* <CardHeader
            subheader="Manage the notifications"
            title="Notifications"
          />
          <Divider /> */}
          <CardContent>
            <PrivacyPolicy />
          </CardContent>
          {/* <Divider />
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
              Save
            </Button>
          </Box> */}
        </Card>
      </Container>
    </Box>
  </>
);

export default PrivacyPolicyView;
