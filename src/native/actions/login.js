import { serverURL } from '../env';

// TODO move function
async function queryLocalAPI(path, args) {
  return new Promise((resolve, reject) => {
    fetch(`${serverURL}${path}`, {
      method: 'POST', // TODO should come in params
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    }).then((response) => {
      if (response && response.ok) {
        resolve(response.json());
      } else if (response.status === 401) {
        reject('Unauthorized');
      } else {
        reject(response && response.error);
      }
    });
  });
}

async function _logInWithPassword(username, password) {
  const { token } = await queryLocalAPI('/login', {
    usernameOrEmail: username,
    password,
  });

  // const user = await Parse.User.currentAsync();
  // user.set('facebook_id', profile.id);
  // user.set('name', profile.name);
  // user.set('email', profile.email);
  // await user.save();
  // await updateInstallation({user});

  const action = {
    type: 'LOGGED_IN',
    data: {
      id: 1234, // TODO no inventar!!!
      username,
      token,
    },
  };

  return action;
}

function logInWithPassword(username, password) {
  return (dispatch) => {
    const login = _logInWithPassword(username, password);

    // Loading friends schedules shouldn't block the login process
    login.then(
      (result) => {
        dispatch(result);
        // dispatch(loadFriendsSchedules());
        // dispatch(loadSurveys());
      }
    );
    return login;
  };
}

function logOut() {
  // TODO: Make sure reducers clear their state
  return (dispatch) => dispatch({
    type: 'LOGGED_OUT',
  });
}

export default {
  logInWithPassword,
  logOut,
};
