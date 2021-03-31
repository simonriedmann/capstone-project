import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

:root {
    --grey-100: hsl(353, 1%, 97%);
    --grey-200: hsl(353, 10%, 85%);
    --grey-300: hsl(353, 10%, 40%);
    --grey-400: hsl(353, 10%, 25%);
    --grey-500: hsl(353, 10%, 10%);
  
    --primary-100: hsl(353,100%,96%);
    --primary-200: hsl(353,100%,85%);
    --primary-300: hsl(353, 28%, 36%);
    --primary-400: orange;
    --primary-500: hsl(353,100,10);
  
    --secondary-100: hsl(173,100%,96%);
    --secondary-200: hsl(173,100%,85%);
    --secondary-300: hsl(173,100%,72%);
    --secondary-400: hsl(173,100%,25%);
    --secondary-500: hsl(173,100%,10%);
  }


* {
    box-sizing: border-box;
}

body {
    font-family: sans-serif;
    font-size: 1.25rem;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;

    ;

    h1 {
        padding: 1rem;
        margin:0;
        padding: 0.5rem;
    }
}
`