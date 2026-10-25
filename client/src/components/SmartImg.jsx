import { useState } from 'react';

// Random related photo by keyword (loremflickr). Falls back to the gold gradient behind it if it can't load.
export default function SmartImg({ kw, lock = 1, w = 700, h = 900, alt = '', className = '' }) {
  const [state, setState] = useState('loading');
  if (state === 'error') return null;
  return (
    <img
      className={`smart-img ${state === 'loaded' ? 'loaded' : ''} ${className}`}
      src={`https://loremflickr.com/${w}/${h}/${kw}?lock=${lock}`}
      alt={alt}
      loading="lazy"
      onLoad={() => setState('loaded')}
      onError={() => setState('error')}
    />
  );
}
