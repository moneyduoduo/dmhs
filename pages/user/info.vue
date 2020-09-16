<template>
	<view class="container">
		<my-navbar>
			<text slot="content">个人信息</text>
		</my-navbar>
		<!-- 用户详情信息 -->
		<view class="user">
			<view class="item">
				<view class="lab">头像</view>
				<view class="pic">
					<image :src="info.avator" mode="widthFix"></image>
				</view>
			</view>
			<view class="item">
				<view class="lab">姓名</view>
				<view class="text">{{info.userName}}</view>
			</view>
			<view class="item">
				<view class="lab">性别</view>
				<view class="text">{{info.sex}}</view>
			</view>
			<view class="item border-none">
				<view class="lab">生日</view>
				<view class="text">{{info.birthday}}</view>
			</view>
			<my-split></my-split>
			<view class="item">
				<view class="lab">公司名称</view>
				<view class="text">{{info.company}}</view>
			</view>
			<view class="item">
				<view class="lab">公司地址</view>
				<view class="text">{{info.addr}}</view>
			</view>
		</view>
		<!-- 提交按钮 -->
		<view class="submit">
			<button class="out" type="default">退出登录</button>
		</view>
	</view>
</template>

<script>
	import executeS from '@/service/executeS.js';
	export default {
		data() {
			return {
				isLogin: true,
				info:{
					avator: '../../static/images/avator.png',
					userName: '凌凌',
					sex: '女',
					birthday: '12-11',
					company: '马来西亚大全矿业有限公司',
					addr: '福建省福州市台江区江滨西大道半岛国际3号楼10层802'
				}
			}
		},
		methods: {
		},
		onLaunch: function() {
		
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		background: #f8f8f8;
		height: 100vh;
	}
	.user{
		background: #FFFFFF;
		.item{
			padding: 40rpx 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			@include border-1px(#eeeeee)
			.lab, .text{
				font-size: 30rpx;
				font-weight: normal;
				letter-spacing: 0rpx;
				color: #000000;
				max-width: 400rpx;
			}
			.pic{
				width: 108rpx;
				height: 108rpx;
				border-radius: 50%;
				image{
					width: 100%;
				}
			}
		}
		.border-none::after{
			border-bottom: none;
		}
	}
	.submit{
		padding: 120rpx 80rpx 150rpx 80rpx;
		.out{
			width: 580rpx;
			height: 90rpx;
			background-color: #ff4646;
			border-radius: 16rpx;
			color: #FFFFFF;
			font-size: 32rpx;
			font-weight: normal;
			line-height: 90rpx;
			letter-spacing: 0rpx;
			color: #ffffff;
		}
	}
</style>
