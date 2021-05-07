import React from 'react';

const Input = ({ error, errorMessage, className, onChange, ...extraProps }) => {
  return (
    <div className={`form-group `}>
      <input
        className={` ${error && 'is-invalid'} ${className ?? ''}`}
        {...extraProps}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="help-block">
        {error && <span className="text-danger">{errorMessage}</span>}
      </div>
    </div>
  );
};

export default Input;
