import Form from './components/Form';
import ConversionResult from './components/ConversionResult';
import { ConversionProvider } from './context/conversionContext';

function App() {
  return (
    <ConversionProvider>
      <Form />
      <ConversionResult />
    </ConversionProvider>
  );
}

export default App;
