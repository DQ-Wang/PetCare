<template>
  <view class="pet-container">
    <!-- 顶部导航 -->
    <scroll-view class="nav-scroll" scroll-x>
      <view v-for="(item, index) in categories" :key="item._id" class="nav-item"
        :class="{ active: currentTab && currentTab._id === item._id }" @click="switchCategory(item)">
        {{ item.name }}
      </view>
    </scroll-view>

    <!-- 瀑布流主体 -->
    <view class="waterfall">
      <view v-for="(item, index) in dataList" :key="item._id" class="card" @click="goDetail(item._id)">
        <image v-if="item.images && item.images.length" class="card-image" :src="item.imageTempUrl" mode="widthFix" />

        <view class="card-info">
          <text class="desc">{{ item.header }}</text>
          <view class="stats">
            <view class="author">
              <image class="avatar" :src="item.userInfo.avatarTempUrl" />
              <text class="name">{{ item.userInfo.nickname }}</text>
            </view>
            <text class="like" :class="{ liked: item.liked }" @click="toggleLike(item)">♥ {{ item.like_count }}</text>
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
  import {
    onShow
  } from '@dcloudio/uni-app';

  onShow(async () => {
    await loadCategories();
    await getPostsByCategory(currentTab.value._id);
  })

  const db = uniCloud.database();
  const dbCmd = db.command;
  const dataList = ref([]);
  const categories = ref([]);
  const currentTab = ref(null);

  // 加载分类
  async function loadCategories() {
    const res = await db.collection('opendb-news-categories').get();
    categories.value = res.result.data;
    currentTab.value = categories.value[0];
  }

  // 获取帖子
  async function getPostsByCategory(categoryId) {
    const queryCondition = categoryId ? {
      category_id: dbCmd.in([categoryId])
    } : {
      category_id: dbCmd.exists(true)
    };

    const res = await db.collection('posts')
      .where(queryCondition)
      .orderBy('create_date', 'desc')
      .get();

    if (res.result && res.result.data) {
      const posts = res.result.data;

      // 获取用户信息
      const postsWithUserInfo = await Promise.all(
        posts.map(async (post) => {
          if (post.user_id) {
            try {
              const userRes = await db.collection('uni-id-users')
                .doc(post.user_id)
                .field('nickname,avatar_file')
                .get();

              if (userRes.result && userRes.result.data && userRes.result.data.length > 0) {
                post.userInfo = userRes.result.data[0];
              } else {
                post.userInfo = {
                  nickname: '匿名用户',
                  avatar_file: ''
                };
              }
            } catch (userErr) {
              post.userInfo = {
                nickname: '匿名用户',
                avatar_file: ''
              };
            }
          } else {
            post.userInfo = {
              nickname: '匿名用户',
              avatar_file: ''
            };
          }
          return post;
        })
      );

      // 获取头像和图片的临时 URL
      const fileIDList = postsWithUserInfo
        .map(p => p.userInfo?.avatar_file?.url)
        .filter(Boolean);
      const imageFileIDList = postsWithUserInfo
        .map(p => p.images && p.images[0])
        .filter(Boolean);

      const allFileIDList = [...fileIDList, ...imageFileIDList];
      let tempUrlMap = {};

      if (allFileIDList.length > 0) {
        const urlRes = await uniCloud.getTempFileURL({
          fileList: allFileIDList
        });

        urlRes.fileList.forEach(item => {
          tempUrlMap[item.fileID] = item.tempFileURL;
        });
      }

      postsWithUserInfo.forEach(post => {
        const fileID = post.userInfo?.avatar_file?.url;
        post.userInfo.avatarTempUrl = tempUrlMap[fileID] || '/static/default-avatar.png';

        const imageFileID = post.images && post.images[0];
        post.imageTempUrl = tempUrlMap[imageFileID] || '/static/default-image.png';
      });

      dataList.value = postsWithUserInfo;
      console.log('获取的帖子', dataList.value)
    } else {
      dataList.value = [];
    }
  }

  // 分类切换
  function switchCategory(category) {
    currentTab.value = category;
    getPostsByCategory(category._id);
  }

  // 点赞功能
  /**
   * 切换点赞状态（toggleLike）
   * - 判断用户是否已点赞
   *   - 若已点赞：取消点赞（删除记录、like_count -1）
   *   - 若未点赞：添加记录、like_count +1
   * - 实时更新页面上的点赞状态（♥ 变色 + 数字变化）
   */

  const toggleLike = async (item) => {}

  //跳转到详情页
  const goDetail = (postId) => {
    uni.navigateTo({
      url: `/pages/post_details/post_details?postId=${postId}` //太细了，用反引号而不是单引号传参
    })
  }
</script>

<style lang="scss">
  @import "../../petcareui/pet-global.css";

  .nav-scroll {
    white-space: nowrap;
    height: 80rpx;
    display: flex;
    justify-content: space-around;

    .nav-item {
      display: inline-block;
      padding: 0 45rpx;
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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300rpx, 1fr));
    /* 自动分配列 */
    gap: 20rpx;
    /* 列与列之间的间距 */
    margin-top: 20rpx;
    padding: 10rpx;

    .card {
      background: #fff;
      border-radius: 16rpx;
      overflow: hidden;

      .card-image {
        width: 100%;
        height: auto;
      }

      .card-info {
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
</style>