export default {
	namespaced:true,
	state:()=>({
		// 历史数据数组
		historyList:[]
	}),
		
	mutations:{
		// 添加历史数据
		addHistory(state,kw){
			state.historyList.push(kw)
		},
		// 删除历史记录
		clearSearch(state) {
			state.historyList = ''
		},
	},
		
	getters:{
	}
}