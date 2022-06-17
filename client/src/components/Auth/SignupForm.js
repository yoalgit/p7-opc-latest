import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Context
import { AuthContext } from "../../utils/context/AuthContext";

// Service
import authService from "../../services/authService";

// Components
import { Formik, Field, Form } from "formik";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FetchButton from "../Shared/FetchButton";

// Validation schema
import { signupSchema } from "../../utils/validation/signupSchema";

const SignupForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setRegistered] = useState(false);

  // Send registering request to API
  const signup = async (userData) => {
    try {
      setIsLoading(true);
      setRegistered(false);
      await authService.register(userData);
      setRegistered(true);
      const response = await authService.login({
        email: userData.email,
        password: userData.password,
      });
      if (response?.data?.token) {
        login(response.data);
        setTimeout(() => navigate("/home"), 2000);
      }
    } catch (err) {
      if (err.response?.status && err.response?.status === 400) {
        setError(err.response.data.message);
      } else if (!err.status) {
        setError("Oups, problème de réseau!");
      } else {
        setError("Oups! Veuillez réessayer plus tard.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        passwordConfirm: "",
      }}
      onSubmit={(values) => {
        const { passwordConfirm, ...userData } = values;
        signup(userData);
      }}
      validationSchema={signupSchema}
    >
      {(formik) => (
        <Form onClick={() => setError(null)}>
          <Row>
            {isRegistered && (
              <div className="text-success text-center py-2">
                Compte créé avec succès !
              </div>
            )}
            {error && (
              <div className="text-danger text-center py-2">{error}</div>
            )}
            <Col lg={6}>
              <div className="form-group">
                <label htmlFor="signupFirstName" className="mt-3">
                  Prénom
                </label>
                <Field
                  name="firstname"
                  id="signupFirstName"
                  className={
                    formik.touched.firstname && formik.errors.firstname
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  type="text"
                />
                {formik.touched.firstname && formik.errors.firstname ? (
                  <div className="invalid-feedback">
                    {formik.errors.firstname}
                  </div>
                ) : null}
              </div>
            </Col>

            <Col lg={6}>
              <div className="form-group">
                <label htmlFor="signupLastName" className="mt-3">
                  Nom
                </label>
                <Field
                  name="lastname"
                  id="signupLastName"
                  className={
                    formik.touched.lastname && formik.errors.lastname
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  type="text"
                />
                {formik.touched.lastname && formik.errors.lastname ? (
                  <div className="invalid-feedback">
                    {formik.errors.lastname}
                  </div>
                ) : null}
              </div>
            </Col>
          </Row>

          <div className="form-group">
            <label htmlFor="signupEmail" className="mt-3">
              Email
            </label>
            <Field
              name="email"
              id="signupEmail"
              className={
                formik.touched.email && formik.errors.email
                  ? "form-control is-invalid"
                  : "form-control"
              }
              type="text"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="invalid-feedback">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="signupPassword" className="mt-3">
              Mot de passe
            </label>
            <Field
              name="password"
              id="signupPassword"
              className={
                formik.touched.password && formik.errors.password
                  ? "form-control is-invalid"
                  : "form-control"
              }
              type="password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="invalid-feedback">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="signupPasswordConfirm" className="mt-3">
              Confirmation mot de passe
            </label>
            <Field
              name="passwordConfirm"
              id="signupPasswordConfirm"
              className={
                formik.touched.passwordConfirm && formik.errors.passwordConfirm
                  ? "form-control is-invalid"
                  : "form-control"
              }
              type="password"
            />
            {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
              <div className="invalid-feedback">
                {formik.errors.passwordConfirm}
              </div>
            ) : null}
          </div>

          <div className="form-group d-flex flex-column align-items-center">
            <FetchButton
              type="submit"
              isLoading={isLoading}
              loaderType="button"
              className="btn btn-primary mt-3 rounded-pill"
            >
              S'inscrire
            </FetchButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
