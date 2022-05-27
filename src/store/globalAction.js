export const setLoading = payload => {
  return {
    type: 'SET_LOADING',
    payload,
  };
};

export const setRefresh = payload => {
  return {
    type: 'SET_REFRESH',
    payload,
  };
};
