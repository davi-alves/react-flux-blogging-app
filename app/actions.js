import dispatcher from './dispatcher';
import constants from './constants';
import { camelCase } from './utils';

Object.keys(constants).forEach((key) => {
  let funcName = camelCase(key);

  exports[funcName] = (data) => dispatcher.dispatch({actionType: key, data: data});
});
