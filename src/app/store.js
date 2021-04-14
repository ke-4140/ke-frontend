import { configureStore } from '@reduxjs/toolkit';
import systemReducer from '../features/systemSlice';

export default configureStore({
  reducer: {
    system: systemReducer
  },
});
