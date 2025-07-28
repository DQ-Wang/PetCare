<template>
  <view class="pet-container">
    <view class="item" v-for="(item, index) in listData" :key="item._id">
      <!-- 封面图片 -->
      <image :src="getCoverImage(item)" mode="aspectFill" class="cover" />
      
      <!-- 内容区域 -->
      <view class="content">
        <!-- 标题 -->
        <view class="title">{{ item.header }}</view>
        
        <!-- 内容 -->
        <view class="info">{{ item.content }}</view>
        
        <!-- 发布者信息 -->
        <view class="author">
          <view class="author-name">{{ item?.user_id[0]?.nickname || "匿名" }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const db = uniCloud.database();
const listData = ref([]);

const getCoverImage = (item) => {
  return item.coverTempUrl || '/static/default-cover.png';
};

// 获取数据（优化图片处理）
const getData = async () => {
  try {
    const currentUser = uniCloud.getCurrentUserInfo();
    if (!currentUser?.uid) throw new Error('用户未登录');
    
    const postTemp = db.collection("posts")
      .where('user_id == $cloudEnv_uid')
      .getTemp();
      
    const userTemp = await db.collection('uni-id-users')
      .field("nickname,_id")
      .getTemp();
      
    const res = await db.collection(postTemp, userTemp)
      .orderBy('create_date', 'desc')
      .get();
    
    if (res.result?.data) {
          // 收集所有需要转换的图片文件ID
          const coverFileIDs = res.result.data
            .filter(item => item.images?.[0])
            .map(item => item.images[0]);
    
          // 获取临时URL映射表
          let tempUrlMap = {};
          if (coverFileIDs.length > 0) {
            const urlRes = await uniCloud.getTempFileURL({
              fileList: coverFileIDs
            });
            urlRes.fileList.forEach(item => {
              tempUrlMap[item.fileID] = item.tempFileURL;
            });
          }
    
          // 处理数据添加临时URL字段
          listData.value = res.result.data.map(post => ({
            ...post,
            coverTempUrl: post.images?.[0] 
              ? tempUrlMap[post.images[0]] 
              : '/static/default-cover.png',
            imageLoaded: false,
            imageError: false
          }));
        }
      } catch (err) {
    uni.showModal({
      title: '加载失败',
      content: err.message,
      showCancel: false
    });
  }
};

// 初始化加载数据
onMounted(() => {
  getData();
});
</script>

<style lang="scss">
.pet-container {
  background: #ffffff;
  padding: 0 20rpx;
}

.item {
  display: flex;
  padding: 30rpx 0;
  border-bottom: 1rpx solid #eeeeee; /* 细灰线分隔 */
  
  .cover {
    width: 160rpx;
    height: 160rpx;
    border-radius: 8rpx;
    margin-right: 20rpx;
    background: #f5f5f5;
    flex-shrink: 0;
  }
  
  .content {
    flex: 1;
    
    .title {
      font-size: 34rpx;
      font-weight: bold;
      color: #000000; /* 黑色大字 */
      line-height: 1.4;
      margin-bottom: 12rpx;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .info {
      font-size: 28rpx;
      color: #666666; /* 灰色小字 */
      line-height: 1.5;
      margin-bottom: 16rpx;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .author {
      font-size: 26rpx;
      color: #999999;
      
      .author-name {
        max-width: 200rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

/* 最后一项无分隔线 */
.item:last-child {
  border-bottom: none;
}

/* 图片加载状态 */
.image-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999;
  font-size: 24rpx;
}
</style>