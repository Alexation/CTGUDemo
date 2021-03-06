import axios from 'axios'
//Progress Bar
import nprogress from 'nprogress';
import 'nprogress/nprogress.css'
import { getStore } from '/utils/storage.js'

axios.defaults.withCredentials=true;

//利用axios对象的方法create，创建一个axios实例
//request就是axios，只不过稍微配置一下
const requests = axios.create({
  //配置对象
  //基础路径，发请求的时候，路径中会出现api
  baseURL: '/api',
  timeout: 5000,
});

//请求拦截器
requests.interceptors.request.use((config)=>{
  nprogress.start()
  //config: 配置对象，对象里面有一个属性很重要，headers请求头

  config.headers['Access-Control-Allow-Credentials'] = "true";
  // config.headers['Access-Control-Allow-Origin'] = "https://ins-spring-boot-1618793-1309615625.ap-shanghai.run.tcloudbase.com/";

  const tokenStr = window.localStorage.getItem("satoken")
  if (tokenStr){
    config.headers['satoken'] = tokenStr;

  }
  return config;
})

//响应拦截器
requests.interceptors.response.use((res)=>{
  nprogress.done()
  return res.data;
},(error)=>{
  //相应失败的回调函数
  return Promise.reject(new Error('fail'));
})

export default requests;