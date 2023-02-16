<template>
	<view>
		<!-- 使用搜索组件 -->
		<my-search @click="gotoSearch"></my-search>
		<view class="scoll-view-container">
			<!-- 左侧滑动区 -->
			<scroll-view scroll-y="true" :style="{height: wh+'px'}" class="left-scroll-view">
				<block v-for="(item,index) in cateLabelList" :key="index">
					<view :class="['left-scroll-view-item', index === active ? 'active' : '']"
						@click="changeActive(index)">{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<!-- 右侧滑动区 -->
			<scroll-view :scroll-top="scrollTop" scroll-y="true" :style="{height: wh+'px'}" class="right-scroll-view">
				<!-- 标题 -->
				<view class="right-scroll-item" v-for="(item,index) in cateLabelList2" :key="index">
					<view class="item-title">/{{item.cat_name}}/</view>
					<!-- 图片 -->
					<view class="scorll-item-img">
						<view v-for="item2 in item.children" :key="item2.cat_name" class="img-item" @click="gotoGoodsList(item2)">
							<image :src="item2.cat_icon" class="image"></image>
							<view>{{item2.cat_name}}</view>
						</view>
					</view>
				</view>


			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 设备可用高度 除了底部导航栏和头部的高度
				wh: 0,
				// 左侧分类的导航栏
				cateLabelList: [],
				// 左侧各项的id
				active: 0,
				// 右侧
				cateLabelList2: [],
				// 控制右侧滚动条距离顶部
				scrollTop:0
			};
		},

		onLoad() {
			// 拿到屏幕可用高度 让滚动条始终占满屏幕
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight - 50
			// 调用取左侧数据的方法
			this.getCateLableList()
		},
		methods: {
			async getCateLableList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.cateLabelList = res.message
				this.cateLabelList2 = res.message[0].children
			},
			// 点击把添加样式
			changeActive(index) {
				this.active = index
				this.cateLabelList2 = this.cateLabelList[index].children
				this.scrollTop = this.scrollTop===0?1:0
			},
			// 点击跳转商品列表页
			gotoGoodsList(item2){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid='+ item2.cat_id
				})
			},
			// 跳转搜索界面
			gotoSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.scoll-view-container {
		display: flex;

		.left-scroll-view {
			width: 120px;

			.left-scroll-view-item {
				position: relative;
				background-color: #f7f7ff;
				line-height: 60px;
				text-align: center;
				font-size: 12px;

				&.active {
					background-color: #FFFFFF;

					&::before {
						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
						content: ' ';
						display: block;
						width: 3px;
						height: 30px;
						background-color: #c00000;
					}
				}
			}
		}

		.right-scroll-view {
			.right-scroll-item {
				.item-title {
					text-align: center;
				}

				.scorll-item-img {
					display: flex;
					flex-wrap: wrap;
					.img-item {
						width: 33.33%;
						display: flex;
						flex-direction: column;
						align-items: center;
						text-align: center;
						.image{
							width: 60px;
							height: 60px;
						}
					}
				}
			}
		}
	}
</style>
