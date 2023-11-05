import './App.css';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import Dashbord from './Pages/Dashbord';
import Header from './components/Header';

function App() {
  return (
    <div>
 <>
 
 <Router>
  <Header />
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Registration />} />
    <Route path='/dashbord' element={<Dashbord />} />
  </Routes>
 </Router>

 </>
    </div>
  );
}

export default App;
