<template>
	<view class="pet-container">
		<!-- 顶部导航 -->
		<scroll-view class="nav-scroll" scroll-x>
			<view v-for="item in categories" :key="item._id" class="nav-item"
				:class="{ active: currentTab && currentTab._id === item._id }" @click="switchCategory(item)">
				{{ item.name }}
			</view>
		</scroll-view>

		<!-- 瀑布流主体 -->
		<view class="waterfall-container">
			<!-- 左列 -->
			<view class="waterfall-column">
				<view v-for="item in leftColumn" :key="item._id" class="card" :data-id="item._id"
					@click="goDetail(item._id)">
					<!-- 图片容器（保持比例） -->
					<view class="image-container" :style="{ paddingTop: getImageAspectRatio(item) }">
						<image v-if="item.images && item.images.length" class="card-image" :src="item.imageTempUrl"
							mode="aspectFill" @load="onImageLoad(item, 'left')" />
					</view>
					<view class="card-info">
						<text class="desc">{{ item.header }}</text>
						<view class="stats">
							<view class="author">
								<image class="avatar" :src="item.userInfo.avatarTempUrl" mode="aspectFill" />
								<text class="name">{{ item.userInfo.nickname }}</text>
							</view>
							<view class="like" @click.stop="toggleLike(item)">
								<image class="like-icon" :src="item.liked 
							                    ? '../../static/汪汪喵切图/帖子详情页/爱心.png' 
							                    : '../../static/汪汪喵切图/帖子详情页/爱心 (1).png'" />
								<text class="like-count">{{ item.like_count }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 右列 -->
			<view class="waterfall-column">
				<view v-for="item in rightColumn" :key="item._id" class="card" :data-id="item._id"
					@click="goDetail(item._id)">
					<!-- 图片容器（保持比例） -->
					<view class="image-container" :style="{ paddingTop: getImageAspectRatio(item) }">
						<image v-if="item.images && item.images.length" class="card-image" :src="item.imageTempUrl"
							mode="aspectFill" @load="onImageLoad(item, 'right')" />
					</view>
					<view class="card-info">
						<text class="desc">{{ item.header }}</text>
						<view class="stats">
							<view class="author">
								<image class="avatar" :src="item.userInfo.avatarTempUrl" mode="aspectFill" />
								<text class="name">{{ item.userInfo.nickname }}</text>
							</view>
							<view class="like" @click.stop="toggleLike(item)">
								<image class="like-icon" :src="item.liked 
							                    ? '../../static/汪汪喵切图/帖子详情页/爱心.png' 
							                    : '../../static/汪汪喵切图/帖子详情页/爱心 (1).png'" />
								<text class="like-count">{{ item.like_count }}</text>
							</view>
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
		onMounted,
		nextTick
	} from 'vue';
	import {
		onShow
	} from '@dcloudio/uni-app';

	// 数据库引用
	const db = uniCloud.database();
	const dbCmd = db.command;

	// 响应式数据
	const dataList = ref([]);
	const categories = ref([]);
	const currentTab = ref(null);
	const leftColumn = ref([]);
	const rightColumn = ref([]);
	const leftHeight = ref(0);
	const rightHeight = ref(0);
	const pendingItems = ref([]);
	const itemHeights = new Map(); // 存储项目高度
	const imageRatios = ref({}); // 存储图片宽高比

	// 生命周期
	onShow(async () => {
		await loadCategories();
		await getPostsByCategory(currentTab.value?._id);
	});

	// 加载分类
	async function loadCategories() {
		const res = await db.collection('opendb-news-categories').get();
		categories.value = res.result.data;
		if (categories.value.length > 0) {
			currentTab.value = categories.value[0];
		}
	}

	// 获取帖子数据
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

							post.userInfo = userRes.result?.data?.[0] || {
								nickname: '匿名用户',
								avatar_file: {
									url: ''
								}
							};
						} catch {
							post.userInfo = {
								nickname: '匿名用户',
								avatar_file: {
									url: ''
								}
							};
						}
					} else {
						post.userInfo = {
							nickname: '匿名用户',
							avatar_file: {
								url: ''
							}
						};
					}
					// 初始化点赞状态为false
					post.liked = false;
					return post;
				})
			);

			// 获取临时URL
			const fileIDs = [
				...postsWithUserInfo.map(p => p.userInfo?.avatar_file?.url).filter(Boolean),
				...postsWithUserInfo.map(p => p.images?.[0]).filter(Boolean)
			];

			let tempUrlMap = {};
			if (fileIDs.length > 0) {
				const urlRes = await uniCloud.getTempFileURL({
					fileList: fileIDs
				});
				urlRes.fileList.forEach(item => {
					tempUrlMap[item.fileID] = item.tempFileURL;
				});
			}

			// 分配临时URL
			const processedPosts = postsWithUserInfo.map(post => {
				const avatarUrl = post.userInfo?.avatar_file?.url;
				const imageUrl = post.images?.[0];

				// 初始化图片宽高比
				if (imageUrl) {
					imageRatios.value[post._id] = 56.25; // 默认16:9比例
				}

				return {
					...post,
					userInfo: {
						...post.userInfo,
						avatarTempUrl: avatarUrl ? tempUrlMap[avatarUrl] : '/static/default-avatar.png'
					},
					imageTempUrl: imageUrl ? tempUrlMap[imageUrl] : '/static/default-image.png'
				};
			});

			try {
				// 获取当前用户信息
				const userInfo = await uniCloud.getCurrentUserInfo();
				const currentUserId = userInfo.uid; // uid 就是用户的 _id

				// 如果有登录用户，检查点赞状态
				if (currentUserId) {
					const postIds = processedPosts.map(p => p._id);

					// 查询点赞记录
					const likeRes = await db.collection('likes_record')
						.where({
							user_id: currentUserId,
							target_id: dbCmd.in(postIds),
							target_type: 'post'
						})
						.get();

					// 创建点赞记录映射
					const likeMap = {};
					if (likeRes.result && likeRes.result.data) {
						likeRes.result.data.forEach(record => {
							likeMap[record.target_id] = true;
						});
					}

					// 更新帖子的点赞状态
					processedPosts.forEach(post => {
						post.liked = !!likeMap[post._id];
					});
				}
			} catch (e) {
				console.log('未登录或获取用户信息失败', e);
				// 未登录状态不做处理，保持liked为false
			}

			// 重置瀑布流状态
			resetWaterfall();
			pendingItems.value = [...processedPosts];
			distributeItems();
		}
	}

	// 获取图片宽高比
	function getImageAspectRatio(item) {
		if (!item.images || !item.images.length) return '56.25%';
		const ratio = imageRatios.value[item._id] || 56.25;
		return `${ratio}%`;
	}

	// 重置瀑布流
	function resetWaterfall() {
		leftColumn.value = [];
		rightColumn.value = [];
		leftHeight.value = 0;
		rightHeight.value = 0;
		pendingItems.value = [];
		itemHeights.clear();
		imageRatios.value = {};
	}

	// 核心：分配项目到高度较小的列
	const distributeItems = () => {
		// 逐个处理项目
		const processNextItem = () => {
			if (pendingItems.value.length === 0) return;

			const item = pendingItems.value.shift();

			// 动态选择插入列（贪心策略）
			const targetColumn = leftHeight.value <= rightHeight.value ? 'left' : 'right';

			// 添加到对应列
			if (targetColumn === 'left') {
				leftColumn.value.push(item);
			} else {
				rightColumn.value.push(item);
			}

			// 等待DOM更新后获取高度
			nextTick(() => {
				getItemHeight(item._id).then(height => {
					// 更新列高度（高度+间距）
					const itemTotalHeight = height + 20; // 20rpx是卡片间距
					itemHeights.set(item._id, itemTotalHeight);

					if (targetColumn === 'left') {
						leftHeight.value += itemTotalHeight;
					} else {
						rightHeight.value += itemTotalHeight;
					}

					// 继续处理下一个项目
					setTimeout(processNextItem, 20); // 20ms延迟确保兼容性
				}).catch(() => {
					// 获取高度失败时使用默认高度
					const defaultHeight = 300; // 默认高度
					if (targetColumn === 'left') {
						leftHeight.value += defaultHeight + 20;
					} else {
						rightHeight.value += defaultHeight + 20;
					}
					setTimeout(processNextItem, 20);
				});
			});
		};

		// 开始处理队列
		processNextItem();
	}

	// 获取项目高度
	function getItemHeight(itemId) {
		return new Promise((resolve, reject) => {
			const query = uni.createSelectorQuery();
			query.select(`.card[data-id="${itemId}"]`).boundingClientRect(rect => {
				if (rect && rect.height) {
					resolve(rect.height);
				} else {
					reject('获取高度失败');
				}
			}).exec();
		});
	}

	// 图片加载后更新列高度
	const onImageLoad = (item, column) => {
		// 获取图片实际宽高比并存储
		uni.getImageInfo({
			src: item.imageTempUrl,
			success: (res) => {
				if (res.width && res.height) {
					const ratio = (res.height / res.width) * 100;
					imageRatios.value[item._id] = ratio;
				}
			}
		});

		if (itemHeights.has(item._id)) return; // 已计算过高度则跳过

		nextTick(() => {
			getItemHeight(item._id).then(height => {
				const itemTotalHeight = height + 20;
				const oldHeight = itemHeights.get(item._id) || 0;
				itemHeights.set(item._id, itemTotalHeight);

				// 更新列高度（只更新差值）
				const heightDiff = itemTotalHeight - oldHeight;
				if (column === 'left') {
					leftHeight.value += heightDiff;
				} else {
					rightHeight.value += heightDiff;
				}
			});
		});
	}

	// 分类切换
	function switchCategory(category) {
		currentTab.value = category;
		resetWaterfall();
		getPostsByCategory(category._id);
	}

	// 点赞功能
	// 社区页面（瀑布流页面）中的 toggleLike 方法
