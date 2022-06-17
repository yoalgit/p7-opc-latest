import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../../utils/style/colors";

const StyledLink = styled(Link)`
  font-size: ${(props) => (props.$type === "comment" ? "16px" : "1.2rem")};
  font-weight: bold;
  color: ${colors.primary};
  text-underline-offset: 2px;
  text-decoration-color: transparent;
  &:hover {
    color: inherit;
    text-decoration-color: inherit;
  }
`;

const AuthorLink = ({ firstname, lastname, userId, type }) => {
  return (
    <div className={type === "comment" ? "mb-0" : "mb-1"}>
      <StyledLink to={`/profile/${userId}`} $type={type}>
        {firstname} {lastname}
      </StyledLink>
    </div>
  );
};

export default AuthorLink;
