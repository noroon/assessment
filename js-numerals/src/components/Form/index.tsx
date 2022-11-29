import { FormEvent, useContext, useState } from 'react';
import {
  Button,
  CssBaseline,
  Box,
  Typography,
  Container,
  Alert,
} from '@mui/material';
import { ConversionContext } from '../../context/conversionContext';
import StyledTextField from './StyledTextField';

const Form = () => {
  const { setNumberToConvert } = useContext(ConversionContext);
  const [alert, setAlert] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formInput = data.get('formInput');

    if (formInput === null || formInput === '') {
      setAlert('Please enter a number');
      setNumberToConvert(NaN);
    } else {
      setAlert('');
      setNumberToConvert(Number(formInput));
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
        <Typography component="h1" variant="h5">
          Enter a number to convert
        </Typography>
        <Box
          component="form"
          title="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 4 }}
        >
          <StyledTextField
            required
            fullWidth
            type="number"
            id="formInput"
            name="formInput"
            autoComplete="formInput"
            title="formInput"
            autoFocus
            inputProps={{ 'data-testid': 'form-input' }}
            variant="standard"
          />
          {alert && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              {alert}
            </Alert>
          )}
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
