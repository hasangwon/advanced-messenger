import { GlobalTypes } from './globalTypes';

const initialState: GlobalTypes = {
  auth: {
    currentUser: '',
    accessToken: '',
  },
  config: {
    loadingProgress: '',
    isLoaded: true,
  },
  info: {
    userKey: '1',
    userName: '유저',
    userTelNumber: '',
  },
};

export default initialState;
