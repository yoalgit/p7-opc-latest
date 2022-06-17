import { useState } from "react";

// Components
import { StyledButton } from "../../utils/style/styles";
import DeleteConfirmation from "../Shared/DeleteConfirmation";

const DeleteButtonUser = ({ userId }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <StyledButton
        onClick={() => setModalShow(true)}
        $danger
        className="rounded-pill my-2"
      >
        Supprimer ce compte
      </StyledButton>
      <DeleteConfirmation
        show={modalShow}
        onHide={() => setModalShow(false)}
        componentToDelete={"user"}
        userId={userId}
      />
    </>
  );
};

export default DeleteButtonUser;
