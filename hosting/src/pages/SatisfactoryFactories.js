import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box, Container, Grid
} from '@material-ui/core';
import { getAuth } from 'firebase/auth';
import {
  query, collection, getFirestore, where
} from 'firebase/firestore';
import { useCollectionDataOnce, useCollectionData } from 'react-firebase-hooks/firestore';
import { Plus as PlusIcon } from 'react-feather';

import GameSelect from 'components/satisfactoryfactories/GameSelect';
import FactoryCard from 'components/satisfactoryfactories/FactoryCard';
import CreateOrEditDialog from 'components/satisfactoryfactories/CreateOrEditDialog';
import useLocalStorage from 'hooks/useLocalStorage';
import useModalWithData from 'hooks/useModalWithData';
import Fab from 'components/Fab';
import Search from 'components/Search';
import useSearch from 'hooks/useSearch';

const SatisfactoryFactories = () => {
  const db = getFirestore();
  const auth = getAuth();
  const [games, gamesLoading] = useCollectionDataOnce(query(collection(db, 'games'), where('players', 'array-contains', auth.currentUser.uid)), { idField: 'id' });
  const [defaultGame, , removeDefaultGame] = useLocalStorage('defaultGame');
  const [selectedGame, setSelectedGame] = useState();
  const [defaultValueChecked, setDefaultValueChecked] = useState(false);
  let queryVar;
  let queryOptionVar;
  // if (games && games.length > 0) {
  //   if (!defaultGame) {
  //     setDefaultGame(games[0].id);
  //     setSelectedGame(games[0].id);
  //   } else if (!games.find((game) => (game.id === defaultGame))) {
  //     setDefaultGame(games[0].id);
  //     setSelectedGame(games[0].id);
  //   }
  // }

  useEffect(() => {
    let setGameTo;
    if (games && defaultGame && games.length > 0) {
      // If defaultGame cannot be found in games list, delete it and ignore it. Set selectedGame to the first one
      if (!games.find((game) => (game.id === defaultGame))) {
        removeDefaultGame();
        setGameTo = games[0].id;
      } else {
        setGameTo = defaultGame;
      }
    } else if (games && games.length === 0) {
      removeDefaultGame();
    } else if (games && games.length > 0) {
      // if not default game is set, but there are games, then set to first game
      setGameTo = games[0].id;
    }
    setSelectedGame(setGameTo);
    setDefaultValueChecked(true);
  }, [games, defaultGame]);

  if (defaultValueChecked) {
    queryVar = query(collection(db, `games/${selectedGame}/factories`));
    queryOptionVar = { idField: 'id' };
  }

  const [factories] = useCollectionData(queryVar, queryOptionVar);
  const modal = useModalWithData();
  const [filteredFactories, search, setSearch] = useSearch(factories || [], ['name', 'description']);

  if (gamesLoading) return (<></>);

  if (!selectedGame) return <>Create game first</>;

  const gameObject = games.find((game) => (game.id === selectedGame)) || {};

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
          <Search placeholder="Search factories" search={search} setSearch={setSearch} />
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
