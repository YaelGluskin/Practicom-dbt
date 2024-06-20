import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Public from './components/Public';
import LoginForm from './components/LoginForm';
import NewUser from './components/NewUser';
import Home from './components/Home';

function App() {
  document.title = 'DBT';
  return (
    <Router>
      <Routes>
        {/* <Route exact path="/" element = {<Layout/>}/> */}
        {/* 2 public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<LoginForm />} />

        {/* protected routes */}
        <Route path="welcome/:username" element={<NewUser />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
