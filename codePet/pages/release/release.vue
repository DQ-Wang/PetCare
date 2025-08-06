<template>
  <view class="pet-container">
    <image class="back-arrow" src="/static/汪汪喵切图/发布/左箭头.png" @click="goBack"></image>

    <view class="edit-area">
      <view class="pic-upload">
        <uni-file-picker v-model="imageValue" fileMediatype="image" mode="grid" :limit="4" :image-styles="imageStyles"
          :autoUpload="false" ref="files" @select="select" @progress="progress" @success="success" @fail="fail" />
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
          <view class="tag" :class="{'tag-selected': selectedTags.includes(item._id)}"
            @click="handleTagSelect(item._id)">
            {{item.name}}
          </view>
        </view>
      </view>
    </view>

    <view class="divider-line"></view>

    <view class="location-container" @click="gotoLocationList">
      <view class="location-title">
        <image src="/static/汪汪喵切图/发布/位置.png" style="width: 28rpx; height: 28rpx;"></image>
        <text>位置</text>
        <view class="spacer"></view>
        <image class="right-arrow" src="/static/汪汪喵切图/发布/右箭头.png" style="width: 11.22rpx; height: 19.36rpx;"></image>
      </view>

			 <scroll-view class="locations-wrap" scroll-x enable-flex>
				 <view v-for="(loc,index) in visibleLocations" :key="index">
					 <view 
						 class="location" 
						 :class="{'location-selected': selectedLocation === loc.title}"
						 @click.stop="handleLocationSelect(loc.title)"
					 >
						 {{loc.title}}
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
  import QQMapWX from '../../js_sdk/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js'
  import {
    ref,
    onMounted,
		onUnmounted,
		computed
  } from 'vue'

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

	//位置相关
  const qqmapsdk = ref(null)
  const currentLocation = ref(null)
  const locations = ref([]) //存储位置标签列表
  const locationLoaded = ref(false)
	const visibleLocations = computed(() => {
    return locations.value.slice(0, 4)
  })
  
  onMounted(() => {
    getTags()
    initMap()

		uni.$on('locationSelected', (locationData) => {
			console.log('收到位置选择事件', locationData)
			addNewLocation(locationData)
		})
  })

	const initMap = () => {
		qqmapsdk.value = new QQMapWX({
			key: 'NJDBZ-3U5KT-VVCXD-VKCO5-M6M33-6WFDR'
		})
		
		wx.getSetting({
			success: (res) => {
				if (res.authSetting['scope.userLocation']) {
					//已有权限，直接获取位置
					getCurrentLocation()
				} else {
					//请求位置授权
					wx.authorize({
						scope: 'scope.userLocation',
						success: () => {
							console.log('位置授权成功')
							getCurrentLocation()
						},
						fail: (err) => {
							console.log('位置授权失败', err)
							showLocationAuthDialog()
						}
					})
				}
			},
			fail: (err) => {
				console.error('获取设置失败', err)
				showLocationAuthDialog()
			}
		})
	}
  
  //显示位置授权提示弹窗
	const showLocationAuthDialog = () => {
		wx.showModal({
			title: '位置权限请求',
			content: '需要您的位置信息来查找附近地点',
			success(res) {
				if (res.confirm) {
					wx.openSetting({
						success(settingRes) {
							if (settingRes.authSetting['scope.userLocation']) {
								getCurrentLocation()
							} else {
								wx.showToast({ title: '权限请求被拒绝', icon: 'none' })
							}
						}
					})
				}
			}
		})
	}
  
  //获取当前位置
  const getCurrentLocation = () => {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log('获取位置成功', res)
        currentLocation.value = {
          latitude: res.latitude,
          longitude: res.longitude
        }
        getNearbyPOI()
      },
      fail: (err) => {
				console.error('获取位置失败', err)
				uni.showModal({
					title: '定位失败',
					content: '请检查位置权限设置',
					showCancel: false,
					success: () => {
						wx.openSetting()
					}
				})
      }
    })
  }
  
  //获取附近地点
  const getNearbyPOI = () => {
    if (!currentLocation.value) return
    
    qqmapsdk.value.reverseGeocoder({
      location: {
        latitude: currentLocation.value.latitude,
        longitude: currentLocation.value.longitude
      },
      get_poi: 1,
      poi_options: "radius=150;page_size=8;policy=2;orderby=_distance",
      success: (res) => {
        if (res.result?.pois?.length > 0) {
          const sortedPois = res.result.pois.sort((a, b) => a._distance - b._distance)
          
          const nearbyLocations = sortedPois.map(poi => ({
            title: poi.title,
            distance: poi._distance,
            poi: poi
          }))
          
          if (nearbyLocations[0].distance > 200) {
            nearbyLocations.unshift({
              title: '当前位置',
              distance: 0,
              poi: null
            })
          }
          
          locations.value = nearbyLocations
        } else {
          locations.value = [
            {title: '当前位置', distance: 0, poi: null}
          ]
        }
        locationLoaded.value = true
      },
      fail: (err) => {
        console.error('获取地点失败', err)
        locations.value = [
          {title: '当前位置', distance: 0, poi: null}
        ]
        locationLoaded.value = true
      }
    })
  }
  
  //跳转到位置选择列表页
  const gotoLocationList = () => {
    if (!locationLoaded.value) {
      return uni.showToast({ title: '地点信息尚未加载完成', icon: 'none' })
    }
    
    if (currentLocation.value) {
      uni.navigateTo({
        url: `/pages/release/locationList?lat=${currentLocation.value.latitude}&lng=${currentLocation.value.longitude}`
      })
    } else {
      uni.showToast({ title: '位置信息未获取，请稍后再试', icon: 'none' })
    }
  }
  
  // 添加新位置到标签列表并选中
  const addNewLocation = (locationData) => {
    console.log('[发布页] 添加新位置:', locationData.title)
    
    const exists = visibleLocations.value.some(loc => {
      if (loc.poi && locationData.poi && loc.poi.id) {
        return loc.poi.id === locationData.poi.id
      }

      return loc.title.trim().toLowerCase() === locationData.title.trim().toLowerCase()
    })
    
    if (!exists) {
      console.log('位置不存在，添加新位置')
      locations.value.unshift({
        title: locationData.title,
        poi: locationData.poi
      })
    } else {
      console.log('位置已存在:', locationData.title)
    }
    
    selectedLocation.value = locationData.title
  }
	
  //修改位置选择处理方法
  const handleLocationSelect = (location) => {
		selectedLocation.value = location
  }

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
  const getTags = async () => {
    try {
      const res = await db.collection('opendb-news-categories')
        .orderBy('sort', 'asc')
        .get()

      if (res.result && res.result.data) {
        tagList.value = res.result.data
      } else {
        console.error('标签数据获取失败', res)
        uni.showToast({
          title: '标签加载失败',
          icon: 'none'
        })
      }
    } catch (e) {
      console.error('获取标签错误:', e)
      uni.showToast({
        title: '标签加载失败',
        icon: 'none'
      })
    }
  }

  //处理标签选择
  const handleTagSelect = (tagId) => {
    const MAX_TAGS = 3;
    const index = selectedTags.value.indexOf(tagId);

    if (index === -1) {
      if (selectedTags.value.length >= MAX_TAGS) {
        return uni.showToast({
          title: `最多选择${MAX_TAGS}个标签`,
          icon: 'none'
        });
      }
      selectedTags.value.push(tagId);
    } else {
      selectedTags.value.splice(index, 1);
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
    if (!title.value.trim()) return uni.showToast({
      title: '请输入标题',
      icon: 'none'
    });
    if (!content.value.trim()) return uni.showToast({
      title: '请输入正文内容',
      icon: 'none'
    });
    if (selectedTags.value.length === 0) return uni.showToast({
      title: '请选择至少一个标签',
      icon: 'none'
    });

    uni.showLoading({
      title: '发布中...',
      mask: true
    });

    try {
      let imageFileIDs = [];

      // 上传文件（不再获取临时 URL）
      let uploadResult = [];
      if (imageValue.value.length > 0) {
        uploadResult = await files.value.upload();
        console.log('upload result:', JSON.stringify(uploadResult, null, 2))
        console.log('上传结果:', uploadResult);

        // 提取上传成功的 fileID
        imageFileIDs = uploadResult.map(item => item.fileID || item.url).filter(id => typeof id === 'string' && id
          .startsWith('cloud://'));
        console.log('上传的 fileID:', imageFileIDs);
      }
      if (imageFileIDs.length !== uploadResult.length) {
        throw new Error('有图片上传失败或 fileID 非法')
      }
      const postData = {
        header: title.value,
        content: content.value,
        category_id: selectedTags.value,
        images: imageFileIDs, // ✅ 只存 fileID
      };

      if (selectedLocation.value) {
        postData.location = {
          address: selectedLocation.value
        };
      }

      await db.collection('posts').add(postData);

      uni.showToast({
        title: '发布成功',
        icon: 'success'
      });
      // // 清空表单信息
      // title.value = ''; // 清空标题
      // content.value = ''; // 清空正文
      // selectedTags.value = []; // 清空标签选择
      // selectedLocation.value = ''; // 清空位置选择
      // imageValue.value = []; // 清空图片选择

      // // 手动清空 uni-file-picker 中的图片
      // if (files.value && files.value.clear) {
      //   files.value.clear();
      // }
      uni.reLaunch({
        url: '/pages/release/release' // 重新加载当前页面
      });

      setTimeout(() => {
        uni.switchTab({
          url: '/pages/Commity/Commity'
        });
      }, 1500);

    } catch (err) {
      console.error('发布失败:', err);
      uni.showToast({
        title: '发布失败: ' + (err.message || '请检查网络'),
        icon: 'none',
        duration: 3000
      });
    } finally {
      uni.hideLoading();
    }
  };
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
        display: none;
        /* 隐藏标题 */
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
    padding: 10rpx 38rpx;

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
			padding: 10rpx 0;

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