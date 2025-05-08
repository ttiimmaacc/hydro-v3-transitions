import {useOutlet, useLocation, useNavigation} from '@remix-run/react';
import {useRef} from 'react';

/**
 * Keeps returning the previously‐rendered outlet element until
 * Remix navigation is *idle* for the new URL. The leaving page
 * stays visible, fades out, *then* the fully-loaded next page
 * mounts and fades in — no intermediate blank / half-loaded flash.
 */
export default function AnimatedOutlet() {
  const outlet = useOutlet(); // element for *current* match
  const location = useLocation();
  const navigation = useNavigation(); // {state: 'idle' | 'loading' | 'submitting'}
  const cacheRef = useRef({key: location.key, element: outlet});

  // Only replace the cached element when:
  //   • we've moved to a new URL (different location.key)
  //   • AND Remix has finished loading data (navigation.state === 'idle')
  if (navigation.state === 'idle' && location.key !== cacheRef.current.key) {
    cacheRef.current = {key: location.key, element: outlet};
  }

  return cacheRef.current.element;
}
