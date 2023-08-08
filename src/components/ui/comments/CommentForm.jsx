import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';
import { addComment, fetchComments } from '../../../pages/blog/postsSlice.js';
import {
  appLoaded,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../../../api/asyncSlice';
import { Button } from '@chakra-ui/react';
import TextareaInput from '../inputs/TextareaInput';

const CommentForm = ({ articleId }) => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    comment: Yup.string().required('Comment is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    dispatch(asyncActionStart());
    try {
      dispatch(addComment({ postId: articleId, comment: values.comment }));
      resetForm();
    } catch (error) {
      console.log(error);
        dispatch(asyncActionError());
    } finally {
      dispatch(fetchComments(articleId));
      setSubmitting(false);
        dispatch(asyncActionFinish());
        dispatch(appLoaded());
    }
  };

  return (
    <Formik
      initialValues={{ comment: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form>
          <TextareaInput name="comment" />
          <Button
            isLoading={isSubmitting}
            loadingText='Submitting'
            disabled={!isValid || !dirty || isSubmitting}
            type="submit"
            colorScheme="teal"
            my={5}
          >
            Add Comment
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CommentForm;
