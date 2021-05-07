import React from 'react';
// unfollow l=kar lena
const ImageInput = ({
  error,
  errorMessage,
  className,
  onChange,
  ...extraProps
}) => {
  return (
    <div className={`form-group `}>
      <input
        className={` ${error && 'is-invalid'} ${className ?? ''}`}
        onChange={(e) => onChange(e.target.files[0])}
        {...extraProps}
      />
      <div className="help-block">
        {error && <span className="text-danger">{errorMessage}</span>}
      </div>
    </div>
  );
};

export default ImageInput;
