<template>
		<view class="uni-padding-wrap">
			<swiper class="swiper" :style="{height: swiperHeight + 'px'}" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" 
			:duration="duration" 
			:current="current"
			@change="swiperChange"
			>
				<swiper-item class="swiper-item" v-for="(item,index) in bannerPics" :key="index">
					<image class="banner-img" :src="item" mode="widthFix" lazy-load="true"></image>
				</swiper-item>
			</swiper>
			<!-- 自定义小圆点 -->
			<view class="status-point">
				<view class="item" :class="{'active': current === index}" v-for="(item,index) in bannerPics.length" :key="index"></view>
			</view>
		</view>
</template>

<script>
	export default {
		props: [
			
		],
		data() {
			return {
				current: 0,// 横幅索引
				indicatorDots: false,
				autoplay: false,
				interval: 2000,
				duration: 500,
				swiperHeight: 0,
				bannerPics:['../../static/images/banner.jpg',
				'../../static/images/banner.jpg',
				'../../static/images/banner.jpg']
			}
		},
		methods: {
			swiperChange(e) {
				this.current = e.detail.current || e.target.current;
			},
			// swiper自适应高度 swiper插件必须要一个高度撑开 获取图片自适应的高度然后给swiper
			getElementHeight(element) {
				let query = uni.createSelectorQuery().in(this);
				query.select(element).boundingClientRect();
				setTimeout(()=>{
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
				},200);
			}
		},
		onReady() {
			this.getElementHeight('.banner-img');
		}
	}
</script>

<style lang="scss" scoped>
	.swiper{
		position: relative;
		height: 100%;
	}
	.uni-padding-wrap{
		position: relative;
		.status-point{
			position: absolute;
			bottom: 0;
			padding: 30rpx 45rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: flex-end;
			width: 100%;
			.item{
				box-sizing: border-box;
				margin-left: 10px;
				width: 8rpx;
				height: 8rpx;
				line-height: 20rpx;
				border-radius: 50%;
				background-color: #FFFFFF;
			}
			.active{
				width: 10rpx;
				height: 10rpx;
				background-color: #f27721;
			}
		}
	}
	.swiper-item{
		image{
			width: 100%;
		}		
	}
</style>
