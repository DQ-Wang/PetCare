<template>
	<view class="pet-container">
		
		<!-- 顶部背景图 -->
		<view class="banner">
    		<image src="../../static/汪汪喵切图/首页/banner@3x.png" style="width: 100vw;" mode="widthFix"></image>
   		</view>
		
		<view class="login-container">
			<!-- 欢迎文本 -->
			<view class="welcome-text">
				欢迎来到汪汪喵(≧v≦)
			</view>
		
			<!-- 登录按钮 -->
			<button class="login-btn" @click="showPhoneModal">
				手机号快捷登录
			</button>
		
			<!-- 服务条款 -->
			<view class="terms-section">
				<checkbox-group @change="handleTermsAgree">
					<label class="terms-label">
						<checkbox :checked="isAgreeTerms" color="#8DC63F" style="transform:scale(0.7)"/>
						<text class="terms-text">我已认真阅读并同意汪汪喵</text>
						<text class="terms-link" @click="showTerms">《服务条款》</text>
					</label>
				</checkbox-group>
			</view>
		</view>
		
		<!-- 手机号获取弹窗 -->
		<view class="modal" v-if="showModal" @click.self="closeModal">
			<view class="modal-content">
				<view class="modal-header">
					<text class="modal-title">手机号授权</text>
				</view>
				<view class="modal-body">
					<button 
						class="getphone-btn" 
						open-type="getPhoneNumber" 
						@getphonenumber="getPhoneNumber"
						:loading="isLoading"
					>
						{{ isLoading ? '登录中...' : '获取手机号' }}
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'

// 响应式变量
const isAgreeTerms = ref(false)
const showModal = ref(false)
const isLoading = ref(false)

// 显示手机号弹窗
const showPhoneModal = () => {
	if (!isAgreeTerms.value) {
		uni.showToast({
			title: '请先同意服务条款',
			icon: 'none'
		})
		return
	}
	showModal.value = true
}

// 关闭弹窗
const closeModal = () => {
	showModal.value = false
}

// 获取手机号并登录
const getPhoneNumber = async (e) => {
	console.log('手机号获取回调:', e)
	
	if (e.detail.errMsg !== 'getPhoneNumber:ok') {
		uni.showToast({
			title: '获取手机号失败',
			icon: 'none'
		})
		return
	}
	
	try {
		isLoading.value = true
		
		// 1. 获取微信登录凭证
		const loginRes = await uni.login({
			provider: 'weixin'
		})
		
		console.log('微信登录凭证:', loginRes)
		
		// 2. 调用后端登录接口
		const loginData = {
			code: loginRes.code,  // 微信登录凭证
			encryptedData: e.detail.encryptedData,  // 加密的手机号数据
			iv: e.detail.iv  // 加密算法的初始向量
		}
		
		const res = await uni.request({
			url: '/api/auth/login',
			method: 'POST',
			data: loginData
		})
		
		console.log('登录结果:', res)
		
		if (res.statusCode === 200) {
			// 3. 保存登录信息
			const { token, userInfo } = res.data
			uni.setStorageSync('token', token)
			uni.setStorageSync('userInfo', userInfo)
			
			// 4. 登录成功提示
			uni.showToast({
				title: '登录成功',
				icon: 'success'
			})
			
			// 5. 关闭弹窗并跳转
			closeModal()
			setTimeout(() => {
				uni.switchTab({
					url: '/pages/home/home'
				})
			}, 1500)
		} else {
			throw new Error(res.data.message || '登录失败')
		}
		
	} catch (error) {
		console.error('登录错误:', error)
		uni.showToast({
			title: error.message || '登录失败，请重试',
			icon: 'none'
		})
	} finally {
		isLoading.value = false
	}
}

// 处理条款同意
const handleTermsAgree = (e) => {
	isAgreeTerms.value = e.detail.value.length > 0
}

// 显示服务条款
const showTerms = () => {
	uni.navigateTo({
		url: '/pages/terms/terms'
	})
	}
</script>

<style lang="scss">
@import '@/petcareui/pet-global.css';

.pet-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: $p-bg-color;
}

.login-container {
	width: 100%;
	min-height: 55.5vh; 
	margin-top: -40rpx; 
	border-radius: 93.75rpx 93.75rpx 0rpx 0rpx;
	background: $p-card-color;
	box-shadow: 0rpx 1.56rpx 7.81rpx rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	z-index: 1;
	
	.welcome-text {
		margin: 102rpx 0 259rpx 0;
		font-size: 46.88rpx;
		font-weight: $p-font-weight-bold;
		letter-spacing: 0rpx;
		line-height: 67.88rpx;
		color: $p-text-color;
	}
	
	.login-btn {
		font-size: $p-font-size-md;
		font-weight: 500;
		letter-spacing: 0rpx;
		line-height: 93.75rpx;
		color: $p-card-color;
		width: 518.75rpx;
		height: 93.75rpx;
		border-radius: 87.5rpx;
		background: $p-primary-color;
		
		&:active {
			opacity: 0.8;
		}
	}
	
	.terms-section {
		margin-top: 40rpx;
		
		.terms-label {
			display: flex;
			align-items: center;
			font-size: $p-font-size-sm;
			color: $p-text-secondary;
		}
		
		.terms-text {
			font-size: $p-font-size-md;
			font-weight: 500;
			letter-spacing: 0rpx;
			line-height: 40.72rpx;
			color: $p-text-color;
		}
		
		.terms-link {
			font-size: $p-font-size-md;
			font-weight: 500;
			letter-spacing: 0rpx;
			line-height: 40.72rpx;
			text-decoration-line: underline;
			color: rgba(146, 177, 216, 1);
		}
	}
}

.modal {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999;
	
	.modal-content {
		width: 600rpx;
		background: $p-card-color;
		border-radius: $p-border-radius-lg;
		overflow: hidden;
		
		.modal-header {
			padding: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1rpx solid $p-text-secondary;
			
			.modal-title {
				font-size: $p-font-size-md;
				font-weight: $p-font-weight-bold;
				color: $p-text-color;
			}
		}
		
		.modal-body {
			padding: 40rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.getphone-btn {
				width: 400rpx;
				height: 80rpx;
				line-height: 80rpx;
				background: $p-primary-color;
				color: $p-card-color;
				border-radius: $p-border-radius-lg;
				font-size: $p-font-size-md;
				
				&:active {
					opacity: 0.8;
				}
			}
		}
	}
}
</style>
