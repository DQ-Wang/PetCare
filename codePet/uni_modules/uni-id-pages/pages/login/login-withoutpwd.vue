<template>
  <!-- 融合样式页面的容器 -->
  <view class="pet-container">
    <!-- 顶部背景图 -->
    <view class="banner">
      <image src="../../../../static/汪汪喵切图/首页/banner.png" mode="widthFix" />
    </view>

    <view class="login-container">
      <!-- 欢迎文本 -->
      <view class="welcome-text">
        欢迎来到汪汪喵(≧v≦)
      </view>

      <!-- 免密登录核心区域 -->
      <view class="uni-content">
        <!-- 手机号输入区域 -->
        <view class="phone-box">
          <view @click="chooseArea" class="area">+86</view>
          <uni-easyinput
            trim="both"
            class="input-box"
            type="number"
            :inputBorder="false"
            v-model="phone"
            maxlength="11"
            placeholder="请输入手机号"
          />
        </view>
        
        <!-- 协议组件 -->
        <uni-id-pages-agreements 
          scope="register" 
          ref="agreements"
          class="terms-section"
        />
        
        <!-- 获取验证码按钮 -->
        <button 
          class="login-btn" 
          type="primary" 
          @click="toSmsPage"
        >
          获取验证码
        </button>
		
		<uni-id-pages-fab-login ref="uniFabLogin"></uni-id-pages-fab-login>
      </view>
    </view>
  </view>
</template>

<script>
  import config from '@/uni_modules/uni-id-pages/config.js'
  import mixin from '@/uni_modules/uni-id-pages/common/login-page.mixin.js';

  export default {
    mixins: [mixin],
    data() {
      return {
        phone: "",
      }
    },
    computed: {
      isPhoneValid() {
        return /^1\d{10}$/.test(this.phone);
      }
    },
    methods: {
      toSmsPage() {
        if (!this.isPhoneValid) {
          return uni.showToast({
            title: "手机号码格式不正确",
            icon: 'none'
          });
        }
        
        // 检查协议同意状态
        if (this.needAgreements && !this.agree) {
          return this.$refs.agreements.popup(this.toSmsPage)
        }
        
        uni.navigateTo({
          url: `/uni_modules/uni-id-pages/pages/login/login-smscode?phoneNumber=${this.phone}`
        });
      },
      chooseArea() {
        uni.showToast({
          title: '暂不支持其他国家',
          icon: 'none'
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
	@import "@/uni_modules/uni-id-pages/common/login-page.scss";
	@import "../../../../petcareui/pet-global.css";
	
  .pet-container {
    background-color: $p-bg-color;
    min-height: 100vh;
    
    .banner image {
      width: 100%;
    }
  }
  
  /* 登录卡片容器 */
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
		margin: 102rpx 0 102rpx 0;
		font-size: 46.88rpx;
		font-weight: $p-font-weight-bold;
		letter-spacing: 0rpx;
		line-height: 67.88rpx;
		color: $p-text-color;
    }
	
	.uni-content{
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
    
    /* 手机号输入区域 */
    .phone-box {
		position: relative;
		margin-bottom: 20rpx; 
		width: 600rpx;
		 
		.area {
			position: absolute;
			left: 20rpx;
			top: 50%;
			transform: translateY(-50%);
			z-index: 2;
			color: $p-text-secondary;
		}
		
		::v-deep .uni-easyinput__content {
		  padding-left: 100rpx !important;
		}
    }
    
    /* 协议条款样式 */
    .terms-section {
		margin: 20rpx 0;
      
		::v-deep .agreements-content {
			font-size: 26rpx;
			color: $p-text-secondary;
        
			.link {
				color: $p-primary-color;
			}
		}
    }
    
    /* 获取验证码按钮 */
    .login-btn {
		height: 93.75rpx;
		width: 350rpx;
		line-height: 93.75rpx;
		border-radius: 87.5rpx;
		background: $p-primary-color;
		color: white;
		font-size: $p-font-size-md;
		margin-top: 100rpx;
      
		&:active {
			opacity: 0.9;
		}
    }
  }
  
  /* 媒体查询适配 */
  @media (min-width: 690px) {
    .login-container {
      width: 80%;
      max-width: 600px;
      margin: -40rpx auto 0;
    }
  }
</style>