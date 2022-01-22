import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Button,
  Container,
  Toolbar,
  IconButton,
  Tooltip,
  Typography,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SortableTableCell from './SortableTableCell';
import LoadSpinner from '../CommonComponents/LoaderSpinner';
import { getAllUsers, deleteUsers } from '../../Services/userService';
import UsersSearchForm from './UsersSearchForm';
import { getItemName, listHasValues } from '../../Utils';
import { sortList } from '../../Utils/TablesUtils/sortingUtils';
import { StyledTableCell, StyledTableRow } from '../../Styles/TableStyles';
import s from '../../Styles/Categories/CategoriesList/Backoffice_ListCategories.module.css';
import { questionAlert } from '../../Services/alertsService';

const UsersListTable = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [usersList, setUsersList] = useState([]);
  const [sortedUsersList, setSortedUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const rowsPerPage = 10;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';

    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const emptyRowsToAvoidLayoutJump =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - usersList.length) : 0;

  const rowHeight = 53;

  const isLastItemOnPage = () => {
    const total = usersList.length - 1;
    const pages = total / rowsPerPage;

    return page === pages && page !== 0;
  };

  const deleteUser = async (id) => {
    const userResponse = await questionAlert(
      `¿Seguro que desea eliminar el usuario ${getItemName(id, usersList)}?`,
    );

    if (userResponse) {
      const response = await deleteUsers(id);

      if (response.data.success) {
        const newUsersList = usersList.filter((user) => user.id !== id);

        setUsersList(newUsersList);
      }
      if (isLastItemOnPage()) {
        setPage(page - 1);
      }
    }

    return;
  };

  useEffect(() => {
    const newSortedUsersList = sortList(
      usersList,
      page,
      rowsPerPage,
      order,
      orderBy,
    );

    setSortedUsersList(newSortedUsersList);
  }, [order, orderBy, page, usersList]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getAllUsers();
      const newUserList = response.data.data;

      setUsersList(newUserList);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className={s.listContainer}>
      <h1 style={{ textAlign: 'center' }}>Usuarios</h1>
      <UsersSearchForm
        setIsLoading={setIsLoading}
        setUsersList={setUsersList}
      />
      {!listHasValues(sortedUsersList) && !isLoading ? (
        <Alert
          severity="warning"
          sx={{ margin: '0 auto', justifyContent: 'center' }}>
          Usuario no encontrado!
        </Alert>
      ) : null}

      <Container sx={{ my: '1rem' }}>
        <Box>
          <Paper>
            <Toolbar sx={{ backgroundColor: '#e1e1e1' }}>
              <Typography
                className="customTableTitle"
                component="div"
                sx={{ mr: 'auto' }}
                variant="h6">
                Usuarios
              </Typography>
              <Button
                className="customTableBtn"
                component={Link}
                to="/backoffice/users/create"
                variant="contained">
                Nuevo Usuario
              </Button>
            </Toolbar>
            <TableContainer>
              <Table
                aria-labelledby="tableTitle"
                size="small"
                sx={{ maxWidth: 900 }}>
                <TableHead>
                  <TableRow>
                    <SortableTableCell
                      columnLabel="Nombre"
                      columnName="name"
                      handleRequestSort={handleRequestSort}
                      order={order}
                      orderBy={orderBy}
                      responsive={false}
                    />
                    <SortableTableCell
                      align="center"
                      columnLabel="Email"
                      columnName="email"
                      handleRequestSort={handleRequestSort}
                      order={order}
                      orderBy={orderBy}
                      responsive={true}
                    />
                    <TableCell align="right">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                {isLoading ? (
                  <TableBody>
                    <TableRow
                      style={{
                        height: rowHeight * 10,
                      }}>
                      <TableCell colSpan={3}>
                        <LoadSpinner />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <TableBody>
                    {sortedUsersList.map((row) => {
                      return (
                        <StyledTableRow key={row.id} hover tabIndex={-1}>
                          <StyledTableCell component="th" scope="row">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            className="customTableCol">
                            {row.email}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Tooltip title="Editar">
                              <IconButton
                                component={Link}
                                to={`/backoffice/users/edit/${row.id}`}
                                variant="contained">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Eliminar">
                              <IconButton onClick={() => deleteUser(row.id)}>
                                <DeleteIcon color="error" />
                              </IconButton>
                            </Tooltip>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                    {emptyRowsToAvoidLayoutJump > 0 && (
                      <TableRow
                        style={{
                          height: rowHeight * emptyRowsToAvoidLayoutJump,
                        }}>
                        <TableCell colSpan={3} />
                      </TableRow>
                    )}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            {!isLoading && (
              <TablePagination
                component="div"
                count={usersList.length}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10]}
                onPageChange={handleChangePage}
              />
            )}
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default UsersListTable;
