import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, cx }) => {
  const shine = css`
    background-image: var(--foil),
      repeating-linear-gradient(
        0deg,
        var(--sunpillar-clr-1) calc(var(--space) * 1),
        var(--sunpillar-clr-2) calc(var(--space) * 2),
        var(--sunpillar-clr-3) calc(var(--space) * 3),
        var(--sunpillar-clr-4) calc(var(--space) * 4),
        var(--sunpillar-clr-5) calc(var(--space) * 5),
        var(--sunpillar-clr-6) calc(var(--space) * 6),
        var(--sunpillar-clr-1) calc(var(--space) * 7)
      ),
      repeating-linear-gradient(
        var(--angle),
        #0e152e 0%,
        hsl(180deg, 10%, 60%) 3.8%,
        hsl(180deg, 29%, 66%) 4.5%,
        hsl(180deg, 10%, 60%) 5.2%,
        #0e152e 10%,
        #0e152e 12%
      ),
      radial-gradient(
        farthest-corner circle at var(--pointer-x) var(--pointer-y),
        hsla(0deg, 0%, 0%, 10%) 12%,
        hsla(0deg, 0%, 0%, 15%) 20%,
        hsla(0deg, 0%, 0%, 25%) 120%
      );
    background-position:
      center center,
      0% var(--background-y),
      calc(var(--background-x) + (var(--background-y) * 0.2)) var(--background-y),
      var(--background-x) var(--background-y);
    background-size:
      var(--imgsize),
      200% 700%,
      300% 100%,
      200% 100%;
    background-blend-mode: soft-light, hue, hard-light;
    filter: brightness(calc((var(--pointer-from-center) * 0.05) + 0.8)) contrast(1.75) saturate(1.2);
  `;

  const shineAfter = css`
    --space: 5%;
    --angle: 133deg;
    --imgsize: cover;

    content: '';

    background-image: var(--foil),
      repeating-linear-gradient(
        0deg,
        var(--sunpillar-clr-1) calc(var(--space) * 1),
        var(--sunpillar-clr-2) calc(var(--space) * 2),
        var(--sunpillar-clr-3) calc(var(--space) * 3),
        var(--sunpillar-clr-4) calc(var(--space) * 4),
        var(--sunpillar-clr-5) calc(var(--space) * 5),
        var(--sunpillar-clr-6) calc(var(--space) * 6),
        var(--sunpillar-clr-1) calc(var(--space) * 7)
      ),
      repeating-linear-gradient(
        var(--angle),
        #0e152e 0%,
        hsl(180deg, 10%, 60%) 3.8%,
        hsl(180deg, 29%, 66%) 4.5%,
        hsl(180deg, 10%, 60%) 5.2%,
        #0e152e 10%,
        #0e152e 12%
      ),
      radial-gradient(
        farthest-corner circle at var(--pointer-x) var(--pointer-y),
        hsla(0deg, 0%, 0%, 10%) 12%,
        hsla(0deg, 0%, 0%, 15%) 20%,
        hsla(0deg, 0%, 0%, 25%) 120%
      );
    background-position:
      center center,
      0% var(--background-y),
      calc((var(--background-x) + (var(--background-y) * 0.2)) * -1) calc(var(--background-y) * -1),
      var(--background-x) var(--background-y);
    background-size:
      var(--imgsize),
      200% 400%,
      195% 100%,
      200% 100%;
    background-blend-mode: soft-light, hue, hard-light;
    filter: brightness(calc((var(--pointer-from-center) * 0.4) + 0.85)) contrast(2) saturate(0.5);
    mix-blend-mode: exclusion;
  `;

  const shineBefore = css`
    content: '';

    z-index: 1;

    opacity: 0.5;
    background-image: radial-gradient(
      farthest-corner circle at var(--pointer-x) var(--pointer-y),
      hsl(0deg, 0%, 100%) 0%,
      hsla(0deg, 0%, 0%, 0%) 80%
    );
    background-position: center;
    background-size: cover;
    mix-blend-mode: screen;

    mask-image: none;
  `;

  const masked = css`
    /** masking image for cards which are masked **/
    mask-image: var(--mask);
    mask-position: center center;
    mask-size: cover;
  `;

  const nomasked = css`
    --mask: none;
    --foil: none;
    --imgsize: 20%;

    background-blend-mode: color-burn, hue, hard-light;
    filter: brightness(calc((var(--pointer-from-center) * 0.05) + 0.6)) contrast(1.5) saturate(1.2);
  `;

  return {
    composeShine: cx(
      'aha-shine',
      css`
        --space: 5%;
        --angle: 133deg;
        --imgsize: cover;
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

        display: grid;

        transform: translateZ(1px);

        overflow: hidden;

        z-index: 3;

        mix-blend-mode: color-dodge;
        opacity: var(--card-opacity);

        &::before {
          --sunpillar-clr-1: var(--sunpillar-5);
          --sunpillar-clr-2: var(--sunpillar-6);
          --sunpillar-clr-3: var(--sunpillar-1);
          --sunpillar-clr-4: var(--sunpillar-2);
          --sunpillar-clr-5: var(--sunpillar-3);
          --sunpillar-clr-6: var(--sunpillar-4);

          transform: translateZ(1px);
          grid-area: 1/1;
          border-radius: var(--card-radius);

          ${shineBefore}
        }

        &::after {
          --sunpillar-clr-1: var(--sunpillar-6);
          --sunpillar-clr-2: var(--sunpillar-1);
          --sunpillar-clr-3: var(--sunpillar-2);
          --sunpillar-clr-4: var(--sunpillar-3);
          --sunpillar-clr-5: var(--sunpillar-4);
          --sunpillar-clr-6: var(--sunpillar-5);

          transform: translateZ(1.2px);
          grid-area: 1/1;
          border-radius: var(--card-radius);

          ${shineAfter}
        }

        ${shine};
      `,
    ),

    maskedShine: css`
      ${masked}

      &::before,
      &::after {
        ${masked}
      }
    `,
    noMaskedShine: css`
      ${nomasked}

      &::after {
        ${nomasked}
      }
    `,
  };
});
