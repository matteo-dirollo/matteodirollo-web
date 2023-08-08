import React from 'react';
import { Box, Button } from '@chakra-ui/react';

const Pagination = ({ postsPerPage, totalPosts, paginate, active }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Box>
      {pageNumbers.map(number => (
        <Button
          className={number}
          variant={active === number ? 'outline' : 'solid'}
          key={number}
          mx={1}
          onClick={e => {
            paginate(number);
          }}
        >
          {number}
        </Button>
      ))}
    </Box>
  );
};

export default Pagination;
