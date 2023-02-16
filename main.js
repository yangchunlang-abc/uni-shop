
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// ---------------------------------------------
//导入全局共享组件
import store from "@/store/store.js"
// 导入网络请求包
import {$http} from '@escook/request-miniprogram'
// 挂载
uni.$http = $http
// 配置根路径
uni.$http.baseUrl = 'https://api-hmugo-web.itheima.net'
// 请求之前
$http.beforeRequest = function(options){
	uni.showLoading({
		title:'数据加载中……',
	})
	// 微信支付只有在登录后才能使用 所以给请求前添加登录认证
	// 判断是否为有权限的API接口
	if(options.url.indexOf('/my/' !== -1)){
		// 添加用于身份认证的请求头字段
		options.header = {
			Authorization:store.state.m_user.token
		}
	}
}
// 请求之后
$http.afterRequest = function(){
	uni.hideLoading()
}
// ---------------------------------------------
// 为uni挂载一个自定义方法
uni.$showMsg = function(title='数据请求失败!', duration=1500){
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif