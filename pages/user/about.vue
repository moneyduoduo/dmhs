<template>
	<view>
		<my-navbar>
			<text slot="content">关于</text>
		</my-navbar>
		<view class="container">
			<view class="logo">
				<image src="../../static/images/logo2.png" mode="widthFix"></image>
			</view>
			<view class="content">
				<text>
					我公司从08至今，从事马来矿进口业务，和北方各大钢厂都有很好合作，依托于和马来当地矿山矿主良好关系，保障质量，保障信誉，打造我们自己的公司形象。
	本公司主要经营铁矿石,锰矿石,铅矿石,锌矿石,银矿石,镍矿石，铅矿石,锌矿石,银矿石等。本公司秉承“顾客至上，锐意进取”的经营理念，坚持“客户第一”的原则为广大客户提供优质的服务。欢迎广大客户惠顾！
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.container{
		padding: 0 40rpx;
		.logo{
			margin: 0 auto;
			padding: 80rpx;
			width: 300rpx;
			image{
				width: 100%;
			}
		}
		.content{
			font-size: 30rpx;
			letter-spacing: 0.3rpx;
			color: #272727;
		}
	}
</style>
