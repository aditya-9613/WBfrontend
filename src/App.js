import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Home from './components/home';
import Footer from './components/footer';
import Login from './components/login';
import Signup from './components/signup';
import Verify from './components/verify';
import Profile from './components/profile';
import Privatecomponents from './components/privatecomponents';
import Profiledetails from './components/profiledetails';
import Addblogg from './components/addblogg';
import Profilepic from './components/profilepic';
import Changepassword from './components/changepassword';
import Info from './components/info';
import Signcomponents from './components/signcomponents';
import Detailedblogg from './components/detailedblogg';
import Newotp from './components/newotp';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/:_id' element={<Detailedblogg/>}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route element={<Signcomponents />}>
          <Route path='/signup/verify' element={<Verify />}></Route>
        </Route>
        <Route path='/login' element={<Login />}></Route>
        <Route element={<Privatecomponents />}>
          <Route path='/login/:email' element={<Profile />}></Route>
          <Route path='/login/profile/details' element={<Profiledetails />}></Route>
          <Route path='/login/profile/add' element={<Addblogg />}></Route>
          <Route path='/login/profile/details/update' element={<Profilepic />}></Route>
          <Route path='/login/profile/change' element={<Changepassword />}></Route>
          <Route path='/login/profile/info' element={<Info />}></Route>
          <Route path='/login/newverify' element={<Newotp/>}></Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
