import React from 'react';
const RadioBtn = ({
  input,
  label,
  options,
  divClass,
  radioButtonHandler,
  initialValue,
  meta: { touched, error, warning }
}) =>

{
  
  return(
    <td className="radio-td">
      {label !== undefined ? <label className="col-md-3 control-label" htmlFor={label}>{label}</label> : null} 
      {
        options.map(o => 
          <div  key={o.value}>
            <label className="radio" >
            {
              radioButtonHandler === undefined ? 
               <input type="radio" {...input} value={o.value} checked={o.value == input.value ||o.value === (initialValue && initialValue.value)}/>
              : <input type="radio" {...input} value={o.value} onClick={() => radioButtonHandler(o.value)} checked={o.value == input.value || o.value === (initialValue && initialValue.value)}/>
            }
            
            {o.name}</label>
          </div>)
      }

      {touched &&
        ((error && <span className="errorColor col-md-12 ml-3" >{error}</span>) ||
          (warning && <span className="warningColor" >{warning}</span>))}
           <span id={`server-error-${input.name}`} className="server-error errorColor"></span>
    </td>
  )
}


export default RadioBtn;
