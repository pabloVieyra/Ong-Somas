import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { getAllNews, getNewsByKeyword } from '../../Services/NewsService';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      console.log(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const NewsSearch_Form = ({ updateNewsList, updateLoadingState }) => {
  const [keywords, setKeywords] = useState('');

  const handleChange = (e) => {
    setKeywords(e.target.value);
  };

  const debouncedValue = useDebounce(keywords, 500);

  useEffect(() => {
    updateLoadingState(true);
    if (debouncedValue.length < 3) {
      getAllNews().then((res) => {
        updateNewsList(res);
        updateLoadingState(false);
      });
    } else {
      getNewsByKeyword(keywords).then((res) => {
        updateNewsList(res);
        updateLoadingState(false);
      });
    }
  }, [debouncedValue]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '90%',
        margin: '0 auto',
      }}>
      <TextField
        autoComplete="off"
        label="Filtrar novedades..."
        sx={{ width: '100%' }}
        variant="outlined"
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};
