<template>
	<view class="pet-container">
		<image class="back-arrow" src="/static/汪汪喵切图/发布/左箭头.png" @click="goBack"></image>

		<view class="edit-area">
			<view class="pic-upload">
				<uni-file-picker
					v-model="imageValue"
					fileMediatype="image"
					mode="grid"
					:limit="4"
					:image-styles="imageStyles"
					:autoUpload="false"
					ref="files"
					@select="select" 
					@progress="progress" 
					@success="success" 
					@fail="fail"
				/>
			</view>

			<view class="text-upload">
				<input v-model="title" placeholder="添加标题" maxlength="10" placeholder-class="title-placeholder"
					class="title-area" />

				<textarea v-model="content" placeholder="添加正文" placeholder-class="main-placeholder" class="main-area"
					auto-height :maxlength="-1" />
			</view>
		</view>

		<view class="tag-container">
			<view class="tag-title">
				<image src="/static/汪汪喵切图/发布/标签.png" style="width: 28rpx; height: 28rpx;"></image>
				<text>标签</text>
			</view>

			<view class="tags-wrap">
				<view v-for="item in tagList" :key="item._id">
					<view 
						class="tag"
						:class="{'tag-selected': selectedTags.includes(item._id)}"
						@click="handleTagSelect(item._id)"
					>
						{{item.name}}
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

			<scroll-view class="locations-wrap" scroll-x enable-flex>
				<view v-for="(loc,index) in locations" :key="index">
					<view class="location" :class="{'location-selected': selectedLocation === loc}"
						@click="handleLocationSelect(loc)">
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
import { ref, onMounted } from 'vue'

const db = uniCloud.database();
    
//文件上传相关
const files = ref(null)
const imageValue = ref([])
    
//表单数据
const title = ref('')
const content = ref('')
const selectedTags = ref([])
const selectedLocation = ref('') 
    
//标签数据（从数据库获取）
const tagList = ref([]) 
    
//位置数据
const locations = ref([
    '厦门大学翔安校区',
    '香山郊野公园',
    '厦门大学翔安校区丰庭食堂',
    '厦门大学信息学院',
    '查看更多'
])
    
//图片上传的配置
const imageStyles = ref({
    width: 95,
    height: 95,
    border: {
        color: "#eee", 
        width: "1px",  
        style: "solid",
        radius: "13rpx"
    }
})
    
//获取标签数据
const getTags = async() => {
    try {
        const res = await db.collection('opendb-news-categories')
            .orderBy('sort', 'asc')
            .get()
        
        if(res.result && res.result.data) {
            tagList.value = res.result.data
        } else {
            console.error('标签数据获取失败', res)
            uni.showToast({ title: '标签加载失败', icon: 'none' })
        }
    } catch(e) {
        console.error('获取标签错误:', e)
        uni.showToast({ title: '标签加载失败', icon: 'none' })
    }
}

//处理标签选择
const handleTagSelect = (tagId) => {
    const MAX_TAGS = 3;
    const index = selectedTags.value.indexOf(tagId);
    
    if (index === -1) {
        if (selectedTags.value.length >= MAX_TAGS) {
            return uni.showToast({ title: `最多选择${MAX_TAGS}个标签`, icon: 'none' });
        }
        selectedTags.value.push(tagId);
    } else {
        selectedTags.value.splice(index, 1);
    }
}
    
//处理位置选择
const handleLocationSelect = (location) => {
    if (location === '查看更多') {
        // 实际项目中接入位置API
        uni.showToast({ title: '位置功能待实现', icon: 'none' });
    } else {
        selectedLocation.value = location;
    }
}
    
//返回上一页
const goBack = () => {
    uni.switchTab({
        url: '/pages/home/home'
    })
}
    
// 文件上传相关事件
function select(e) {
    console.log('选择文件：', e)
    console.log(imageValue)
}

function progress(e) {
    console.log('上传进度：', e)
}

function success(e) {
    console.log('上传成功', e)
}

function fail(e) {
    console.log('上传失败：', e)
}

