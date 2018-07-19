import React from 'react';

import Messages from './Messages';
import MessageInput from './MessageInput';

export default props => {
  return (
    <div>
      <Messages {...props}/>
      <MessageInput {...props} />
    </div>
  );
};
