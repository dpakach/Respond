import axios from 'axios';

const url = '/api/user/';

var user_details = null;

const get_User = () => {
  if (localStorage.getItem('accessToken')) {
    return fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then(data => {
      return data;
    });
  }
};

export default get_User;
