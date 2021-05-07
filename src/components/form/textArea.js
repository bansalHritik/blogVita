import React from 'react';

const TextArea = ({
  error,
  errorMessage,
  className,
  onChange,
  ...extraProps
}) => {
  return (
    <div className={`form-group `}>
      <textarea
        className={` ${error && 'is-invalid'} ${className ?? ''}`}
        onChange={(e) => onChange(e.target.value)}
        {...extraProps}
      />
      <div className="help-block">
        {error && <span className="text-danger">{errorMessage}</span>}
      </div>
    </div>
  );
};

export default TextArea;
