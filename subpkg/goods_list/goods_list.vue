<template>
	<view>
		<view class="goods-list">
			<block v-for="(item,index) in goodsList" :key="index">
				<!-- 这里把一个个商品项给抽离成组件了 方便复用 -->
				<my-goodsList :item="item" :showRadio="false"></my-goodsList>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 接口参数对象
				queryObject: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				// 接口返回的值
				goodsList: [],
				// 返回的消息条数
				total: 0,
				// 设置节流阀
				isLoading: false
			}
		},
		methods: {
			async getGoodsList(cb) {
				// 打开节流阀
				this.isLoading = true
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObject)
				// 关闭节流阀
				this.isLoading = false
				// 数据请求完毕就调用回调函数
				cb && cb()
				if (res.meta.status !== 200) return uni.$showMsg()
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total

			},
			
		},
		onLoad(option) {
			// 得到页面传来的参数 页面参数可能没有
			this.queryObject.query = option.query || ''
			this.queryObject.cid = option.cid || ''
			// 掉接口
			this.getGoodsList()

		},
		// 上拉刷新函数
		onReachBottom() {
			if (this.isLoading) return
			// 这里有个小BUG不影响使用
			if (this.queryObject.pagenum * this.queryObject.pagesize >= this.total) return uni.$showMsg('数据加载完毕!')
			// 页码加一
			this.queryObject.pagenum += 1;
			// 重新调用方法
			this.getGoodsList()
		},
		// 下拉刷新函数
		onPullDownRefresh() {
			// 先重置所有的数据
			this.queryObject.pagenum = 1
			this.goodsList = []
			this.total = 0
			this.isLoading = false
			// 重新调用方法   并且传入回调函数
			this.getGoodsList(()=>uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">

</style>
