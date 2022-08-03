import { MutableRefObject } from 'react';

import useIsomorphicLayoutEffect from '../hooks_general/useIsomorphicLayoutEffect';
import { GetLayoutFn } from './Layout';

type LayoutHookMounterProps = {
  getLayout: GetLayoutFn<any>;
  pageProps: any;
  hooks: MutableRefObject<any[] | undefined>;
  onUpdate: () => void;
};

function Empty(): null {
  return null;
}

export default function LayoutHookMounter({
  getLayout,
  pageProps,
  hooks,
  onUpdate,
}: LayoutHookMounterProps): null {
  let hooksIndexer = 0;
  getLayout({
    pageComponent: Empty,
    pageProps,
    mountHook: (cb) => {
      if (!hooks.current) throw new TypeError('Failed to bound layout hooks');
      const result = cb() as ReturnType<typeof cb>;
      hooks.current[hooksIndexer++] = result;
      return result;
    },
  });

  useIsomorphicLayoutEffect(() => {
    onUpdate();
  });

  return null;
}
