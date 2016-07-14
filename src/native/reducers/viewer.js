const initialState = {
  isLoggedIn: false,
  isAdmin: null,
  // hasSkippedLogin: false,
  // sharedSchedule: null,
  id: null,
  username: null,
  token: null,
};

function viewer(state = initialState, action) {
  if (action.type === 'LOGGED_IN') {
    const { id, username, token } = action.data;
    // TODO hardcoded! if is not admin...
    const isAdmin = (username === 'gestor@virtualbim.com');
    return {
      isLoggedIn: true,
      isAdmin,
      id,
      username,
      token,
    };
  }
  // if (action.type === 'SKIPPED_LOGIN') {
  //   return {
  //     isLoggedIn: false,
  //     hasSkippedLogin: true,
  //     sharedSchedule: null,
  //     id: null,
  //     name: null,
  //   };
  // }
  if (action.type === 'LOGGED_OUT') {
    return initialState;
  }
  // if (action.type === 'SET_SHARING') {
  //   return {
  //     ...state,
  //     sharedSchedule: action.enabled,
  //   };
  // }
  // if (action.type === 'RESET_NUXES') {
  //   return {...state, sharedSchedule: null};
  // }
  return state;
}

export default viewer;
