import { Dispatcher } from 'flux';

const dispatcher = new Dispatcher();
dispatcher
  .register(function (action) {
    console.log(action);
  });

export default dispatcher;
