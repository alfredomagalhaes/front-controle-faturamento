import axios , { AxiosError } from "axios";
import { getToken } from "./auth";
import { parseCookies, setCookie } from 'nookies';

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {'Access-Control-Allow-Origin': '*'}
});

let cookies = parseCookies();
let isRefreshing = false ;
let failedRequestsQueu = [];

api.interceptors.request.use(async config => {

  if (cookies['ctrlfin.token']) {
    config.headers.Authorization = `Bearer ${cookies['ctrlfin.token']}`;
  }

  return config;
});

api.interceptors.response.use(response => {
  return response;
}, (error: AxiosError) => {
  if (error.response.status === 401) {
    if (error.response.data?.code === 'token.expired') {
      //Renovar o token
      cookies = parseCookies();
      const {'ctrlfin.refreshtoken': refreshToken} = cookies;
      const originalConfig = error.config;
      
      if (!isRefreshing) {
        isRefreshing = true

        api.post('/refresh', {
          refreshToken,
        }).then(response => {
          const {token} = response.data
  
          setCookie(undefined, 'ctrlfin.token',token,{
            maxAge: 60 * 60 * 24 * 30, //30 dias
            path: "/",
          })
  
          //Refres token aqui
          //setCookie(undefined, 'ctrlfin.refreshtoken',response.data.refreshtoken)
          failedRequestsQueu.forEach(request => request.onSuccess(token))
          failedRequestsQueu = [];
        }).catch(err => {
          failedRequestsQueu.forEach(request => request.onFailure(err))
          failedRequestsQueu = [];
        }).finally(() => {
          isRefreshing = false
        });
      }

      return new Promise((resolve, reject) => {
        failedRequestsQueu.push({
          onSuccess: (token: string) => {
            originalConfig.headers['Authorization'] = `Bearer ${token}`
            resolve(api(originalConfig ))
          },
          onFailure: (err: AxiosError) => {
            reject(err)
          },
        })
      });
    } else {
      //deslogar o usuário
    }
  }
});
export default api;