const toggleLike = async (item) => {
  try {
    // 获取当前用户信息
    const userInfo = await uniCloud.getCurrentUserInfo();
    const userId = userInfo.uid; // uid 就是用户的 _id
    const postId = item._id;

    if (item.liked) {
      // 取消点赞
      await db.collection('likes_record')
        .where({
          user_id: userId,
          target_id: postId,
          target_type: 'post'
        })
        .remove();
      
      // 更新本地数据
      item.like_count = Math.max(0, item.like_count - 1);
    } else {
      // 添加点赞（使用 new Date()）
      await db.collection('likes_record').add({
        user_id: userId,
        target_id: postId,
        target_type: 'post'
      });
      
      // 更新本地数据
      item.like_count = (item.like_count || 0) + 1;
    }
    
    // 切换点赞状态
    item.liked = !item.liked;
    
  } catch (e) {
    if (e.errCode === 'uni-id-check-token-failed') {
      uni.showToast({
        title: '请先登录',
        icon: 'none'
      });
    } else {
      uni.showToast({
        title: '操作失败',
        icon: 'none'
      });

      console.error(e);
    }

  }
}

	// 跳转到详情页
	const goDetail = (postId) => {
		uni.navigateTo({
			url: `/pages/post_details/post_details?postId=${postId}`
		})
	}
