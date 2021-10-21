import axios from "axios";

export default axios.create({
  baseURL: "http://localhost/db/api",
  headers: {
    "Content-type": "application/json"
  }
});
