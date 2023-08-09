import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import _ from 'lodash';
import { deleteComment } from '../../../pages/Blog/postsSlice';

const Comments = ({ articleId, comments }) => {
  const dispatch = useDispatch();
  const { authenticated } = useSelector(state => state.auth);

  const handleDelete = commentId => {
    try {
      dispatch(deleteComment({ postId: articleId, commentId }));
    } catch (error) {
      console.log(error);
    }
  };

  const sortedComments = _.orderBy(comments, 'timestamp', 'desc');

  const renderComments = sortedComments.map((comment, index) => {
    return (
      <Box key={index} mb={2}>
        <CommentItem comment={comment} handleDelete={handleDelete} />
      </Box>
    );
  });

  return (
    <Box>
      {(authenticated || comments.length > 0) && (
        <Heading my={5} as="h2" size="md">
          Comments
        </Heading>
      )}

      {authenticated && <CommentForm articleId={articleId} />}
      {comments.length > 0 ? renderComments : null}
    </Box>
  );
};

export default Comments;
