import axios from "axios";

export default axios.create({
  baseURL: "http://server.muni.moe/gimdb/api",
  headers: {
    "Content-type": "application/json"
  }
});
