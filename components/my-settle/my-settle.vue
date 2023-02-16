<template>
	<view>
		<view class="settle-content">
			<!-- 全选 -->
			<view class="radio">
				<radio color="#c00000" @click="checkAll" :checked="isAllChecked"></radio><text>全选</text>
			</view>
			<!-- 合计 -->
			<view>合计:￥{{goodsSum}}</view>
			<!-- 结算 -->
			<view><button type="warn" @click="settlement">结算({{checkedCount}})</button></view>
			
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapState,mapMutations} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {
				// 定义一个存放全选状态的值(这个状态只是存储全选是否选中并给全局方法赋值)
				checked:'true'
			};
		},
		computed:{
			...mapGetters('m_cart',['checkedCount','total','goodsSum']),
			...mapState('m_cart',['cart']),
			...mapState('m_user',['token']),
			...mapGetters('m_user',['addstr']),
				// 如果商品数等于选中的数就勾上全选
			isAllChecked(){
				return this.checkedCount === this.total 
			}
		},
			
		methods:{
			...mapMutations('m_cart',['allChecked']),
			// 点击全选
			checkAll(){
				// checked是全选raido取反的状态 然后再和全局方法
				this.checked = !this.isAllChecked
				this.allChecked(this.checked)
				
			},
			// 点击结算
			settlement(){
				if(!this.checkedCount) return uni.$showMsg('请选择商品!')
				if(!this.addstr) return uni.$showMsg('请选择收货地址!')
				if(!this.token) return uni.$showMsg('请登录!')
				// 微信支付
				// 返回订单号
				this.payOrder()
			},
			async payOrder(){
				// 创建订单
				const orderInfo = {
					// 开发期间价格写死
					// order_price:this.checkedCount
					// 总价
					order_price:0.01,
					// 地址
					consignee_addr:this.addstr,
					// 商品信息：商品id，数量，价格
					// map返回一个新数组
					goods:this.cart.filter(x=>x.goods_state).map(x=>({
						goods_id:x.goods_id,
						goods_number:x.goods_count,
						goods_price:x.goods_price
						}))
				}
				const {data:res} = await uni.$http.post('/api/public/v1/my/orders/create',orderInfo)
				if(res.meta.status !== 200) return uni.$showMsg("创建订单失败!")
				// 拿到订单号
				const orderNumber = res.message.order_number
				const {data:res2} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{order_number:orderNumber})
				if(res2.meta.status !==200) return uni.$showMsg('预付订单生成失败!')
				// 拿到预支付信息
				const payInfo = res2.message.pay
				// 调用微信小程序支付api
				const [err,suc] = uni.requestPayment(payInfo)
				if(err) return uni.$showMsg('订单未支付!')
				// 查询是否已完成支付
				const {data:res3} = await uni.$http.post('/api/public/v1/my/orders/chkOrder',{order_number:orderNumber})
				if(res3.meta.status !== 200) return uni.$showMsg('订单未支付!')
				// 否则订单支付完成
				uni.showToast({
					title:'支付成功!',
					icon:'success'
				})
				
			}
		}
	}
</script>

<style lang="scss">
	.settle-content {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
		width: 100%;
		height: 50px;
		background-color: #fefefe;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 5px;
		.radio{
			display: flex;
			align-items: center;
		}
	}
</style>
