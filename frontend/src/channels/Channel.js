import React from 'react';

import Messages from './Messages';
import MessageInput from './MessageInput';

export default props => {
  const logged_in = localStorage.getItem('accessToken');
  return (
      <div className="section section--login">
        <div className="tabs">
          <div className="tabs__header">
            <div className="tabs__tab">Public</div>
            <div className="tabs__tab tabs__tab--active">Private</div>
          </div>
          <div className="tabs__body">
            <div className="tabs__content">
                <Messages {...props} />
            </div>
            {
              logged_in &&
              <MessageInput {...props} />
            }
          </div>
        </div>
      </div>
  );
};
