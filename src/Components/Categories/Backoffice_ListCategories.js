import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  TableCell,
  IconButton,
  Tooltip,
  TablePagination,
} from '@mui/material';
import CategoriesSearchForm from './SearchForm/CategoriesSearchForm';
import {
  getAllCategories,
  deleteCategorybyId,
} from '../../features/categories/categoriesAsyncThunks';
import SortableTableCell from '../Users/SortableTableCell';
import { getItemName, listHasValues, sliceDate } from '../../Utils';
import { sortList } from '../../Utils/TablesUtils/sortingUtils';
import style from '../../Styles/Categories/CategoriesList/Backoffice_ListCategories.module.css';
import { StyledTableCell, StyledTableRow } from '../../Styles/TableStyles';
import LoadSpinner from '../CommonComponents/LoaderSpinner';
import '../../Styles/TablesStyles.css';
import { questionAlert } from '../../Services/alertsService';

const Backoffice_ListCategories = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);
  const [categoriesList, setCategoriesList] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [sortedUsersList, setSortedUsersList] = useState([]);
  const [page, setPage] = useState(0);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categories.length) : 0;

  const rowHeight = 53;

  const isLastItemOnPage = () => {
    const total = categories.length - 1;
    const pages = total / rowsPerPage;

    return page === pages && page !== 0;
  };

  const deletecategory = async (id) => {
    const userResponse = await questionAlert(
      `¿Seguro que desea eliminar categoría ${getItemName(id, categories)}?`,
    );

    if (userResponse) {
      dispatch(deleteCategorybyId(id));
      const updatedCategories = categoriesList.filter(
        (activity) => activity.id !== id,
      );

      if (isLastItemOnPage()) {
        setPage(page - 1);
      }

      setCategoriesList(updatedCategories);
    }

    return;
  };

  const updateCategoriesList = () => {
    setCategoriesList([...categories]);
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    if (!loading) {
      updateCategoriesList();
    }
  }, [loading]);

  useEffect(() => {
    setTimeout(() => {
      const newSortedUsersList = sortList(
        categoriesList,
        page,
        rowsPerPage,
        order,
        orderBy,
      );

      setSortedUsersList(newSortedUsersList);
    });
  }, [order, orderBy, page, categoriesList]);

  return (
    <div className={style.listContainer}>
      <h1 style={{ textAlign: 'center' }}>Categorías</h1>
      <CategoriesSearchForm />
      {!listHasValues(categories) && categories !== null ? (
        <Alert
          severity="warning"
          sx={{ margin: '0 auto', justifyContent: 'center' }}>
          Categoría no encontrada!
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
                Categorías
              </Typography>
              <Button
                className="customTableBtn"
                component={Link}
                to={`/backoffice/categories/create`}
                variant="contained">
                Nueva categoría
              </Button>
            </Toolbar>
            <TableContainer>
              <Table
                aria-label="tableTitle"
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
                    <TableCell align="center" className="customTableCol">
                      Creado
                    </TableCell>
                    <TableCell align="right">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                {loading ? (
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
                    {sortedUsersList?.map((row) => (
                      <StyledTableRow
                        key={row.id}
                        hover
                        sx={{ height: '3px' }}
                        tabIndex={-1}>
                        <StyledTableCell
                          align="left"
                          component="th"
                          scope="row">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="customTableCol">
                          {sliceDate(row.created_at)}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Tooltip title="Editar">
                            <IconButton
                              component={Link}
                              to={`/backoffice/categories/edit/${row.id}`}
                              variant="contained">
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar">
                            <IconButton onClick={() => deletecategory(row.id)}>
                              <DeleteIcon color="error" />
                            </IconButton>
                          </Tooltip>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
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
            {!loading && (
              <TablePagination
                component="div"
                count={categories?.length}
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
//

export default Backoffice_ListCategories;
