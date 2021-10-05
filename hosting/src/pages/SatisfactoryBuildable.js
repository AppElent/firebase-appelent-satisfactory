import { Helmet } from 'react-helmet';
import {
  Box, Container
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import buildables from 'data/buildables.json';

const SatisfactoryBuildable = () => {
  const params = useParams();

  const id = parseInt(params.id, 10);

  const buildable = buildables.find((item) => item.id === id);

  return (
    <>
      <Helmet>
        <title>
          {buildable.displayname}
          {' '}
          | Satisfactory: FICSIT! Management Console
        </title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          {buildable && JSON.stringify(buildable, null, 2)}
          {!buildable && <>No buildable found</>}
        </Container>
      </Box>
    </>
  );
};

export default SatisfactoryBuildable;
