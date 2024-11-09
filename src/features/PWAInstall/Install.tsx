'use client';

import dynamic from 'next/dynamic';
import { memo, useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { BRANDING_NAME } from '@/constants/branding';
import { PWA_INSTALL_ID } from '@/constants/common';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { useGlobalStore } from '@/store/global';

// @ts-ignore
const PWA: any = dynamic(() => import('@khmyznikov/pwa-install/dist/pwa-install.react.js'), {
  ssr: false,
});

const PWAInstall = memo(() => {
  const { t } = useTranslation('metadata');

  const { install, canInstall } = usePWAInstall();

  const [hidePWAInstaller, setHidePWAInstaller] = useGlobalStore((s) => [
    s.hidePWAInstaller,
    s.setHidePWAInstaller,
  ]);

  // we need to make the pwa installer hidden by default
  useLayoutEffect(() => {
    sessionStorage.setItem('pwa-hide-install', 'true');
  }, []);

  const pwaInstall =
    // eslint-disable-next-line unicorn/prefer-query-selector
    typeof window === 'undefined' ? undefined : document.getElementById(PWA_INSTALL_ID);

  // add an event listener to control the user close installer action
  useEffect(() => {
    if (!pwaInstall) return;

    const handler = (e: Event) => {
      const event = e as CustomEvent;

      // it means user hide installer
      if (event.detail.message === 'dismissed') {
        setHidePWAInstaller(true);
      }
    };

    pwaInstall.addEventListener('pwa-user-choice-result-event', handler);
    return () => {
      pwaInstall.removeEventListener('pwa-user-choice-result-event', handler);
    };
  }, [pwaInstall]);

  // trigger the PWA guide on demand
  useEffect(() => {
    if (!canInstall || hidePWAInstaller) return;

    console.log('canInstall', canInstall);
    // trigger the pwa installer and register the service worker
    install();
    if ('serviceWorker' in navigator && window.serwist !== undefined) {
      window.serwist.register();
    }
  }, [canInstall, hidePWAInstaller]);

  return (
    <PWA
      description={t('chat.description', { appName: BRANDING_NAME })}
      id={PWA_INSTALL_ID}
      manifest-url={'/manifest.webmanifest'}
    />
  );
});

export default PWAInstall;
