export default {
	namespaced: true,
	// state写全局数据
	state: () => ({
		// 购物车
		cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
	}),
	// mutation写改数据的方法
	mutations: {
		// 往购物车添加数据
		addToCart(state, goods) {
			// 使用find方法查询是否有重复id的商品   没有就返回unidenfind
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
			if (!findResult) {
				state.cart.push(goods)
			} else {
				findResult.goods_count++
			}
			// 通过commit方法调用下面的将数据保存到本地的方法
			this.commit('m_cart/saveToStorage')
		},
		// 将购物车数据保存到本地的方法
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		// 改变goods_state状态
		updateState(state, e) {
			// 看有没有要修改的商品
			const findResult = state.cart.find((x) => x.goods_id === e.goods_id)
			if (findResult) {
				findResult.goods_state = e.goods_state
				// 通过commit方法调用下面的将数据保存到本地的方法
				this.commit('m_cart/saveToStorage')
			}
		},
		// 更新count数据
		updateCount(state, e) {
			const findResult = state.cart.find((x) => x.goods_id === e.goods_id)

			if (findResult) {
				findResult.goods_count = e.goods_count
				// 通过commit方法调用下面的将数据保存到本地的方法
				this.commit('m_cart/saveToStorage')
			}
		},
		//	过滤数组
		removeGoodsById(state, e) {
			// 这里不是删除数组而是过滤数组
			// const findResult = state.cart.find((x)=>x.goods_id === e.goods_id)
			// if(findResult){
			// 删除数组  
			// findResult.splice(e.goods_id,1)}
			// 返回一个没有指定id的数组
			state.cart = state.cart.filter(x => x.goods_id !== e.goods_id)
			// 通过commit方法调用下面的将数据保存到本地的方法
			this.commit('m_cart/saveToStorage')
		},
		// 全选
		allChecked(state,isAllChecked){
			// 循环每一项 
			state.cart.forEach(x=>x.goods_state = isAllChecked)
		}
	},
	// getters就是全局共享数据的计算属性
	getters: {

		total(state) {
			let c = 0
			// 各商品总数
			state.cart.forEach(goods => c += goods.goods_count)
			return c
		},
		// 已经勾选的商品数量
		checkedCount(state){
			// 先用filiter找到已勾选 再用reduce加数量
			return state.cart.filter(x=>x.goods_state).reduce((total,item)=>total+=item.goods_count,0)
		},
		// 合计
		goodsSum(state){
			// 先用filter找到已勾选 再用reduce算合计
			return state.cart.filter(x=>x.goods_state).reduce((sum,item)=>sum+=item.goods_count*item.goods_price,0).toFixed(2)
		}
	}

}
