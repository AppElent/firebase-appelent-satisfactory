import { Fab as MuiFab } from '@mui/material';

const FABstyle = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
};

const Fab = ({ children, modal, ...props }) => (
  <MuiFab style={FABstyle} {...props}>
    {children}
  </MuiFab>
);

export default Fab;
