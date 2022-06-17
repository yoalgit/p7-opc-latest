import styled from "styled-components";

const sizes = {
  profile: "130px",
  article: "85px",
  comment: "40px",
};

const ImageContainer = styled.div`
  width: ${(props) => props.$size};
  height: ${(props) => props.$size};
  margin-top: ${(props) => props.$type === "profile" && "-100px"};
`;

const ProfilePic = ({ src, alt, type }) => {
  const size = sizes[type];
  return (
    <ImageContainer
      $size={size}
      $type={type}
      className="rounded-circle overflow-hidden bg-white"
    >
      <img src={src} alt={alt} className="img-fluid" />
    </ImageContainer>
  );
};

export default ProfilePic;
