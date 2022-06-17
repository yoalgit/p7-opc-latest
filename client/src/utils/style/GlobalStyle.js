import { createGlobalStyle } from "styled-components";
import colors from "./colors";

const StyledGlobalStyle = createGlobalStyle`

body {
  min-height: 100vh;
  font-family: "TruenoLight", Arial, Helvetica, sans-serif;
  color: ${colors.primary};
}

h1 {
  text-align: center;
  margin-top : 50px;
}

h2 {
  font-size: 1.4em;
  font-weight: 600;
}
h3 {
  font-size: 1.1em;
  font-weight: 600;
}

i {
  padding-right: 5px;
}

label {
  &:hover {
    cursor: pointer;
  }
}
`;

function GlobalStyle() {
  return <StyledGlobalStyle />;
}

export default GlobalStyle;
