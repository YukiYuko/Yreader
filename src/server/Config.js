//Qs 是个数据处理插件，标配
import Qs from 'qs'
export default{
    //请求的接口，在请求的时候，如axios.get(url,config);这里的url会覆盖掉config中的url
    url: '',
 
    // 请求方法同上
    method: 'get', // default
    // 基础url前缀，请求数据时，会把baseURL和url拼接为完整的请求路径
    baseURL: '',
    　　
    transformRequest: [function (data) {
    // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
    　　data = Qs.stringify({});
    return data;
    }],
 
    transformResponse: [function (data) {
    // 这里提前处理返回的数据
 
    return data;
    }],
 
    // 请求头信息
    headers: {'X-Requested-With': 'XMLHttpRequest'},
 
    // `paramsSerializer` 是一个负责 `params` 序列化的函数
    // (e.g. https://www.npmjs.com/package/qs, https://api.jquery.com/jquery.param/)
    paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
    },
 
    //post参数，使用axios.post(url,{},config);如果没有额外的也必须要用一个空对象，否则会报错
 
    //设置超时时间，随意
    timeout: 1000,
    //返回数据类型
    responseType: 'json', // default
 
    // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
    validateStatus: function (status) {
        return status >= 200 && status < 300; // 默认的
    },
 
    // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
    // 如果设置为0，将不会 follow 任何重定向
    maxRedirects: 5, // 默认的
}