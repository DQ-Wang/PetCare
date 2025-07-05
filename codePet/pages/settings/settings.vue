<template>
  <div class="comment-page">
    <!-- 评论区域（取消滚动功能） -->
    <div class="comment-list">
      <!-- 主评论 -->
      <div class="comment-item">
        <img 
          src="https://picsum.photos/40?random=1" 
          alt="头像" 
          class="avatar"
        >
        <div class="comment-content">
          <div class="comment-header">
            <span class="username">momo</span>
            <span class="content">听一万遍反方向的钟能不能回到4月30号晚上</span>
          </div>
          <div class="comment-meta">
            <span class="time-region">昨天15:56 福建</span>
            <div class="like-area">
              <img 
                src="https://img.icons8.com/ios-glyphs/20/999/like--v1.png" 
                alt="点赞" 
                class="like-icon"
              >
              <span class="like-count">36</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 子评论 -->
      <div class="sub-comment-item">
        <img 
          src="https://picsum.photos/30?random=2" 
          alt="子评论头像" 
          class="sub-avatar"
        >
        <div class="sub-comment-content">
          <div class="sub-comment-header">
            <span class="sub-username">momomoooo</span>
            <span class="sub-content">支持</span>
          </div>
          <div class="sub-comment-meta">
            <span class="sub-time-region">昨天15:58 福建</span>
            <div class="sub-like-area">
              <img 
                src="https://img.icons8.com/ios-glyphs/16/999/like--v1.png" 
                alt="子评论点赞" 
                class="sub-like-icon"
              >
            </div>
          </div>
        </div>
      </div>

      <!-- 模拟评论（保留原数量，但取消滚动后可能需要调整） -->
      <div class="comment-item" v-for="i in 10" :key="i">
        <img 
          src="https://picsum.photos/40?random=1" 
          alt="头像" 
          class="avatar"
        >
        <div class="comment-content">
          <div class="comment-header">
            <span class="username">用户{{ i }}</span>
            <span class="content">这是第 {{ i }} 条模拟评论内容...</span>
          </div>
          <div class="comment-meta">
            <span class="time-region">昨天 16:{{ i < 10 ? '0' + i : i }} 福建</span>
            <div class="like-area">
              <img 
                src="https://img.icons8.com/ios-glyphs/20/999/like--v1.png" 
                alt="点赞" 
                class="like-icon"
              >
              <span class="like-count">{{ 20 + i }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 固定在页面正下方的输入框 -->
    <div class="input-bottom">
      <div class="input-wrapper">
        <img 
          src="https://img.icons8.com/ios-glyphs/24/999/chat.png" 
          alt="输入框图标" 
          class="input-inner-icon"
        >
        <input 
          type="text" 
          placeholder="说点什么..." 
          class="comment-input"
        >
      </div>
      <svg t="1751092570657" class="bottom-like-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5989">
        <path d="M698.4 212c46.2 0 89.8 18.2 122.5 51.2 68.1 68.6 68.1 180.2 0 248.7L531 804c-6.5 6.6-13.9 8-19 8s-12.4-1.4-19-8L203.1 511.9c-68.1-68.6-68.1-180.2 0-248.7 32.8-33 76.3-51.2 122.5-51.2s89.8 18.2 122.5 51.2l63.9 64.3 63.9-64.3c32.7-33 76.3-51.2 122.5-51.2m0-90c-67.5 0-134.9 25.9-186.4 77.8-51.5-51.9-118.9-77.8-186.4-77.8s-134.9 25.9-186.4 77.8c-102.9 103.7-102.9 271.8 0 375.6l289.9 292.1C452 890.5 482 902 512 902c30 0 60-11.5 82.8-34.6l289.9-292.1c102.9-103.7 102.9-271.8 0-375.6-51.4-51.8-118.8-77.7-186.3-77.7z" fill="" p-id="5990"></path>
      </svg>
      <span class="like-count-bottom">120</span>
    </div>
  </div>
</template>

<script setup>
// 静态组件，无交互逻辑
</script>

<style lang="scss" scoped>
/* 页面整体布局 */
.comment-page {
  display: block; /* 改为块级元素，取消flex布局 */
  height: auto; /* 取消视口高度限制 */
  box-sizing: border-box;
  background-color: #fff;
  position: relative;
}

/* 评论列表区域（取消滚动功能） */
.comment-list {
  padding: 16rpx;
  margin-bottom: 96rpx; /* 为底部输入框留出空间 */
  /* 移除 overflow-y: auto 和滚动条样式 */
}

/* 主评论样式（未修改） */
.comment-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 24rpx;

  .avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    margin-right: 16rpx;
  }

  .comment-content {
    flex: 1;

    .comment-header {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 8rpx;

      .username {
        font-size: 32rpx;
        font-weight: 600;
        color: #333;
        margin-right: 12rpx;
      }

      .content {
        font-size: 28rpx;
        color: #666;
        margin-top: 4rpx;
        width: 100%;
      }
    }

    .comment-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .time-region {
        font-size: 24rpx;
        color: #999;
      }

      .like-area {
        display: flex;
        align-items: center;

        .like-icon {
          width: 36rpx;
          height: 36rpx;
          margin-right: 4rpx;
        }

        .like-count {
          font-size: 24rpx;
          color: #999;
        }
      }
    }
  }
}

/* 子评论样式（未修改） */
.sub-comment-item {
  display: flex;
  align-items: flex-start;
  margin-left: 96rpx; /* 头像+间距 */
  margin-bottom: 24rpx;

  .sub-avatar {
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    margin-right: 12rpx;
  }

  .sub-comment-content {
    flex: 1;

    .sub-comment-header {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 8rpx;

      .sub-username {
        font-size: 28rpx;
        font-weight: 600;
        color: #333;
        margin-right: 12rpx;
      }

      .sub-content {
        font-size: 26rpx;
        color: #666;
        margin-top: 4rpx;
        width: 100%;
      }
    }

    .sub-comment-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .sub-time-region {
        font-size: 22rpx;
        color: #999;
      }

      .sub-like-area {
        .sub-like-icon {
          width: 32rpx;
          height: 32rpx;
        }
      }
    }
  }
}

/* 底部输入框样式（未修改） */
.input-bottom {
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  border-top: 1rpx solid #eee;
  padding: 16rpx 24rpx;
  /* 固定在页面底部 */
  position: fixed; 
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  height: 96rpx; /* 明确设置输入框区域高度 */
}

.input-wrapper {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 28rpx;
  flex: 1;
  height: 64rpx; /* 输入框整体高度 */
}

.input-inner-icon {
  width: 40rpx;
  height: 40rpx;
  margin: 0 16rpx; /* 图标在输入框内的左右间距 */
}

.comment-input {
  flex: 1;
  border: none;
  background-color: transparent;
  padding: 0;
  font-size: 28rpx;
  color: #333;
  height: 100%;
  line-height: 64rpx; /* 文字行高与输入框高度一致，垂直居中 */
}

.like-count-bottom {
  font-size: 24rpx;
  color: #999;
  margin: 0 10rpx; /* 调整数字与图标的间距 */
  align-self: center; /* 确保数字垂直居中 */
}

.bottom-like-icon {
  width: 36rpx;
  height: 36rpx; /* 缩小图标尺寸 */
  margin-left: 10rpx; /* 图标与数字的间距 */
}
</style>