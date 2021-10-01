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

const useModal = (initialMode = false) => {
  const [modalOpen, setModalOpen] = useState(initialMode);
  const toggle = () => setModalOpen(!modalOpen);
  return [modalOpen, setModalOpen, toggle];
};

export default useModal;
