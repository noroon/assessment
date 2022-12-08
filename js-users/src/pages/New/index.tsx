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
import { FormEvent, useRef, useState } from 'react';
import { getErrorMessage } from '../../utils';

const New = () => {
  const formRef = useRef<HTMLFormElement>();
  const [successAlert, setSuccessAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState({
    first_name: '',
    last_name: '',
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessAlert(false)
    const formData = new FormData(event.currentTarget);

    const firstName = formData.get('first_name');
    const lastName = formData.get('last_name');

    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          status: 'active',
        }),
      };

      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}users`,
        requestOptions,
      );
      const data = await res.json();

      if (res.status === 422) {
        setErrorMessage(data);
      }

      if (res.ok) {
        if (formRef.current) formRef.current.reset();
        setSuccessAlert(true)
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
          Add new user
        </Typography>
        <Box
          component="form"
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="first_name"
            name="first_name"
            label="First name"
            autoComplete="current-first_name"
            autoFocus
          />
          {errorMessage.first_name && (
            <Typography variant="caption" color="red" gutterBottom>
              {`Last name ${errorMessage.first_name[0]}`}
            </Typography>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="last_name"
            name="last_name"
            label="Last name"
            autoComplete="current-last_name"
          />
          {errorMessage.last_name && (
            <Typography variant="caption" color="red" gutterBottom>
              {`Last name ${errorMessage.last_name[0]}`}
            </Typography>
          )}
          {successAlert && (
            <Alert severity="success">The user is successfully added</Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default New;
