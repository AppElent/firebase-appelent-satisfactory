import { Helmet } from 'react-helmet';
import {
  Box,
  Card,
  Container,
} from '@material-ui/core';
// import { useQuery } from 'react-query';
import { DataGrid } from '@mui/x-data-grid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import products from 'data/products.json';

const ProductList = () => {
  // const getProducts = async () => {
  //   const test = true;
  //   return fetch('http://localhost:8000/satisfactory/products', {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   }).then(async (response) => {
  //     if (!response.ok) {
  //       throw await response.json();
  //     }
  //     return response;
  //   })
  //     .then((response) => response
  //       .clone()
  //       .json()
  //       .catch(() => response.text()),);
  // };
  // const products = useQuery('products', getProducts);

  const columns = [{ field: 'id', headerName: 'ID' }, { field: 'displayname', headerName: 'Name', flex: 0.1 }, { field: 'description', headerName: 'Description', flex: 0.7 }];

  // if (products === undefined || products.data === undefined) return (<></>);

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
          <Card>
            <PerfectScrollbar>
              <Box sx={{ pt: 3 }}>
                <div style={{ height: 800, width: '100%' }}>
                  <DataGrid
                    rows={products}
                    columns={columns}
                    pageSize={50}
                    rowsPerPageOptions={[50]}
                    disableSelectionOnClick
                  />
                </div>
              </Box>
            </PerfectScrollbar>
          </Card>
          {/* <ProductListToolbar /> */}
          {/* <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {products.map((product) => (
                <Grid
                  item
                  key={product.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box> */}
          {/* <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3
            }}
          >
            <Pagination
              color="primary"
              count={3}
              size="small"
            />
          </Box> */}
        </Container>
      </Box>

    </>
  );
};

export default ProductList;
