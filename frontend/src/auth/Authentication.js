import axios from "axios";

const url = "/api/user/";

var user_details = null;

if (localStorage.getItem("accessToken")) {
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
    .then(data => {
      user_details = data.data;
    });
}

export default user_details;
