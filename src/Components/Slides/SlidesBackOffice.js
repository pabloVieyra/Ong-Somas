import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Table,
  Container,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  TableCell,
  TablePagination,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  StyledTableCell,
  StyledTableRow,
} from '../../Utils/SlidesBackOfficeStyled';
import SortableTableCell from '../Users/SortableTableCell';
import s from '../../Styles/Categories/CategoriesList/Backoffice_ListCategories.module.css';
import { getAllSlides, deleteSlide } from '../../Services/slidesService';
import { sortList } from '../../Utils/TablesUtils/sortingUtils';

function SlidesBackOffice() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [slides, setSlides] = useState([]);
  const [sortedSlidesList, setSortedSlidesList] = useState([]);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - slides.length) : 0;

  const rowHeight = 53;

  const isLastItemOnPage = () => {
    const total = slides.length - 1;
    const pages = total / rowsPerPage;

    return page === pages && page !== 0;
  };

  useEffect(() => {
    const newSortedSlidesList = sortList(
      slides,
      page,
      rowsPerPage,
      order,
      orderBy,
    );

    setSortedSlidesList(newSortedSlidesList);
  }, [order, orderBy, page, slides]);

  useEffect(() => {
    setIsLoading(true);
    getAllSlides().then((res) => {
      setSlides(res.data);
      setIsLoading(false);
    });
  }, []);

  const deleteSlide = (row) => {
    const filterArray = slides.filter((slide) => slide.id !== row.id);

    if (isLastItemOnPage()) {
      setPage(page - 1);
    }

    return setSlides(filterArray);
  };

  return (
    <div className={s.listContainer}>
      <h1 style={{ textAlign: 'center' }}>Slides</h1>
      <Container sx={{ my: '1rem' }}>
        <Box>
          <Paper>
            <Toolbar sx={{ backgroundColor: '#e1e1e1' }}>
              <Typography
                className="customTableTitle"
                component="div"
                sx={{ mr: 'auto' }}
                variant="h6">
                Slides
              </Typography>
              <Button
                className="customTableBtn"
                component={Link}
                to="/backoffice/slides/create"
                variant="contained">
                Nuevo slide
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
                      columnLabel="Titulo"
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
                      Orden
                    </TableCell>
                    <TableCell align="right">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedSlidesList.map((row) => (
                    <StyledTableRow key={row.id} hover tabIndex={-1}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        className="customTableCol">
                        <Avatar
                          alt={name}
                          src={row.image}
                          sx={{ width: 75, height: 75, margin: '0 auto' }}
                        />
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        className="customTableCol">
                        {row.order}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Tooltip title="Editar">
                          <IconButton
                            component={Link}
                            to={`/backoffice/slides/edit/${row.id}`}
                            variant="contained">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                          <IconButton onClick={() => console.log(row.id)}>
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
              </Table>
            </TableContainer>
            {!isLoading && (
              <TablePagination
                component="div"
                count={slides.length}
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

export default SlidesBackOffice;
