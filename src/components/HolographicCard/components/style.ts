import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, cx }) => {
  const perf = css`
    will-change: transform, opacity, background-image, background-size, background-position,
      background-blend-mode, filter;
  `;

  const shadow = css`
    box-shadow:
      rgba(255, 255, 255, 10%) 0 1px 1px 0 inset,
      rgba(50, 50, 93, 25%) 0 50px 100px -20px,
      rgba(0, 0, 0, 30%) 0 30px 60px -30px;
    transition:
      box-shadow 0.4s ease,
      opacity 0.33s ease-out;
  `;

  const view = css`
    pointer-events: none;

    transform-style: preserve-3d;

    overflow: hidden;
    grid-area: 1/1;

    aspect-ratio: var(--card-aspect);
    width: 100%;

    border-radius: var(--card-radius);

    image-rendering: optimizequality;
  `;

  return {
    active: cx(shadow),

    back: css`
      background-color: var(--card-back);
      transform: rotateY(180deg) translateZ(1px);
      backface-visibility: visible;

      ${view}
    `,
    backLoading: css`
      transform: rotateY(0deg);
    `,
    container: css`
      --card-radius: 4.55% / 3.5%;
      --card-back: hsl(220deg, 52%, 6%);
      --sunpillar-1: hsl(2deg, 100%, 73%);
      --sunpillar-2: hsl(53deg, 100%, 69%);
      --sunpillar-3: hsl(93deg, 100%, 69%);
      --sunpillar-4: hsl(176deg, 100%, 76%);
      --sunpillar-5: hsl(228deg, 100%, 74%);
      --sunpillar-6: hsl(283deg, 100%, 73%);
      --sunpillar-clr-1: var(--sunpillar-1);
      --sunpillar-clr-2: var(--sunpillar-2);
      --sunpillar-clr-3: var(--sunpillar-3);
      --sunpillar-clr-4: var(--sunpillar-4);
      --sunpillar-clr-5: var(--sunpillar-5);
      --sunpillar-clr-6: var(--sunpillar-6);
      --space: 5%;
      --angle: 133deg;
      --imgsize: cover;
    `,

    fontLoading: css`
      opacity: 0;
    `,
    front: css`
      & * {
        backface-visibility: hidden;
      }

      opacity: 1;
      backface-visibility: hidden;

      transition: opacity 0.33s ease-out;

      transform: translate3d(0, 0, 0.01px);

      display: grid;

      ${view}
    `,
    glare: cx(
      perf,
      css`
        /* make sure the glare doesn't clip */
        transform: translateZ(1.41px);

        overflow: hidden;

        ${view};

        background-image: radial-gradient(
          farthest-corner circle at var(--pointer-x) var(--pointer-y),
          hsl(0deg, 0%, 75%) 5%,
          hsl(200deg, 5%, 35%) 60%,
          hsl(320deg, 40%, 10%) 150%
        );
        background-position: center center;
        opacity: calc(var(--card-opacity) * 0.75);
        mix-blend-mode: multiply;
        filter: brightness(1.5) contrast(1.4) saturate(1);
        background-size: 170% 170%;
      `,
    ),
    rotator: css`
      ${shadow}

      img {
        transform: translate3d(0, 0, 0.01px);
        height: auto;
      }
    `,

    shine: cx(
      perf,
      css`
        ${view}
      `,
    ),
  };
});
