import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box, Container, Grid
} from '@material-ui/core';
// import { getAuth } from 'firebase/auth';
import {
  getFirestore, collection, getDocs, query
} from 'firebase/firestore';

import useSearch from 'hooks/useSearch';
import { useModalWithData } from 'hooks/useModal';
// import { useCollection } from 'hooks/useFirestore';

import CreateOrEditDialog from 'components/satisfactorygames/CreateOrEditDialog';
import SatisfactoryGameToolbar from 'components/satisfactorygames/SatisfactoryGameToolbar';
import GameCard from 'components/satisfactorygames/GameCard';

const SatisfactoryGames = () => {
  // const auth = getAuth();
  const db = getFirestore();
  const modal = useModalWithData();
  // const games = [];// useCollection(query(collection(db, 'games')));
  const [games, setGames] = useState([]);

  const getData = async () => {
    const q = query(collection(db, 'games'));

    const querySnapshot = await getDocs(q);
    const tempdata = querySnapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
    setGames(tempdata);
  };

  useEffect(async () => {
    getData();
  }, []);

  const [filteredGames, search, setSearch] = useSearch(games, ['name', 'description']);

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
                  <GameCard game={game} modal={modal} getData={getData} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <CreateOrEditDialog
            modal={modal}
            setData={getData}
          />
        </Container>
      </Box>
    </>
  );
};

export default SatisfactoryGames;
