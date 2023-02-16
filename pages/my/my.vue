<template>
	<view>
		<my-login v-if="!token"></my-login>
		<my-userinfo v-else></my-userinfo>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {

			};
		},
		computed: {
			...mapState('m_user', ['token'])
		},
		methods: {
			
		},
	}
</script>

<style lang="scss">
	.my-login {
		position: relative;
		height: 750rpx;
		background-color: #c9c9c9;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: hidden;

		.login-btn {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
		}

		&::after {
			content: '';
			display: block;
			width: 100%;
			height: 40px;
			background-color: #f5f5f5;
			position: absolute;
			bottom: 0;
			left: 0;
			border-radius: 100%;
			transform: translateY(50%);
		}
	}
</style>
