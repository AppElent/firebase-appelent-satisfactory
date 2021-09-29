import { Helmet } from 'react-helmet';
import {
  Box,
  Card,
  Container,
} from '@material-ui/core';
// import { useQuery } from 'react-query';
import { DataGrid } from '@mui/x-data-grid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import products from 'data/buildables.json';

const ProductList = () => {
  const columns = [{ field: 'id', headerName: 'ID' }, { field: 'displayname', headerName: 'Name', flex: 0.1 }, { field: 'description', headerName: 'Description', flex: 0.7 }];

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
        </Container>
      </Box>

    </>
  );
};

export default ProductList;
