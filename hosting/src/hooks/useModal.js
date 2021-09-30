import { useState } from 'react';

// const useModal = () => {
//   const [isShowing, setIsShowing] = useState(false);
//   const [data, setData] = useState();

//   const toggle = () => {
//     setIsShowing(!isShowing);
//   };

//   const show = () => {
//     setIsShowing(true);
//   };

//   const hide = () => {
//     setIsShowing(false);
//   };

//   const modal = {
//     isShowing, toggle, show, hide
//   };

//   return [modal, data, setData];
// };

export const useModal = (initialMode = false) => {
  const [modalOpen, setModalOpen] = useState(initialMode);
  const toggle = () => setModalOpen(!modalOpen);
  return [modalOpen, setModalOpen, toggle];
};

export const useModalWithData = (
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

export default useModal;
