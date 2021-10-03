import {
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { useFormik } from 'formik';
import { useEffect } from 'react';

const GameSelect = ({
  selected,
  list,
  modal,
  setSelectedGame,
  ...props
}) => {
  const formik = useFormik({ initialValues: { game: selected }, enableReinitialize: true });

  useEffect(() => {
    if (formik.values.game !== '') {
      setSelectedGame(formik.values.game);
    }
  }, [formik.values.game]);

  const found = list && list.length > 0 ? !!list.find((item) => (item.id === selected)) : false;

  return (
    <Box {...props}>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box>
              {list && (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Game</InputLabel>
                <Select
                  defaultValue={found ? selected : ''}
                  fullWidth
                  label="Game"
                  name="game"
                  onChange={formik.handleChange}
                  placeholder="Search games"
                  value={found ? formik.values.game || '' : ''}
                  variant="outlined"
                >
                  {list.map((game) => (<MenuItem key={game.id} value={game.id}>{game.name}</MenuItem>))}
                </Select>
              </FormControl>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default GameSelect;
