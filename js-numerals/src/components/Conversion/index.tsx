import { ConversionContext } from '../../App';
import convertNumber from '../../functions/convertNumber';

const Conversion = () => {
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

export default Conversion;
