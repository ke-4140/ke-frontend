import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import systemReducer from '../features/systemSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    system: systemReducer
  },
});
