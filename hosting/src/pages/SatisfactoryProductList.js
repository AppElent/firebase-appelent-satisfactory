import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Pagination
} from '@material-ui/core';
import products from 'data/products.json';
import useSearch from 'hooks/useSearch';
import usePagination from 'hooks/usePagination';
import Search from 'components/Search';
import ProductCard from 'components/satisfactoryproducts/ProductCard';

const ProductList = () => {
  const [filteredProducts, search, setSearch] = useSearch(products || [], ['displayname', 'description']);
  const pagination = usePagination({ totalItems: filteredProducts.length, initialPageSize: 6 });

  const paginatedAndFiltered = filteredProducts.slice(pagination.startIndex, pagination.endIndex + 1);

  console.log(pagination, paginatedAndFiltered);

  return (
    <>
      <Helmet>
        <title>Satisfactory Product List</title>
      </Helmet>

      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Search placeholder="Search products" search={search} setSearch={setSearch} />
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {paginatedAndFiltered && paginatedAndFiltered.map((product) => (
                <Grid
                  item
                  key={product.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <ProductCard key={product.id} product={product} />
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
