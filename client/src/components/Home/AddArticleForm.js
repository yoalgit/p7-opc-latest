import { useState } from "react";
import styled from "styled-components";

import { Formik, Field, Form } from "formik";
import FetchButton from "../Shared/FetchButton";
import PreviewImage from "../Shared/PreviewImage";

import articleService from "../../services/articleService";
import { dataFormatter } from "../../utils/helpers/dataFormatter";

import { articleSchema } from "../../utils/validation/articleSchema";

const Container = styled.div`
  max-width: 400px;
`;

const AddArticleForm = ({ setModalShow, setArticleListEdited }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const postArticle = async (values) => {
    try {
      setIsLoading(true);
      // Data formatting if image
      const isMultipart = values?.image ? true : false;
      const data = dataFormatter(values, isMultipart);
      await articleService.addArticle(data, isMultipart);
      // Trigger ArticleList refresh
      setArticleListEdited(true);
      setModalShow(false);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ title: "", content: "", image: null }}
      onSubmit={(values, { setSubmitting }) => {
        postArticle(values);
      }}
      validationSchema={articleSchema}
    >
      {(formik, isSubmitting) => (
        <Form>
          {error && <div className="text-danger text-center py-2">{error}</div>}
          <div className="form-group">
            <label htmlFor="articleTitle">Titre</label>
            <Field
              name="title"
              id="articleTitle"
              className={
                formik.touched.title && formik.errors.title
                  ? "form-control is-invalid"
                  : "form-control"
              }
              type="text"
              onClick={() => setError(null)}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="invalid-feedback">{formik.errors.title}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="articleContent" className="mt-3">
              Contenu
            </label>
            <Field
              name="content"
              id="articleContent"
              className={
                formik.touched.content && formik.errors.content
                  ? "form-control is-invalid"
                  : "form-control"
              }
              as="textarea"
              onClick={() => setError(null)}
            />
            {formik.touched.content && formik.errors.content ? (
              <div className="invalid-feedback">{formik.errors.content}</div>
            ) : null}
            {formik.values.image && (
              <Container className="w-100 mt-4 mx-auto d-flex align-items-center">
                <PreviewImage file={formik.values.image} type={"article"} />
              </Container>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="articleImage" className="mt-3">
              Image <small>(option)</small>
            </label>

            <input
              id="articleImage"
              name="image"
              type="file"
              onChange={(event) => {
                formik.setFieldValue("image", event.target.files[0]);
              }}
              className={
                formik.touched.image && formik.errors.image
                  ? "form-control is-invalid"
                  : "form-control"
              }
            />

            {formik.touched.image && formik.errors.image ? (
              <div className="invalid-feedback">{formik.errors.image}</div>
            ) : null}
          </div>

          <div className="form-group d-flex flex-column align-items-center">
            <FetchButton
              type="submit"
              isLoading={isLoading}
              loaderType="button"
              className="btn btn-primary mt-4 rounded-pill mb-2"
            >
              Publier
            </FetchButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddArticleForm;
