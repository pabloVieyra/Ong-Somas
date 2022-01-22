import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ReactHtmlParser from 'react-html-parser';
import { Typography, Box } from '@mui/material';
import LoadSpinner from '../../CommonComponents/LoaderSpinner';
import { TableBody, TableRow, TableCell } from '@mui/material';
import Title from '../../Title/Title';
import style from '../../../Styles/NewsDetail/NewsDetail.module.css';
import { getNewsById } from '../../../Services/NewsService';
import newsImage from '../../../assets/img/newsBackG_S.jpg';
import LazyNewsCommentsList from '../Comments/LazyNewsCommentsList';

const NewsDetail = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [newsDetail, setNewsDetail] = useState({
    name: '',
    image: '',
    content: '',
  });

  const updateCurrentNews = () => {
    getNewsById(id).then((data) => setNewsDetail(data));
  };

  useEffect(() => {
    if (loading == true) {
      updateCurrentNews();
      setLoading(false);
    }
  }, [loading]);

  return (
    <div>
      {loading == true ? (
        <Box
          className={style.container}
          component="div"
          sx={{ justifyContent: 'center' }}>
          <TableBody>
            <TableRow
              style={{
                height: 'rowHeight' * 10,
              }}>
              <TableCell colSpan={3}>
                <LoadSpinner />
              </TableCell>
            </TableRow>
          </TableBody>
        </Box>
      ) : (
        <div>
          <Title imageUrl={newsImage} titleText={newsDetail.name} />
          <Box className={style.newsDetail__container} component="div">
            <Box className={style.newsDetail__content} component="div">
              <Typography component="p" variant="p">
                {ReactHtmlParser(newsDetail.content)}
              </Typography>
            </Box>
            <Box className={style.newsDetail__imageContainer} component="div">
              <img
                alt="imagen novedad"
                className={style.newsDetail__image}
                src={newsDetail.image}
              />
            </Box>
          </Box>
          <Box className={style.commentsTitle__container}>
            <Typography component="h2" variant="h3">
              ultimos comentarios
            </Typography>
          </Box>
          <LazyNewsCommentsList />
        </div>
      )}
    </div>
  );
};

export default NewsDetail;
