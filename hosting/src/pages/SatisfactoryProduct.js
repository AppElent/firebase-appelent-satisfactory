import { Helmet } from 'react-helmet';
import {
  Box, Container
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import products from 'data/products.json';

const SatisfactoryProduct = () => {
  const params = useParams();

  const id = parseInt(params.id, 10);

  const product = products.find((item) => item.id === id);

  return (
    <>
      <Helmet>
        <title>
          {product.displayname}
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
          {product && JSON.stringify(product, null, 2)}
          {!product && <>No product found</>}
        </Container>
      </Box>
    </>
  );
};

export default SatisfactoryProduct;
