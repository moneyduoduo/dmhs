<template>
	<view>
		<my-navbar :backColor="backColor" :navBarColor="navBarColor">
			<text slot="content" style="color: #FFFFFF;">我的业务动态</text>
		</my-navbar>
		<view class="container">
			<!-- 顶部选显卡 -->
			<view class="header">
				<view class="ing" :class="isActive?'active':''" @click="changeActice(1)">
					<view class="num">321</view>
					<view class="text">进行中</view>
					<view class="bottom-bar"></view>
				</view>
				<view class="ed" :class="!isActive?'active':''" @click="changeActice(2)">
					<view class="num">100</view>
					<view class="text">已完成</view>
					<view class="bottom-bar"></view>
				</view>
			</view>
			<!-- 内容列表 -->
			<view class="content" v-for="(item, index) in list" :key="index">
				<view class="item">
					<view class="left">
						<view class="order">
							<!-- 图标 -->
							<view class="icon">
								<image src="../../static/images/dingdandanjuwenjian.png" mode="widthFix"></image>
							</view>
							<!-- 列表 -->
							<view class="info">
								<!-- 头部订单号 -->
								<view class="id">业务订单 {{item.orderId}}</view>
								<view class="status">
									<view class="lab"><text>最新动态</text></view>
									<view class="text">{{item.latestStatus}}</view>
								</view>
								<!-- 下方时间状态 -->
								<view class="date">
									<view class="upd">更新时间：{{item.updateTime}}</view>
									<view class="start">下单时间：{{item.orderTime}}</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 右侧小图标 -->
					<view class="right">
						<image src="../../static/images/arrow-left-.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navBarColor:'#3f4140',// 导航栏颜色
				backColor:'#ffffff',// 返回按钮颜色
				isActive:true,// 切换选项卡样式标记
				list:[
					{'orderId':43324234237489,'latestStatus': '船已出吉隆坡'
					,'updateTime':'2020-12-11 12:31:23','orderTime':'2020-12-11 12:31:23'},
					{'orderId':43324234237489,'latestStatus': '船已出吉隆坡'
					,'updateTime':'2020-12-11 12:31:23','orderTime':'2020-12-11 12:31:23'},
					{'orderId':43324234237489,'latestStatus': '船已出吉隆坡'
					,'updateTime':'2020-12-11 12:31:23','orderTime':'2020-12-11 12:31:23'},
					{'orderId':43324234237489,'latestStatus': '船已出吉隆坡'
					,'updateTime':'2020-12-11 12:31:23','orderTime':'2020-12-11 12:31:23'}
				]
			}
		},
		methods: {
			// 顶部选项卡切换
			changeActice(flag) {
				if(flag===1 && !this.isActive) {
					this.isActive = !this.isActive;
				}
				if(flag===2 && this.isActive) {
					this.isActive = !this.isActive;
				}
			}
		}
	}
</script>

<style lang="scss">
	.container{
		.header{
			padding-top: 20rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			background: #3f4140;
			.ing, .ed{
				font-weight: $my-title-weight;
				color: #b7b7b7;
				text-align: center;
				.num{
					padding-bottom: 5rpx;
					font-size: 40rpx;
				}
				.text{
					padding-bottom: 20rpx;
					font-size: $my-title-size;
					font-size: 30rpx;
				}
				.bottom-bar{
					margin: 0 auto;
					width: 80%;
					border-bottom: 15rpx solid #3f4140;
				}
			}
			.active{
				color: #FFFFFF;
				.bottom-bar{
					margin: 0 auto;
					width: 80%;
					border-bottom: 15rpx solid #f59250;
				}
			}
		}
		.content{
			@include border-1px(#eeeeee)
			.item{
				padding: 30rpx 40rpx;
				display: flex;
				justify-content: space-between;
				.left{
					.order{
						display: flex;
						justify-content: flex-start;
						align-items: flex-start;
						.icon{
							width: 100rpx;
							height: 100rpx;
							image{
								width: 100%;
							}
						}
						.info{
							padding-left: 20rpx;
							.id{
								font-size: $my-title-size;
								font-weight: $my-title-weight;
							}
							.status{
								padding: 20rpx 0;
								display: flex;
								justify-content: flex-start;
								align-items: center;
								.lab{
									padding:  8rpx 20rpx;
									background: #ff4646;
									color: #FFFFFF;
									border-radius: 25rpx;
									font-size: 24rpx;
								}
								.text{
									padding-left: 30rpx;
									font-size: $my-title-size;
								}
							}
							.date{
								font-size: 26rpx;
								color: #5d5e5d;
							}
						}
					}
				}
				.right{
					width: 10rpx;
					height: 10rpx;
					image{
						width: 100%;
					}
				}
			}
		}
	}
</style>
