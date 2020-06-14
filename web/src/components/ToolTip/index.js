import React from 'react';

import './styles.css';

const ToolTip = ({title, children, width}) => {
  return (
    <div className="toolTip">
      {children}
      <span style={ {"width": width} } >{title}</span>
    </div>
    )
}

export default ToolTip;