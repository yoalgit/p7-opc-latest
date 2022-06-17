import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// API request config
import userService from "../services/userService";

// Components
import { Main } from "../utils/style/styles";
import ProfileUpdateForm from "../components/Profile/ProfileUpdateForm";
import CardBase from "../components/Shared/CardBase";
import Loader from "../components/Shared/Loader";
import DeleteButtonUser from "../components/Profile/DeleteButtonUser";
import { StyledButton } from "../utils/style/styles";
import UpdatePasswordModal from "../components/Profile/UpdatePasswordModal";

// Style
import styled from "styled-components";

const ProfileUpdateTitle = styled.h1`
  margin-bottom: 90px;
`;

const MainProfileUpdate = styled(Main)`
  button {
    width: 250px;
  }
`;

const ProfileUpdate = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [profile, setProfile] = useState(null);
  let { userId } = useParams();
  userId = parseInt(userId);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const response = await userService.getUser(userId);
        setProfile(response?.data?.user);
      } catch (error) {
        if (error.response?.status === "404") {
          setError("Oups! Le profil que vous cherchez n'existe pas.");
        } else {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [userId]);

  return (
    <MainProfileUpdate className="d-flex flex-column align-items-center py-3">
      <ProfileUpdateTitle>Modifier votre profil</ProfileUpdateTitle>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CardBase>
            <ProfileUpdateForm profile={profile} />
          </CardBase>
          <StyledButton
            onClick={() => setModalShow(true)}
            $outline
            className="rounded-pill"
          >
            Modifier mon mot de passe
          </StyledButton>
          <UpdatePasswordModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            setModalShow={setModalShow}
            userId={userId}
          />
          <DeleteButtonUser userId={userId} />
        </>
      )}
    </MainProfileUpdate>
  );
};

export default ProfileUpdate;
