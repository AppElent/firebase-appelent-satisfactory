import * as React from 'react';
import Button from '@mui/material/Button';
import {
  Autocomplete, Box, Grid, IconButton
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';

import compare from 'utils/sort';

import {
  addDoc, collection, setDoc, doc, getFirestore
} from 'firebase/firestore';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Typography } from '@material-ui/core';
import recipes from 'data/recipes.json';

const FactoryRecipe = ({ formik, i }) => {
  const [inputValue, setInputValue] = React.useState(formik.values.recipes[i]?.name || '');
  const deleteRow = () => {
    const oldRecipes = [...formik.values.recipes];
    console.log(oldRecipes);
    oldRecipes.splice(i);
    console.log(oldRecipes);
    formik.setValues({ ...formik.values, recipes: oldRecipes });
  };

  console.log(9999, formik.values.recipes[i]?.name, inputValue);

  const handleAutocompleteChange = (i2) => (e, value) => {
    const allvalues = formik.values;
    allvalues.recipes[i2].name = value.displayname;
    formik.setValues(allvalues);
    setInputValue(value.displayname);
    console.log(allvalues);
  };

  return (
    <Grid
      container
      spacing={1}
    >
      <Grid
        item
        key={`recipe${i}name`}
        lg={4}
        md={4}
        xs={6}
      >
        <IconButton onClick={deleteRow} style={{ bottom: 0 }}><DoNotDisturbOnIcon color="error" /></IconButton>
        {/* <TextField
          // error={Boolean(recipeTouched && recipeErrors)}
          // helperText={recipeTouched && recipeErrors}
          autoFocus
          margin="dense"
          name={`recipes.${i}.name`}
          id={`recipes.${i}.name`}
          label="Recipe"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
        // fullWidth
          value={formik.values.recipes[i]?.name || ''}
          variant="standard"
        /> */}
        <Autocomplete
          value={formik.values.recipes[i]?.name}
          onChange={handleAutocompleteChange(i)}
          inputValue={inputValue}
          onInputChange={(event, value, reason) => {
            if (reason === 'input') {
              setInputValue(value);
            }
          }}
          // onSelectCapture={handleAutocompleteChange(i)}
          name={`recipes.${i}.name`}
          id={`recipes.${i}.name`}
          options={recipes ? recipes.sort(compare('displayname')) : []}
          getOptionLabel={(option) => (option.displayname ? option.displayname : '')}
          isOptionEqualToValue={(option, value) => option.displayname === value}
          // sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Recipe" variant="standard" />}
        />

      </Grid>
      <Grid
        item
        key={`recipe${i}amount`}
        lg={2}
        md={4}
        xs={6}
      >
        <TextField
          // error={Boolean(recipeTouched && recipeErrors)}
          // helperText={recipeTouched && recipeErrors}
          margin="dense"
          name={`recipes.${i}.amount`}
          id={`recipes.${i}.amount`}
          label="Number of machines"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="number"
          fullWidth
          value={formik.values.recipes[i]?.amount || ''}
          variant="standard"
        />

      </Grid>
      <Grid
        item
        key={`recipe${i}text`}
        lg={4}
        md={4}
        xs={6}
      >
        <TextField
          // error={Boolean(recipeTouched && recipeErrors)}
          // helperText={recipeTouched && recipeErrors}
          margin="dense"
          name={`recipes.${i}.text`}
          id={`recipes.${i}.text`}
          label="Comments / free text"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          fullWidth
          value={formik.values.recipes[i]?.text || ''}
          variant="standard"
        />

      </Grid>

    </Grid>
  );
};

export default function CreateOrEditDialog({ game, factories, modal }) {
  const selectedFactory = factories.find((factory) => factory.id === modal.selected);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: selectedFactory?.name || '',
      description: selectedFactory?.description || '',
      recipes: selectedFactory?.recipes || [],
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().max(255).required('Factory name is required')
    })
  });

  console.log(formik.values);

  const saveFactory = async () => {
    const db = getFirestore();
    if (modal.selected) {
      console.log(modal.selected, game, formik.values);
      const docRef = doc(db, `games/${game.id}/factories`, modal.selected);
      await setDoc(docRef, formik.values, { merge: true });
      modal.hideModal();
    } else {
      const docRef = await addDoc(collection(db, `games/${game.id}/factories`), { ...formik.values });
      // modal.setSelected({ id: docRef.id, ...formik.values });
      modal.setSelected(docRef.id);
    }
  };

  const newRow = () => {
    const oldRecipes = [...formik.values.recipes];
    console.log(oldRecipes);
    oldRecipes.push({ name: null, amount: '' });
    console.log(oldRecipes);
    formik.setValues({ ...formik.values, recipes: oldRecipes });
  };

  return (
    <div>
      <Dialog fullWidth maxWidth={modal.selected ? 'xl' : 'sm'} open={modal.modalOpen} onClose={modal.hideModal}>
        <DialogTitle>Create new Factory</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create or edit a Factory here
          </DialogContentText>
          <TextField
            error={Boolean(formik.touched.name && formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            autoFocus
            margin="dense"
            name="name"
            id="name"
            label="Name of factory"
            // onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            fullWidth
            value={formik.values.name || ''}
            variant="standard"
          />
          {modal.selected && (
          <TextField
            margin="dense"
            id="description"
            label="Description / comments"
            onChange={formik.handleChange}
            type="text"
            fullWidth
            multiline
            minRows={6}
            value={formik.values.description || ''}
            variant="standard"
          />
          ) }
          {selectedFactory && (
          <>
            {' '}

            <Box sx={{ pt: 3 }}>
              <Typography>Recipes</Typography>
              {formik.values.recipes && formik.values.recipes.map((recipe, i) => (<FactoryRecipe key={`recipe${i}`} i={i} recipe={recipe} formik={formik} />))} {/*  eslint-disable-line */ }
              {/* <FactoryRecipe formik={formik} /> */}
              <Button onClick={newRow} variant="contained">New recipe</Button>
            </Box>
          </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={modal.hideModal}>Cancel</Button>
          <Button onClick={saveFactory} variant="contained" disabled={!formik.dirty}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
