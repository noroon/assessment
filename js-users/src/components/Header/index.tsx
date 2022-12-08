import { Button, Box, AppBar, Toolbar, IconButton } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              to="/"
              component={RouterLink}
            >
              <HomeOutlinedIcon />
            </IconButton>
          </Box>

          <Button
            variant="text"
            color="inherit"
            to="/new"
            component={RouterLink}
          >
            Add new user
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
