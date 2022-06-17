import { useState } from "react";

// Components
import { Formik, Field, Form } from "formik";
import FetchButton from "../Shared/FetchButton";

// Services and helpers
import userService from "../../services/userService";

// Validation schema
import { passwordSchema } from "../../utils/validation/passwordSchema";

const UpdatePasswordForm = ({ setModalShow, userId }) => {
  const [error, setError] = useState(null);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      await userService.updateUserPassword(userId, values);
      setPasswordUpdated(true);
      setTimeout(() => setModalShow(false), 2000);
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Oups! Veuillez réessayer plus tard");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        oldPassword: "",
        updatedPassword: "",
        updatedPasswordConfirm: "",
      }}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
      validationSchema={passwordSchema}
    >
      {(formik, isSubmitting) => (
        <Form onClick={() => setError(null)}>
          {passwordUpdated && (
            <div className="text-success text-center py-2">
              Votre mot de passe a été modifié !
            </div>
          )}
          {error && <div className="text-danger text-center py-2">{error}</div>}
          <div className="form-group">
            <label htmlFor="oldPassword">Mot de passe actuel</label>
            <Field
              name="oldPassword"
              id="oldPassword"
              className={
                formik.touched.oldPassword && formik.errors.oldPassword
                  ? "form-control is-invalid"
                  : "form-control"
              }
              type="password"
            />
            {formik.touched.oldPassword && formik.errors.oldPassword ? (
              <div className="invalid-feedback">
                {formik.errors.oldPassword}
              </div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="updatedPassword" className="mt-3">
              Nouveau mot de passe
            </label>
            <Field
              name="updatedPassword"
              id="updatedPassword"
              className={
                formik.touched.updatedPassword && formik.errors.updatedPassword
                  ? "form-control is-invalid"
                  : "form-control"
              }
              type="password"
            />
            {formik.touched.updatedPassword && formik.errors.updatedPassword ? (
              <div className="invalid-feedback">
                {formik.errors.updatedPassword}
              </div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="updatedPasswordConfirm" className="mt-3">
              Confirmation nouveau mot de passe
            </label>
            <Field
              name="updatedPasswordConfirm"
              id="updatedPasswordConfirm"
              className={
                formik.touched.updatedPasswordConfirm &&
                formik.errors.updatedPasswordConfirm
                  ? "form-control is-invalid"
                  : "form-control"
              }
              type="password"
            />
            {formik.touched.updatedPasswordConfirm &&
            formik.errors.updatedPasswordConfirm ? (
              <div className="invalid-feedback">
                {formik.errors.updatedPasswordConfirm}
              </div>
            ) : null}
          </div>

          <div className="form-group d-flex flex-column align-items-center">
            <FetchButton
              type="submit"
              isLoading={isLoading}
              loaderType="button"
              className="btn btn-primary mt-4 rounded-pill mb-2"
            >
              Envoyer
            </FetchButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdatePasswordForm;
