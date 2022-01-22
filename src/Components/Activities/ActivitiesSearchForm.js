import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import style from '../../Styles/Categories/CategoriesSearch/CategoriesSearchForm.module.css';

import {
  getAllActivities,
  getActivitiesByKeyword,
} from '../../Services/activitiesService';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const ActivitiesSearchForm = ({
  updateActivitiesList,
  // updateLoadingState,
}) => {
  const [keywords, setKeywords] = useState('');

  const handleChange = (e) => {
    setKeywords(e.target.value);
  };

  const debouncedValue = useDebounce(keywords, 500);

  useEffect(() => {
    // updateLoadingState(true);
    if (debouncedValue.length < 3) {
      getAllActivities().then((res) => {
        updateActivitiesList(res);
        // updateLoadingState(false);
      });
    } else {
      getActivitiesByKeyword(keywords).then((res) => {
        updateActivitiesList(res);
        // updateLoadingState(false);
      });
    }
  }, [debouncedValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setKeywords(e.target.value);
  };

  return (
    <div className={style.searchBarContainer}>
      <TextField
        autoComplete="off"
        label="Filtrar actividad"
        sx={{ width: '100%' }}
        type="search"
        variant="outlined"
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default ActivitiesSearchForm;
