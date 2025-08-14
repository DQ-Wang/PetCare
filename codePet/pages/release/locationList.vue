<template>
  <view class="location-list-container">    
    <scroll-view class="location-list" scroll-y>
      <view 
        v-for="(poi, index) in locations" 
        :key="index"
        class="location-item"
        @click="selectLocation(poi)"
      >
        <image 
          class="location-icon" 
          src="/static/汪汪喵切图/发布/位置.png"
        ></image>
        <view class="location-info">
          <text class="name">{{ poi.title }}</text>
          <text class="distance">{{ poi.distance }}米</text>
          <text class="address">{{ poi.address }}</text>
        </view>
      </view>
      
      <view v-if="locations.length === 0" class="empty-tip">
        <text>未找到附近地点</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import QQMapWX from '../../js_sdk/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js'

// 获取参数
const query = ref({})
const qqmapsdk = ref(null)
const locations = ref([])

onMounted(() => {
  const pages = getCurrentPages()
  if (pages.length) {
    const currentPage = pages[pages.length - 1]
    query.value = currentPage.options || {}
    initMap()
  }
})

const initMap = () => {
  qqmapsdk.value = new QQMapWX({
    key: 'NJDBZ-3U5KT-VVCXD-VKCO5-M6M33-6WFDR'
  })
  
  // 确保参数存在且有效
  if (query.value.lat && query.value.lng) {
    searchNearby(parseFloat(query.value.lat), parseFloat(query.value.lng))
  } else {
    console.error('位置参数缺失:', query.value)
    uni.showToast({
      title: '位置参数错误',
      icon: 'none'
    })
  }
}

const searchNearby = (lat, lng) => {
  qqmapsdk.value.reverseGeocoder({
    location: {
      latitude: lat,
      longitude: lng
    },
    get_poi: 1,
    poi_options: "radius=500;page_size=20;orderby=_distance", // 按距离排序
    success: (res) => {
      if (res.result?.pois) {
        // 按距离排序并添加距离信息
        locations.value = res.result.pois
          .sort((a, b) => a._distance - b._distance)
          .map(poi => ({
            ...poi,
            distance: poi._distance
          }))
      }
    }
  })
}

// 修改选择位置方法，传递完整POI对象
const selectLocation = (poi) => {
  // 通过全局事件回传选择的完整POI对象
  uni.$emit('locationSelected', {
    title: poi.title,
    poi: poi
  })
  goBack()
}

const goBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss">
.location-list-container {
  padding: 20rpx;
  height: 100vh;
  background-color: #f6f7fb;
  
  .location-list {
    height: calc(100vh - 100rpx);
    
    .location-item {
      display: flex;
      align-items: center;
      padding: 30rpx;
      border-bottom: 1rpx solid #eee;
      
      .location-icon {
        width: 40rpx;
        height: 40rpx;
        margin-right: 20rpx;
      }
      
      .location-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        
        .name {
          font-size: 32rpx;
          margin-bottom: 10rpx;
        }
        
        .distance {
          font-size: 24rpx;
          color: #4CAF50;
        }
        
        .address {
          font-size: 26rpx;
          color: #999;
        }
      }
    }
    
    .empty-tip {
      text-align: center;
      padding: 100rpx 0;
      color: #999;
    }
  }
}
</style>