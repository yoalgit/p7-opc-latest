import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

// Return true if the user is the owner of the resource or if their role is authorized to delete the resource
const useCanDelete = (userId, roles) => {
  const [canEdit, setCanEdit] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    setCanEdit(
      currentUser.userId === userId || roles.includes(currentUser.role)
    );
  }, []);
  return canEdit;
};

export default useCanDelete;
