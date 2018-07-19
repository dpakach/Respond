import React from 'react';
import AddAlertButton from './AddAlertButton';
import AddAlertBtn from '../home/AddAlertBtn';

export default props => {
  return (
    <div>
      <div className="section section--login">
        <div className="tabs">
          <div className="tabs__header">
            <div className="tabs__tab">Add Alert</div>
          </div>

          <div className="tabs__body">
            <div className="tabs__content">
              <AddAlertBtn />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
