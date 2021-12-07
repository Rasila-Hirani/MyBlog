import React from 'react';
import './form-input.style.scss';

const FormInput =({handleChange,label, ...otherProps})=>(
    <div className="groupContainer">
        <input className="formInputConatiner" onChange={handleChange} {...otherProps}/>
       
        {label ? (
            <label className={`formInputLabel ${otherProps.value.length ? 'shrink':''}`}>{label}</label>
     
    ) : null}
    </div>
);
export default FormInput;