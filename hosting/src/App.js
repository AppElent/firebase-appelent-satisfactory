import 'react-perfect-scrollbar/dist/css/styles.css';
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';

import CustomApp from './CustomApp';

const App = () => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CustomApp />
    </ThemeProvider>
  </StyledEngineProvider>
);

export default App;
