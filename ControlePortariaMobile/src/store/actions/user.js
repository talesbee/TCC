export const login = user => {
  return {
    type: 'USER_LOGGED_IN',
    user,
  };
};

export const logout = () => {
  return {
    type: 'USER_LOGGED_OUT',
  };
};