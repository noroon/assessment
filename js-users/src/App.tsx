import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

import UserList from './components/UserList';
import New from './pages/New';
import Edit from './pages/Edit';
import Header from './components/Header';
import { Box } from '@mui/system';

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ margin: 'auto' }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/new" element={<New />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
