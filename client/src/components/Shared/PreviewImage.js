import { useState, useEffect } from "react";

// Components
import Loader from "./Loader";

// Style
import styled from "styled-components";

const StyledImage = styled.img`
  object-fit: ${(props) => props.$type === "profile" && "cover"};
  height: ${(props) => props.$type === "profile" && "130px"};
  width: ${(props) => props.$type === "profile" && "130px"};
  background-color: #fff;
`;

const PreviewImage = ({ file, src, type }) => {
  const [preview, setPreview] = useState(src);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result);
        setIsLoading(false);
      };
    }
  }, [file]);

  return (file || src) && !isLoading ? (
    <StyledImage
      $type={type}
      src={preview}
      alt="Aperçu"
      className={type === "article" && "img-fluid"}
    />
  ) : (
    <Loader />
  );
};

export default PreviewImage;
