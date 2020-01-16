// import API from '@/api/api'
import axios from 'axios'
import vm from './main';
// import { Message, Spin } from 'view-design'
//1.系统未登录之前的请求
const status = {
	400: '请求出现错误',
	401: '没有提供认证信息',
	403: '没有权限',
	404: '请求内容不存在',
	405: '请求方式错误',
	406: '请求的资源并不符合要求',
	408: '客户端请求超时',
	413: '请求体过大',
	415: '类型不正确',
	416: '请求的区间无效',
	500: '服务器错误',
	501: '请求还没有被实现',
	502: '网关错误',
	503: '服务暂时不可用',
	504: '服务连接失败',
	505: '请求的 HTTP 版本不支持'
}
// 创建axios实例
const CancelToken = axios.CancelToken
const service = axios.create()
let axiosCount = 0;


function changeGlobalLoading(flag) {
	if(flag) {
		vm.$Spin.show()
	} else {
		vm.$Spin.hide();
	}
}

// 添加请求拦截器
service.interceptors.request.use(function (config) {
	// 在发送请求之前做些什么
	if(axiosCount == 0) changeGlobalLoading(true)
	axiosCount+=1;
	return config;
}, function (error) {
	// 对请求错误做些什么
	axiosCount-=1;
	if(axiosCount == 0) changeGlobalLoading(false)
	return Promise.reject(error);
});

// response 拦截器
service.interceptors.response.use(
	(response) => {
		const { data, status, url } = response
		// Spin.hide() // 不建议开启，因为界面不友好
		axiosCount-=1;
		if(axiosCount == 0) changeGlobalLoading(false)
		return {
			data,
			status
		}
	},
	(error) => {
		// Spin.hide() // 不建议开启，因为界面不友好
		axiosCount-=1;
		if(axiosCount == 0) changeGlobalLoading(false)
		return Promise.reject(error)
	}
)
export default {
	//get请求
	get(url, param = {}) {
		return new Promise((resolve, reject) => {
			service({
				method: 'get',
				url,
				params: param,
			})
				.then((res) => {
					if (!res.data) {
						resolve(res)
						return
					}
					if (res.status == 200 || res.data instanceof Array) {
						resolve(res)
					} else {
						reject(res)
					}
				})
				.catch((error) => {
					reject(error)
				})
		})
	},
	//post请求
	post(url, param = {}, headers = {}) {
		return new Promise((resolve, reject) => {
			service({
				method: 'post',
				url,
				data: param,
				headers
			})
				.then((res) => {
					if ((res.status == 200 && res.data) || (res.status == 200 && res.data == null)) {
						resolve(res)
					} else {
						Message.error(res.data.msg || '错误')
						reject(res)
					}
				})
				.catch((error) => {
					reject(error)
				})
		})
	},
}
