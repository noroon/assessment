import { createContext, useMemo, useState } from 'react';

interface Context {
  numberToConvert: number;
  setNumberToConvert: React.Dispatch<React.SetStateAction<number>>;
}

export const ConversionContext = createContext<Context>({} as Context);

export function ConversionProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
  const [numberToConvert, setNumberToConvert] = useState(NaN);
  const value = useMemo(
    () => ({ numberToConvert, setNumberToConvert }),
    [numberToConvert],
  );

  return (
    <ConversionContext.Provider value={value}>
      {children}
    </ConversionContext.Provider>
  );
}
