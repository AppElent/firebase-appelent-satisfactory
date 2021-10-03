import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import { Fragment } from 'react';

const ProductCard = ({
  product, modal, ...rest
}) => (

  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
  >
    <CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 3
        }}
      >
        <Avatar
          alt="Product"
          // src={product.image_link?.split('?')[0]}
          variant="square"
        />
      </Box>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h4"
      >
        {product.displayname || 'No name'}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="body1"
      >
        {product.description || 'No description'}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        {product.needed_for?.length > 0
        && (
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >

            <b>Needed for:</b>
            <br />
            {product.needed_for?.map((item) => (
              <Fragment key={item.recipe_id}>
                {item.default_recipe && item.recipe_name}
                {item.default_recipe && (
                <>
                  {' '}
                  (
                  {item.amount}
                  )
                </>
                )}
                {item.default_recipe && <br />}
              </Fragment>
            ))}
          </Typography>
        </Grid>
        )}
        {product.needed_for_buildable?.length > 0
        && (
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >

            <b>Needed for buildings:</b>
            <br />
            {product.needed_for_buildable?.map((item) => (
              <Fragment key={item.buildable_id}>
                {item.buildable_name}
                {' '}
                (
                {item.amount}
                )
                <br />
              </Fragment>
            ))}
          </Typography>
        </Grid>
        )}
      </Grid>
    </Box>

  </Card>
);
ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductCard;
