import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import SingleProduct from './pages/SingleProduct';




const App = () => {
 return (
    <>
       <Routes>
          <Route path="/" element={<Navbar />} />
          <Route index element={<Home />} />
          <Route path="/products/:id" element={<SingleProduct/>}/>
        
       </Routes>
    </>
 );
};

export default App;