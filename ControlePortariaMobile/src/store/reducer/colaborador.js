const initialState = {
  nome: null,
  idColaborador: null,
  admin: false,
  isAutenticated: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGGED_IN':
      return {
        nome: action.user.nome,
        idColaborador: action.user.idColaborador,
        admin: action.user.admin,
        isAutenticated: action.user.isAutenticated,
      };
    case 'USER_LOGGED_OUT':
      return {
        nome: null,
        idColaborador: null,
        admin: false,
        isAutenticated: false,
      };
    default:
      return state;
  }
};

export default reducer;
