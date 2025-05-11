<template>
	<view class="pet-container">
		<!-- 顶部导航 -->
		<scroll-view class="nav-scroll" scroll-x>
			<view v-for="(item, index) in categories" :key="index" class="nav-item"
				:class="{ active: currentTab === item }" @click="switchCategory(item)">
				{{ item }}
			</view>
		</scroll-view>
		<view class="pet-master-list">
			<navigator v-for="provider in filteredProviders" :key="provider.name"
				:url="`/pages/Washcare_details/Washcare_details?providerId=${provider.name}`"
				hover-class="navigator-hover">
				<view class="pet-master">
					<image src="../../static/汪汪喵切图/师傅列表/头像.png" mode="aspectFit" class="pet-avatar"></image>
					<view class="pet-introduction">
						<view style="display:flex">
							<view style="font-weight:bold;margin-right:16rpx;font-size:38rpx">{{ provider.name }}</view>
							<view :class="['pet-status', { 
							                  'pet-text-green': provider.status === '在线',
							                  'pet-text-yellow': provider.status === '服务中',
							                  'pet-text-gray': provider.status === '休息中'
							                }]" style="font-size:28rpx;margin-top:2rpx">{{ provider.status }}</view>
							<!-- 使distance显示在容器的右上角 -->
							<view style="flex-grow:1"></view>
							<view class="pet-distance">{{ provider.distance }}</view>
						</view>
						<view style="margin-top:6rpx;display:flex">
							<view class="pet-score">{{ provider.score }}分</view>
							<view class="pet-label"> {{ provider.comments[0] }}</view>
							<view class="pet-label">{{ provider.comments[1] }}</view>
						</view>
						<view style="margin-top:10rpx;display:flex">
							<view style="font-size:28rpx">{{ provider.experience }}</view>
							<view style="flex-grow:1"></view>
							<view style="font-size: 35rpx;color: red;font-weight: bold;">{{ provider.price }}</view>
						</view>
					</view>

				</view>
			</navigator>

		</view>

	</view>


</template>

<script setup>
	import {
		ref,
		computed
	} from 'vue';

	// 分类数据
	const categories = ref(['服务范围', '服务时间', '更多筛选', '北京 西城']);
	const currentTab = ref('服务范围');

	// 服务提供者数据
	const serviceProviders = ref([{
			name: '张女士',
			status: '在线',
			distance: '13km',
			score: 4.9,
			comments: ['"师傅人很好，非常细心！"', '"上门很快"'],
			experience: '3年喂养经验 | 猫狗双全',
			price: '¥49.9起'
		},
		{
			name: '王女士',
			status: '服务中',
			distance: '15km',
			score: 4.6,
			comments: ['"师傅人很好，非常细心！"', '"上门很快"'],
			experience: '洗护经验丰富 | 不接大型犬',
			price: '¥39.9起'
		},
		{
			name: '李女士',
			status: '休息中',
			distance: '15km',
			score: 3.8,
			comments: ['"我的猫被洗感冒了"', '"上门很快"'],
			experience: '洗护经验丰富 | 不接大型犬',
			price: '¥39.9起'
		}
	]);

	// 切换分类
	function switchCategory(category) {
		currentTab.value = category;
	}

	// 根据当前分类筛选服务提供者（示例计算属性）
	const filteredProviders = computed(() => {
		if (currentTab.value === '服务范围') {
			return serviceProviders.value.filter(p => p.distance <= '15km');
		}
		return serviceProviders.value;
	});
</script>

<style lang="scss">
	@import "../../petcareui/pet-global.css";
	@import "../../petcareui/master_list.css";

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

	
</style>