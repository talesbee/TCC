const initialState = {
  UsuarioID: 0,
  PessoaID: 0,
  Nome: null,
  Email: null,
  Cpf: null,
  isAutenticated: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGGED_IN':
      return {
        isAutenticated: action.user.isAutenticated,
        UsuarioID: action.user.UsuarioID,
        PessoaID: action.user.PessoaID,
        Nome: action.user.Nome,
        Email: action.user.Email,
        Cpf: action.user.Cpf,
      };
    case 'USER_LOGGED_OUT':
      return {
        UsuarioID: 0,
        PessoaID: 0,
        Nome: null,
        Email: null,
        Cpf: null,
        isAutenticated: false,
      };
    default:
      return state;
  }
};

export default reducer;
