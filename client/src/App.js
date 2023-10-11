import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './pages/Navbar';



const App = () => {
 return (
    <>
       <Routes>
          <Route path="/" element={<Navbar />} />
          <Route index element={<Home />} />
        
       </Routes>
    </>
 );
};

export default App;