import React from 'react';

export default porps => {
  const {message} = porps;

  return (
    <div>
      <p>Message</p>
      <p>{message.message}</p>
    </div>
  );
};
