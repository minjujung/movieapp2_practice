import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";



const globalStyles = createGlobalStyle`
    ${reset}
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    body {
        font-family: 'Play', sans-serif;
        font-size: 14px;
        font-weight: 300;
        background-color: rgba(20, 20, 20, 1);
        color: white;
        padding-top: 100px;
    }
`;

export default globalStyles;