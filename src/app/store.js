import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import membersReducer from '../features/members/membersSlice';
import usReducer from '../features/us/usSlice';
import usersReducer from '../features/users/usersSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
export default configureStore({
  reducer: {
    counter: counterReducer,
    members: membersReducer,
    us: usReducer,
    users: usersReducer,
    categories: categoriesReducer,
  },
});
