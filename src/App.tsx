import './index.css';
import Chat from './pages/Chat';
import { Provider } from 'react-redux';
import store from './app/store';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/404';
import Login from './pages/Login';
import Admin from './pages/Admin';

const App = () => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL + 'api/';

  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path='/' element={<Chat />} />
            <Route path='/404' element={<NotFoundPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/admin' element={<Admin />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
};

export default App;
