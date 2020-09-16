<template>
	<view>
		<my-navbar>
			<text slot="content">用户反馈</text>
		</my-navbar>
		<view class="container">
			<textarea value="" maxlength="150" placeholder="欢迎你的宝贵意见, 不超过150字..." placeholder-style="color:#b9b9b9;font-size:30rpx;" />
		</view>
		<!-- 底部按钮 -->
		<view class="submit">
			<text>提 交</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.container{
		padding: 60rpx 40rpx;
		padding-bottom: 100rpx;
		textarea{
			width: 100%;
		}
	}
	.submit{
		position: fixed;
		bottom: 0;
		box-sizing: border-box;
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		font-size: $my-title-size;
		font-weight: $my-title-weight;
		text-align: center;
		vertical-align: middle;
		background: #f27721;
		color: #FFFFFF;
		}
</style>
