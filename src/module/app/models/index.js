export default {
  namespace: 'app',
  state: {
    loginUser: {
      name: '233'
    }
  },
  reducers: {
    setloginUser(state) {
      localStorage.setItem('loginuser', state.loginUser);
      return { ...state };
    }
  }
};
