<template>
		<view class="uni-padding-wrap">
			<swiper class="swiper" :style="{height: swiperHeight + 'px'}" 
			:indicator-dots="indicatorDots" 
			:autoplay="autoplay" 
			:interval="interval" 
			:duration="duration" 
			:next-margin="nextMargin"
			:current="current"
			@change="swiperChange"
			>
				<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
					<view class="item-wrap">
						<image class="banner-img" :src="item.pic" mode="widthFix" :lazy-load="true"></image>
						<view class="text">
							<text class="title">{{item.title}}</text>
							<text class="content">{{item.content}}</text>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<!-- 自定义小圆点 -->
			<view class="status-point">
				<view class="item" :class="{'active': current === index}" v-for="(item,index) in list.length" :key="index"></view>
			</view>
		</view>
</template>

<script>
	export default {
		props: [
			
		],
		data() {
			return {
				current: 0,
				indicatorDots: false,// 显示小圆点
				autoplay: false,// 自动播放
				interval: 2000,// 播放速度
				duration: 500,// 动画速度
				swiperHeight: 0,// 轮播控件高度
				nextMargin:'110rpx',// 显示下一张图的位置偏移
				list: [
					{pic: '../../static/images/terms-pic.png', title: '2017年中国航运企业国内沿海船队规模排行榜:远洋实战真是开始，详情报道请点击查看',content: '目前，上海船运交易所发布了《关于海洋保护法律》等等哔哩哔哩一大堆的东西嘿嘿嘿。'},
					{pic: '../../static/images/terms-pic.png', title: '2017年中国航运企业国内沿海船队规模排行榜:远洋实战真是开始，详情报道请点击查看',content: '目前，上海船运交易所发布了《关于海洋保护法律》等等哔哩哔哩一大堆的东西嘿嘿嘿。'},
					{pic: '../../static/images/terms-pic.png', title: '2017年中国航运企业国内沿海船队规模排行榜:远洋实战真是开始，详情报道请点击查看',content: '目前，上海船运交易所发布了《关于海洋保护法律》等等哔哩哔哩一大堆的东西嘿嘿嘿。'}				]
			}
		},
		methods: {
			swiperChange(e) {
				this.current = e.detail.current || e.target.current;
			},
			// swiper自适应高度 swiper插件必须要一个高度撑开 获取图片自适应的高度然后给swiper
			getElementHeight(element) {
				setTimeout(()=>{
					let query = uni.createSelectorQuery().in(this);
					query.select(element).boundingClientRect();
					query.exec((res) => {
						if (!res) {//如果没获取到，再调一次
							this.getElementHeight(element);
						}else {
							this.swiperHeight = res[0].height;
							if(this.swiperHeight === 240) {
								this.getElementHeight(element);
							}
						}
					})
				},200)
			}
		},
		onReady() {
			this.getElementHeight('.item-wrap');
		}
	}
</script>

<style lang="scss">
	.swiper{
		height: 100%;
	}
	.uni-padding-wrap{
		position: relative;
		padding-bottom: 50px;
		.status-point{
			position: absolute;
			bottom: 0;
			padding: 0 40rpx;
			padding-top: 35rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			width: 100%;
			.item{
				box-sizing: border-box;
				margin-left: 10px;
				width: 8rpx;
				height: 8rpx;
				line-height: 20rpx;
				border-radius: 50%;
				background-color: #e5e5e5;
			}
			.active{
				background-color: #f27721;
				width: 10rpx;
				height: 10rpx;
			}
		}
	}
	.swiper-item{
		.item-wrap{
			padding: 0 40rpx;
			width: 600rpx;
			image{
				border-radius: 20rpx;
				width: 100%;
			}
			.text{
				padding-top: 54rpx;
				.title, .content{
					display: block;
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
					display: -webkit-box;
					-webkit-box-orient: vertical;
				}
				.title{
					font-size: 39rpx;
					font-weight: 700;
					letter-spacing: 0rpx;
					color: #252525;
					-webkit-line-clamp:2;
				}
				.content{
					padding-top: 35rpx;
					font-size: 30rpx;
					font-weight: normal;
					line-height: 48rpx;
					letter-spacing: 0.3rpx;
					color: #a4a4a4;
					-webkit-line-clamp:1;
				}
			}
		}
	}
</style>
