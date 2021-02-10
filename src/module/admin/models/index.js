import user from './user';

export default {
  namespace: 'admin',
  state: {
    ...user.state
  },
  reducers: {
    ...user.reducers
  },
  effects: {
    ...user.effects
  }
};
