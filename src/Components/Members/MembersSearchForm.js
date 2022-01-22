import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import {
  getAllMembers,
  getMembersByKeyword,
} from '../../Services/membersService';

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

export const MembersSearchForm = ({
  updateMembersList,
  updateLoadingState,
}) => {
  const [keywords, setKeywords] = useState('');

  const handleChange = (e) => {
    setKeywords(e.target.value);
  };

  const debouncedValue = useDebounce(keywords, 500);

  useEffect(() => {
    updateLoadingState(true);
    if (debouncedValue.length < 3) {
      getAllMembers().then((res) => {
        updateMembersList(res);
        updateLoadingState(false);
      });
    } else {
      getMembersByKeyword(keywords).then((res) => {
        updateMembersList(res);
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
        label="Filtrar miembro..."
        sx={{ width: '100%' }}
        variant="outlined"
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};
