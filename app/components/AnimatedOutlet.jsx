import {useOutlet, useLocation} from '@remix-run/react';
import {useState, useEffect} from 'react';

export default function AnimatedOutlet() {
  const location = useLocation();
  const [outlet, setOutlet] = useState(useOutlet());

  useEffect(() => {
    setOutlet(useOutlet());
  }, [location.pathname]);

  return outlet;
}
