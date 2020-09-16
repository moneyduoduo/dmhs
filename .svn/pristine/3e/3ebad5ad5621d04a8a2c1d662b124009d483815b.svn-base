<!-- 自定义头部导航栏 -->
<template>
	<view>
		<!-- 固定到顶部 -->
		<view class="nav-wrap" :style="'background:' + navBarColor">
			<view class="nav-bar" :style="'height:' +  navBarHeight + 'px;' + 'padding-top:' + navBarTop + 'px;padding-bottom:10rpx'">
				<view class="left" :style="'top:' + navBarTop + 'px;'" @click="backTo">
					<uni-icons :color="backColor"  class="back" type="arrowleft" size="22rpx"></uni-icons>
				</view>
				<!-- 自定义插槽 -->
				<slot name="content"></slot>
			</view>
		</view>
		<!-- 占位 -->
		<view :style="'height:' +  navBarHeight + 'px;' + 'padding-top:' + navBarTop + 'px;padding-bottom:10rpx'"></view>
	</view>
</template>

<script>
	import {backTo} from '@/utils/utils.js'
	export default {
		props:{
			// 导航栏背景颜色 默认白色
			"navBarColor":{
				default: '#ffffff'
			},
			// 左侧返回键颜色
			"backColor": {
				default: '#333333'
			}
		},
		data() {
			return {
				navBarTop: this.$customBar.top,
				navBarHeight: this.$customBar.height
			};
		},
		methods:{
			backTo() {
				backTo();
			}
		},
		onReady() {
		}
	}
</script>

<style lang="scss">
	.nav-wrap{
		z-index: 999;position: fixed;top: 0;width: 100%;
	}
	.nav-bar{
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		padding:0 40rpx;
		.left{
			padding-right: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			bottom: 0; 
			left: 40rpx;
		}
		image{
			height: 100%;
		}
		text{
			font-size: 28rpx;
			font-weight: 700;
			color: #000000;
		}
	}
</style>
