import actions from './actions';
import dispatcher from './dispatcher';
import constants from './constants';

/**
 * Make a get request to given url and return a json in a promise
 *
 * @param  {String} url url to request
 * @return {Object}      Promise object
 */
const get = (url) => fetch(url, {credentials: 'same-origin'}).then((res) => res.json());

/**
 * Make a post request to given url passing the given data
 *
 * @param  {String} url  url to request
 * @param  {Object} data data to be stringified
 * @return {Object}      response promise
 */
const post = function (url, data) {
  return fetch(url, {
    credentials: 'include',
    method: 'post',
    body: JSON.stringify(data || {}),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  .then((res) => res.json());
};

/**
 * API namesapce
 *
 * @type {Object}
 */
const API = {
  /**
   * Init the api
   *
   * @return {void}
   */
  init() {
    API.fetchChirps();
    API.fetchUsers();
  },
  /**
   * Fetch chirps from API
   *
   * @return {void}
   */
  fetchChirps: () => get('/api/chirps').then(actions.gotChirps.bind(actions)),
  /**
   * Save chirp to database
   *
   * @param  {String} text chirp text
   * @return {void}
   */
  saveChirp(text) {
    text = text.trim();
    if (text === '') {
      return;
    }

    post('/api/chirps', {text}).then(actions.chirped.bind(actions));
  },
  /**
   * Fetch users from API
   *
   * @return {void}
   */
  fetchUsers: () => get('/api/users').then(actions.gotUsers.bind(actions)),
  followUser(cid) {
    post(`/api/follow/${cid}`).then(actions.followed.bind(actions));
  },
  unfollowUser(cid) {
    post(`/api/unfollow/${cid}`).then(actions.unfollowed.bind(actions));
  },
};

// Register the API to application events
dispatcher.register((action) => {
  switch (action.actionType) {
  // save chirp to database when a CHIRP event is dispatched
  case constants.CHIRP:
    API.saveChirp(action.data);
    break;
  case constants.FOLLOW:
    API.followUser(action.data);
    break;
  case constants.UNFOLLOW:
    API.unfollowUser(action.data);
    break;
  default:
    break;
  }
});

export default API;
