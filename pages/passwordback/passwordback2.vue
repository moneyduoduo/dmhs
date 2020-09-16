<template>
	<view class="container">
		<!-- 表单 -->
		<view class="form-wrap">
			<view class="form-pwd">
				<input type="password" value="" placeholder="请输入新密码" />
			</view>
		</view>
		<!-- 提交按钮 -->
		<view class="btn-wrap">
			<view class="submit">
				<button type="default">保存</button> 
			</view>
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

<style lang="scss" scoped>
	.form-wrap{
		background: pink;
		padding: 50rpx 0;
	}
	.form-pwd{
		padding: 10rpx 0;
		input{
			padding: 10rpx 20rpx;
			border-bottom: 1rpx solid black;
		}
	}
	.btn-wrap{
		background: red;
		padding: 50rpx;
		.submit{
			padding: 20rpx;
		}
	}
</style>
