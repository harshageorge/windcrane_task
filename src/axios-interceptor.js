import axios from 'axios';

var baseurl = "";

// const storeBaseURL = async (value: any) => {
//   try {
//     await AsyncStorage.setItem("baseURL", value);
//   } catch (e) {
//     console.log(e);
//   }
// };
// async function removeAccessToken(){
//   try {
//     await AsyncStorage.removeItem("accessToken");
//    }
// catch(exception) {
//     console.log(exception)
// }
// }
const customerApi= axios.create({
  headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  
});

customerApi.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('accessToken');
    // storeBaseURL(baseurl);
    const base_URL = await AsyncStorage.getItem('baseURL');
    if (token) {
      config.baseURL = base_URL;
      config.headers.Authorization = "Bearer "+token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
);
