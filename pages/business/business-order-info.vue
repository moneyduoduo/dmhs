<template>
	<view>
		<my-navbar>
			<text slot="content">动态信息</text>
		</my-navbar>
			<!-- 顶部时间选择 -->
			<view class="item-wrap">
				<view class="item">
					<!-- 左侧文字描述 -->
					<view class="left">
						<view class="lab">
							<view class="text">动态时间</view>
							<view class="num">23123123123123</view>
						</view>
					</view>
					<!-- 右侧小箭头图标 -->
					<view class="right">
						<image src="../../static/images/arrow-left-.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<my-split></my-split>
			<!-- 动态信息填写 -->
			<view class="content">
				<view class="title">动态信息</view>
				<view class="text-wrap">
					<textarea class="text" :auto-height="true" placeholder-style="color:#b9b9b9;font-size:30rpx;"  value="" placeholder="请输入动态信息" />
				</view>
			</view>
			<!-- 底部按钮 -->
			<view class="submit">
				<view class="btn-wrap">
					<view class="cancle" @click="toBack">取消</view>
					<view class="sava">保存</view>
				</view>
			</view>
	</view>
</template>

<script>
	import {backTo} from '@/utils/utils.js';
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toBack() {
				backTo();
			}
		}
	}
</script>

<style lang="scss">
	.item-wrap{
		@include border-1px(#eeeeee);
		background: #FFFFFF;
		.item{
			padding: 40rpx 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left{
				padding-right: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				.lab{
					.num{
						padding: 10rpx 0;
						font-size: 32rpx;
						font-weight: 700;
						color: #000000;
					}
				}
				.text{
					font-size: 30rpx;
					color: #5d5e5d;
				}
			}
			.right{
				flex-shrink: 0;
				display: flex;
				align-items: center;
				width: 10rpx;
				height: 10rpx;
				image{
					width: 100%;
				}
			}
		}
	}
	.content{
		padding: 40rpx;
		.title{
			font-size: 32rpx;
			color: #000000;
		}
		.text{
			width: 100%;
			padding: 20rpx 0;
			font-size: 30rpx;
			color: #000000;
		}
	}
	.submit{
		position: fixed;
		bottom: 0;
		box-sizing: border-box;
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		.btn-wrap{
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: $my-title-size;
			font-weight: $my-title-weight;
			text-align: center;
			.cancle{
				width: 100%;
				background: #fff9f4;
				color: #f27721;
			}
			.sava{
				width: 100%;
				background: #f27721;
				color: #fff9f4;
			}
		}
	}
</style>
