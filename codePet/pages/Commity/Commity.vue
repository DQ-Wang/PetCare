<template>
  <view class="pet-container">
    <!-- 顶部导航 -->
    <scroll-view class="nav-scroll" scroll-x>
      <view v-for="(item, index) in categories" :key="index" class="nav-item" :class="{ active: currentTab === item }"
        @click="switchCategory(item)">
        {{ item }}
      </view>
    </scroll-view>

    <!-- 瀑布流主体 -->
    <view class="waterfall">
      <!-- 左边 -->
      <view class="column">
        <view v-for="(item, index) in dataList" :key="item._id" class="card">
          <image class="card-image" :src="item.images && item.images.length > 0 ? item.images[0] : ''"
            mode="widthFix" />

          <view class="card-info">
            <text class="desc">{{ item.content }}</text>
            <view class="stats">
              <view class="author">
                <image class="avatar" :src="item.avatar" />
                <text class="name">{{ item.author }}</text>
              </view>
              <text class="like" :class="{ liked: item.liked }" @click="toggleLike(item)">♥ {{ item.like_count }}</text>

            </view>
          </view>
        </view>
      </view>
      <!-- 右边 -->
      <view class="column">
        <view v-for="(item, index) in dataList" :key="item._id" class="card">
          <image class="card-image" :src="item.images && item.images.length > 0 ? item.images[0] : ''"
            mode="widthFix" />

          <view class="card-info">
            <text class="desc">{{ item.header }}</text>
            <view class="stats">
              <view class="author">
                <image class="avatar" :src="item.avatar" />
                <text class="name">{{ item.author }}</text>
              </view>
              <text class="like" :class="{ liked: item.liked }" @click="toggleLike(item)">♥ {{ item.like_count }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
  import {
    ref,
    computed
  } from 'vue';
  //连接到云端数据库，可以在本地查看posts表的结构：uniCloud/database/posts.schema.json
  const db = uniCloud.database();
  const dataList = ref([])
  const getData = async () => {


    // 收集所有 fileID
    let res = await db.collection("posts").get();
    let data = res.result.data;

    // 收集所有 fileID
    const fileList = data.flatMap(item => item.images || []);
    if (fileList.length > 0) {
      const tempUrls = await uniCloud.getTempFileURL({
        fileList
      });
      const fileMap = {};
      tempUrls.fileList.forEach(f => {
        fileMap[f.fileID] = f.tempFileURL;
      });

      // 替换 images 数组中的 fileID 为真实 URL
      data.forEach(item => {
        item.images = (item.images || []).map(id => fileMap[id]);
      });
    }

    dataList.value = data;
    console.log(res);


  };
  getData();


  // 分类数据
  const categories = ref(['推荐', '日常', '宠粮', '洗护', '代看', '救助']);
  const currentTab = ref('推荐');

  // // 切换分类后显示的数据，根据实际修改
  // const localData = ref({
  //   '推荐': MockData(10),
  //   '日常': MockData(2),
  //   '宠粮': MockData(3),
  //   '洗护': MockData(4),
  //   '代看': MockData(5),
  //   '救助': MockData(6),
  //   // 其他分类的数据略
  // });

  // 切换分类
  function switchCategory(category) {
    currentTab.value = category;
  }

  // // 瀑布流分列处理
  // const currentList = computed(() => localData.value[currentTab.value]);
  // const leftColumn = computed(() => currentList.value.filter((_, i) => i % 2 === 0));
  // const rightColumn = computed(() => currentList.value.filter((_, i) => i % 2 !== 0));

  // // 点赞功能
  // function toggleLike(item) {
  //   item.like_count += item.liked ? -1 : 1;
  //   // item.liked = !item.liked;
  // }

  // 编的填充的数据,用来设置卡片内的文案/头像/名称/点赞数，实际应该接入api
  // function MockData(count) {
  //   return Array.from({
  //     length: count
  //   }, (_, i) => ({
  //     id: Date.now() + i,
  //     image: `/static/汪汪喵切图/社区示例图片/示例${i % 3 + 1}.jpg`, // 张示例图片
  //     avatar: `/static/汪汪喵切图/我的/头像.png`,
  //     author: ['懒羊羊大王', '喜羊羊大王', '沸羊羊大王'][i % 3],
  //     desc: ['是谁家的小猫呀', '喵喵喵', '低价出猫粮，毛孩子吃不完了~'][i % 3],
  //     likes: Math.floor(Math.random() * 1000) + 500,
  //     liked: false
  //   }));
  // }
</script>

<style lang="scss">
  @import "../../petcareui/pet-global.css";

  .nav-scroll {
    white-space: nowrap;
    height: 80rpx;

    .nav-item {
      display: inline-block;
      padding: 0 30rpx;
      line-height: 80rpx;
      font-size: 32rpx;
      color: #666;

      &.active {
        color: rgba(178, 215, 110, 1);
        font-weight: bold;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 4rpx;
          background: rgba(178, 215, 110, 1);
        }
      }
    }
  }

  .waterfall {
    display: flex;
    justify-content: space-between;
    margin-top: 20rpx;
    margin: 10rpx 20rpx;

    .column {
      width: 345rpx;

      .card {
        background: #fff;
        border-radius: 16rpx;
        margin-bottom: 20rpx;
        overflow: hidden;

        &-image {
          width: 100%;
          height: auto;
        }

        &-info {
          padding: 20rpx;

          .author {
            display: flex;
            align-items: center;

            .avatar {
              width: 50rpx;
              height: 50rpx;
              border-radius: 50%;
              margin-right: 10rpx;
            }

            .name {
              margin-top: -5rpx;
              font-size: 16rpx;
              color: #333;
            }
          }

          .desc {
            display: block;
            margin: -10rpx 0 10rpx 0;
            font-size: 28rpx;
            color: #222;
          }

          .stats {
            display: flex;
            justify-content: space-between;
            font-size: 24rpx;
            color: #999;

            .like {
              font-size: 30rpx;

              &.liked {
                color: #ff6a6c !important;
              }
            }
          }
        }
      }
    }
  }
</style>