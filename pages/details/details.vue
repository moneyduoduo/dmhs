<template>
	<view class="container">
		<!-- 标题 -->
		<view class="title">
			<text class="text">{{info.title}}</text>
		</view>
		<!-- 副标题 -->
		<view class="subtitle">
			<text class="company">{{info.company}}</text>
			<text class="time">{{info.date}}</text>
		</view>
		<!-- 图片列表 -->
		<view class="imgs">
			<image :src="info.pic" mode="widthFix"></image>
		</view>
		<!-- 详情介绍 -->
		<view class="info">
			<text class="text">{{info.content}}</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{
					title:'2017年要干嘛干嘛咋地咋地',
					company: '大全矿业',
					date:'2018/05/07',
					pic:'../../static/images/terms-pic2.png',
					content:'APP-vue和小程序中，请勿在 scroll-view 中使用 map、video 等原生组件。小程序中 scroll-view 中也不要使用 canvas、textarea 原生组件。更新：微信基础库2.4.4起支持了原生组件在 scroll-view、swiper、movable-view 中的使用。app-nvue无此限制'
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.container{
		padding: 40rpx;
		.title{
			.text{
				font-size: $my-title-size;
				font-weight: $my-title-weight;
			}
		}
		.subtitle{
			padding: 10px 0;
			font-size: $my-content-size;
			color: $my-content-color;
			.time{
				padding-left: 30px;
			}
		}
		.imgs{
			padding: 10px 0;
			padding-top: 15px;
			image{
				width: 100%;
			}
		}
		.info{
			.text{
				font-size: $my-title-size;
				letter-spacing: $my-content-letter-spacing;
			}
		}
	}
	
</style>
