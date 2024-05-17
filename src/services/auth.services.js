import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const API_URL = "http://18.141.138.173:1323/";

const register = (username, password) => {
  return axios.post(API_URL + "register", {
    username,
    password,
  });
};

const login = async (username, password) => {
  const supabase = createClient(process.env.REACT_APP_API_KEY, process.env.REACT_APP_ANON_KEY);
  const { data, error } = await supabase.auth.signInWithPassword({
    email: username,
    password: password,
  })

  if (data.user.email === username) {
        localStorage.setItem("user", JSON.stringify(data.session.access_token));
  }

  console.log("data.user.email", data.session.access_token)
  console.log("data.user.email", data.user.email)
  return data
  // const response = await axios
  //       .post(API_URL + "login", {
  //           username,
  //           password,
  //       });
  //   if (response.data.username === username) {
  //       localStorage.setItem("user", JSON.stringify(response.data));
  //   }
  // const responseBranch = await axios.get(API_URL+"api/dataCore/getBranchIdView")
  
  // localStorage.setItem("branch", JSON.stringify(responseBranch.data.data))
  // const getBranch =  JSON.parse(localStorage.getItem("branch"))
  
  // let dataOptionsBranch = [{ label: 'all', value: 'all' }]
  // for (var i = 0; i < getBranch.length; i++) {
  //   console.log("data", dataOptionsBranch)
  //   dataOptionsBranch.push({ label: getBranch[i], value: getBranch[i] })
  // }
  // localStorage.setItem("optionsBranch", JSON.stringify(dataOptionsBranch))
  // return response.data;
};

const logout = async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("branch");
  localStorage.removeItem("optionsBranch");
  return localStorage.removeItem("user");
};





const AuthService = {
  register,
  login,
  logout,
}

export default AuthService;