import React from 'react';

import './styles.css';

export default function Container({children}) {
  return (
    <div className="container-component">
      <div className="container-margin">
        {children}
      </div>
    </div>
  );
}
