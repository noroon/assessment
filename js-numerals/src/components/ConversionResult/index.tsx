import { ConversionContext } from '../../context/conversionContext';
import convertNumber from '../../functions/convertNumber';

const ConversionResult = () => {
  return (
    <ConversionContext.Consumer>
      {({ numberToConvert }) => {
        if (!isNaN(numberToConvert)) {
          const conversion = convertNumber(numberToConvert);
          return <span>{conversion}</span>;
        }
      }}
    </ConversionContext.Consumer>
  );
};

export default ConversionResult;