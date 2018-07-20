import React from 'react';
import moment from 'moment';

export default porps => {
  const {message} = porps;
  return (
    <div className="message">
      <div className="message__main">
        <div className="message__text">{message.message}</div>
        <div className="message__tags">
          {message.private && <div className="message__tag">private</div>}
        </div>
      </div>
      <div className="message__info">
        <div className="messsage__user" style={{color: 'blue'}}>
          @{message.user}
        </div>
        <div className="message__time">{moment(message.created_at).fromNow()}</div>
      </div>
    </div>
  );
};
