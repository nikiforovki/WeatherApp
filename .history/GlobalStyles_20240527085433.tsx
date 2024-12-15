import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'YourFontName';
    src: url('../public/helveticaneue-medium.otf') format('otf'),
         url('../public/helveticaneue-medium.otf') format('otf');
    font-weight: normal;
    font-style: normal;
  }

  :root {
    --header-background-color: #fdfdfd;
    --header-text-color: rgba(110, 108, 108, 0);

    --ParentComponent-background-color: rgba(247, 247, 247, 0);
    --ParentComponent-text-color: #101010;

    --body-background: white;
    --body-color: black;

    --app-background-color: #ffffff;

    --modal_content-background-color: #fdfdfd;
    --modal_content-border-color: white;

    --title-color: black;

    --input-border-color: #6c63ff (--textAlert-background-color: black);

    --tasksStat-border-color: #6c63ff;
    --taskItem-border-color: #6c63ff;

    --TaskStatusLeftBlock-color: #6c63ff;

    --taskItem-color: #6c63ff;
  }

  [data-theme='dark'] {
    --header-background-color: rgba(16, 16, 16, 0.86);
    --header-text-color: #ffffff;

    --ParentComponent-background-color: rgb(37, 37, 37);
    --ParentComponent-text-color: #ffffff;

    --app-background-color: rgb(37, 37, 37);

    --modal_content-background-color: #252525;
    --modal_content-border-color: white;

    --title-color: #fdfdfd;

    --input-border-color: #ffffff (--textAlert-background-color: #fdfdfd);

    --tasksStat-border-color: rgb(108, 99, 255);
    --taskItem-border-color: rgba(253, 253, 253, 0.97);

    --TaskStatusLeftBlock-color: #6c63ff;
    --taskItem-color: #ffffff;

    --taskDisplays-color: #6e6c6c;
  }

  [data-theme='light'] {
    --header-background-color: rgb(247, 247, 247);
    --header-text-color: #101010;

    --ParentComponent-background-color: rgb(253, 253, 253);
    --ParentComponent-text-color: #101010;

    --app-background-color: rgb(253, 253, 253);

    --modal_content-background-color: #f7f7f7;
    --modal_content-border-color: #6c63ff;

    --title-color: #101010;

    --input-border-color: #6c63ff (--textAlert-background-color: #fdfdfd);

    --tasksStat-border-color: rgb(108, 99, 255);
    --taskItem-border-color: rgb(108, 99, 255);

    --tasksStat-color: #6c63ff;
    --taskItem-color: #101010;

    --taskDisplays-color: #6c63ff;
  }

 .App {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: var(--app-background-color);
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyles;
