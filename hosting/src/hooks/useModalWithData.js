import { useState } from 'react';

import useModal from './useModal';

const useModalWithData = (
  initialMode = false,
  initialSelected = null
) => {
  const [modalOpen, setModalOpen] = useModal(initialMode);
  const [selected, setSelected] = useState(initialSelected);
  const setModalState = (state) => {
    setModalOpen(state);
    if (state === false) {
      setSelected(null);
    }
  };
  const toggleModal = () => {
    setModalState(!modalOpen);
  };
  const showModal = () => {
    setModalState(true);
  };
  const hideModal = () => {
    setModalState(false);
  };
  return {
    modalOpen, setModalOpen, toggleModal, showModal, hideModal, selected, setSelected, setModalState
  };
};

export default useModalWithData;
