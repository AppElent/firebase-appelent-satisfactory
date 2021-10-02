import { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box, Container, Grid
} from '@material-ui/core';
import { query, collection, getFirestore } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Plus as PlusIcon } from 'react-feather';

import GameSelect from 'components/satisfactoryfactories/GameSelect';
import FactoryCard from 'components/satisfactoryfactories/FactoryCard';
import CreateOrEditDialog from 'components/satisfactoryfactories/CreateOrEditDialog';
import useLocalStorage from 'hooks/useLocalStorage';
import useModalWithData from 'hooks/useModalWithData';
import Fab from 'components/Fab';
import FactorySearch from 'components/satisfactoryfactories/FactorySearch';
import useSearch from 'hooks/useSearch';

const SatisfactoryFactories = () => {
  const db = getFirestore();
  const [games] = useCollectionData(query(collection(db, 'games')), { idField: 'id' });
  const [defaultGame] = useLocalStorage('game');
  const [selectedGame, setSelectedGame] = useState(defaultGame);
  const [factories] = useCollectionData(query(collection(db, `games/${selectedGame}/factories`)), { idField: 'id' });
  const modal = useModalWithData(factories);
  const [filteredFactories, search, setSearch] = useSearch(factories || [], ['name', 'description']);

  return (
    <>
      <Helmet>
        <title>Factories | Satisfactory: FICSIT! Management Console</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <GameSelect selected={selectedGame} list={games} modal={modal} setSelectedGame={setSelectedGame} />
          <FactorySearch search={search} setSearch={setSearch} />
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {filteredFactories && filteredFactories.map((factory) => (
                <Grid
                  item
                  key={factory.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <FactoryCard factory={factory} modal={modal} />
                </Grid>
              ))}
            </Grid>
          </Box>
          {games && (
          <CreateOrEditDialog
            game={games.find((game) => (game.id === selectedGame))}
            modal={modal}
          />
          )}
        </Container>
        <Fab color="primary" aria-label="add" onClick={modal.showModal}>
          <PlusIcon />
        </Fab>
      </Box>
    </>
  );
};

export default SatisfactoryFactories;
