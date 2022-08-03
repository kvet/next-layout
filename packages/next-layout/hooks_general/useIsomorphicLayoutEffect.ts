import { useEffect, useLayoutEffect } from 'react';

export default typeof window === 'undefined' ? useEffect : useLayoutEffect;
