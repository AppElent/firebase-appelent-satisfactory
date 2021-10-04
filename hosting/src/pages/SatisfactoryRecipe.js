import { Helmet } from 'react-helmet';
import {
  Box, Container
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import recipes from 'data/recipes.json';

const SatisfactoryRecipe = () => {
  const params = useParams();

  const id = parseInt(params.id, 10);

  const recipe = recipes.find((item) => item.id === id);

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
          {recipe && JSON.stringify(recipe, null, 2)}
          {!recipe && <>No recipe found</>}
        </Container>
      </Box>
    </>
  );
};

export default SatisfactoryRecipe;
