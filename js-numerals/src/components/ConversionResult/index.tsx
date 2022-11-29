import { Typography } from '@mui/material';
import { ConversionContext } from '../../context/conversionContext';
import convertNumber from '../../functions/convertNumber';

const ConversionResult = () => {
  return (
    <Typography align="center" sx={{ mt: 5 }}>
      <ConversionContext.Consumer>
        {({ numberToConvert }) => {
          if (!isNaN(numberToConvert)) {
            const conversion = convertNumber(numberToConvert);
            return <span>{conversion}</span>;
          }
        }}
      </ConversionContext.Consumer>
    </Typography>
  );
};

export default ConversionResult;
