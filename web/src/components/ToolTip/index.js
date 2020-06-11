import React from 'react';

import './styles.css';

const ToolTip = ({title, children}) => {
  return (
    <div className="toolTip">
      {children}
      <span>{title}</span>
    </div>
    )
}

export default ToolTip;