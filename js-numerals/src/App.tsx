import Form from './components/Form';
import Conversion from './components/Conversion';
import React, { createContext, useMemo, useState } from 'react';

interface Context {
  numberToConvert: number;
  setNumberToConvert: React.Dispatch<React.SetStateAction<number>>;
}

export const ConversionContext = createContext<Context>({} as Context);

function App() {
  const [numberToConvert, setNumberToConvert] = useState(NaN);
  const value = useMemo(
    () => ({ numberToConvert, setNumberToConvert }),
    [numberToConvert],
  );

  return (
    <ConversionContext.Provider value={value}>
      <Form />
      <Conversion />
    </ConversionContext.Provider>
  );
}

export default App;
