import React from 'react';
import { Avatar, Tooltip, IconButton, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styles from '../../Styles/ScreenMembersListStyles';
import { StyledTableCell, StyledTableRow } from '../../Styles/TableStyles';
import '../../Styles/TablesStyles.css';

export const MemberRow = ({ id, name, image, deleteMember }) => {
  const matchesMobile = useMediaQuery('(min-width:430px)');

  return (
    <StyledTableRow key={id} hover tabIndex={-1}>
      <StyledTableCell align="left" component="th" scope="row">
        {name}
      </StyledTableCell>
      {matchesMobile && (
        <StyledTableCell align="center">
          <Avatar alt={name} src={image} sx={styles.avatar} />
        </StyledTableCell>
      )}
      <StyledTableCell align="right">
        <Tooltip title="Editar">
          <IconButton
            component={Link}
            to={`/backoffice/members/edit/${id}`}
            variant="contained">
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton onClick={() => deleteMember(id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default MemberRow;
