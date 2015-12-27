import _ from 'lodash';
import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

const CHANGE_EVENT = 'CHANGE';

const storeMethods = {
  /**
   * Init placeholder
   *
   * The init function should be used to listen to specific actions in the system (eg.: API events)
   *
   * @return {void}
   */
  init() {},

  set(data) {
    const ids = this._data.map((m) => m.cid);
    data
      .filter((item) => ids.indexOf(item.cid) === -1)
      .forEach(this.add.bind(this));
  },

  add(item) {
    this._data.push(item);
  },

  all() {
    return this._data;
  },

  get(cid) {
    return this._data
      .filter((item) => item.cid === cid)[0];
  },

  addChangeListener(fn) {
    this.on(CHANGE_EVENT, fn);
  },

  removeChangeListener(fn) {
    this.removeListener(CHANGE_EVENT, fn);
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  bind(actionType, actionFn) {
    if (!this.hasOwnProperty(actionType)) {
      this.actions[actionType] = [];
    }
    this.actions[actionType].push(actionFn);
  }
};

export const extend = function (methods) {
  const store = {
    _data: [],
    actions: {}
  };
  // assign stuff
  _.assign(store, EventEmitter.prototype, storeMethods, methods);
  // init the store
  store.init();
  // registher with the application dispatcher
  dispatcher.register((action) => {
    if (!store.actions.hasOwnProperty(action.actionType)) {
      return;
    }
    // execute all listeners
    store.actions[action.actionType].forEach((fn) => {
      fn.call(store, action.data);
      store.emitChange();
    });
  });

  return store;
};
