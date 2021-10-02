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

const ProductListToolbar = ({
  selected,
  list,
  modal,
  setSelectedGame,
  ...props
}) => {
  const formik = useFormik({ initialValues: { game: selected } });

  useEffect(() => {
    if (formik.values.game !== '') {
      setSelectedGame(formik.values.game);
    }
  }, [formik.values.game]);

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
                  defaultValue={selected}
                  fullWidth
                  label="Game"
                  name="game"
                  onChange={formik.handleChange}
                  placeholder="Search games"
                  value={formik.values.game}
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

export default ProductListToolbar;
