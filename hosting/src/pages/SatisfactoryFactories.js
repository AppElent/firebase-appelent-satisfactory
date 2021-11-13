import { Helmet } from 'react-helmet';
import {
  Box, Container, Grid
} from '@material-ui/core';
import { Plus as PlusIcon } from 'react-feather';

import GameSelect from 'components/satisfactoryfactories/GameSelect';
import FactoryCard from 'components/satisfactoryfactories/FactoryCard';
import CreateOrEditDialog from 'components/satisfactoryfactories/CreateOrEditDialog';
import useLocalStorage from 'hooks/useLocalStorage';
import useModalWithData from 'hooks/useModalWithData';
import Fab from 'components/Fab';
import Search from 'components/Search';
import useSearch from 'hooks/useSearch';
import { useAppCache } from 'modules/AppCache';

const SatisfactoryFactories = () => {
  const { values } = useAppCache();
  const { games, factories } = values;
  const [defaultGame, setDefaultGame] = useLocalStorage('defaultGame');

  const modal = useModalWithData();
  const [filteredFactories, search, setSearch] = useSearch(factories || [], ['name', 'description']);

  if (!defaultGame) return <>Create game first</>;

  const gameObject = games?.find((game) => (game.id === defaultGame)) || {};

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
          <GameSelect selected={defaultGame} list={games} modal={modal} setSelectedGame={setDefaultGame} />
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
          {games && factories !== undefined && (
          <CreateOrEditDialog
            game={gameObject}
            factories={factories}
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
