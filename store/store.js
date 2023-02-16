// 1.导入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 导入购物车的vuex模块
import moduleCart from '@/store/cart.js'
// 导入历史记录vuex模块
import moduleHistory from '@/store/history.js'
// 导入用户vuex模块
import moduleUser from '@/store/user.js'
Vue.use(Vuex)
// 创建store实例对象
const store = new Vuex.Store({
	// 挂载模块
	modules:{
		m_cart:moduleCart,
		m_history:moduleHistory,
		m_user:moduleUser
	}
})
// 导出
export default store