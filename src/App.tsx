import './index.css';
import Chat from './pages/Chat';
import { Provider } from 'react-redux';
import store from './app/store';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/404';
import Start from './pages/Start';

const App = () => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL + 'api/';

  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path='/' element={<Chat />} />
            <Route path='start' element={<Start />} />
            <Route path='/404' element={<NotFoundPage />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
};

export default App;
