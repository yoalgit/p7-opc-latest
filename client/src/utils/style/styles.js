import styled, { css } from "styled-components";
import colors from "./colors";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import backgroundIcon from "../../assets/icon-light.svg";

const primaryColor = colors.primary;
const secondaryDarkColor = colors.secondaryDark;

export const MainCard = styled(Card)`
  max-width: ${(props) => (props.auth ? "900px" : "700px")};
`;

export const StyledButton = styled(Button)`
  text-decoration: none;
  min-width: ${(props) => !props.$submit && "180px"};
  max-width: ${(props) => props.$modal && "160px"};
  width: ${(props) => props.$submit && "45px"};
  height: ${(props) => (props.$submit ? "auto" : "45px")};
  color: ${(props) => props.$outline && "inherit"};
  background-color: ${(props) =>
    props.$outline ? "transparent" : primaryColor};
  background-color: ${(props) => props.$danger && secondaryDarkColor};
  border: 2px solid;
  border-color: ${(props) => (props.$outline ? primaryColor : "transparent")};
  &:hover {
    background-color: white;
    color: ${secondaryDarkColor};
    border-color: ${secondaryDarkColor};
    text-decoration: none;
  }
  &:focus {
    &:not(:hover) {
      background-color: ${(props) =>
        props.$outline ? "transparent" : primaryColor};
      border-color: ${primaryColor};
      color: ${(props) => props.$outline && primaryColor};
    }
  }
`;

export const LinkStyledButton = styled.button`
  border: none;
  background: transparent;
  color: ${(props) => (props.likedByUser ? secondaryDarkColor : "inherit")};
  &:hover {
    color: ${colors.secondaryDark};
    text-decoration: underline;
  }
`;

export const SendButton = styled(Button)`
  background-color: ${primaryColor};
  border-color: transparent;
  border-width: 2px;
  &:hover {
    background-color: transparent;
    border-color: ${secondaryDarkColor};
    color: ${secondaryDarkColor};
  }
`;

const backgroundPosition = css`
  background-position: bottom -80px right -80px;
  background-attachment: fixed;
  background-size: 300px auto;

  @media screen and (min-width: 768px) {
    background-size: 500px auto;
    background-position: bottom -190px right -150px;
  }
  @media screen and (min-width: 992px) {
    background-size: 650px auto;
    background-position: bottom -250px right -200px;
  }

  @media screen and (min-width: 1400px) {
    background-size: 750px auto;
    background-position: bottom -290px right -230px;
  }
`;

export const Main = styled.main`
  min-height: 90vh;
  background: url(${backgroundIcon}) no-repeat;
  ${backgroundPosition}
`;

export const MainAuth = styled(Main)`
  min-height: 100vh;
`;
