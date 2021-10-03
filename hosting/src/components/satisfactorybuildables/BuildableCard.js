import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';

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
    <CardContent>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h4"
      >
        {buildable.name || 'No name'}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="body1"
      >
        {buildable.description || 'No description'}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      {JSON.stringify(buildable)}
    </Box>

  </Card>
);
BuildableCard.propTypes = {
  buildable: PropTypes.object.isRequired
};

export default BuildableCard;
