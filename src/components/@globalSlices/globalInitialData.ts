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
    hospitalKey: '123123',
    hospitalName: '상원병원',
    hospitalTelNumber: '01098743299',
  },
};

export default initialState;
