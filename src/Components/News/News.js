import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Box,
  Toolbar,
  Typography,
  Tooltip,
  ListItemAvatar,
  Avatar,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { StyledTableCell, StyledTableRow } from '../../Styles/TableStyles';
import SortableTableCell from '../Users/SortableTableCell';
import { memberAvatarStyle } from '../../Styles/MembersList/MembersListInlineStyles';
import { getItemName, listHasValues, sliceDate } from '../../Utils';
import { sortList } from '../../Utils/TablesUtils/sortingUtils';
import { deleteNews } from '../../Services/NewsService';
import LoadSpinner from '../CommonComponents/LoaderSpinner';
import s from '../../Styles/Categories/CategoriesList/Backoffice_ListCategories.module.css';
import '../../Styles/TablesStyles.css';
import BackOfficeNewsSearch_Form from './BackOfficeNewsSearch_Form';
import { questionAlert } from '../../Services/alertsService';

function News() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [news, setNews] = useState([]);
  const [sortedNewsList, setSortedNewsList] = useState([]);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - news.length) : 0;

  const rowHeight = 53;

  const isLastItemOnPage = () => {
    const total = news.length - 1;
    const pages = total / rowsPerPage;

    return page === pages && page !== 0;
  };

  useEffect(() => {
    const newSortedUsersList = sortList(
      news,
      page,
      rowsPerPage,
      order,
      orderBy,
    );

    setSortedNewsList(newSortedUsersList);
  }, [order, orderBy, page, news]);

  const updateLoadingState = (loadingState) => {
    setIsLoading(loadingState);
  };

  const updateNewsList = (updatedNews) => {
    setNews(updatedNews);
  };

  const deleteNewsById = async (id) => {
    const userResponse = await questionAlert(
      `¿Seguro que desea eliminar la novedad ${getItemName(id, news)}?`,
    );

    if (userResponse) {
      deleteNews(id);
      const updatedNews = news.filter((news) => news.id !== id);

      if (isLastItemOnPage()) {
        setPage(page - 1);
      }

      setNews(updatedNews);
    }

    return;
  };

  return (
    <div className={s.listContainer}>
      <h1 style={{ textAlign: 'center' }}>Novedades</h1>
      <BackOfficeNewsSearch_Form
        updateLoadingState={updateLoadingState}
        updateNewsList={updateNewsList}
      />
      {!listHasValues(sortedNewsList) && !isLoading ? (
        <Alert
          severity="warning"
          sx={{
            margin: '0 auto',
            justifyContent: 'center',
            marginTop: '30px',
          }}>
          Novedad no encontrada!
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
                Novedades
              </Typography>
              <Button
                className="customTableBtn"
                component={Link}
                to="/backoffice/news/create"
                variant="contained">
                Nueva novedad
              </Button>
            </Toolbar>
            <TableContainer component={Paper}>
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
                    <TableCell align="center" className="customTableCol">
                      Imagen
                    </TableCell>
                    <TableCell align="center" className="customTableCol">
                      Creado
                    </TableCell>
                    <TableCell align="right">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                {isLoading ? (
                  <TableBody>
                    <TableRow
                      style={{
                        height: rowHeight * 10,
                      }}>
                      <TableCell colSpan={6}>
                        <LoadSpinner />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <TableBody>
                    {sortedNewsList.map((row) => {
                      return (
                        <StyledTableRow key={row.id} hover tabIndex={-1}>
                          <StyledTableCell component="th" scope="row">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            className="customTableCol">
                            <ListItemAvatar sx={{ marginTop: 0 }}>
                              <Avatar
                                alt={row.name}
                                src={row.image}
                                sx={memberAvatarStyle}
                              />
                            </ListItemAvatar>
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
                                to={`/backoffice/news/edit/${row.id}`}
                                variant="contained">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Eliminar">
                              <IconButton
                                onClick={() => deleteNewsById(row.id)}>
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
                count={news.length}
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
}
export default News;
