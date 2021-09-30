import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {
  addDoc, collection, setDoc, doc, getFirestore
} from 'firebase/firestore';
import { useFormik } from 'formik';

export default function CreateOrEditDialog({ modal, getData }) {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: modal.selected?.name || '',
      description: modal.selected?.description || '',
    }
  });

  const db = getFirestore();
  const saveGame = async () => {
    if (modal.selected) {
      await setDoc(doc(db, 'games', modal.selected.id), formik.values);
    } else {
      await addDoc(collection(db, 'games'), formik.values);
    }
    await getData();
    modal.hideModal();
  };
  return (
    <div>
      <Dialog open={modal.modalOpen} onClose={modal.closeModal}>
        <DialogTitle>Create new game</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new game here
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name of game"
            onChange={formik.handleChange}
            type="text"
            fullWidth
            value={formik.values.name}
            variant="standard"
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            onChange={formik.handleChange}
            type="text"
            fullWidth
            value={formik.values.description}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={modal.hideModal}>Cancel</Button>
          <Button onClick={saveGame}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
