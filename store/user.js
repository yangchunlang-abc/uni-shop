export default {
	namespaced: true,
	state: () => ({
		// 地址
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		// 没有接口写死token
		token: '',
		userinfo: {
			avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132",
			city: "",
			country: "",
			gender: 0,
			is_demote: true,
			language: "",
			nickName: "微信用户",
		}
	}),
	mutations: {
		// 添加地址
		addAddress(state, address) {
			state.address = address
			this.commit('m_user/saveAddressToStorage')
		},
		// 保存地址
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},

		// 改用户信息
		updateUserInfo(state, userInfo) {
			state.userinfo = userInfo
			// this.commit('m_user/saveUserInfoToStorage')
			console.log(state.userinfo);
			// 奇怪这里明明有数据但是在my-userinfo中显示为空!!!!!!!!!!!!!!!!!!!
		},
		// 保存用户信息
		// saveUserInfoToStorage(state) {
		// 	uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		// }
		updateToken(state){
			state.token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
		},
		// 退出登录 清空用户信息
		clearLogin(state){
			state.address = {}
			state.token = ''
			state.userinfo = {}
		}
	},
	getters: {
		// 封装地址方便复用
		addstr(state) {
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address
				.detailInfo
		}
	}

}
