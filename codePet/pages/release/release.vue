<template>
	<view class="pet-container">
		<image class="back-arrow" src="/static/汪汪喵切图/发布/左箭头.png" @click="goBack"></image>

		<view class="edit-area">
			<view class="pic-upload">
				<view class="upload-container">
					<!-- 已上传的图片预览 -->
					<view v-for="(file, index) in previewImages" :key="index" class="image-preview">
						<image :src="file.url" mode="aspectFill" class="preview-img"></image>
						<view class="delete-icon" @click="handleDeleteImage(index)">×</view>
					</view>
					<!-- 上传按钮 -->
					<view class="upload-box" v-if="previewImages.length < 4" @click="chooseImage">
						<view class="upload-icon">+</view>
					</view>
				</view>
			</view>
			
			<view class="text-upload">
				<input 
					v-model="title"
					placeholder="添加标题"
					maxlength="10"
					placeholder-class="title-placeholder"
					class="title-area"
				/>
				
				<textarea
				  v-model="content"
				  placeholder="添加正文"
				  placeholder-class="main-placeholder"
				  class="main-area"
				  auto-height
				  :maxlength="-1" 
				/>
			</view>
		</view>
		
		<view class="tag-container">
			<view class="tag-title">
				<image src="/static/汪汪喵切图/发布/标签.png" style="width: 28rpx; height: 28rpx;"></image>
				<text>标签</text>				
			</view>

			<view class="tags-wrap">
				<view v-for="(tag,index) in tags" :key="index">
					<view 
						class="tag" 
						:class="{'tag-selected': selectedTags.includes(tag)}"
						@click="handleTagSelect(tag)"
					>
						{{tag}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="divider-line"></view>
		
		<view class="location-container">
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
					<view 
						class="location"
						:class="{'location-selected': selectedLocation === loc}"
						@click="handleLocationSelect(loc)"
					>
						{{loc}}
					</view>
				</view>
			</scroll-view>
		</view>
		
		<button class="release-button" @click="handleRelease">
			<image src="/static/汪汪喵切图/发布/发布.png" style="width: 47rpx; height: 47rpx;"></image>
			<view class="release-text">
				发布笔记
			</view>
		</button>
	</view>
		
</template>

<script setup>
import { ref } from 'vue'

// 响应式变量声明
const title = ref('')
const content = ref('')
const selectedFiles = ref([])
const selectedTags = ref([])
const selectedLocation = ref('')
const previewImages = ref([])

// 标签和位置数据
const tags = ref(['日常', '宠粮', '洗护', '代看', '救助', '领养', '知识', '经验'])
const locations = ref([
    '厦门大学翔安校区',
    '香山郊野公园',
    '厦门大学翔安校区丰庭食堂',
	'厦门大学信息学院',
	'查看更多'	
])

// 选择图片
const chooseImage = () => {
	const remainCount = 4 - previewImages.value.length
	if (remainCount <= 0) {
		uni.showToast({
			title: '最多只能上传4张图片',
			icon: 'none'
		})
		return
	}
	
	uni.chooseImage({
		count: remainCount,
		sizeType: ['compressed'],
		sourceType: ['album', 'camera'],
		success: (res) => {
			const tempFilePaths = res.tempFilePaths
			const tempFiles = res.tempFiles
			
			// 添加到预览列表
			tempFilePaths.forEach((path, index) => {
				previewImages.value.push({
					url: path,
					file: tempFiles[index]
				})
			})
			
			// 更新selectedFiles用于表单提交
			selectedFiles.value = tempFiles
		},
		fail: (err) => {
			console.error('选择图片失败：', err)
		}
	})
}

// 删除图片
const handleDeleteImage = (index) => {
	previewImages.value.splice(index, 1)
	selectedFiles.value.splice(index, 1)
}

// 处理标签选择
const handleTagSelect = (tag) => {
	const index = selectedTags.value.indexOf(tag)
	if (index === -1) {
		selectedTags.value.push(tag)
	} else {
		selectedTags.value.splice(index, 1)
	}
}

// 处理位置选择
const handleLocationSelect = (location) => {
	selectedLocation.value = location
}

// 返回上一页
const goBack = () => {
	// 切换到首页tab
	uni.switchTab({
		url: '/pages/home/home'
	})
}

// 发布函数，使用uni.uploadFile上传
const handleRelease = async () => {
	if (!title.value.trim()) {
		uni.showToast({
			title: '请输入标题',
			icon: 'none'
		})
		return
	}
	
	if (!content.value.trim()) {
		uni.showToast({
			title: '请输入正文内容',
			icon: 'none'
		})
		return
	}
	
	try {
		const formData = {
			title: title.value,
			content: content.value,
			tags: JSON.stringify(selectedTags.value),
			location: selectedLocation.value
		}
		
		// 上传图片和数据
		if (selectedFiles.value.length > 0) {
			const uploadTasks = selectedFiles.value.map((file, index) => {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: 'YOUR_API_ENDPOINT',
						filePath: file.path,
						name: `image${index}`,
						formData: formData,
						success: (res) => {
							if (res.statusCode === 200) {
								resolve(res.data)
							} else {
								reject(new Error('上传失败'))
							}
						},
						fail: (err) => {
							reject(err)
						}
					})
				})
			})
			
			await Promise.all(uploadTasks)
			
			uni.showToast({
				title: '发布成功',
				icon: 'success'
			})
			setTimeout(() => {
				uni.navigateBack()
			}, 1500)
		}
	} catch (error) {
		uni.showToast({
			title: error.message || '发布失败',
			icon: 'none'
		})
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
	padding: 0 45rpx;
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

.tag-container, .location-container{
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
			transition: all 0.3s ease;
			
			&.tag-selected, &.location-selected {
				opacity: 1;
				background: $p-primary-color;
				color: $p-text-color;
			}
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
	margin-top: 190rpx;
	
	.release-text{
		margin-left: 16rpx;
		font-size: 37.5rpx;
		font-weight: 400;
		letter-spacing: 1.56rpx;
		line-height: 54.3rpx;
		color: $p-text-color;
	}
}

.upload-container {
	display: flex;
	flex-wrap: wrap;
	gap: 20rpx;
	padding: 20rpx;
}

.image-preview {
	position: relative;
	width: 180rpx;
	height: 180rpx;
	border-radius: 13rpx;
	overflow: hidden;
}

.preview-img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.delete-icon {
	position: absolute;
	top: 6rpx;
	right: 6rpx;
	width: 40rpx;
	height: 40rpx;
	background: rgba(0, 0, 0, 0.4);
	color: #fff;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24rpx;
}

.upload-box {
	width: 180rpx;
	height: 180rpx;
	background: rgba(229, 229, 229, 1);
	border-radius: 13rpx;
	cursor: pointer;
	-webkit-tap-highlight-color: transparent;
	outline: none;
	
	&:active, &:focus {
		background: rgba(229, 229, 229, 1);
	}
}

.upload-icon {
	font-size: 140rpx;
	color: rgba(166, 166, 166, 1);
	line-height: 160rpx;
	text-align: center;
	user-select: none;
}
</style>
