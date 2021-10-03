import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Pagination
} from '@material-ui/core';
import buildables from 'data/buildables.json';
import Search from 'components/Search';
import useSearch from 'hooks/useSearch';
import usePagination from 'hooks/usePagination';
import BuildableCard from 'components/satisfactorybuildables/BuildableCard';

const ProductList = () => {
  const [filteredProducts, search, setSearch] = useSearch(buildables || [], ['displayname', 'description']);
  const pagination = usePagination({ totalItems: filteredProducts.length, initialPageSize: 6 });

  const paginatedAndFiltered = filteredProducts.slice(pagination.startIndex, pagination.endIndex + 1);

  console.log(pagination, paginatedAndFiltered);

  return (
    <>
      <Helmet>
        <title>Satisfactory Buildable List</title>
      </Helmet>

      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Search placeholder="Search buildables" search={search} setSearch={setSearch} />
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {paginatedAndFiltered && paginatedAndFiltered.map((buildable) => (
                <Grid
                  item
                  key={buildable.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <BuildableCard key={buildable.id} buildable={buildable} />
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

export default ProductList;
