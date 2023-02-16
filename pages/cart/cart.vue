<template>
		<view class="cart-content" v-if="cart.length !== 0">
			<view class="address">
				<my-address></my-address>
			</view>
			<view class="cart-title">
				<uni-icons type="shop" size="30px"></uni-icons>
				<view class="cart-title-text">购物车</view>
			</view>
			<!-- 商品列表 -->
			<block v-for="(item,index) in cart" :key="index">
				<uni-swipe-action>
					<uni-swipe-action-item :right-options="options" @click="swiperActionClickHandler(item)">
						<my-goodsList :item="item" :showRadio="true" @radio-change="ToselectGoods"
							@num-change="addGoodsNum" :showNumBox="true" @goods-delect="swiperActionClickHandler">
						</my-goodsList>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</block>
			<!-- 结算 -->
			<my-settle></my-settle>
		</view>
		<!-- 如果商品数组为空 -->
		<view class="empty-cart" v-else>
			<image src="/static/cart-empty@2x.png" class="empty-image"></image>
			<text class="tip-text">空空如也~~</text>
		</view>

</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		mixins: [badgeMix],
		computed: {
			...mapState('m_cart', ['cart'])
		},
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			};
		},

		methods: {
			...mapMutations('m_cart', ['updateState', 'updateCount', 'removeGoodsById']),
			// 点击改变goos_state状态 但是这里改不了 要VUEX中改
			ToselectGoods(e) {
				// 在此调用全局方法更换全局数据
				// e = {goods_id:xxx,goods_state:xxx}
				this.updateState(e)
			},
			addGoodsNum(e) {
				// 在此调用方法更新全局数据count
				this.updateCount(e)
			},
			// 删除购物车商品列表商品
			swiperActionClickHandler(e) {
				this.removeGoodsById(e)
			}
		}
	}
</script>

<style lang="scss">
	.cart-content {
		padding-bottom: 50px;

		.address {
			padding: 10px 5px 0 5px;
		}

		.cart-title {
			height: 40px;
			display: flex;
			align-items: center;
			font-size: 14px;
			padding-left: 5px;
			border-bottom: 1px solid #efefef;

			.cart-title-text {
				margin-left: 10px;
			}
		}
	}
	.empty-cart{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 50%;
		transform: translateY(-50%);
	}
</style>
