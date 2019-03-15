import React from 'react';

const renderTextField = ({
  input,
  label,
  type,
  placeholder,
  meta,
  meta: { touched, error, warning, active}
}) =>{
  return(
    <td>
      <input {...input} placeholder={`${!active && touched && (error === 'Required') ? ''  : placeholder }`} type={type} autoComplete="off" className={`form-control`} />
      <span id={`server-error-${input.name.replace(/[\[\].']+/g,'')}`} className="server-error errorColor"></span>
      {!active && touched &&
        ((error && <span className={`errorColor  ${error === 'Required' ?  'required' : '' }`}>{error}</span>) ||
          (warning && <span className="warningColor" >{warning}</span>))}
    </td>

)
}
export default renderTextField;