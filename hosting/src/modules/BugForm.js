import useModal from 'hooks/useModal';
import React, {
  Fragment, createContext, useContext, useState
} from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { useFormik } from 'formik';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const BugFormContext = createContext();

export const useBugForm = () => useContext(BugFormContext);

const submitForm = async (values) => {
  const db = getFirestore();
  const auth = getAuth();
  await addDoc(collection(db, 'issues'), {
    path: window.location.href,
    user: auth.currentUser?.uid || 'Not logged in',
    ...values
  });
};

const DEFAULT_OPTIONS = {
  title: 'Bug submit form',
  cancellationText: 'Cancel',
  confirmationText: 'Submit',
  dialogProps: {},
  confirmationButtonProps: {},
  cancellationButtonProps: {},
  submitForm
};

const buildOptions = (defaultOptions, options) => {
  const dialogProps = {
    ...(defaultOptions.dialogProps || DEFAULT_OPTIONS.dialogProps),
    ...(options.dialogProps || {}),
  };
  const confirmationButtonProps = {
    ...(defaultOptions.confirmationButtonProps || DEFAULT_OPTIONS.confirmationButtonProps),
    ...(options.confirmationButtonProps || {}),
  };
  const cancellationButtonProps = {
    ...(defaultOptions.cancellationButtonProps || DEFAULT_OPTIONS.cancellationButtonProps),
    ...(options.cancellationButtonProps || {}),
  };

  return {
    ...DEFAULT_OPTIONS,
    ...defaultOptions,
    ...options,
    dialogProps,
    confirmationButtonProps,
    cancellationButtonProps,
  };
};

export const BugFormProvider = ({ children, defaultOptions }) => {
  const modal = useModal();
  const [options, setOptions] = useState({ ...DEFAULT_OPTIONS, ...defaultOptions });

  const showForm = (localoptions = {}) => {
    setOptions(buildOptions(defaultOptions || {}, localoptions));
    modal.setModalOpen(true);
  };

  return (
    <>
      <BugFormContext.Provider value={{ showForm }}>
        {children}
      </BugFormContext.Provider>
      <BugForm modal={modal} options={options} />
    </>
  );
};

export const BugForm = ({
  modal, options
}) => {
  const formik = useFormik({
    initialValues: { issue: '', type: 'bug' },
    onSubmit: async () => {
      await options.submitForm(formik.values);
      modal.hideModal();
    }
  });

  return (
    <Dialog fullWidth {...options.dialogProps} open={modal.modalOpen} onClose={modal.hideModal}>
      {options.title && (
      <DialogTitle>{options.title}</DialogTitle>
      )}
      <DialogContent>
        <FormControl fullWidth style={{ marginTop: '7px' }}>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formik.values.type || ''}
            label="Age"
            name="type"
            onChange={formik.handleChange}
          >
            <MenuItem value="bug">Bug</MenuItem>
            <MenuItem value="feature_request">Feature request</MenuItem>
            <MenuItem value="suggestion">Suggestion</MenuItem>
          </Select>
        </FormControl>
        <TextField
          autoFocus
          margin="dense"
          id="issue"
          label="Describe your problem/suggestion"
          minRows={6}
          multiline
          name="issue"
          onChange={formik.handleChange}
          placeholder="Describe here"
          type="text"
          fullWidth
          value={formik.values.issue || ''}
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button {...options.cancellationButtonProps} onClick={modal.hideModal}>
          {options.cancellationText}
        </Button>
        <Button color="primary" {...options.confirmationButtonProps} onClick={formik.handleSubmit}>
          {options.confirmationText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const BugFormButton = ({ children, text, ...props }) => {
  const { showForm } = useBugForm();

  return (<Button {...props} onClick={() => showForm()}>{children || 'Submit'}</Button>);
};
