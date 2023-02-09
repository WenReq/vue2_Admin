// 用户模块
import { login } from '@/api/user';

export const users = {
  state: {
    accessToken: '',
  },
  mutations: {
    setToken(state, token) {
      state.accessToken = token;
    },
  },
  actions: {
    getToken({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then((res) => {
          if (res.status === 200) {
            commit('setToken', res.data.token);
          }
          resolve(res);
        });
      });
    },
  },
};
