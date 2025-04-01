<template>
	<view class="pet-container">
		<image class="back-arrow" src="/static/汪汪喵切图/发布/左箭头.png"></image>

		<view class="edit-area">
			<view class="pic-upload">
				<uni-file-picker 
					limit="4"
					del-icon
					:image-styles="imageStyles"
				/>
			</view>
			
			<view class="text-upload">
				<input 
					placeholder="添加标题"
					maxlength="10"
					placeholder-class="title-placeholder"
					class="title-area"
				/>
				
				<textarea
				  placeholder="添加正文"
				  placeholder-class="main-placeholder"
				  class="main-area"
				  auto-height
				  :maxlength="-1" 
				/>
			</view>
		</view>
		
		<view class="tag-contianer">
			<view class="tag-title">
				<image src="/static/汪汪喵切图/发布/标签.png" style="width: 28rpx; height: 28rpx;"></image>
				<text>标签</text>				
			</view>

			<view class="tags-wrap">
				<view v-for="(tag,index) in tags" :key="index">
					<view class="tag">
						{{tag}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="divider-line"></view>
		
		<view class="location-contianer">
			<view class="location-title">
				<image src="/static/汪汪喵切图/发布/位置.png" style="width: 28rpx; height: 28rpx;"></image>
				<text>位置</text>
				<view class="spacer"></view>
				<image class="right-arrow" src="/static/汪汪喵切图/发布/右箭头.png" style="width: 11.22rpx; height: 19.36rpx;"></image>
			</view>
			
			<scroll-view 
				class="locations-wrap" 
				scroll-x 
				enable-flex
			>
				<view v-for="(loc,index) in locations" :key="index">
					<view class="location">
						{{loc}}
					</view>
				</view>
			</scroll-view>
		</view>
		
		<button class="release-button">
			<image src="/static/汪汪喵切图/发布/发布.png" style="width: 47rpx; height: 47rpx;"></image>
			<view class="release-text">
				发布笔记
			</view>
		</button>
	</view>
		
</template>

<script>
	export default {
		data() {
			return {
				imageStyles:{
					width:95,
					height:95,
					border:{
						radius:'13rpx',
					},
				},
				tags: ['日常', '宠粮', '洗护', '代看', '救助', '领养', '知识', '经验'],
				locations: [
				    '厦门大学翔安校区',
				    '香山郊野公园',
				    '厦门大学翔安校区丰庭食堂',
					'厦门大学信息学院',
					'查看更多'	
				],
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
@import '@/petcareui/pet-global.css';
	  
.pet-container{
	background-color: rgba(246, 247, 251, 1);
}

.back-arrow{
	width: 16rpx;
	height: 28rpx;
	
	margin: 105rpx 0 0 36rpx;
}

.pic-upload{
	padding: 0 31rpx;
	margin-top: 51rpx;
	
	::v-deep .file-picker__box-content{
		background-color: rgba(229, 229, 229, 1);
	}
	
	::v-deep .icon-add{
		width: 55rpx;
		background-color: rgba(166, 166, 166, 1) !important;
	}
}

.text-upload{
	padding: 0 31rpx;
	margin-top: 41rpx;
	
	.title-area{
		height: 55rpx;
	}
	
	.title-placeholder{
		text-align: left;
		vertical-align: middle;
		font-size: 37.5rpx;
		font-weight: 500;
		letter-spacing: 3.13rpx;
		line-height: 54.3rpx;
		color: $p-text-secondary;
	}
	
	.main-area{
		width: 100%;
		min-height: 200rpx;
		margin-top: 27rpx;
	}
	
	.main-placeholder{
		font-size: 25rpx;
		font-weight: 400;
		letter-spacing: 1.56rpx;
		line-height: 36.2rpx;
		color: $p-text-secondary;
		text-align: left;
		vertical-align: middle;
	}
}

.tag-contianer, .location-contianer{
	padding: 0 38rpx;
	
	.tag-title,.location-title{
		height: 45rpx;
		display: flex;
		align-items: center;
		padding-right: 17rpx;
		
		text{
			margin-left: 16rpx;
			font-size: 18.75rpx;
			font-weight: 400;
			letter-spacing: 1.56rpx;
			line-height: 27.16rpx;
			color: $p-text-secondary;
		}
	}
	
	.location-title{
		position: relative;

		.spacer {
			flex: 1;
		}
		  
		.right-arrow {
			margin-left: auto;
		}
	}

	.tags-wrap, .locations-wrap{

	    display: flex;
	    flex-wrap: wrap;
		margin-top: 36rpx;
		
		.tag,.location{
			margin: 0 15.5rpx 22rpx 15.5rpx;
			opacity: 0.5;
			border-radius: 40rpx;
			background: rgba(204, 204, 204, 1);
			
			padding: 9rpx 23rpx;
			font-size: 18.75rpx;
			font-weight: 400;
			letter-spacing: 0rpx;
			color: rgba(107, 107, 107, 1.0);
		}
		
		.location{
			padding: 9rpx 28rpx;
		}
	}
	
	.locations-wrap{
		display: flex;
		flex-wrap: nowrap;
	    overflow-x: auto;
	    white-space: nowrap; 
	}
}

.divider-line {
  margin: 23rpx 28rpx 45rpx 28rpx;
  height: 1rpx;
  background-color: rgba(166, 166, 166, 1);
}

.release-button{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 378.13rpx;
	height: 81.25rpx;
	border-radius: 16.5rpx;
	background: $p-primary-color;
	margin-top: 280rpx;
	
	.release-text{
		margin-left: 16rpx;
		font-size: 37.5rpx;
		font-weight: 400;
		letter-spacing: 1.56rpx;
		line-height: 54.3rpx;
		color: $p-text-color;
	}
}
	
</style>
