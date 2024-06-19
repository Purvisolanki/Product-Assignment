import Home from './pages/Home'
import './App.css';
import { ProductProvider } from './context/ProductContext';

function App() {
  return (
    <ProductProvider>
    <Home/>
    </ProductProvider>
  );
}

export default App;
