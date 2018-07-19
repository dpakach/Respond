import React from 'react';

export default porps => {
  const {message} = porps;

  return (
    <div>
      <p>{message.message}</p>
    </div>
  );
};
