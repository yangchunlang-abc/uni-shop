<template>

	<view class="goods-item">
		<!-- 图片 -->
		<view class="goods-left">
			<radio :checked="item.goods_state" color="#c00000" v-if="showRadio" @click="selectGoods"></radio>
			<image :src="item.goods_small_logo || defaultPic" alt="商品图片" class="pic"></image>
		</view>
		<!-- 标题和价格 -->
		<view class="goods-right">
			<view class="head" @click="gotoDetail(item)">{{item.goods_name}}</view>
			<view class="right-bottom">
				<view class="price">￥{{item.goods_price}}.00</view>
				<uni-number-box v-model="item.goods_count" @change="changeValue" v-if="showNumBox">
				</uni-number-box>
			</view>
		</view>
	</view>



</template>

<script>
	export default {
		name: "my-goodsList",
		props: {

			item: {
				type: Object,
				default: {}
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showNumBox: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				// 默认图片
				defaultPic: 'https://img.zcool.cn/community/0106e858135099a84a0e282b5b62b5.jpg@1280w_1l_2o_100sh.jpg',
				
			}
		},
		methods: {
			// 点击跳转商品详情页
			gotoDetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			// 这是子组件的方法
			selectGoods() {
				this.$emit('radio-change', {
					goods_id: this.item.goods_id,
					goods_state: !this.item.goods_state
				})
			},
			changeValue(value) {
				// console.log('返回数值：', value);
				// 要把数值更新goods_count
				this.$emit('num-change', {
					goods_id: this.item.goods_id,
					goods_count: value
				})
			}
		}

	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 10px 5px;

		.goods-left {
			display: flex;
			align-items: center;

			.pic {
				height: 100px;
				width: 100px;
				margin: 0 10px;
			}
		}

		.goods-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.head {
				padding: 0 5px;
			}

			.right-bottom {
				display: flex;
				justify-content: space-between;

				.price {
					font-size: 18px;
					color: red;
				}
			}

		}
	}
</style>
