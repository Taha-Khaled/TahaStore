import axios from "axios";

const BASE_URL = "https://api-shop-api.herokuapp.com/api";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

/*const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;*/
const TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjUxMGM5NmM2MWMwNTExY2M5OTZjNCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDY1OTYzMDIsImV4cCI6MTY0Njg1NTUwMn0.gYaAql3imJXFC4CVcHlN5ZmhkhymtP8rcAdVfui9RxQ`;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
