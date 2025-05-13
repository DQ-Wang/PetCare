<template>
	<view class="pet-container">
		<!-- 顶部导航 -->
		<scroll-view class="nav-scroll" scroll-x>
			<view v-for="(item, index) in categories" :key="index" class="nav-item"
				:class="{ active: currentTab === item }" @click="switchCategory(item)">
				{{ item }}
			</view>
		</scroll-view>

		<!-- 订单列表 -->
		<view v-if="filteredOrders.length > 0" class="order-list">
			<view v-for="(order, index) in filteredOrders" :key="index" class="order-card">
				<!-- 店铺信息 -->
				<view class="store-info">
					<text class="store-name">{{ order.store }}</text>
					<text class="arrow">〉</text>
					<text class="order-status">{{ order.status }}</text>
				</view>
				<view class="divider-line"></view>
				<!-- 服务信息 -->
				<view class="service-info">
					<image class="pet-avatar" :src="order.avatar" mode="aspectFill" />
					<view class="detail-box">
						<text class="service-type">{{ order.service }}</text>
						<view class="time-price">
							<view class="time-group">
								<text class="time-item">下单时间：{{ order.createTime }}</text>
								<text class="time-item">结束时间：{{ order.finishTime }}</text>
							</view>
							<text class="price">{{ order.price }}元</text>
						</view>
					</view>
				</view>

				<!-- 操作按钮 -->
				<view class="action-buttons">
					<view class="btn evaluate-btn">评价</view>
					<view class="btn contact-btn">联系商家</view>
				</view>
			</view>
		</view>

		<!-- 空状态 -->
		<view v-else class="empty-state">
			<image class="empty-image" src="/static/汪汪喵切图/我的订单/没有订单.png" mode="aspectFit" />
			<text class="empty-text">还没有相关的订单呢</text>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		computed
	} from 'vue';

	// 导航分类
	const categories = ref(['全部', '待付款', '待接单', '服务中', '评价']);
	const currentTab = ref('全部');

	// 订单数据
	const orders = ref([{
			id: 1,
			store: '江北店',
			status: '已完成',
			service: '接宠洗澡',
			createTime: '2025-4-10 17:42:26',
			finishTime: '2025-4-10 19:50:35',
			price: 21,
			statusType: '全部',
			avatar: '/static/汪汪喵切图/我的订单/接宠洗澡.png'
		},
		{
			id: 2,
			store: '江北店',
			status: '待付款',
			service: '接宠洗澡',
			createTime: '2025-4-11 17:42:26',
			finishTime: '未结束',
			price: 22,
			statusType: '待付款',
			avatar: '/static/汪汪喵切图/我的订单/接宠洗澡.png'
		},
		{
			id: 3,
			store: '江北店',
			status: '待接单',
			service: '接宠洗澡',
			createTime: '2025-4-12 17:42:26',
			finishTime: '未结束',
			price: 31,
			statusType: '待接单',
			avatar: '/static/汪汪喵切图/我的订单/接宠洗澡.png'
		},
		// 以上为测试数据
	]);

	// 过滤订单，全部里可以显示所有订单
	const filteredOrders = computed(() => {
		if (currentTab.value === '全部') return orders.value;
		return orders.value.filter(order => order.statusType === currentTab.value);
	});

	function switchCategory(category) {
		currentTab.value = category;
	}

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

	.order-list {
		padding: 0rpx;
	}

	.divider-line {
		position: relative;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 1rpx;
		margin-bottom: 25rpx;
		
		background-color: #e2e2e2;
	}

	.order-card {
		background: #fff;
		border-radius: 16rpx;
		margin: 20rpx;
		padding: 30rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
		margin-bottom: 24rpx;

		.store-info {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;


			.store-name {
				font-size: 30rpx;
				font-weight: bold;
				color: #333;
				margin-right: 10rpx;
			}

			.arrow {
				color: #999;
				font-size: 28rpx;
				transform: translateY(-2rpx);
			}

			.order-status {
				margin-left: auto;
				color: #666;
				font-size: 26rpx;
				margin-right: 10rpx;
			}
		}

		.service-info {
			display: flex;
			margin-bottom: 20rpx;

			.pet-avatar {
				width: 140rpx;
				height: 140rpx;
				border-radius: 16rpx;
				margin-right: 24rpx;
			}

			.detail-box {
				flex: 1;
				background: #f8f8f8;
				border-radius: 12rpx;
				padding: 10rpx;

				.service-type {
					display: block;
					color: #333;
					font-size: 30rpx;
					font-weight: bold;
					margin-bottom: 10rpx;
				}

				.time-price {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.time-group {
						.time-item {
							display: block;
							color: #8f8f8f;
							font-size: 16rpx;
							margin-bottom: 6rpx;

						}
					}

					.price {
						color: #000000;
						font-size: 36rpx;

					}
				}
			}
		}

		.action-buttons {
			display: flex;
			justify-content: flex-end;
			gap: 20rpx;
			/* 保持按钮间距 */
			width: 100%;

			.btn {
				min-width: 160rpx;
				padding: 6rpx 0;
				/* 调整左右内边距 */
				text-align: center;
				border-radius: 25rpx;

				&.evaluate-btn {
					border: 1rpx solid #9e9e9e;
				}

				&.contact-btn {
					border: 1rpx solid #b2d76e;
					color: #b2d76e;
				}
			}
		}
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 90vh;
		margin-top: -80rpx;

		.empty-image {
			width: 400rpx;
			height: 400rpx;
			margin-bottom: 40rpx;
		}

		.empty-text {
			font-size: 28rpx;
			color: #999;
		}
	}
</style>