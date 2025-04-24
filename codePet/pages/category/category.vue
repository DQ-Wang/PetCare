<template>
	<view class="pet-container">

		<view class="location" @click="locate">
			<text style="font-weight: bold;">江北店</text>
			<image class="enter-icon" src="/static/汪汪喵切图/我的/进入icon.png" ></image>
		</view>

		<uni-search-bar 
			v-model="searchKeyword"
			placeholder="搜索" 
			bgColor="#fff" 
			:radius="60" 
			cancelButton="none" 
			style="margin: 30rpx;"
			@confirm="onSearch"
			@input="onSearch"
		>
			<uni-icons slot="searchIcon" color="#bababa" size="40" type="home" />
		</uni-search-bar>
			
		<view class="category-section">
			<view class="segmented-control-wrap" v-if="!isSearching">
				<uni-segmented-control 
					:current="current" 
					:values="items" 
					style-type="button"
					:active-color="'#b2d76e'" 
					@clickItem="onClickItem" 
				/>
			</view>
			
			<view class="content" style="margin-top: 30rpx;">
				<!-- 搜索列表 -->
				<view v-if="isSearching" class="category-body">
					<view v-if="searchResults.length === 0" class="no-result">
						<text>未找到相关服务</text>
					</view>
					<view v-else class="category-card" v-for="(item, index) in searchResults" :key="index" @click="enterService">
						<image class="pic" :src="item.image" mode="aspectFit"></image>
						<view class="title">
							<text>{{ item.title }}</text>
							<text class="price">¥{{ item.price }}<text v-if="item.unit" style="font-size: 20rpx; font-weight: 300;">/{{ item.unit }}</text></text>
						</view>
					</view>
				</view>
				
				<!-- 服务列表 -->
				<view v-else>
					<!-- 猫咪 -->
					<view v-if="current === 0" class="category-body">
						<view class="category-card" v-for="(item, index) in catServices" :key="index" @click="enterService">
							<image class="pic" :src="item.image" mode="aspectFit"></image>
							<view class="title">
								<text>{{ item.title }}</text>
								<text class="price">¥{{ item.price }}<text v-if="item.unit" style="font-size: 20rpx; font-weight: 300;">/{{ item.unit }}</text></text>
							</view>
						</view>
					</view>
					<!-- 狗狗 -->
					<view v-if="current === 1" class="category-body">
						<view class="category-card" v-for="(item, index) in dogServices" :key="index" @click="enterService">
							<image class="pic" :src="item.image" mode="aspectFit"></image>
							<view class="title">
								<text>{{ item.title }}</text>
								<text class="price">¥{{ item.price }}<text v-if="item.unit" style="font-size: 20rpx; font-weight: 300;">/{{ item.unit }}</text></text>
							</view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		
	</view>
</template>

<script>
export default {
		components: {},
		data() {
			return {
				items: ['猫咪', '狗狗'],
				current: 0,
				searchKeyword: '',
				isSearching: false,
				searchResults: [],
				catServices: [
					{
						image: '/static/汪汪喵切图/分类/图.png',
						title: '接宠洗澡/美容',
						price: '50.00'
					},
					{
						image: '/static/汪汪喵切图/分类/图.png',
						title: '上门清理猫砂',
						price: '200.00',
						unit: '次'
					},
					{
						image: '/static/汪汪喵切图/分类/图.png',
						title: '上门喂猫',
						price: '49.90',
						unit: '次'
					}
				],
				dogServices: [
					{
						image: '/static/汪汪喵切图/分类/图.png',
						title: '接宠洗澡/美容',
						price: '50.00'
					},
					{
						image: '/static/汪汪喵切图/分类/图.png',
						title: '上门清理',
						price: '200.00',
						unit: '次'
					},
					{
						image: '/static/汪汪喵切图/分类/图.png',
						title: '上门喂狗',
						price: '49.90',
						unit: '次'
					}
				]
			}
		},
		methods: {
			locate() { 

			},
			onClickItem(e) { //分类切换
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			onSearch(e) { //搜索
				const keyword = e.trim().toLowerCase()
				if (!keyword) {
					this.isSearching = false
					this.searchResults = []
					return
				}
				this.isSearching = true
				const allServices = [...this.catServices, ...this.dogServices]
				this.searchResults = allServices.filter(item => 
					item.title.toLowerCase().includes(keyword)
				)
			},
			enterService(e) {
				uni.navigateTo({
					url: 'service/service',
				});
			}
		}
	}
</script>

<style>
	@import '@/petcareui/pet-global.css';
	
	.pet-container{
		padding: 20rpx;
	}
	
	.location {
		margin-top: calc(var(--status-bar-height) + 40rpx);
		margin-left: 20rpx;
	}
	.enter-icon{
		width: 20rpx;
		height: 20rpx;
		margin-left: 10rpx;
	}
	
	.segmented-control-wrap {
		width: 500rpx;
		margin: 30rpx auto;
	}
	:deep(.segmented-control) {
		width: 500rpx;
		height: 80rpx !important;
		border: none;
		border-radius: 60rpx;
		background-color: #fff;
	}
	:deep(.segmented-control__item) {
		border: none !important;
		border-radius: 60rpx;
	}
	:deep(.segmented-control__item--button) {
		transition: all 0.3s ease;
	}
	:deep(.segmented-control__item--button.segmented-control__item--active) {
		background-color: #b2d76e;
	}
	:deep(.segmented-control__text) {
		font-size: 30rpx;
		color: #000 !important;
		font-weight: bold;
	}
	
	.category-body{
	    display: flex;
	    flex-wrap: wrap;
	    justify-content:space-between;
		margin: 0 10rpx;
	}
	.category-card{
		display: flex;
		flex-direction: column;
		margin-bottom: 20rpx;
	}
	.pic{
		width: 330rpx;
		height: 300rpx;
	}
	.title{
		display: flex;
		flex-direction: column;
		margin: 15rpx 10rpx;
		font-weight: bold;
		font-size: 28rpx;
	}
	.price{
		color: #e74040;
	}
	
	.no-result {
		width: 100%;
		text-align: center;
		padding: 40rpx;
		color: #999;
		font-size: 28rpx;
	}
</style>
