import { Helmet } from 'react-helmet';
import {
  Box, Container, Grid
} from '@material-ui/core';
import { Plus as PlusIcon } from 'react-feather';

import useSearch from 'hooks/useSearch';
// eslint-disable-next-line import/no-named-as-default
import useModalWithData from 'hooks/useModalWithData';

import CreateOrEditDialog from 'components/satisfactorygames/CreateOrEditDialog';
import SatisfactoryGameToolbar from 'components/satisfactorygames/SatisfactoryGameToolbar';
import GameCard from 'components/satisfactorygames/GameCard';
import Fab from 'components/Fab';
import { useAppCache } from 'modules/AppCache';

const SatisfactoryGames = () => {
  const modal = useModalWithData();
  const { values } = useAppCache();
  const { games } = values;

  const [filteredGames, search, setSearch] = useSearch(games || [], ['name', 'description']);

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
