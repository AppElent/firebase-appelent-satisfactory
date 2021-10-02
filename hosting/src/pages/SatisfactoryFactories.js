import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box, Container, Grid
} from '@material-ui/core';
import { query, collection, getFirestore } from 'firebase/firestore';
import { useCollectionDataOnce, useCollectionData } from 'react-firebase-hooks/firestore';
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
  const [games, gamesLoading] = useCollectionDataOnce(query(collection(db, 'games')), { idField: 'id' });
  const [defaultGame, setDefaultGame] = useLocalStorage('defaultGame');
  const [selectedGame, setSelectedGame] = useState(defaultGame);
  let queryVar;
  let queryOptionVar;
  if (games && games.length > 0) {
    if (!defaultGame) {
      setDefaultGame(games[0].id);
      setSelectedGame(games[0].id);
    } else if (!games.find((game) => (game.id === defaultGame))) {
      setDefaultGame(games[0].id);
      setSelectedGame(games[0].id);
    }
  }

  useEffect(() => {
    if (games && games.length > 0) {
      queryVar = query(collection(db, `games/${selectedGame}/factories`));
      queryOptionVar = { idField: 'id' };
    }
  }, [selectedGame]);

  const [factories] = useCollectionData(queryVar, queryOptionVar);
  const modal = useModalWithData();
  const [filteredFactories, search, setSearch] = useSearch(factories || [], ['name', 'description']);

  let gameObject;
  if (!gamesLoading) {
    gameObject = games.find((game) => (game.id === selectedGame)) || {};
  }

  console.log(factories, defaultGame, selectedGame);

  if (gamesLoading) return (<></>);

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
                  <FactoryCard factory={factory} game={gameObject} modal={modal} />
                </Grid>
              ))}
            </Grid>
          </Box>
          {games && (
          <CreateOrEditDialog
            game={gameObject}
            modal={modal}
          />
          )}
        </Container>
        <Fab color="primary" aria-label="add" onClick={modal.showModal} disabled={games?.length === 0}>
          <PlusIcon />
        </Fab>
      </Box>
    </>
  );
};

export default SatisfactoryFactories;
