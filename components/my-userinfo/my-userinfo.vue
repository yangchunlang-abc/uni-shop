<template>
	<view>
		<view class="my-userinfo-container">
			<!-- 头像区域 -->
			<view class="top-box">
				<image :src="userinfo.avatarUrl" class="avatar"></image>
				<view class="nikeName">{{userinfo.nickName}}</view>
			</view>
			<!-- 三个卡片区域 -->
			<view class="three-card">
				<!-- 收藏相关 -->
				<uni-card :is-shadow="true">
					<view class="pannel">
						<view class="pannel-item">
							<text>8</text>
							<text>收藏的店铺</text>
						</view>
						<view class="pannel-item">
							<text>34</text>
							<text>收藏的商品</text>
						</view>
						<view class="pannel-item">
							<text>82</text>
							<text>关注的商品</text>
						</view>
						<view class="pannel-item">
							<text>81</text>
							<text>足迹</text>
						</view>
					</view>
				</uni-card>
				<!-- 我的订单 -->
				<uni-card :isShadow="true">
					<h3>我的订单</h3>
					<view class="order">
						<view class="order-item">
							<image src="/static//my-icons/icon1.png"></image>
							<text>待付款</text>
						</view>
						<view class="order-item">
							<image src="/static//my-icons/icon2.png"></image>
							<text>待收货</text>
						</view>
						<view class="order-item">
							<image src="/static//my-icons/icon3.png"></image>
							<text>退款/退货</text>
						</view>
						<view class="order-item">
							<image src="/static//my-icons/icon4.png"></image>
							<text>全部订单</text>
						</view>
					</view>
				</uni-card>
				<!-- 更多功能 -->
				<uni-card :isShadow="true">
					<view class="function">
						<view class="function-item">
							<h3>收货地址</h3>
							<uni-icons type="right"></uni-icons>
						</view>
						<view class="function-item">
							<h3>联系客服</h3>
							<uni-icons type="right"></uni-icons>
						</view>
						<view class="function-item" @click="loginout">
							<h3>退出登录</h3>
							<uni-icons type="right"></uni-icons>
						</view>
					</view>
				</uni-card>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		computed: {
			...mapState('m_user', ['userinfo', 'address', 'token'])
		},
		name: "my-userinfo",
		data() {
			return {

			};
		},
		methods: {
			...mapMutations('m_user', ['clearLogin']),
			async loginout() {
				const [err, res] = await uni.showModal({
					title: '提示',
					content: '确认退出登录吗?',
				}).catch(err => err)
				if (res && res.confirm) {
					this.clearLogin()
				}
			}
		}
	}
</script>

<style lang="scss">
	.my-userinfo-container {
		height: 100%;

		.top-box {
			height: 400rpx;
			background-color: #e64340;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.avatar {
				height: 90px;
				width: 90px;
				background-color: white;
				border-radius: 45px;
				border: 2px solid white;
			}

			.nikeName {
				padding-top: 10px;
				color: white;
			}
		}

		.three-card {
			position: relative;
			top: -40px;

			// 收藏
			.pannel {

				display: flex;
				justify-content: space-around;

				.pannel-item {
					display: flex;
					flex-direction: column;
					align-items: center;
				}
			}

			// 我的订单

			h3 {
				padding: 5px 0 10px 0;
			}

			.order {
				display: flex;
				justify-content: space-around;

				.order-item {
					display: flex;
					flex-direction: column;
					align-items: center;

					image {
						height: 30px;
						width: 30px;
					}
				}
			}

			// 更多功能
			.function {
				display: flex;
				flex-direction: column;

				.function-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 10px;
					line-height: 30px;
				}
			}
		}
	}
</style>
