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

const BuildableCard = ({
  buildable, modal, ...rest
}) => (

  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
  >
    <CardActionArea component={Link} to={`${window.location.pathname}/${buildable.id}`}>
      <CardContent>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {buildable.displayname || 'No name'}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {buildable.description || 'No description'}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <Box sx={{ p: 2 }}>
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: 'space-between' }}
          >
            {buildable.ingredients?.length > 0
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
            {buildable.ingredients?.map((item) => (
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
BuildableCard.propTypes = {
  buildable: PropTypes.object.isRequired
};

export default BuildableCard;
