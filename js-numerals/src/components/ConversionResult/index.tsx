import { Typography } from '@mui/material';
import { useState } from 'react';

import { ConversionContext } from '../../context/conversionContext';
import {
  convertNumber,
  convertNumberForBritishEnglish,
} from '../../functions/convertNumber';

const ConversionResult = () => {
  const [britishConversion, setBritishConversion] = useState<string>();
  return (
    <Typography align="center" sx={{ mt: 5 }}>
      <ConversionContext.Consumer>
        {({ numberToConvert }) => {
          if (!isNaN(numberToConvert)) {
            setBritishConversion('');
            if (numberToConvert > 1000 && numberToConvert < 2000) {
              setBritishConversion(
                convertNumberForBritishEnglish(numberToConvert),
              );
            }
            const conversion = convertNumber(numberToConvert);
            return (
              <>
                <span>{conversion}</span>
                {britishConversion && (
                  <>
                    <h5>In British English:</h5>
                    <span>{britishConversion}</span>
                  </>
                )}
              </>
            );
          }
        }}
      </ConversionContext.Consumer>
    </Typography>
  );
};

export default ConversionResult;
