<template>
  <view class="pet-container">
    <view class="banner">
      <image src="../../static/汪汪喵切图/首页/banner@3x.png" style="width: 100vw;" mode="widthFix"></image>
    </view>

    <view class="main-area">
      <view class="box user-info">
        <view class="left-section">
          <image class="pet-avatar" src="../../static/汪汪喵切图/首页/头像@3x.png" mode="aspectFill" />
        </view>

        <view class="middle-section">
          <text style="font-size: 28rpx; font-weight: bold; letter-spacing: 2rpx;">授权昵称</text>
          <text class="title" style="font-size: 20rpx; font-weight: bold;">初级会员</text>
          <view class="level">
            <text style="font-size: 24rpx; color: #585858;">您已达等级上限</text>
            <view class="progress-box">
              <progress :percent="0" background-color="#e3e8e7" style="height:5rpx;width:100%" stroke-width="3" />
              <text style="font-size: 26rpx;">0/0</text>
            </view>
          </view>
        </view>

        <view class="right-section">
          <image src="../../static/汪汪喵切图/我的/会员码@3x.png" class="code" mode=""></image>
          <text style="font-size: 24rpx; color: #585858;">会员码</text>
        </view>
      </view>

      <view class="feature">
        <view class="feature1">
          <view class="box reservation">
            <image src="../../static/汪汪喵切图/首页/洗护预约icon@3x.png" class="icon1" mode=""></image>
            <text>洗护预约</text>
          </view>
          <view class="box door-to-door">
            <image src="../../static/汪汪喵切图/首页/一键上门icon@3x.png" class="icon1" mode=""></image>
            <text>一键上门</text>
          </view>
        </view>

        <view class="box feature2">
          <view class="pet-boarding">
            <image src="../../static/汪汪喵切图/首页/宠物寄养icon@3x.png" class="icon2" mode=""></image>
            <text>宠物寄养</text>
          </view>
          <view class="point-exchange">
            <image src="../../static/汪汪喵切图/首页/积分兑换icon@3x.png" class="icon2" mode=""></image>
            <text>积分兑换</text>
          </view>
          <view class="coupon">
            <image src="../../static/汪汪喵切图/首页/优惠券icon@3x.png" class="icon2" mode=""></image>
            <text>优惠券</text>
          </view>
        </view>
      </view>

      <view class="hot-line">
        <view class="cocount">
          <view class="">A RIGHT</view>
          <view class="">COCOUNT</view>
        </view>
        <view class="brand-hotline">
          <view class="">品牌热线</view>
          <view class="">400-000-0000</view>
        </view>
        <image src="../../static/汪汪喵切图/首页/热线icon@3x.png" class="icon3" mode=""></image>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style lang="scss">
  @import '@/petcareui/pet-global.css';

  .banner {
    // height: 500rpx;
    // overflow: hidden;
    // // border: 1px solid red;






  }

  .main-area {
    width: 92vw;
    height: 80vh;
    display: flex;
    flex-direction: column;
    margin: -200rpx auto 0 auto;

  }

  .box {
    background: $p-card-color;
    border-radius: $p-border-radius-md;

  }

  .user-info {
    height: 140rpx;
    display: flex;
    padding: 20rpx;

    .left-section {
      margin: auto 15rpx auto 0;
      flex: 1;
    }

    .middle-section {
      flex: 3;

      .title {
        background-color: $p-primary-color;
        padding: 2rpx 15rpx;
        border-radius: $p-border-radius-sm;
        margin: 10rpx;
      }

      .level {
        .progress-box {
          height: 50rpx;
          width: 300rpx;
          display: flex;
          align-items: center;
          gap: 20rpx;
        }
      }
    }

    .right-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin: auto;
      text-align: center;

      .code {
        height: 45rpx;
        width: 45rpx;
        margin: 0 auto;
      }

      text {
        margin-top: 10rpx;
      }
    }
  }

  .feature1 {
    display: flex;
    gap: 20rpx;
    margin-top: 20rpx;

    .reservation {
      flex: 2;
    }

    .door-to-door {
      flex: 3;
    }

    .reservation,
    .door-to-door {
      height: 300rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .icon1 {
        width: 110rpx;
        height: 110rpx;
        margin: 0 auto;
      }

      text {
        font-weight: $p-font-weight-bold;
        text-align: center;
        margin-top: 30rpx;
        letter-spacing: 5rpx;
      }
    }

  }

  .feature2 {
    height: 180rpx;
    margin-top: 20rpx;
    display: flex;

    .pet-boarding,
    .point-exchange,
    .coupon {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;

      .icon2 {
        width: 60rpx;
        height: 60rpx;
        margin: 0 auto;
      }

      text {
        font-size: $p-font-size-md;
        text-align: center;
        margin-top: 10rpx;
        letter-spacing: 5rpx;
      }
    }

  }

  .hot-line {
    height: 100rpx;
    background-image: url(@/static/汪汪喵切图/首页/品牌热线框@3x.png);
    background-size: 100% 100%;
    margin: 20rpx 0;
    padding: 40rpx 30rpx;
    display: flex;

    .cocount {
      flex: 3;
      margin: auto 0;
    }

    .brand-hotline {
      flex: 6;
      text-align: right;
      font-weight: $p-font-weight-bold;
      margin: auto 25rpx auto 0;
    }

    .icon3 {
      flex: 1;
      width: 60rpx;
      height: 60rpx;
      margin: auto 0;
    }
  }
</style>