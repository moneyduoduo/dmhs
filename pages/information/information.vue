<!-- 内容列表 -->
<template>
	<view>
		<my-navbar>
			<text slot="content">内容列表</text>
		</my-navbar>
		<scroll-view class="scroll" :scroll-y="true" @scrolltolower="toLower" :lower-threshold="10">
			<view class="container">
				<view class="item" v-for="(item, index) in List" :key="index" @click="toDetail(item)">
					<!-- 左侧图片 -->
					<view class="left" v-if="item.pic != ''">
						<image :src="item.pic" mode="widthFix"></image>
					</view>
					<!-- 右侧列表内容 -->
					<view class="right" :class="{padding: item.pic != ''}">
						<!-- 头部标题和时间 -->
						<view class="header">
							<text class="title">{{item.title}}</text>
							<text class="date">{{item.date}}</text>
						</view>
						<text class="text">{{item.content}}</text>
					</view>
				</view>
				<view class="loading" v-if="loading && !noMore">加载更多...</view>
				<view class="more" v-if="noMore">没有更多了</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {linkTo} from '@/utils/utils.js'
	export default {
		data() {
			return {
				noMore: false,
				loading: false,
				List:[
					{title: '合作案例更行提示合作案例更行提', date:'05/12', 
					content: '这是一个关于新闻的文字这是一个关于新闻的文字这是一个关于新闻的文字这是一个关于新闻的文字这是一个关于新闻的文字这是一个关于新闻的文',
					pic:'../../static/images/desc-company-bg.png'},
					{title: '合作案例更行提示', date:'05/12', content: '这是一个关于新闻的文字这是一个关于新闻的文字这是一个关于新闻的文字',
					pic:'../../static/images/desc-company-bg.png'},
					{title: '合作案例更行提示', date:'05/12', content: '这是一个关于新闻的文字这是一个关于新闻的文字这是一个关于新闻的文字',
					pic:'../../static/images/desc-company-bg.png'},
					{title: '合作案例更行提示', date:'05/12', content: '这是一个关于新闻的文字这是一个关于新闻的文字这是一个关于新闻的文字',
					pic:''},
					{title: '合作案例更行提示', date:'05/12', content: '这是一个关于新闻的文字这是一个关于新闻的文字这是一个关于新闻的文字',
					pic:''},
					{title: '合作案例更行提示', date:'05/12', content: '这是一个关于新闻的文字这是一个关于新闻的文字这是一个关于新闻的文字',
					pic:''},
					{title: '合作案例更行提示', date:'05/12', content: '这是一个关于新闻的文字这是一个关于新闻的文字这是一个关于新闻的文字',
					pic:''},
					{title: '合作案例更行提示', date:'05/12', content: '这是一个关于新闻的文字这是一个关于新闻的文字这是一个关于新闻的文字',
					pic:''}
				]
			};
		},
		methods:{
			// 底部下拉加载更多
			toLower() {
				this.loading = true;
			},
			// 点击跳转详情
			toDetail(info) {
				let id = 123123;
				linkTo('../information/details?id=' + id);
			}
		}
	}
</script>

<style lang="scss">
	.container{
		padding: 0 40rpx;
		padding-bottom: 90rpx;
		box-sizing: border-box;
		.item{
			@include border-1px(#eeeeee)
			padding: 30rpx 0;
			display: flex;
			.left{
				flex-shrink: 0;
				width: 285rpx;
				display: flex;
				align-items: center;
				image{
					width: 100%; 
					border-radius: 16rpx;
				}
			}
			.padding{
				padding-left: 20rpx;
			}
			.right{
				.header{
					position: relative;
					.title{
						overflow: hidden;
						text-overflow: ellipsis;
						word-break: break-all;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp:2;
						font-size: 34rpx;
						font-weight: 700;
						line-height: 48rpx;
						letter-spacing: 0rpx;
						color: #252525;
					}
					.date{
						position: absolute;
						bottom: 0;
						right: 0;
						font-size: 26rpx;
						font-weight: normal;
						line-height: 45rpx;
						letter-spacing: 0.3rpx;
						color: #a4a4a4;
					}
				}
				.text{
					padding-top: 28rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp:2;
					font-size: 30rpx;
					font-weight: normal;
					line-height: 45rpx;
					letter-spacing: 0.3rpx;
					color: #a4a4a4;
				}
			}
		}
		.loading, .more{
			text-align: center;
		}
	}
</style>
