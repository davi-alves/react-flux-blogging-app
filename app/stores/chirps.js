import constants from '../constants';
import { extend } from './store';

export default extend({
  init() {
    // when chirps are fetched from the server
    this.bind(constants.GOT_CHIRPS, this.set);
    // when a single chirp is fetched form server
    this.bind(constants.CHIRPED, this.add);
  }
});
