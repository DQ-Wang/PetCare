<template>
  <view class="post-detail">
    <view v-if="post">
      <text class="header">{{post.header}}</text>
      <image 
        v-for="(img, index) in post.images" 
        :key="index" 
        :src="img" 
        mode="widthFix" 
        style="width: 100%; margin-top: 10rpx;"
      ></image>
      <text class="content">{{post.content}}</text>
      <text class="info">用户ID：{{post.user_id}}  点赞数：{{post.like_count}}</text>
    </view>
    <view v-else>
      <text>数据加载中...</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 定义响应式数据
const post = ref(null);
const postId = ref('68207350c1603363f7fb9e9f');

// 定义获取数据的方法
const getpostData = async () => {
  try {
    const res = await uniCloud.callFunction({
      name: 'id_test',
      data: {
        _id: postId.value
      }
    });
    
    if (res.result.code === 200) {
      post.value = res.result.data;
    } else {
      uni.showToast({
        title: res.result.message || '获取数据失败',
        icon: 'none'
      });
    }
  } catch (error) {
    console.error('获取数据出错:', error);
    uni.showToast({
      title: '网络请求出错',
      icon: 'none'
    });
  }
};

// 组件挂载后执行数据获取
onMounted(() => {
  getpostData();
});
</script>

<style scoped>
.post-detail {
  padding: 20rpx;
}
.header {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}
.content {
  margin-top: 10rpx;
  line-height: 40rpx;
}
.info {
  margin-top: 10rpx;
  color: #999;
  font-size: 24rpx;
}
</style>