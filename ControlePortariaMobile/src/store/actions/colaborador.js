export const colaboradorUp = user => {
  return {
    type: 'colaboradorUp',
    user,
  };
};

export const colaboradorClean = () => {
  return {
    type: 'colaboradorClean',
  };
};