<template>
	<view class="container">
		<!-- 表单 -->
		<view class="form-wrap">
			<view class="form-tel form-input">
				<div class="form-lab">
					<label for="">手机号</label>
				</div>
				<input type="text" value="" placeholder="请输入手机号" />
			</view>
			<view class="form-code form-input">
				<div class="form-lab">
					<label for="">验证码</label>
				</div>
				<input type="text" value="" placeholder="请输入验证码" />
				<div class="code-btn">
					<button type="default">发送验证码</button>
				</div>
			</view>
		</view>
		<!-- 提交按钮 -->
		<view class="btn-wrap">
			<view class="submit">
				<button type="default">下一步</button> 
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
	.container{
		box-sizing: border-box;
		padding: 20rpx;
	}
	.form-wrap{
		background: pink;
		padding: 50rpx 0;
	}
	.form-input{
		position: relative;
		padding: 10rpx 0;
		box-sizing: border-box;
		width: 100%;
		height: 55px;
		border-bottom: 1rpx solid black;
		.form-lab{
			position: absolute;
			bottom: 0;
			height: 100%;
			label{
				line-height: 55px;
			}
		}
		input{
			padding:20rpx 30rpx 20rpx 100px;
			text-align: right;
		}
	}
	.form-code{
		position: relative;
		input{
			padding-right: 100px;
		}
		.code-btn{
			display: flex;
			align-items: center;
			position: absolute;
			right: 0;
			bottom: 0;
			height: 100%;
		}
		button{
			font-size: $uni-font-size-sm;
			height: 35px;
			line-height: 35px;
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
