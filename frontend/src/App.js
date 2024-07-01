import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Public from './components/Public';
import LoginForm from './components/LoginForm';
import NewUser from './components/NewUser';
import Home from './components/Home';
import NavBar from './components/NavBar';

import ArticleForm from './features/ArticleForm';
import ArticleDetails from './features/ArticleDetails';
// import ArticleList from './features/ArticleList';

function App() {
  document.title = 'DBT';
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          {/* <Route exact path="/" element = {<Layout/>}/> */}
          {/* 2 public routes */}
          <Route index element={<Public />} />
          <Route path="login" element={<LoginForm />} />


          {/* protected routes */}
          <Route path="welcome/:username" element={<NewUser />} />

          <Route path="home">
            <Route index element={<Home />} />
            <Route path='newArticle' element={<ArticleForm />} />
            <Route path='articles/:id/' element={<ArticleDetails />} />

          </Route>
        </Routes>
      </Router>
    </>

  );
}

export default App;
