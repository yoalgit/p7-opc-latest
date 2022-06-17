import { StyledButton } from "../../utils/style/styles";
import Loader from "./Loader";

const FetchButton = ({ children, isLoading, loaderType, ...otherProps }) => {
  return (
    <StyledButton {...otherProps} disabled={isLoading}>
      {isLoading ? <Loader loaderType={loaderType} /> : children}
    </StyledButton>
  );
};

export default FetchButton;
