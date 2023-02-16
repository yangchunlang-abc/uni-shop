<template>
	<view>
		<view class="search-box">
			<uni-search-bar focus :radius="100" @input="input" cancelButton="none" @clear="resetSugg"></uni-search-bar>
		</view>
		<view class="sugg-list" v-if="goods_list.length !==0">
			<view class="sugg-item" v-for="(item,index) in goods_list" :key="index" @click="gotoDetail(item)">
				<view class="goods_name">{{item.goods_name}}</view>
				<uni-icons type="arrowright"></uni-icons>
			</view>
		</view>
		<view class="historyList" v-else>
			<view class="history_title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="22" @click="ToclearSearch"></uni-icons>
			</view>
			<view class="history-list">
				<view class="history-item" v-for="(item,index) in histories" :key="index" @click="gotoGoodsList(item)">
					<uni-tag :text="item" />
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	export default {
		data() {
			return {
				// 定义延时器
				timer: null,
				// 搜索词
				kw: '',
				// 返回的数据
				goods_list: [],
				// 历史记录
				// historyList: []  这个我换成了全局数据
			};
		},
		methods: {
			// 调取全局共享方法
			...mapMutations('m_history',['clearSearch','addHistory']),
			input(e) {

				// 设置防抖
				clearTimeout(this.timer)
				// 启动延时器
				this.timer = setTimeout(() => {
					this.kw = e
					// 调用请求接口的函数
					this.getSearchList()
				}, 500)
			},
			// 调用搜索接口
			async getSearchList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/qsearch?query=' + this.kw)
				if (res.meta.status !== 200) return uni.$showMsg()
				this.goods_list = res.message
				// 放到历史记录数组中  把历史数组变全局共享数组会保存吗
				// 使用全局共享方法 添加历史数据到全局历史数组中
				this.addHistory(this.kw)
			},
			// 跳转详情页
			gotoDetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			// 删除历史记录
			ToclearSearch(){
				// 使用全局方法
				this.clearSearch()
				console.log("点击了删除历史数据");
			},
			// 取消搜索就把推荐框清除
			resetSugg(){
				this.goods_list = ''
			},
			// 点击历史记录跳转商品详情
			gotoGoodsList(kw){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query='+ kw
				})
			}
		},
		computed: {
			// 取出全局数据
			...mapState('m_history',['historyList']),
			// 计算属性
			// 翻转历史记录 
			// 大家可以试试这个解决重复return [...new Set([...this.historyList].reverse())]
			// 先把历史记录翻转->放到set中利用set去重-> 再把set通过扩展运算符变数组
			histories() {
				return [...new Set([...this.historyList].reverse())]
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.sugg-list {
		padding: 0 15px;

		.sugg-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 12px;
			padding: 13px 0;

			.goods_name {
				// 文字多变…… 三部曲
				// 1.不换行
				white-space: nowrap;
				// 2.隐藏超出
				overflow: hidden;
				// 3.加……
				text-overflow: ellipsis;
			}
		}
	}

	.historyList {
		.history_title {
			display: flex;
			justify-content: space-between;
			padding: 10px 5px;
			font-size: 17px;
			border-bottom: 1px solid #ccc;
		}

		.history-list {
			display: flex;

			.history-item {
				padding: 10px;
			}
		}
	}
</style>
