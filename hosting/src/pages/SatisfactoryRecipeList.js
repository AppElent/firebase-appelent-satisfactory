import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Pagination
} from '@material-ui/core';
import recipes from 'data/recipes.json';
import Search from 'components/Search';
import usePagination from 'hooks/usePagination';
import useSearch from 'hooks/useSearch';
import RecipeCard from 'components/satisfactoryrecipes/RecipeCard';

const SatisfactoryRecipeList = () => {
  const [filteredProducts, search, setSearch] = useSearch(recipes || [], ['displayname', 'description']);
  const pagination = usePagination({ totalItems: filteredProducts.length, initialPageSize: 6 });

  const paginatedAndFiltered = filteredProducts.slice(pagination.startIndex, pagination.endIndex + 1);

  console.log(pagination, paginatedAndFiltered);

  return (
    <>
      <Helmet>
        <title>Satisfactory Recipe List</title>
      </Helmet>

      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Search placeholder="Search recipes" search={search} setSearch={setSearch} />
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {paginatedAndFiltered && paginatedAndFiltered.map((recipe) => (
                <Grid
                  item
                  key={recipe.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <RecipeCard key={recipe.id} recipe={recipe} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3
            }}
          >
            <Pagination
              color="primary"
              count={pagination.totalPages}
              onChange={(event, value) => { pagination.setPage(value - 1); }}
              size="small"
            />
          </Box>
        </Container>
      </Box>

    </>
  );
};

export default SatisfactoryRecipeList;
