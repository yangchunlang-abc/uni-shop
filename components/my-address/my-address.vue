<template>
	<view>
		<view class="addAdressBtn" v-if="JSON.stringify(address) === '{}'">
			<button type="warn" size="mini" @click="chooseAddress">添加收货地址+</button>
		</view>
		<view class="address" v-else>
			<view class="address-title">
				<view>收货人:{{address.userName}}</view>
				<view>电话:{{address.telNumber}}</view>
			</view>
			<view class="address-info">
				<view>收货地址: {{addstr}}</view>
			</view>

			<view class="address-bottom">
				<image src="/static/cart_border@2x.png"></image>
			</view>
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
		name: "my-address",
		computed: {
			...mapState('m_user', ['address']),
			...mapGetters('m_user', ['addstr']),
		},
		data() {
			return {};
		},
		methods: {
			...mapMutations('m_user', ['addAddress']),

			async chooseAddress() {
				const [err, suc] = await uni.chooseAddress().catch(err => err)
				if (err === null && suc.errMsg === 'chooseAddress:ok') {
					// 现在address变成了全局变量
					this.addAddress(suc)
				}

			}
		}
	}
</script>

<style lang="scss">
	.addAdressBtn {
		text-align: center;
	}

	.address {
		display: flex;
		flex-direction: column;

		.address-title {
			display: flex;
			justify-content: space-between;
		}

		.address-info {
			padding: 10px 0 5px 0;
			padding-right: 10px;
		}
	}

	.address-bottom {
		image {
			height: 5px;
			width: 100%;
		}
	}
</style>
