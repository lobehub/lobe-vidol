'use client';

import React, { memo, useCallback } from 'react';

import * as LAppDefine from '@/libs/live2d/lappdefine';
import { LAppDelegate } from '@/libs/live2d/lappdelegate';

const handleResize = () => {
  if (LAppDefine.CanvasSize === 'auto') {
    LAppDelegate.getInstance().onResize();
  }
};

const Live2d = () => {
  const canvasRef = useCallback((canvas: HTMLCanvasElement) => {
    if (canvas) {
      // create the application instance
      if (LAppDelegate.getInstance().initialize() === false) {
        return;
      }

      LAppDelegate.getInstance().run();

      LAppDelegate.getInstance().changeCharacter(LAppDefine.ModelDefault);

      window.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      LAppDelegate.releaseInstance();
    };
  }, []);

  return <canvas ref={canvasRef} id={'live2d-canvas'}></canvas>;
};

export default memo(Live2d);
