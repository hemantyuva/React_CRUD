import React from 'react';
const renderSelectField = ({
  input,
  meta: {touched, error, warning},
  selectClass,
  children,
}) => (
    <div className="form-group">
      <select {...input} className={selectClass} >
        {children}
      </select>
       <span id={`server-error-${input.name}`} style={{'display':'none'}} className="server-error errorColor"></span>
      {touched &&
      ((error && <span className="errorColor" >{error}</span>) ||
        (warning && <span className="warningColor" >{warning}</span>))}
    </div>
);

export default renderSelectField;