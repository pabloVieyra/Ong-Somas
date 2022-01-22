import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { getAllUsers, getUsersByKeyword } from '../../Services/userService';
import style from '../../Styles/Categories/CategoriesSearch/CategoriesSearchForm.module.css';

const UsersSearchForm = ({ setIsLoading, setUsersList }) => {
  const [keywords, setKeywords] = useState('');

  const handleChange = (e) => {
    setKeywords(e.target.value);
  };

  useEffect(() => {
    const handleSearch = async () => {
      const trimedInput = keywords.trim();

      setIsLoading(true);
      if (trimedInput.length > 2) {
        const response = await getUsersByKeyword(keywords);
        const newUserList = response.data;

        setUsersList(newUserList);
      } else {
        const response = await getAllUsers();
        const newUserList = response.data.data;

        setUsersList(newUserList);
      }
      setIsLoading(false);
    };
    const timeOutId = setTimeout(() => handleSearch(), 500);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [keywords]);

  return (
    <div className={style.searchBarContainer}>
      <TextField
        autoComplete="off"
        label="Filtrar usuario"
        sx={{ width: '100%' }}
        type="search"
        variant="outlined"
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default UsersSearchForm;
