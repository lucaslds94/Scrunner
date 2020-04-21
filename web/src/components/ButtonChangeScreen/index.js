import React from 'react';
import {Link} from 'react-router-dom';

import './styles.css';

export default function ButtonChangeScreen({titleButton, active = false, to = '#'}) {
  return (
    <Link to={to} className={`change-button-container ${active && 'active'}`}>
      {titleButton}
    </Link>
  );
}
