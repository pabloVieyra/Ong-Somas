import React from 'react';
import { useDispatch } from 'react-redux';
import {
  getAllCategories,
  filterCategoriesbyTerm,
} from '../../../features/categories/categoriesAsyncThunks';
import TextField from '@mui/material/TextField';
import style from '../../../Styles/Categories/CategoriesSearch/CategoriesSearchForm.module.css';

const CategoriesSearchForm = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    if (e.target.value.length > 2) {
      const searchTerm = e.target.value;

      dispatch(filterCategoriesbyTerm(searchTerm));
    } else {
      dispatch(getAllCategories());
    }
  };

  const debounceFn = (fn) => {
    let timeoutId;

    return function () {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const context = this;
      const args = arguments;

      timeoutId = setTimeout(() => {
        fn.apply(context, args);
      }, 500);
    };
  };

  const debouncedHandleChange = debounceFn(handleChange);

  return (
    <div className={style.searchBarContainer}>
      <TextField
        autoComplete="off"
        label="Filtrar categoría"
        sx={{ width: '100%' }}
        type="search"
        variant="outlined"
        onChange={debouncedHandleChange}
      />
    </div>
  );
};

export default CategoriesSearchForm;
