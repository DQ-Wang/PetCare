<template>
	<view class="container">
		<!-- 设置项列表 -->
		<view class="settings-list">
			<!-- 头像上传 -->
			<view class="setting-item" @click="chooseAvatar">
				<text class="item-label">头像</text>
				<view class="right-content">
					<image :src="avatarUrl" class="avatar" mode="aspectFill" />
					<uni-icons type="arrowright" size="20" color="#999" />
				</view>
			</view>

			<!-- 昵称修改 -->
			<view class="setting-item" @click="editNickname">
				<text class="item-label">昵称</text>
				<view class="right-content">
					<text class="item-value">{{ nickname }}</text>
					<uni-icons type="arrowright" size="20" color="#999" />
				</view>
			</view>
		</view>
		<view class="settings-list">
			

			<!-- 性别选择 -->
			<view class="setting-item" @click="chooseGender">
				<text class="item-label">性别</text>
				<view class="right-content">
					<text class="item-value">{{ gender }}</text>
					<uni-icons type="arrowright" size="20" color="#999" />
				</view>
			</view>

			<!-- 生日选择 -->
			<picker mode="date" :value="birthday" start="1900-01-01" :end="endDate" @change="handleDateChange">
				<view class="setting-item">
					<text class="item-label">生日</text>
					<view class="right-content">
						<text class="item-value">{{ formattedBirthday || '请选择生日' }}</text>
						<uni-icons type="arrowright" size="20" color="#999" />
					</view>
				</view>
			</picker>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		computed
	} from 'vue';

	// 响应式数据
	const avatarUrl = ref('/static/汪汪喵切图/我的订单/接宠洗澡.png');
	const nickname = ref('汪汪喵用户');
	const gender = ref('未知');
	const birthday = ref('');

	// 日期范围计算（参考网页7、8）
	const endDate = computed(() => {
		const date = new Date();
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		return `${year}-${month}-${day}`;
	});

	// 日期格式化
	const formattedBirthday = computed(() => {
		if (!birthday.value) return '';
		const date = new Date(birthday.value);
		return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`;
	});

	// 日期变更处理
	const handleDateChange = (e) => {
		birthday.value = e.detail.value;
		uni.showToast({
			title: '生日修改成功',
			icon: 'none'
		});
	};

	// 返回上一页
	const navigateBack = () => uni.navigateBack();

	// 选择头像
	const chooseAvatar = async () => {
		try {
			const res = await uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album']
			});

			if (res.tempFilePaths?.length) {
				avatarUrl.value = res.tempFilePaths[0];
				uni.showToast({
					title: '头像更新成功',
					icon: 'success'
				});
			}
		} catch (error) {
			console.log('取消选择头像');
		}
	};

	// 修改昵称
	const editNickname = () => {
		uni.showModal({
			title: '修改昵称',
			content: nickname.value,
			editable: true,
			success: (res) => {
				if (res.confirm && res.content) {
					nickname.value = res.content;
					uni.showToast({
						title: '昵称修改成功',
						icon: 'none'
					});
				}
			}
		});
	};

	// 选择性别
	const chooseGender = () => {
		uni.showActionSheet({
			itemList: ['男', '女', '未知'],
			success: (res) => {
				gender.value = ['男', '女', '未知'][res.tapIndex];
				uni.showToast({
					title: '性别已更新',
					icon: 'none'
				});
			}
		});
	};
</script>

<style lang="scss">
	@import "../../petcareui/pet-global.css";

	page {
		background-color: #f5f5f5;
	}

	.container {
		padding: 0 16rpx;
	}

	.header {
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
		background-color: #fff;

		.title {
			font-size: 36rpx;
			font-weight: 500;
			color: #333;
		}
	}

	.settings-list {
		margin-top: 24rpx;
		background-color: #fff;
		border-radius: 16rpx;
		overflow: hidden;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
	}

	.setting-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24rpx 24rpx;
		min-height: 100rpx;
		border-bottom: 1rpx solid #f5f5f5;

		&:last-child {
			border-bottom: none;
		}

		.item-label {
			font-size: 32rpx;
			color: #333;
		}

		.right-content {
			display: flex;
			align-items: center;
			gap: 20rpx;

			.avatar {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
			}

			.item-value {
				font-size: 30rpx;
				color: #666;
				max-width: 400rpx;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}

	/* 日期选择器样式 */
	.uni-datetime-picker {
		z-index: 999;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;
		border-radius: 16rpx 16rpx 0 0;
		box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.1);
	}
</style>