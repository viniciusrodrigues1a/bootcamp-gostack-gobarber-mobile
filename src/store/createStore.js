import { createStore, applyMiddleware, compose } from 'redux';

export default (reducers, middlewares) => {
  const enhancer =
    __DEV__ === 'development'
      ? compose(console.tron.createEnhancer(), applyMiddleware(...middlewares))
      : applyMiddleware(...middlewares);

  return createStore(reducers, enhancer);
};
