<template>
	<div class="pet-container">
		<!-- 轮播图部分 -->
		<div class="banner">
			<div class="swiper-wrapper">
				<swiper circular indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#0f0" autoplay
					@change="handleSwiperChange">
					<swiper-item v-for="(img, index) in bannerImages" :key="index">
						<image :src="img" mode="aspectFill" alt="轮播图"></image>
					</swiper-item>
				</swiper>
			</div>
			<div class="dots">
				<div v-for="(dot, dotIndex) in bannerImages.length" :key="dotIndex" class="dot"
					:style="{backgroundColor: currentIndex === dotIndex ? '#b2d67e' : '#e4e4e4'}"></div>
			</div>
		</div>

		<!-- 帖子内容部分 -->
		<div class="post-item">
			<div class="user-info">
				<image :src="user ? user.avatar : '/static/default-avatar.png'" mode="widthFix" class="avatar"></image>
				<span class="username">{{ user ? user.nickname : '加载中...' }}</span>
			</div>
			<div class="bottom-line"></div>

			<div class="post-content">
				<h3 class="post-title">{{ postDetail.header }}</h3>
				<p class="post-desc">{{ postDetail.content }}</p>
				<div class="tags">
					<img src="../../static/汪汪喵切图/帖子详情页/favourite@3x.png" alt="标签图标" class="tag-icon">
					<span class="tag" v-for="(tag, index) in post.tags" :key="index">{{ tag }}</span>
				</div>
				<div class="location">
					<img src="../../static/汪汪喵切图/帖子详情页/pointer@3x.png" alt="位置图标" class="tag-icon">
					<span class="location-text location-tag">{{ postDetail.location.address }}</span>
				</div>
				<p class="meta-info">{{ postFormattedDate }} {{ post.region }}</p>
			</div>
		</div>
		<div class="bottom-line"></div>

		<!-- 评论区域 -->
		<div class="comment-page">
			<div class="comment-list">
				<div class="comment-item" v-for="(comment, i) in comments">
					<image :src="comment.userInfo.avatar" class="avatar" mode="aspectFill"></image>
					<div class="comment-content">
						<div class="comment-header">
							<span class="username">{{ comment.userInfo.nickname }}</span>
							<span class="content">{{ comment.comment_content}}</span>
						</div>
						<div class="comment-meta">
							<span class="time-region">{{ comment.formattedDate}} 福建</span>
							<div class="like-area" @click="toggleLike(comment)">
								<img :src="comment.isLiked 
				            ? '../../static/汪汪喵切图/帖子详情页/Like.png' 
				            : '../../static/汪汪喵切图/帖子详情页/dontlike.png'" alt="点赞" class="like-icon">
								<span class="like-count">{{ comment.like_count}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="input-bottom">
				<div class="input-wrapper">
					<img src="../../static/汪汪喵切图/帖子详情页/Vector@3x.png" alt="输入框图标" class="input-inner-icon">
					<input type="text" placeholder="说点什么..." class="comment-input">
				</div>
				<img src="../../static/汪汪喵切图/帖子详情页/Vector (Stroke)@3x.png" alt="输入框图标" class="bottom-like-icon">
				<span class="like-count-bottom">{{ post.like_count }}</span>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {
		ref,
		computed
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app'

	const postDetail = ref(null)
	const comments = ref([])
	const db = uniCloud.database()
	const userId = ref(null)
	const postId = ref(null)
	const currentIndex = ref(0);
	const user = ref(null); // 修改：从对象改为null，准备存储用户数据
	const bannerImages = ref([]); // 初始化为空数组

	// 新增：获取用户信息函数
	async function fetchUserInfo(userId) {
		if (!userId) return null;
		try {
			const userRes = await db.collection('uni-id-users').doc(userId).field('nickname,avatar_file').get();
			if (userRes.result.data.length > 0) {
				const userData = userRes.result.data[0];

				// 获取头像临时URL
				let avatarUrl = '/static/default-avatar.png';
				if (userData.avatar_file && userData.avatar_file.url) {
					const urlRes = await uniCloud.getTempFileURL({
						fileList: [userData.avatar_file.url]
					});
					if (urlRes.fileList[0].tempFileURL) {
						avatarUrl = urlRes.fileList[0].tempFileURL;
					}
				}

				return {
					nickname: userData.nickname || '未知用户',
					avatar: avatarUrl
				};
			}
		} catch (e) {
			console.error('获取用户信息失败', e);
		}
		return {
			nickname: '未知用户',
			avatar: '/static/default-avatar.png'
		};
	}

	// 日期格式化函数
	const formatDate = (timestamp) => {
		const date = new Date(timestamp);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const hour = String(date.getHours()).padStart(2, '0');
		const minute = String(date.getMinutes()).padStart(2, '0');
		return `${year}-${month}-${day} ${hour}:${minute}`;
	}

	// 轮播图change事件
	const handleSwiperChange = (e) => {
		currentIndex.value = e.detail.current;
	}

	onLoad(async (options) => {
	  try {
	    const userInfo = await uniCloud.getCurrentUserInfo()
	    userId.value = userInfo.uid
	  } catch (e) {
	    userId.value = null
	  }
	
	  postId.value = options.postId
	  if (postId.value) {
	    const postRes = await db.collection('posts').doc(postId.value).get()
	    if (postRes.result && postRes.result.data.length > 0) {
	      postDetail.value = postRes.result.data[0];
	
	      // 获取发帖用户信息
	      if (postDetail.value.user_id) {
	        user.value = await fetchUserInfo(postDetail.value.user_id);
	      }
	
	      // 处理帖子图片
	      if (postDetail.value.images && postDetail.value.images.length > 0) {
	        try {
	          const urlRes = await uniCloud.getTempFileURL({
	            fileList: postDetail.value.images
	          });
	
	          // 创建映射关系
	          const tempUrlMap = {};
	          urlRes.fileList.forEach(item => {
	            tempUrlMap[item.fileID] = item.tempFileURL;
	          });
	
	          // 转换为临时URL数组
	          bannerImages.value = postDetail.value.images.map(fileID =>
	            tempUrlMap[fileID] || '/static/default-image.png'
	          );
	        } catch (e) {
	          console.error('获取图片临时URL失败', e);
	          bannerImages.value = [
	            '/static/default-image.png',
	            '/static/default-image.png',
	            '/static/default-image.png'
	          ];
	        }
	      } else {
	        // 没有图片时显示默认图片
	        bannerImages.value = [
	          '/static/default-image.png',
	          '/static/default-image.png',
	          '/static/default-image.png'
	        ];
	      }
	    }
	
	    await fetchComments();
	  }
	})
	
	// 在 script 中添加
	const postFormattedDate = computed(() => {
	  if (!postDetail.value || !postDetail.value.create_date) return '';
	  return formatDate(postDetail.value.create_date);
	});

	// 获取评论数据
	const fetchComments = async () => {
	  try {
	      // 1. 获取当前帖子的所有评论
	      const commentRes = await db.collection('opendb-news-comments')
	        .where(`post_id == "${postId.value}"`)
	        .orderBy('comment_date', 'desc')
	        .get()
	  
	      if (!commentRes.result || !commentRes.result.data || commentRes.result.data.length === 0) {
	        comments.value = [];
	        return;
	      }
	  
	      const rawComments = commentRes.result.data;
	      const commentIds = rawComments.map(c => c._id);
	      
	      // 2. 修复：使用正确的字段名 target_id
	      let userLikes = [];
	      if (userId.value) {
	        const likeRes = await db.collection('likes_record')
	          .where({
	            user_id: userId.value,
	            target_id: db.command.in(commentIds), // 改为 target_id
	            target_type: "comment" // 确保只查询评论点赞
	          })
	          .get()
	        
	        if (likeRes.result && likeRes.result.data) {
	          userLikes = likeRes.result.data.map(item => item.target_id); // 改为 target_id
	        }
	      }
	
	    // 3. 获取评论用户的信息
	    const userIds = [...new Set(rawComments.map(c => c.user_id).filter(id => id))];
	    const userInfoMap = new Map();
	    
	    if (userIds.length > 0) {
	      const userRes = await db.collection('uni-id-users')
	        .where({ _id: db.command.in(userIds) })
	        .field('nickname,avatar_file')
	        .get()
	      
	      if (userRes.result && userRes.result.data) {
	        // 提取所有需要转换的头像文件ID
	        const avatarFiles = [];
	        const usersWithAvatars = [];
	        
	        userRes.result.data.forEach(user => {
	          if (user.avatar_file && user.avatar_file.url) {
	            avatarFiles.push(user.avatar_file.url);
	            usersWithAvatars.push(user);
	          }
	        });
	        
	        // 批量获取头像URL
	        let avatarUrls = {};
	        if (avatarFiles.length > 0) {
	          const urlRes = await uniCloud.getTempFileURL({ fileList: avatarFiles });
	          if (urlRes.fileList) {
	            urlRes.fileList.forEach(item => {
	              avatarUrls[item.fileID] = item.tempFileURL;
	            });
	          }
	        }
	        
	        // 创建用户信息映射
	        userRes.result.data.forEach(user => {
	          let avatar = '/static/default-avatar.png';
	          
	          // 处理有头像的情况
	          if (user.avatar_file && user.avatar_file.url) {
	            const tempUrl = avatarUrls[user.avatar_file.url];
	            if (tempUrl) {
	              avatar = tempUrl;
	            }
	          }
	          
	          userInfoMap.set(user._id, {
	            nickname: user.nickname || '未知用户',
	            avatar: avatar
	          });
	        });
	      }
	    }
	
	    // 4. 构建最终评论数据
	    comments.value = rawComments.map(comment => {
	      // 获取用户信息
	      let userInfo = {
	        nickname: '未知用户',
	        avatar: '/static/default-avatar.png'
	      };
	      
	      if (comment.user_id && userInfoMap.has(comment.user_id)) {
	        userInfo = userInfoMap.get(comment.user_id);
	      }
	      
	      // 确定点赞状态
	      const isLiked = userLikes.includes(comment._id);
	      
	      return {
	        ...comment,
	        userInfo: userInfo,
	        formattedDate: formatDate(comment.comment_date),
	        isLiked: isLiked,
	        like_count: comment.like_count || 0
	      };
	    });
	    
	  } catch (error) {
	    console.error('获取评论失败', error);
	    uni.showToast({
	      title: '加载评论失败',
	      icon: 'none'
	    });
	    comments.value = [];
	  }
	};

	// 点赞/取消点赞功能
	const toggleLike = async (comment) => {
		if (!userId.value) {
			uni.showToast({
				title: '请先登录',
				icon: 'none'
			});
			return;
		}

		try {
			const newLikeCount = comment.isLiked ? comment.like_count - 1 : comment.like_count + 1;
			const newIsLiked = !comment.isLiked;

			// 更新UI状态
			const commentIndex = comments.value.findIndex(c => c._id === comment._id);
			if (commentIndex !== -1) {
				comments.value[commentIndex].isLiked = newIsLiked;
				comments.value[commentIndex].like_count = newLikeCount;
			}

			// 数据库操作
			if (newIsLiked) {
				// 添加点赞记录
				await db.collection('likes_record').add({
					target_id: comment._id,
					user_id: userId.value,
					target_type: "comment",
					post_id: postId.value
				});
			} else {
				// 删除点赞记录 - 只根据用户ID和目标ID
				await db.collection('likes_record').where({
					target_id: comment._id,
					user_id: userId.value
				}).remove();
			}

			// 更新评论的点赞计数
			await db.collection('opendb-news-comments').doc(comment._id).update({
				like_count: newLikeCount
			});

		} catch (error) {
			console.error('操作失败', error);
			uni.showToast({
				title: '操作失败',
				icon: 'none'
			});

			// 恢复UI状态
			const commentIndex = comments.value.findIndex(c => c._id === comment._id);
			if (commentIndex !== -1) {
				comments.value[commentIndex].isLiked = comment.isLiked;
				comments.value[commentIndex].like_count = comment.like_count;
			}
		}
	};


	const post = ref({
		tags: ['日常', '救助'],
		region: '福建',
		like_count: 120
	});
</script>

<style lang="scss" scoped>
	@import "../../petcareui/post_details.scss";
</style>