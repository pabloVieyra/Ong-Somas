import React, { useEffect, useState } from 'react';
import { getAllComments } from '../../../Services/commentsService';
import NewsCommentCard from './NewsCommentCard';
import style from '../../../Styles/NewsComments/NewsComments.module.css';
import CommentSkeleton from './CommentSkeleton';

const NewsCommentsList = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(comments.length - 3, comments.length);

  const getComments = () => {
    setLoading(true);
    getAllComments()
      .then((data) => {
        setComments(data.slice(data.length - 3, data.length));
        setLoading(false);
      })
      .catch((err) => {
        setComments(null);

        return;
      });
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className={style.commentsContainer}>
      {loading ? (
        <div className={style.skeletonContainer}>
          <CommentSkeleton />
          <CommentSkeleton />
        </div>
      ) : (
        comments.map((comment) => (
          <NewsCommentCard key={comment.id} comment={comment} />
        ))
      )}
    </div>
  );
};

export default NewsCommentsList;
