import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import UsersList from './Pages/UsersList';
import Navbar from './Navbar';
import WelcomePage from './Pages/WelcomePage';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' exact Component={LoginPage} />
        <Route path='/register' exact Component={RegisterPage} />
        <Route path='/users-lists' Component={UsersList} />
        <Route path='/welcome-page' Component={WelcomePage} />

      </Routes>
    </BrowserRouter>

  </div>
  );
}

export default App;
