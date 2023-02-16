<template>
	<view class="goods-detail-content">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in swiper" :key="index">
				<image :src="item.pics_mid_url" mode="" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息 -->
		<!-- v-if解决闪烁问题 -->
		<view class="goods-info" v-if="goodsDetail.goods_name">
			<view class="price">￥{{goodsDetail.goods_price}}.00</view>
			<view class="introduce">
				<view class="jj">{{goodsDetail.goods_name}}</view>
				<hr>
				<view class="sc">
					<uni-icons type="star" size="30px"></uni-icons>
					<view>收藏</view>
				</view>
			</view>
			<view class="yf">快递：免运费</view>
		</view>
		<!-- 商品富文本图片展示 -->
		<rich-text :nodes="goodsDetail.goods_introduce"></rich-text>
		<!-- 购物车按键 -->
		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
			// 侦听器侦听total的变化 有变化就重新赋值商品数给购物车徽标
		watch:{
			total:{
				handler(newval){
					const findReasult = this.options.find(x=>x.text === '购物车')
					if(findReasult){
						findReasult.info = newval
					}
				},
				// immediate 属性表示侦听器在页面加载后立即调用
				immediate:true
			}
		},
		computed: {
			// vuex在computed里通过...mapstate('模块的名称',['要映射数据的名称','要映射数据的名称'])
			...mapState('m_cart', ['cart']),
			// 通过getters获取商品总数
			...mapGetters('m_cart',['total']),
		},
		data() {
			return {
				// 接口数据
				goodsDetail: {},
				// 轮播图
				swiper: [],
				// 下侧购物车栏数据
				options: [{
					icon: 'shop',
					text: '店铺',
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		onLoad(option) {
			this.getGoodsDetail(option.goods_id)
		},
		methods: {
			
			// 通过mutation获取全局方法
			...mapMutations('m_cart', ['addToCart']),
			async getGoodsDetail(id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail?goods_id=' + id)
				if (res.meta.status !== 200) return uni.$showMsg()
				// 在这里可以对返回的数据进行处理
				// 如果图片不显示 把图片后缀名替换
				this.goodsDetail = res.message
				this.swiper = this.goodsDetail.pics
			},
			// 点击图片预览大图
			preview(index) {
				// 调用查看大图的api
				uni.previewImage({
					// 默认图片索引
					current: index,
					// 所有图片的url数组
					urls: this.swiper.map(x => x.pics_big)
				})
			},
			// 点击购物车
			onClick(e) {
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			// 点击购物车添加数据给购物车的全局共享数据

			buttonClick(e) {
				if (e.content.text === '加入购物车') {
					const goods = {
						goods_id: this.goodsDetail.goods_id,
						goods_name: this.goodsDetail.goods_name,
						goods_price: this.goodsDetail.goods_price,
						goods_count: 1,
						goods_small_logo: this.goodsDetail.goods_small_logo,
						goods_state: false
					}
					this.addToCart(goods)
				}
			}
		}
	}
</script>

<style lang="scss">
	.goods-detail-content {
		padding-bottom: 50px;

		swiper {
			height: 750rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.goods-info {
			margin: 20px 5px;
			display: flex;
			flex-direction: column;

			.price {
				font-size: 30px;
				color: red;
			}

			.introduce {
				display: flex;
				justify-content: space-between;
				padding: 10px 0;

				.jj {
					font-size: 18px;
					padding-right: 10px;
				}

				.sc {
					display: flex;
					flex-direction: column;
					font-size: 15px;
					padding: 0 20px;

				}
			}
		}

		.goods-nav {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
		}
	}
</style>
