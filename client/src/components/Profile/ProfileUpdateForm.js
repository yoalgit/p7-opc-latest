import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import { Formik, Field, Form } from "formik";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FetchButton from "../Shared/FetchButton";
import PreviewImage from "../Shared/PreviewImage";
import LabelImage from "./LabelImage";

// Services and helpers
import userService from "../../services/userService";
import { dataFormatter } from "../../utils/helpers/dataFormatter";

// Validation schema
import { userSchema } from "../../utils/validation/userSchema";

const ProfileForm = ({ profile }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const updateUser = async (values) => {
    try {
      setIsLoading(true);
      // Formatting data if an image is attached
      const isMultipart = values?.profilePic ? true : false;
      const data = dataFormatter(values, isMultipart);
      await userService.updateUser(profile.id, data, isMultipart);
      navigate(`/profile/${profile.id}`);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fileRef = useRef(null);
  return (
    <Formik
      initialValues={{
        firstname: profile.firstname,
        lastname: profile.lastname,
        bio: profile.bio ? profile.bio : "",
        linkedinProfile: profile.linkedinProfile ? profile.linkedinProfile : "",
        twitterProfile: profile.twitterProfile ? profile.twitterProfile : "",
        facebookProfile: profile.facebookProfile ? profile.facebookProfile : "",
        instagramProfile: profile.instagramProfile
          ? profile.instagramProfile
          : "",
        profilePic: null,
      }}
      onSubmit={(values) => {
        updateUser(values);
      }}
      validationSchema={userSchema}
    >
      {(formik) => (
        <Form className="pt-2 d-flex flex-column">
          <div className="form-group text-center align-self-center position-relative">
            <LabelImage htmlFor="profilePic">
              <PreviewImage
                src={profile.profilePic}
                file={formik.values.profilePic}
                type={"profile"}
              />
              <span className="sr-only">Changer de photo de profil</span>
            </LabelImage>
            <input
              ref={fileRef}
              id="profilePic"
              name="profilePic"
              type="file"
              onChange={(event) => {
                formik.setFieldValue("profilePic", event.target.files[0]);
              }}
              className={
                formik.touched.profilePic && formik.errors.profilePic
                  ? "form-control is-invalid visually-hidden"
                  : "form-control visually-hidden"
              }
            />

            {formik.touched.profilePic && formik.errors.profilePic ? (
              <div className="invalid-feedback">{formik.errors.profilePic}</div>
            ) : null}
          </div>
          <Row>
            <Col md={6}>
              <div className="form-group">
                <label htmlFor="profileFirstName" className="mt-3">
                  Prénom
                </label>
                <Field
                  name="firstname"
                  id="profileFirstName"
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

            <Col md={6}>
              <div className="form-group">
                <label htmlFor="profileLastName" className="mt-3">
                  Nom
                </label>
                <Field
                  name="lastname"
                  id="profileLastName"
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
            <label htmlFor="profileBio" className="mt-3">
              Bio
            </label>
            <Field
              name="bio"
              id="profileBio"
              className={
                formik.touched.bio && formik.errors.bio
                  ? "form-control is-invalid"
                  : "form-control"
              }
              as="textarea"
            />
            {formik.touched.bio && formik.errors.bio ? (
              <div className="invalid-feedback">{formik.errors.bio}</div>
            ) : null}
          </div>

          <Row>
            <Col md={6}>
              <div className="form-group">
                <label htmlFor="linkedinProfile" className="mt-3">
                  Linkedin
                </label>
                <Field
                  name="linkedinProfile"
                  id="linkedinProfile"
                  className={
                    formik.touched.linkedinProfile &&
                    formik.errors.linkedinProfile
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  type="text"
                />
                {formik.touched.linkedinProfile &&
                formik.errors.linkedinProfile ? (
                  <div className="invalid-feedback">
                    {formik.errors.linkedinProfile}
                  </div>
                ) : null}
              </div>
            </Col>

            <Col md={6}>
              <div className="form-group">
                <label htmlFor="twitterProfile" className="mt-3">
                  Twitter
                </label>
                <Field
                  name="twitterProfile"
                  id="twitterProfile"
                  className={
                    formik.touched.twitterProfile &&
                    formik.errors.twitterProfile
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  type="text"
                />
                {formik.touched.twitterProfile &&
                formik.errors.twitterProfile ? (
                  <div className="invalid-feedback">
                    {formik.errors.twitterProfile}
                  </div>
                ) : null}
              </div>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <div className="form-group">
                <label htmlFor="facebookProfile" className="mt-3">
                  Facebook
                </label>
                <Field
                  name="facebookProfile"
                  id="facebookProfile"
                  className={
                    formik.touched.facebookProfile &&
                    formik.errors.facebookProfile
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  type="text"
                />
                {formik.touched.facebookProfile &&
                formik.errors.facebookProfile ? (
                  <div className="invalid-feedback">
                    {formik.errors.facebookProfile}
                  </div>
                ) : null}
              </div>
            </Col>

            <Col md={6}>
              <div className="form-group">
                <label htmlFor="instagramProfile" className="mt-3">
                  Instagram
                </label>
                <Field
                  name="instagramProfile"
                  id="instagramProfile"
                  className={
                    formik.touched.instagramProfile &&
                    formik.errors.instagramProfile
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  type="text"
                />
                {formik.touched.instagramProfile &&
                formik.errors.instagramProfile ? (
                  <div className="invalid-feedback">
                    {formik.errors.instagramProfile}
                  </div>
                ) : null}
              </div>
            </Col>
          </Row>
          {error && <div className="text-danger text-center py-2">{error}</div>}
          <div className="form-group d-flex flex-column align-items-center">
            <FetchButton
              type="submit"
              isLoading={isLoading}
              loaderType="button"
              className="btn btn-primary rounded-pill my-2"
            >
              Confirmer les modifications
            </FetchButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileForm;
