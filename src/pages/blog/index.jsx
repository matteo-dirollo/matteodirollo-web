import {
    Box,
    Flex,
    Heading,
    Text,
    useColorModeValue,
    Center,
  } from '@chakra-ui/react';
  import React, { useEffect, useState } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { fetchPosts, getPostsStatus, selectAllPosts } from './postsSlice';
  import _ from 'lodash';
  import Pagination from '../../components/ui/buttons/Pagination';
import Link from 'next/link';

  const Blog = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getPostsStatus);
    const textColor = useColorModeValue('gray.700', 'gray.100');
  
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
  
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
  
    const paginate = pageNumber => setCurrentPage(pageNumber);
    
    useEffect(() => {
      if (postsStatus === 'idle') {
        dispatch(fetchPosts());
      }
    }, [postsStatus, dispatch]);
  
    const renderPosts = currentPosts.map(post => (
      <Box maxW="250px" m="5px" as="article" key={post.date}>
        <Link
          href={`/blog/${post.id}`}
          sx={{
            'a:hover': { textDecoration: 'none', color: 'green' },
          }}
        >
          <Text
            sx={{
              'p a:hover': { textDecoration: 'none', color: 'green' },
            }}
            as="b"
            fontSize="sm"
            color="purple.600"
          >
            {_.first(post.category)}
          </Text>
          <Heading fontSize="xl" color={textColor} as="h2" size="sm">
            {post.title}
          </Heading>
          <Text colorScheme={textColor} fontSize="xs">
            {new Date(
              post.date.seconds * 1000 + post.date.nanoseconds / 1000000
            ).toLocaleDateString()}
          </Text>
          <Box
            w="250px"
            h="250px"
            sx={{
              backgroundImage: `url(${post.imageUrl})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
            my={5}
          />
        </Link>
      </Box>
    ));
  
    return (
      <Box w="80%" marginX="auto" my={10} as="section">
        <Heading my={10} color={textColor}>
          Latest Projects
        </Heading>
        <Box w="100%" mx="0 auto" display="flex" justifyContent="center">
          <Flex
            maxW="intrinsic"
            mx="auto"
            flexWrap="wrap"
            justifySelf="stretch"
            justify="space-evenly"
            spacing="30px"
          >
            {renderPosts}
          </Flex>
        </Box>
        <Center>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
            active={currentPage}
          />
        </Center>
      </Box>
    );
  };
  
  export default Blog;


  // export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
  //   await store.dispatch(fetchPosts());
  // });
  
  
  