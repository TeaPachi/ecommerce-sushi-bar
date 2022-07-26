import './App.css';
import Header from './layout/Header';
import AppRoutes from './AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './utils/Theme';

function App() {
  return (
    <BrowserRouter className="App">
      <ThemeProvider theme={theme}>
        <Header/>
        <AppRoutes/>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
