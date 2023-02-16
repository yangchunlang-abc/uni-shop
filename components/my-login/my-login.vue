<template>
	<view>
		<view class="my-login">
			<uni-icons type="contact" size="60px"></uni-icons>
			<view> 登录享受更多权益</view>
			<button type="warn" class="login-btn" @click="getUserProfile">登录</button>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		name: "my-login",
		data() {
			return {

			};
		},

		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateToken']),
			// 获取微信用户的基本信息              这里调用getUserProfile和uni.login 获取token
			getUserProfile() {
				uni.getUserProfile({
					desc: '你的授权信息',
					success: (res) => {
						// 将信息存到 vuex 中
						this.updateUserInfo(res.userInfo)

						// 获取token
						// this.getToken(res)

						// 把token给全局token
						this.updateToken()

					},
					fail: () => {
						return uni.$showMsg('您取消了登录授权')
					}
				})
			},
			// async getToken(info) {
			// 	// 调用微信登录接口
			// 	const [err, res] = await uni.login().catch(err => err)
			// 	if (res.errMsg !== 'login:ok') return nui.$showMsg("登录失败!")
			// 	// 准备接口的参数
			// 	const query = {
			// 		code: res.code,
			// 		encryptedData: info.encryptedData,
			// 		iv: info.iv,
			// 		rawData: info.rawData,
			// 		signature: info.signature
			// 	}
			// 	// 换取token
			// 	const {
			// 		data: loginResult
			// 	} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
			// 	if (loginResult.meta.status !== 400) return uni.$showMsg("登录失败!")
			// 	uni.$showMsg('登录成功')
			// 由于接口失效，， 没有获取到token
			// 在vuex里定义了一个死token
			// 这里该有一个更新token的全局方法
		}

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