//发布功能
const handleRelease = async () => {
    //表单验证
    if (!title.value.trim()) return uni.showToast({ title: '请输入标题', icon: 'none' })
    if (!content.value.trim()) return uni.showToast({ title: '请输入正文内容', icon: 'none' })
    if (selectedTags.value.length === 0) return uni.showToast({ title: '请选择至少一个标签', icon: 'none' })

    uni.showLoading({ title: '发布中...', mask: true })

    try {
        let imageFileIDs = []   //图片文件ID
		let imageUrls = [] //最终可访问的图片URL

        //处理图片上传
        if (imageValue.value.length > 0) {
			try {
                //执行上传并等待返回结果
                const uploadResult = await files.value.upload()
                console.log('上传结果:', uploadResult)

                //提取所有上传成功文件的fileID
                const fileIDs = uploadResult.map(item => item.fileID || item.url)
                console.log('提取的fileID:', fileIDs)

                //将fileID转换为可访问的URL
                const tempURLsRes = await uniCloud.getTempFileURL({
                    fileList: fileIDs
                })
                console.log('临时URL转换结果:', tempURLsRes)

                //提取成功的URL链接
                imageUrls = tempURLsRes.fileList.map(item => item.tempFileURL)
                console.log('转换后的图片URL:', imageUrls)
            } catch (uploadError) {
                console.error('文件上传失败:', uploadError)
                throw new Error('图片上传失败，请重试')
            }
        }
		
        //构造提交数据
        const postData = {
            header: title.value,
            content: content.value,
            category_id: selectedTags.value,
            images: imageUrls,
        }

        //添加位置信息
        if (selectedLocation.value) {
            postData.location = {
                name: selectedLocation.value,
                latitude: 0,
                longitude: 0
            }
        }

        //提交到数据库
        await db.collection('posts').add(postData)

        uni.showToast({ title: '发布成功', icon: 'success' })
        setTimeout(() => {
            uni.switchTab({ url: '/pages/home/home' })
        }, 1500)

    } catch (err) {
        console.error('发布失败:', err)
        uni.showToast({ 
            title: '发布失败: ' + (err.message || '请检查网络'), 
            icon: 'none',
            duration: 3000
        })
    } finally {
        uni.hideLoading()
    }
}
    
//页面加载时获取标签
onMounted(() => {
    getTags()
})
</script>

<style lang="scss">
  @import '@/petcareui/pet-global.css';

  .pet-container {
    background-color: rgba(246, 247, 251, 1);
  }

  .back-arrow {
    width: 16rpx;
    height: 28rpx;

    margin: 105rpx 0 0 36rpx;
  }

  .pic-upload {
	padding: 0 31rpx;
	margin-top: 51rpx;
	    
	/* 自定义uni-file-picker样式 */
	::v-deep .uni-file-picker {
	    .uni-file-picker__header {
			display: none; /* 隐藏标题 */
	    }
	      
	    .uni-file-picker__container {
	        margin-top: 0;
	    }
		
		.file-picker__box-content {
			background-color: #e5e5e5;
		} 
	      
	    .icon-add {
			width: 60rpx;
	        background-color: #a6a6a6 !important;
	        border-radius: 13rpx;
	    }
	}
  }

  .text-upload {
    padding: 0 45rpx;
    margin-top: 41rpx;

    .title-area {
      height: 55rpx;
    }

    .title-placeholder {
      text-align: left;
      vertical-align: middle;
      font-size: 37.5rpx;
      font-weight: 500;
      letter-spacing: 3.13rpx;
      line-height: 54.3rpx;
      color: $p-text-secondary;
    }

    .main-area {
      width: 100%;
      min-height: 200rpx;
      margin-top: 27rpx;
    }

    .main-placeholder {
      font-size: 25rpx;
      font-weight: 400;
      letter-spacing: 1.56rpx;
      line-height: 36.2rpx;
      color: $p-text-secondary;
      text-align: left;
      vertical-align: middle;
    }
  }

  .tag-container,
  .location-container {
    padding: 0 38rpx;

    .tag-title,
    .location-title {
      height: 45rpx;
      display: flex;
      align-items: center;
      padding-right: 17rpx;

      text {
        margin-left: 16rpx;
        font-size: 18.75rpx;
        font-weight: 400;
        letter-spacing: 1.56rpx;
        line-height: 27.16rpx;
        color: $p-text-secondary;
      }
    }

    .location-title {
      position: relative;

      .spacer {
        flex: 1;
      }

      .right-arrow {
        margin-left: auto;
      }
    }

    .tags-wrap,
    .locations-wrap {
      display: flex;
      flex-wrap: wrap;
      margin-top: 36rpx;

      .tag,
      .location {
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

        &.tag-selected,
        &.location-selected {
          opacity: 1;
          background: $p-primary-color;
          color: $p-text-color;
        }
      }

      .location {
        padding: 9rpx 28rpx;
      }
    }

    .locations-wrap {
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

  .release-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 378.13rpx;
    height: 81.25rpx;
    border-radius: 16.5rpx;
    background: $p-primary-color;
    margin-top: 190rpx;

    .release-text {
      margin-left: 16rpx;
      font-size: 37.5rpx;
      font-weight: 400;
      letter-spacing: 1.56rpx;
      line-height: 54.3rpx;
      color: $p-text-color;
    }
  }
</style>