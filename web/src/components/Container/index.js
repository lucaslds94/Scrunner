import React from 'react';

import './styles.css';

export default function Container({children}) {
  return (
    <div className="container-component">
      {children}
    </div>
  );
}
