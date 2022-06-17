import styled from "styled-components";
import colors from "../../utils/style/colors";

// Component Styling
const SocialIcon = styled.i`
  color: ${colors.primary};
  &:hover {
    background: ${(props) => {
      switch (props.variant) {
        case "instagram":
          return "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%)";
        case "facebook":
          return "#3b5998";
        case "twitter":
          return "#1da1f2";
        case "linkedin":
          return "#0e76a8";
        default:
          return "inherit";
      }
    }};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: rgba(255, 255, 255, 0);
  }
`;

const SocialLink = ({ href, type }) => {
  return (
    <>
      <a href={href}>
        <SocialIcon
          variant={type}
          className={`fab fa-${type} fa-2x`}
          aria-hidden="true"
        ></SocialIcon>
        <span className="sr-only">{`Profil ${type}`}</span>
      </a>
    </>
  );
};

export default SocialLink;
