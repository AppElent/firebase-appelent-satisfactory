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

export default function CreateOrEditDialog({ game, modal }) {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: modal.selected?.name || '',
      description: modal.selected?.description || '',
    }
  });

  const db = getFirestore();
  const saveFactory = async () => {
    if (modal.selected) {
      await setDoc(doc(db, `games/${game.id}/factories`, modal.selected.id), formik.values);
      modal.hideModal();
    } else {
      const docRef = await addDoc(collection(db, `games/${game.id}/factories`), formik.values);
      console.log(docRef);
      modal.setSelected(formik.values);
    }
  };

  return (
    <div>
      <Dialog fullWidth={!!modal.selected} maxWidth={modal.selected ? 'xl' : 'sm'} open={modal.modalOpen} onClose={modal.hideModal}>
        <DialogTitle>Create new Factory</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new Factory here
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name of factory"
            onChange={formik.handleChange}
            type="text"
            fullWidth
            value={formik.values.name}
            variant="standard"
          />
          {modal.selected && (
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
          ) }
        </DialogContent>
        <DialogActions>
          <Button onClick={modal.hideModal}>Cancel</Button>
          <Button onClick={saveFactory}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