</script>

<style lang="scss" scoped>
	@import "../../petcareui/pet-global.css";

	.like {
		display: flex;
		align-items: center;
		gap: 4px;

		&-icon {
			width: 20px;
			height: 20px;
		}

		&-count {
			font-size: 14px;
		}
	}

	.nav-scroll {
		white-space: nowrap;
		height: 80rpx;
		display: flex;
		justify-content: space-around;
		background: #fff;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
		position: sticky;
		top: 0;
		z-index: 10;

		.nav-item {
			display: inline-block;
			padding: 0 45rpx;
			line-height: 80rpx;
			font-size: 32rpx;
			color: #666;
			transition: all 0.3s;

			&.active {
				color: rgba(178, 215, 110, 1);
				font-weight: bold;
				position: relative;
				transform: scale(1.1);

				&::after {
					content: '';
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					width: 80%;
					height: 6rpx;
					background: rgba(178, 215, 110, 1);
					border-radius: 3rpx;
				}
			}
		}
	}

	/* 瀑布流容器 */
	.waterfall-container {
		display: flex;
		padding: 20rpx;
		box-sizing: border-box;
		background-color: #f5f5f5;

		/* 修复双列布局问题 */
		.waterfall-column {
			flex: 1;
			display: flex;
			flex-direction: column;

			/* 列间距 */
			&:first-child {
				margin-right: 10rpx;
			}

			&:last-child {
				margin-left: 10rpx;
			}
		}
	}

	.card {
		background: #fff;
		border-radius: 16rpx;
		overflow: hidden;
		margin-bottom: 20rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
		transition: transform 0.3s ease;
		break-inside: avoid;
		/* 防止列内换行 */

		&:active {
			transform: scale(0.98);
		}

		/* 图片容器（保持比例） */
		.image-container {
			position: relative;
			width: 100%;
			padding-top: 56.25%;
			/* 默认16:9比例 */
			overflow: hidden;
			background-color: #f5f5f5;
			/* 简单背景色 */
		}

		.card-image {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
			/* 确保图片填充容器 */
		}

		.card-info {
			padding: 20rpx;

			.author {
				display: flex;
				align-items: center;
				margin-bottom: 10rpx;

				.avatar {
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
					margin-right: 12rpx;
					background-color: #f5f5f5;
					border: 2rpx solid #eee;
				}

				.name {
					font-size: 28rpx;
					color: #333;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					max-width: 200rpx;
					font-weight: 500;
				}
			}

			.desc {
				display: block;
				margin-bottom: 20rpx;
				font-size: 30rpx;
				color: #222;
				line-height: 1.5;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
				font-weight: 500;
			}

			.stats {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 26rpx;
				color: #999;
				padding-top: 10rpx;
				border-top: 1rpx solid #f0f0f0;

				.like {
					font-size: 30rpx;
					padding: 5rpx 15rpx;
					border-radius: 30rpx;
					transition: all 0.2s;

					&:active {
						transform: scale(1.2);
					}

					&.liked {
						color: #ff6a6c !important;
						animation: pulse 0.5s;
					}
				}
			}
		}
	}

	/* 仅保留点赞动画 */
	@keyframes pulse {
		0% {
			transform: scale(1);
		}

		50% {
			transform: scale(1.3);
		}

		100% {
			transform: scale(1);
		}
	}
</style>