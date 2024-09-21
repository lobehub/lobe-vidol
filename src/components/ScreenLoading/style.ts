import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  container: css`
    position: relative;

    #loading-screen {
      position: absolute;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;

      opacity: 1;
      background-color: #000;

      transition: 1s opacity;
    }

    #loading-screen.fade-out {
      opacity: 0;
    }

    #loading-screen.fade-in {
      opacity: 0;
    }

    #loader {
      position: relative;
      top: 50%;
      left: 50%;

      display: block;

      width: 150px;
      height: 150px;
      margin: -75px 0 0 -75px;

      border: 3px solid transparent;
      border-top-color: #9370db;
      border-radius: 50%;

      animation: spin 2s linear infinite;
    }

    #loader::before {
      content: '';

      position: absolute;
      inset: 5px;

      border: 3px solid transparent;
      border-top-color: #ba55d3;
      border-radius: 50%;

      animation: spin 3s linear infinite;
    }

    #loader::after {
      content: '';

      position: absolute;
      inset: 15px;

      border: 3px solid transparent;
      border-top-color: #f0f;
      border-radius: 50%;

      animation: spin 1.5s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  `,
}));
