import PropTypes from 'prop-types';
import {
  Button,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';

const ProductCard = ({
  game, modal, ...rest
}) => {
  const db = getFirestore();

  return (

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
          {game.name || 'No name'}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {game.description || 'No description'}
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
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <AccessTimeIcon color="action" />
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {game.lastModified?.toString() || ''}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            {/* <GetAppIcon color="action" /> */}
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {game.numberOfPlayers}
              {' '}
              Players
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 2
        }}
      >
        <Button
          color="primary"
          onClick={() => {
            modal.setSelected(game);
            modal.showModal();
          }}
          variant="contained"
        >
          Edit
        </Button>
        <Button
          color="error"
          onClick={async () => {
            await deleteDoc(doc(db, 'games', game.id));
          }}
          variant="contained"
        >
          Delete
        </Button>

      </Box>

    </Card>
  );
};

ProductCard.propTypes = {
  game: PropTypes.object.isRequired
};

export default ProductCard;
