import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Box,
  Container,
  Divider,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Tag,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  fetchPosts,
  getPostsStatus,
  selectAllPosts,
} from "./postsSlice";
import { GoShare } from "react-icons/go";
import PlainEditor from "../../components/ui/lexicalEditor/PlainEditor";
import Link from "next/link";
import { useRouter } from "next/router";
import { LoadingSpinner } from '@/components/ui/loaders/LoadingSpinner';
import _ from "lodash";
import Comments from '../../components/ui/comments/Comments';
import { openModal } from '@/components/ui/modals/modalSlice';


const Post = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const textColor = useColorModeValue("gray.700", "gray.100");
  const [isLoaded, setIsLoaded] = useState(false);

  const router = useRouter();
  const { id: articleId } = router.query;

  const article = _.find(posts, { id: articleId });
  const comments = article?.comments ? Object.values(article.comments) : [];
  const [articleDescription, setArticleDescription] = useState("");
  const truncatedArticleDescription = _.truncate(articleDescription, {
    length: 150,
    omission: "...",
  });

  const tags = useMemo(
    () => _.filter(posts, (post) => post === article),
    [posts, article]
  );
  const cards = useMemo(
    () => _.filter(posts, (post) => post !== article),
    [posts, article]
  );

  const extractPlainText = useCallback((node) => {
    if (node && node.children) {
      return node.children.reduce((text, child) => {
        if (child.type === "text") {
          return text + child.text;
        } else if (child.children) {
          return text + extractPlainText(child);
        } else {
          return text;
        }
      }, "");
    }
    return "";
  }, []);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
    if (article) {
      dispatch(fetchComments(article.id));
      const parsedBody = JSON.parse(article.body);
      setArticleDescription(extractPlainText(parsedBody.root));
      setIsLoaded(true);
    }
  }, [postsStatus, dispatch, article, extractPlainText]);

  const renderPosts = _.slice(cards, 0, 3).map((card) => (
    <React.Fragment key={card.id}>
      <VStack
        className={`react-snap ${isLoaded ? "loaded" : ""}`}
        justify="start"
      >
        <Link
          href={`/blog/${card.id}`}
          sx={{ "a:hover": { textDecoration: "none" } }}
        >
          <Text
            mb="8px"
            color={textColor}
            fontSize="14px"
            sx={{ lineHeight: "1.5 !important", fontWeight: "bold" }}
          >



            {card.title}
          </Text>
          <Box
            boxSize="250px"
            sx={{
              backgroundImage: `url(${card.imageUrl})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
        </Link>
      </VStack>
    </React.Fragment>
  ));
  const renderTags = tags.map((tag, index) => {
    const categories = tag.category;
    const renderCategories = categories.map((category, index) => (
      <Tag key={index}>{category}</Tag>
    ));
    return <React.Fragment key={index}>{renderCategories}</React.Fragment>;
  });

  if (article) {
    return (
      <>
        <Container
          my={10}
          align="stretch"
          maxW={["fit-content", "80%"]}
          style={{ overflowX: "hidden" }}
          className={`react-snap ${isLoaded ? "loaded" : ""}`}
        >
          <Box as="article" key={article.id}>
            <Heading
              my={2}
              color={textColor}
              as="h1"
              size="2xl"
              lineHeight="120%"
            >
              {article.title}
            </Heading>
            <Text color={textColor} fontSize="xs">
              {article.author} | {_.first(article.category)} |{" "}
              {new Date(
                article.date.seconds * 1000 + article.date.nanoseconds / 1000000
              ).toLocaleDateString()}
            </Text>
            <Box
              w="100%"
              minH={"500"}
              sx={{
                backgroundImage: `url(${article.imageUrl})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              mt={5}
              mb={5}
            />
            <PlainEditor stateInstance={article.body} />
          </Box>

          <Divider my={10} />
          <HStack mb={50}>
            <IconButton
              aria-label=""
              borderRadius={"50%"}
              fontSize={"1.3em"}
              color={"white"}
              bg={"teal.400"}
              size="lg"
              icon={<GoShare />}
              onClick={() => {
                dispatch(openModal({ modalType: "ShareOnSocials" }));
              }}
              _hover={{
                bg: "yellow.300",
              }}
            />

            <Spacer />
            {renderTags}
          </HStack>

          <Comments articleId={article.id} comments={comments} />
          <br />

          {cards.length > 0 && (
            <Box>
              <Heading mb={5} as="h2" size="md">
                More Posts
              </Heading>
              <HStack mb={5}>{renderPosts}</HStack>
            </Box>
          )}
        </Container>
      </>
    );
  } else {
    return <LoadingSpinner />;
  }
};

export default Post;
