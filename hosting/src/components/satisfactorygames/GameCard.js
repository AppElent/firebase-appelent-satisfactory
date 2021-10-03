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
import {
  getFirestore, doc, deleteDoc, getDocs, query, collection
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import moment from 'moment';

const GameCard = ({
  game, modal, ...rest
}) => {
  const db = getFirestore();
  const auth = getAuth();

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
              {game.lastModified ? moment(game.lastModified.toDate()).format('MMM Do YY') : ''}
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
              {game.players?.length}
              {' '}
              Player(s)
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
          disabled={!game.players.includes(auth.currentUser.uid)}
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
          disabled={auth.currentUser.uid !== game.owner}
          onClick={async () => {
            const q = query(collection(db, `games/${game.id}/factories`));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (docRef) => {
              console.log(docRef, docRef.data());
              await deleteDoc(docRef.ref);
            });
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

GameCard.propTypes = {
  game: PropTypes.object.isRequired
};

export default GameCard;
