import { useState } from "react";

// Service
import commentService from "../../services/commentService";

// Components
import { Formik, Field, Form } from "formik";
import FetchButton from "../Shared/FetchButton";

// Validation schema
import { commentSchema } from "../../utils/validation/commentSchema";

const AddComment = ({
  articleId,
  setCommentRefresh,
  setCommentsCount,
  commentsCount,
}) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const postComment = async ({ content }) => {
    try {
      setIsLoading(true);
      await commentService.addComment(articleId, { content });
      // Refresh comments list and toggle list if previously closed
      setCommentRefresh(true);
      setCommentsCount(commentsCount + 1);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ content: "" }}
      onSubmit={(values, { resetForm }) => {
        postComment(values);
        resetForm();
      }}
      validateOnBlur={false}
      validationSchema={commentSchema}
    >
      {(formik, isSubmitting) => (
        <Form className="mt-3 d-flex">
          <div className="form-group w-100 me-2">
            <label htmlFor={`commentInput-${articleId}`} className="sr-only">
              Ajouter un commentaire
            </label>
            <Field
              name="content"
              id={`commentInput-${articleId}`}
              className={
                formik.touched.content && formik.errors.content
                  ? "form-control is-invalid bg-light"
                  : "form-control bg-light "
              }
              placeholder="Laisser un commentaire..."
              as="textarea"
              maxLength="400"
            />

            {formik.touched.content && formik.errors.content ? (
              <div className="invalid-feedback">{formik.errors.content}</div>
            ) : null}
            {error && <div className="invalid-feedback">{error}</div>}
          </div>

          <FetchButton
            isLoading={isLoading}
            loaderType="button"
            $submit
            $outline
            type="submit"
          >
            <span className="sr-only">Envoyer le commentaire</span>
            <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
          </FetchButton>
        </Form>
      )}
    </Formik>
  );
};

export default AddComment;
