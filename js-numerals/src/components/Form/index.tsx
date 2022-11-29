import { FormEvent, useContext } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
} from '@mui/material';
import { ConversionContext } from '../../App';

const Form = () => {
  const { setNumberToConvert } = useContext(ConversionContext);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const formInput = data.get('formInput');
    setNumberToConvert(Number(formInput));
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
        <Typography component="h1" variant="h5">
          Convert a number
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            required
            fullWidth
            type="number"
            id="formInput"
            name="formInput"
            autoComplete="formInput"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Convert
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Form;
