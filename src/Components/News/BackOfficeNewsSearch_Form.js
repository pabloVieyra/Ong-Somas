import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { getAllNews, getNewsByKeyword } from '../../Services/NewsService';
import { useFormik } from 'formik';

function useDebounce(value, delay, formik) {
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

const BackOfficeNewsSearch_Form = ({ updateLoadingState, updateNewsList }) => {
  const formik = useFormik({
    initialValues: {
      value: '',
    },
  });

  const debouncedValue = useDebounce(formik.values.value, 500, formik);

  useEffect(() => {
    updateLoadingState(true);
    debouncedValue.length < 3
      ? getAllNews().then((res) => {
          updateNewsList(res), updateLoadingState(false);
        })
      : getNewsByKeyword(formik.values.value).then((res) => {
          updateNewsList(res), updateLoadingState(false);
        });
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
        label="Filtrar novedad"
        name="value"
        sx={{ width: '100%' }}
        value={formik.values.value}
        variant="outlined"
        onChange={formik.handleChange}
      />
    </div>
  );
};

export default BackOfficeNewsSearch_Form;
