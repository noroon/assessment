import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { FormEvent, useState, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';

import { getErrorMessage } from '../../utils';
import { useEffect } from 'react';

const Edit = () => {
  const { id } = useParams();
  const [successAlert, setSuccessAlert] = useState(false);
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
  });

  const getUser = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}users/${id}`,
        requestOptions,
      );

      const data = await res.json();
      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    getUser().then(({ first_name, last_name }) => {
      setUser({ first_name, last_name });
    });
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessAlert(false);

    try {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      };

      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}users/${id}`,
        requestOptions,
      );

      if (res.ok) {
        setSuccessAlert(true);
      }
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <AccountCircleOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit user
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="first_name"
            name="first_name"
            label="First name"
            value={user.first_name}
            onChange={(e) => handleChange(e)}
            autoComplete="off"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="last_name"
            name="last_name"
            label="Last name"
            value={user.last_name}
            onChange={(e) => handleChange(e)}
            autoComplete="off"
          />
          {successAlert && (
            <Alert severity="success">The user is successfully edited</Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Edit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Edit;
