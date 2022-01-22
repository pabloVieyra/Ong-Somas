import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
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
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SortableTableCell from '../Users/SortableTableCell';
import LoadSpinner from '../CommonComponents/LoaderSpinner';
import { deleteTestimonial } from '../../Services/testimonialsService';
import { memberAvatarStyle } from '../../Styles/MembersList/MembersListInlineStyles';
import { getItemName, listHasValues } from '../../Utils';
import { sortList } from '../../Utils/TablesUtils/sortingUtils';
import { StyledTableCell, StyledTableRow } from '../../Styles/TableStyles';
import s from '../../Styles/Categories/CategoriesList/Backoffice_ListCategories.module.css';
import { getAllTestimonials } from '../../Services/testimonialsService';
import { questionAlert } from '../../Services/alertsService';

const TestimonialsListScreen = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [sortedTestimonialsList, setSortedTestimonialsList] = useState([]);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - testimonials.length) : 0;

  const rowHeight = 53;

  const isLastItemOnPage = () => {
    const total = testimonials.length - 1;
    const pages = total / rowsPerPage;

    return page === pages && page !== 0;
  };

  const deleteTestimonials = async (id) => {
    const userResponse = await questionAlert(
      `Deseas eliminar el testimonio de ${getItemName(id, testimonials)}`,
    );

    if (userResponse) {
      const response = await deleteTestimonial(id);

      if (response.data.success) {
        const newTestimonialsList = testimonials.filter(
          (testimonial) => testimonial.id !== id,
        );

        setTestimonials(newTestimonialsList);
      }
      if (isLastItemOnPage()) {
        setPage(page - 1);
      }
    }

    return;
  };

  useEffect(() => {
    const newSortedTestimonialsList = sortList(
      testimonials,
      page,
      rowsPerPage,
      order,
      orderBy,
    );

    setSortedTestimonialsList(newSortedTestimonialsList);
  }, [order, orderBy, page, testimonials]);

  const updateTestimonials = () => {
    setIsLoading(true);
    getAllTestimonials().then((response) => {
      setTestimonials(response.data.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    updateTestimonials();
  }, []);

  return (
    <div className={s.listContainer}>
      <h1 style={{ textAlign: 'center' }}>Testimonios</h1>
      {!listHasValues(sortedTestimonialsList) && !isLoading ? (
        <Alert
          severity="warning"
          sx={{ margin: '0 auto', justifyContent: 'center' }}>
          Testimonio no encontrado!
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
                Testimonios
              </Typography>
              <Button
                className="customTableBtn"
                component={Link}
                to="/backoffice/testimonials/create"
                variant="contained">
                Nuevo testimonio
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
                    <TableCell align="center" className="customTableCol">
                      Imagen
                    </TableCell>
                    <TableCell align="left" className="customTableCol">
                      Contenido
                    </TableCell>
                    <TableCell align="center">Acciones</TableCell>
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
                    {sortedTestimonialsList.map((row) => {
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
                            align="left"
                            className="customTableCol">
                            {ReactHtmlParser(row.description.substring(0, 60))}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Tooltip title="Editar">
                              <IconButton
                                component={Link}
                                to={`/backoffice/testimonials/edit/${row.id}`}
                                variant="contained">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Eliminar">
                              <IconButton
                                onClick={() => deleteTestimonials(row.id)}>
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
                count={testimonials.length}
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

export default TestimonialsListScreen;
