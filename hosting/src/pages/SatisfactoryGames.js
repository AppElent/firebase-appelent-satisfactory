import { Helmet } from 'react-helmet';
import {
  Box, Container, Grid
} from '@material-ui/core';
import { getAuth } from 'firebase/auth';
import {
  getFirestore, collection, query, where
} from 'firebase/firestore';
import { useSnackbar } from 'notistack';
import { Plus as PlusIcon } from 'react-feather';

import useSearch from 'hooks/useSearch';
// eslint-disable-next-line import/no-named-as-default
import useModalWithData from 'hooks/useModalWithData';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import CreateOrEditDialog from 'components/satisfactorygames/CreateOrEditDialog';
import SatisfactoryGameToolbar from 'components/satisfactorygames/SatisfactoryGameToolbar';
import GameCard from 'components/satisfactorygames/GameCard';
import Fab from 'components/Fab';

const SatisfactoryGames = () => {
  const auth = getAuth();
  const db = getFirestore();
  const modal = useModalWithData();
  const { enqueueSnackbar } = useSnackbar();
  // const [games, gamesLoading, gamesError] = useCollectionData(query(collection(db, 'games'), where('owner', '==', auth.currentUser.uid)), { idField: 'id' });
  const [games, gamesLoading, gamesError] = useCollectionData(query(collection(db, 'games'), where('players', 'array-contains', auth.currentUser.uid)), { idField: 'id' });

  if (gamesError) {
    enqueueSnackbar(`Error getting games: ${gamesError}`, { preventDuplicate: true, variant: 'error' });
  }

  const [filteredGames, search, setSearch] = useSearch(games || [], ['name', 'description']);

  if (gamesLoading) return (<></>);

  return (
    <>
      <Helmet>
        <title>Games | Satisfactory: FICSIT! Management Console</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <SatisfactoryGameToolbar search={search} setSearch={setSearch} modal={modal} />
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {filteredGames && filteredGames.map((game) => (
                <Grid
                  item
                  key={game.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <GameCard game={game} modal={modal} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <CreateOrEditDialog
            modal={modal}
          />
        </Container>
        <Fab color="primary" aria-label="add" onClick={modal.showModal}>
          <PlusIcon />
        </Fab>
      </Box>
    </>
  );
};

export default SatisfactoryGames;
