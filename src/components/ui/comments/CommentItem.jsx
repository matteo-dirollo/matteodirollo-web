import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers,
  getCurrentUserFromState,
  getUserById,
} from '../../../api/auth/authSlice';
import { Avatar, Box, Flex, Link, Text } from '@chakra-ui/react';
import { useEffect } from 'react';

const CommentItem = ({ comment, handleDelete }) => {
  const user = useSelector(state => getUserById(state, comment?.uid));
  const currentUser = getCurrentUserFromState();
  const isCurrentUserComment = currentUser && currentUser.uid === comment.uid;
  const dispatch = useDispatch();

  useEffect(() => {
    if (comment) {
      dispatch(fetchUsers());
    }
  }, [dispatch, comment]);
  
  
  return (
    <>
      <Flex alignItems="center">
        <Avatar
          size="sm"
          name={user ? user.displayName : ''}
          src={user ? user.photoURL : ''}
        />
        <Box ml={2}>
          <Text fontSize="sm" fontWeight="bold">
            {user ? user.displayName : ''}
          </Text>
          <Text fontSize={'xs'}>{comment.comment}</Text>
        </Box>
      </Flex>
      <Box ml={10}>
        {isCurrentUserComment ? (
          <Link
            as="button"
            type="submit"
            onClick={() => handleDelete(comment.id)}
            fontSize={'xs'}
          >
            Delete
          </Link>
        ) : null}
      </Box>
    </>
  );
};

export default CommentItem;
