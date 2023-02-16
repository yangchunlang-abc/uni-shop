import {
	mapGetters
} from 'vuex'

export default ({
	computed: {
		...mapGetters('m_cart', ['total'])
	},
	watch: {
		// 监听total变化
		total() {
			if(this.total !=0){
				// 一变化就重新设置徽标
				this.setBadge()
			}
		}
	},
	onShow() {
		if(this.total != 0){
			this.setBadge()
		}
	},

	methods: {
		setBadge() {
			// 使用uni.setTabBarBadge方法设置徽标
				uni.setTabBarBadge({
					index: 2, // 这是下面导航栏的索引
					text: this.total + '' //text的值必须是字符串
				})
		}
	}
})
// 本页面是一个封装了的徽标
// 本页面通过mixins 放到下面导航栏上
