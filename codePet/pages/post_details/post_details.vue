<template>
  <div class="pet-container">
    <!-- 轮播图部分 - 使用固定网络图片 -->
    <div class="banner">
      <div class="swiper-wrapper">
        <swiper circular indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#0f0" autoplay @change="handleSwiperChange">
          <swiper-item v-for="(img, index) in bannerImages" :key="index">
            <image :src="img" mode="top" alt="轮播图"></image>
          </swiper-item>
        </swiper>
      </div>
      <div class="dots">
        <div v-for="(dot, dotIndex) in bannerImages.length" :key="dotIndex" class="dot" :style="{backgroundColor: currentIndex === dotIndex ? '#b2d67e' : '#e4e4e4'}"></div>
      </div>
    </div>

    <!-- 帖子内容部分 -->
    <div class="post-item">
      <div class="user-info">
        <!-- 使用数据库中的images作为用户头像 -->
        <img 
          :src="post.images && post.images[0] ? post.images[0] : user.avatar" 
          alt="用户头像" 
          class="avatar"
        >
        <span class="username">{{ user.name }}</span>
      </div>
      <div class="bottom-line"></div>
      
      <div class="post-content">
        <h3 class="post-title">{{ post.header }}</h3>
        <p class="post-desc">{{ post.content }}</p>
        <div class="tags">
          <img 
            src="../../static/汪汪喵切图/帖子详情页/favourite@3x.png" 
            alt="标签图标" 
            class="tag-icon"
          >
          <span class="tag" v-for="(tag, index) in post.tags" :key="index">{{ tag }}</span>
        </div>
        <div class="location">
          <img 
            src="../../static/汪汪喵切图/帖子详情页/pointer@3x.png" 
            alt="位置图标" 
			class="tag-icon"
          >
          <span class="location-text location-tag">{{ post.location }}</span>
        </div>
        <p class="meta-info">{{ post.time }} {{ post.region }}</p>
       <!-- <p class="info">用户ID：{{post.user_id}}  点赞数：{{post.like_count}}</p> -->
      </div>
    </div>
	<div class="bottom-line"></div>
	
	<!-- 评论区域 -->
	<div class="comment-page">
	    <div class="comment-list">
	      <div class="comment-item">
	        <img 
	          src="../../static/汪汪喵切图/帖子详情页/圆形 5@3x.png" 
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
	                src="../../static/汪汪喵切图/帖子详情页/like.png" 
	                alt="点赞" 
	                class="like-icon"
	              >
	              <span class="like-count">36</span>
	            </div>
	          </div>
	        </div>
	      </div>
	
	      <div class="sub-comment-item">
	        <img 
	          src="../../static/汪汪喵切图/帖子详情页/圆形 5@3x.png" 
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
	                src="../../static/汪汪喵切图/帖子详情页/like.png" 
	                alt="子评论点赞" 
	                class="sub-like-icon"
	              >
	            </div>
	          </div>
	        </div>
	      </div>
	
	      <div class="comment-item" v-for="i in 10" :key="i">
	        <img 
	          src="../../static/汪汪喵切图/帖子详情页/圆形 5@3x.png" 
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
	                src="../../static/汪汪喵切图/帖子详情页/like.png" 
	                alt="点赞" 
	                class="like-icon"
	              >
	              <span class="like-count">{{ 20 + i }}</span>
	            </div>
	          </div>
	        </div>
	      </div>
	    </div>
	
	    <div class="input-bottom">
	      <div class="input-wrapper">
	        <img 
	          src="../../static/汪汪喵切图/帖子详情页/Vector@3x.png" 
	          alt="输入框图标" 
	          class="input-inner-icon"
	        >
	        <input 
	          type="text" 
	          placeholder="说点什么..." 
	          class="comment-input"
	        >
	      </div>
		  <img
		    src="../../static/汪汪喵切图/帖子详情页/Vector (Stroke)@3x.png" 
		    alt="输入框图标" 
		    class="bottom-like-icon"
		  >
	      <span class="like-count-bottom">{{ post.like_count }}</span>
	    </div>
	  </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const currentIndex = ref(0);
//这里是轮播图片部分(现在用随机网络图片代替)
const bannerImages = ref([
  'https://picsum.photos/750/375?random=1',
  'https://picsum.photos/750/375?random=2',
  'https://picsum.photos/750/375?random=3'
]);

const user = ref({
  avatar: 'https://picsum.photos/48/48?random=user',
  name: '不想上学66'
});

const post = ref({
  header: '五一宝宝不要走',
  content: '谁懂五一结束的救赎感啊啊啊啊啊啊啊',
  tags: ['日常', '救助'],
  location: '厦门大学翔安校区',
  time: '2025-05-06',
  region: '福建',
  images: [], // 这里将用于存储用户头像
  user_id: '',
  like_count: 120
});

const handleSwiperChange = (e) => {
  currentIndex.value = e.detail.current;
};

const getpostData = async () => {
  try {
    const res = await uniCloud.callFunction({
      name: 'post_details',
      data: {
        _id: '68207350c1603363f7fb9e9f'
      }
    });
    
    if (res.result.code === 200) {
      // 保留原有的模拟数据字段，合并云端数据
      post.value = { 
        ...post.value, 
        ...res.result.data,
        header: res.result.data.header || post.value.header,
        content: res.result.data.content || post.value.content,
        // 数据库中的images用于用户头像
        images: res.result.data.images || post.value.images,
        user_id: res.result.data.user_id || '',
        like_count: res.result.data.like_count || post.value.like_count
      };
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

onMounted(() => {
  getpostData();
});
</script>

<style lang="scss" scoped>
	@import "../../petcareui/post_details.scss";
</style>