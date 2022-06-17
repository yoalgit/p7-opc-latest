import styled from "styled-components";

const ImageContainer = styled.div`
  max-width: 450px;
`;

const ArticleImage = ({ title, source }) => {
  return (
    <ImageContainer className="mx-auto mb-3">
      <img
        alt={`Illustration de l'article ${title}`}
        src={source}
        className="img-fluid"
      />
    </ImageContainer>
  );
};

export default ArticleImage;
