import { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const RecipeCard = ({
  recipe, modal, ...rest
}) => (

  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
  >
    <CardActionArea component={Link} to={`${window.location.pathname}/${recipe.id}`}>
      <CardContent>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {recipe.displayname || 'No name'}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          Machine:
          {' '}
          {recipe.machine?.displayname || ''}
          <br />
          {recipe.type === 'default' && 'Default'}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <Box sx={{ p: 2 }}>
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: 'space-between' }}
          >
            {recipe.ingredients?.length > 0
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

            <b>Ingredients:</b>
            <br />
            {recipe.ingredients?.map((item) => (
              <Fragment key={item.product_id}>
                {item.product_name}
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
            {recipe.products?.length > 0
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

            <b>Products:</b>
            <br />
            {recipe.products?.map((item) => (
              <Fragment key={item.product_id}>
                {item.product_name}
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
      </CardContent>
    </CardActionArea>
  </Card>
);

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired
};

export default RecipeCard;
