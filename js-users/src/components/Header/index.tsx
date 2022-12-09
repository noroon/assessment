import { Button, Box, AppBar, Toolbar, IconButton } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'

const Header = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 360px)' })

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar  sx={{ width: isMobile ? '90%' : '50%', m: 'auto' }}>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="home"
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
