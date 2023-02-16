<template>
	<view>
		<view>
			<view class="search-box">
				<my-search @click="gotoSearch"></my-search>
			</view>

			<!-- 轮播图 -->
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
				<swiper-item v-for="item in swiperList" :key="item.goods_id">
					<navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
						<image :src="item.image_src"></image>
					</navigator>
				</swiper-item>
			</swiper>
			<!-- 导航栏 -->
			<view class="nav-list">
				<view class="nav-item" v-for="(item,index) in navlist" :key="index">
					<image :src="item.image_src" class="nav-img" @click="navClickHandler(item)"></image>
				</view>
			</view>
			<!-- 楼层 -->
			<view class="floor-list">
				<view class="floor-item" v-for="(item,index) in floorList" :key="index">
					<image :src="item.floor_title.image_src" class="floor-title"></image>
					<view class="floor-img-box">
						<!-- 左边盒子 -->
						<navigator class="left-img-box" :url="item.product_list[0].url">
							<image :src="item.product_list[0].image_src"
								:style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
						</navigator>
						<!-- 右边盒子 -->
						<view class="right-img-box">
							<navigator v-for="(item2,index) in item.product_list" :key="index" :url="item2.url">
								<image :src="item2.image_src" mode="widthFix" v-show="index !== 0"
									:style="{width:item2.image_width+ 'rpx'} "></image>
							</navigator>
						</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.vue';
	export default {
		components: {
			uniSearchBar
		},
		data() {
			return {
				// 轮播图数据
				swiperList: [],
				// 导航栏数据
				navlist: [],
				// 楼层数据
				floorList: []
			};
		},
		onLoad() {
			// 调用请求轮播图数据方法
			this.getSwiperList()
			// 调用请求导航栏数据的方法
			this.getNavlist()
			// 调用楼层的方法
			this.getFloorList()
		},
		methods: {
			// 轮播图
			async getSwiperList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.swiperList = res.message
			},
			// 导航栏
			async getNavlist() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.navlist = res.message
			},
			// 点击分类跳转
			navClickHandler(item) {
				if (item.name === "分类") {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			// 楼层
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				// 数据处理 给每个图片加了一个url
				res.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
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
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-list {
		.floor-item {
			.floor-title {
				height: 60rpx;
				width: 100%;
				display: flex;
			}

			.floor-img-box {
				display: flex;

				.left-img-box {
					padding: 5px;
				}

				.right-img-box {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;
				}
			}
		}

	}
</style>
