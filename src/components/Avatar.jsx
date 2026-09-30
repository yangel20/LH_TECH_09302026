import { useState } from 'react';
import './Avatar.css';

// Round photo that falls back to the person's initials when the photo is missing or fails to load.
// Usage: <Avatar name="Racielly Mella" src="/team/racielly-mella.jpg" size={120} />
export default function Avatar({ name, src, size = 96 }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const style = { width: size, height: size, fontSize: size * 0.36 };

  if (!src || failed) {
    return (
      <span className="avatar avatar--initials" style={style} role="img" aria-label={name}>
        {initials}
      </span>
    );
  }
  return (
    <img
      className="avatar"
      style={style}
      src={src}
      alt={name}
      width={size}
      height={size}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
