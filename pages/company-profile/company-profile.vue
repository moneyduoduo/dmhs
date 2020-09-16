<template>
	<view class="container">
		<my-navbar>
			<image class="navbar-pic" slot="content" src="../../static/images/logo.png" mode="aspectFit"></image>
		</my-navbar>
		<view class="header">
			<view class="title">公司简介</view>
			<view class="subtitle">
				<text class="name">{{info.name}}</text>
				<text class="date">{{info.date}}</text>
			</view>
		</view>
		<view class="imgs" v-for="(item, index) in info.pics" :key="index">
			<image :src="item" mode="widthFix"></image>
		</view>
		<view class="content">
			<text class="text">
				{{info.content}}
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuPosition:{
					top: 0,
					height: 0
				},
				info: {
					name: '大全矿业',
					date: '2018/05/03',
					pics:[
						'../../static/images/FujianOceanCompanyProfileFinal.jpg',
						'../../static/images/FujianOceanCompanyProfileFinal1.jpg'
					],
					content:'我公司从08至今，从事马来矿进口业务，和北方各大钢厂都有很好合作，依托于和马来当地矿山矿主良好关系，保障质量，保障信誉，打造我们自己的公司形象。本公司主要经营铁矿石,锰矿石,铅矿石,锌矿石,银矿石,镍矿石，铅矿石,锌矿石,银矿石等。本公司秉承“顾客至上，锐意进取”的经营理念，坚持“客户第一”的原则为广大客户提供优质的服务。欢迎广大客户惠顾！'
				}
			};
		}
	}
</script>

<style lang="scss">
	.navbar-pic{
		width: 350rpx;
		height: 90rpx !important;
	}
	.header{
		padding: 0 40rpx;
		.title{
			padding-top: 30rpx;
			font-size: 34rpx;
			font-weight: 700;
			line-height: 48rpx;
			letter-spacing: 0rpx;
			color: #252525;
		}
		.subtitle{
			padding-top: 25rpx;
			padding-bottom: 20rpx;
			.name, .date{
				font-size: 26rpx;
				font-weight: normal;
				line-height: 45rpx;
				letter-spacing: 0.3rpx;
				color: #a4a4a4;
			}
			.date{
				padding-left: 10rpx;
			}
		}
	}
	.imgs{
		image{
			width: 100%;
		}
	}
	.content{
		padding: 40rpx;
		padding-bottom: 180rpx;
		.text{
			font-size: 30rpx;
			font-weight: normal;
			line-height: 45rpx;
			letter-spacing: 0.3rpx;
			color: #272727;
		}
	}
</style>
