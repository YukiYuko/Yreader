//引入 Axios 
import Axios from 'axios'
//引入 Axios 请求数据所需要的配置文件
import Config from './Config.js'
//项目中引用了 ElementUI，用加载和提示两个组件，在请求数据时，后返回状态码后的行为
import { Loading } from 'element-ui'
import { Notification } from 'element-ui'
 
let loading;
// 添加请求拦截器，在请求时，显示 ElementUI 的加载组件
Axios.interceptors.request.use(function (config) {
    loading = Loading.service({ fullscreen: true ,text:'疯狂加载中'});
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
 
// 添加响应拦截器 ，请求结束后，关闭 加载组件
Axios.interceptors.response.use(function (response) {
    loading.close();
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
 
// 封装请求数据的对象方法
class Ajax {
    static Get(url){
        // 通过Promise完成异步操作，将数据进行初步处理输出为Json对象
        var P = new Promise(function(resolve, reject){
            Axios.get(url,Config)
            .then((res)=>{
                //判断后台返回状态码，作出相应行为
                switch(res.data.status){
                    case 0:
                        Notification({
                            title : '错误提示',
                            message : res.data.message,
                            type : 'error'
                        });
                        break;
                    default:
                        Notification({
                            title : '请求成功',
                            message : res.data.message,
                            type : 'success'
                        });
                        resolve(res);
                        break;
                }
            }).catch((error)=>{
                console.log(error)
                reject(error);
            });
        });
        return P
    }
    static Post(url){
        var P = new Promise(function(resolve, reject){
            Axios.get(url,data,Config)
            .then((res)=>{
                console.log(res.data.data)
                switch(res.data.status){
                    case 0:
                        Notification({
                            title : '错误提示',
                            message : res.data.message,
                            type : 'error'
                        });
                        break;
                    default:
                        Notification({
                            title : '请求成功',
                            message : res.data.message,
                            type : 'success'
                        });
                        resolve(res);
                        break;
                }
            }).catch((error)=>{
                console.log(error)
                reject(error);
            });
        });
        return P
    }
}
// 将封装好的 Ajax函数方法输出，方便调用
export default Ajax;