export const permissaoUp = permissao => {
  return {
    type: 'permissaoUp',
    permissao,
  };
};

export const permissaoClean = () => {
  return {
    type: 'permissaoClean',
  };
};