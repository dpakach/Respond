import React from 'react';
import moment from 'moment';

export default porps => {
  const {message} = porps;
  return (
    <div class="message">
      <div class="message__main">
        <div class="message__text">{message.message}</div>
        <div class="message__tags">
          {message.private && <div class="message__tag">private</div>}
        </div>
      </div>
      <div class="message__info">
        <div class="messsage__user" style={{color: 'blue'}}>
          @{message.user}
        </div>
        <div class="message__time">{moment(message.created_at).fromNow()}</div>
      </div>
    </div>
  );
};
