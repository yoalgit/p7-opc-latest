import styled from "styled-components";

const LabelStyled = styled.label`
  width: 130px;
  height: 130px;
  margin-top: -100px;
  position: relative;

  &::after {
    font: var(--fa-font-solid);
    content: "\f030";
    font-size: 40px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: hsla(208, 7%, 46%, 1);
    opacity: 0.8;
    transition: opacity 150ms;
  }
  &:hover::after {
    opacity: 0;
    transition: opacity 150ms;
  }
`;

const LabelImage = ({ children, htmlFor }) => {
  return (
    <>
      <LabelStyled
        htmlFor={htmlFor}
        className="d-inline-block rounded-circle overflow-hidden border border-2 border-dark bg-light"
      >
        {children}
      </LabelStyled>
    </>
  );
};

export default LabelImage;
