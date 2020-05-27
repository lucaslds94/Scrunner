import React from 'react';

import './styles.css';

export default function ButtonChangeScreen({titleButton, active = false, toPage}) {
  return (
    <div onClick={toPage} className={`change-button-container ${active && 'active'}`}>
      {titleButton}
    </div>
  );
}
