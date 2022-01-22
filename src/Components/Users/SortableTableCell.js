import { Box, TableCell, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import '../../Styles/TablesStyles.css';

const SortableTableCell = ({
  columnName,
  columnLabel,
  handleRequestSort,
  order,
  orderBy,
  align = 'left',
  responsive = 'false',
}) => {
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  return (
    <TableCell
      align={align}
      className={responsive ? 'customTableCol' : ''}
      sortDirection={orderBy === columnName ? order : false}>
      <TableSortLabel
        active={orderBy === columnName}
        direction={orderBy === columnName ? order : 'asc'}
        onClick={createSortHandler(columnName)}>
        {columnLabel}
        {orderBy === columnName ? (
          <Box component="span" sx={visuallyHidden}>
            {order === 'desc' ? 'ordenado descendente' : 'ordenado ascendente'}
          </Box>
        ) : null}
      </TableSortLabel>
    </TableCell>
  );
};

export default SortableTableCell;
