import React from 'react';

const Loader = ({ visible }) => {
  return <div>{visible && <div>Loading</div>}</div>;
};

export default Loader;
