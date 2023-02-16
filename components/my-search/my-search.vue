<template>
	<view :style="{'background-color':bgcolor}"class="my-search-container" @click="clickHandler" >
		<view :style="{'border-radius':radius+'px'}" class="my-search-box" >
			<!-- 使用图标组件 -->
			<uni-icons type="search" size="30"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default { // 好像是自定义属性
		props: {
			bgcolor: {
				type: String,
				default: '#e64340'
			},
			radius: {
				type: Number,
				default: 18
			}
		},
		name: "my-search",

		data() {
			return {
				scrollTop: 0
			};
		},
		methods: {
			clickHandler() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container {
		display: flex;
		align-items: center;
		padding: 0 10px;

		.my-search-box {
			height: 36px;
			background-color: #ffffff;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 10px;
			margin-bottom: 10px;

			.placeholder {
				font-size: 15px;
				margin-left: 5px;
			}
		}
	}
</style>
