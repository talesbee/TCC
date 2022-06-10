const initialState = {
  adm: false,
  nomePerfil: '',
  entrada1: '',
  saida1: '',
  entrada2: '',
  saida2: '',
  atualizar: false,
  id: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'permissaoUp':
      return {
        adm: action.permissao.adm,
        nomePerfil: action.permissao.nomePerfil,
        entrada1: action.permissao.entrada1,
        saida1: action.permissao.saida1,
        entrada2: action.permissao.entrada2,
        saida2: action.permissao.saida2,
        atualizar: action.permissao.atualizar,
        id: action.permissao.id
      };
    case 'permissaoClean':
      return {
        adm: false,
        nomePerfil: '',
        entrada1: '',
        saida1: '',
        entrada2: '',
        saida2: '',
        atualizar: false,
        id: 0
      };
    default:
      return state;
  }
};

export default reducer;
