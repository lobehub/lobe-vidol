import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, cx }) => {
  const prefix = `aha-orbit`;

  const contour = css`
    aspect-ratio: var(--card-aspect);
    border-radius: var(--card-radius);
  `;

  const common = css`
    will-change: transform, box-shadow;
    transform-origin: center;
    display: grid;
    perspective: 600px;
  `;

  return {
    container: cx(
      `${prefix}-container`,
      css`
        /* place the card on a new transform layer and
        make sure it has hardward acceleration... we gun'need that! */
        transform: translate3d(0, 0, 0.01px);
        transform-style: preserve-3d;

        /* make sure the card is above others if it's scaled up */
        z-index: calc(var(--card-scale) * 2);

        /* every little helps! */
        will-change: transform, visibility, z-index;

        ${contour};

        /* outline is a little trick to anti-alias */
        outline: 1px solid transparent;

        & * {
          outline: 1px solid transparent;
        }
      `,
    ),
    content: css`
      height: 100%;
    `,
    rotator: cx(
      `${prefix}-rotator`,
      css`
        ${contour}
        ${common}
      transform: rotateY(var(--rotate-x)) rotateX(var(--rotate-y));
        transform-style: preserve-3d;

        /* performance */
        pointer-events: auto;

        /* overflow: hidden; <-- this improves perf on mobile, but breaks backface visibility. */

        /* isolation: isolate; <-- this improves perf, but breaks backface visibility on Chrome. */
      `,
    ),
    translator: cx(
      `${prefix}-translator`,
      css`
        ${common};
        width: auto;
        position: relative;
        transform: translate3d(var(--translate-x), var(--translate-y), 0.1px)
          scale(var(--card-scale));
      `,
    ),
  };
});
