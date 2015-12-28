import constants from '../constants';
import { extend } from './store';
import UserStore from './users';

export default extend({
  init() {
    // when chirps are fetched from the server
    this.bind(constants.GOT_CHIRPS, this.set);
    // when a single chirp is fetched form server
    this.bind(constants.CHIRPED, this.add);
  },
  timeline() {
    let ids = [UserStore.currentUser.cid].concat(UserStore.currentUser.following);

    return this._data.filter((item) => _.includes(ids, item.userId));
  },
  byUserId(id) {
    return this._data.filter((item) => item.userId === id);
  }
});
