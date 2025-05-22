<template>
  <view class="content">
    <view class="top-gradient">
    </view>
    <view class="user-card">
      <view class="avatar" @click=""></view>
      <view>
        <view class="member-wrap">
          <text class="name">授权昵称</text>
          <text class="tag">初级会员</text>
        </view>
        <view style="font-size: small;">您已达到等级上限</view>
        <view class="experience-bar-container">
          <view class="experience-bar">
            <view class="progress"></view>
          </view>
          <text>0/0</text>
        </view>
        <view class="qr-code">
          <view class="icon iconfont icon-erweima1"></view>
          <view>会员码</view>
        </view>
      </view>
    </view>
    <view class="assets">
      <view class="assets-title">我的资产</view>
      <view class="assets-grid">
        <view class="assets-item">
          <view class="number">0.00</view>
          <view class="label">余额</view>
        </view>
        <view class="assets-item">
          <view class="number">0</view>
          <view class="label">优惠券</view>
        </view>
        <view class="assets-item">
          <view class="number">0</view>
          <view class="label">积分</view>
        </view>
        <view class="assets-item">
          <view class="number">0</view>
          <view class="label">佣金</view>
        </view>
      </view>
    </view>
    <view class="order-menu">
      <view class="order-title">我的订单</view>
      <view class="order-grid">
        <view class="order-item">
          <view class="icon iconfont icon-licai"></view>
          <view class="label">代付款</view>
        </view>
        <view class="order-item">
          <view class="icon iconfont icon-hezi"></view>
          <view class="label">待服务</view>
        </view>
        <view class="order-item">
          <view class="icon iconfont icon-yiwancheng3"></view>
          <view class="label">已服务</view>
        </view>
        <view class="order-item">
          <view class="icon iconfont icon-pingjia"></view>
          <view class="label">评价</view>
        </view>
        <view class="order-item">
          <view class="icon iconfont icon-tuikuanshouhou"></view>
          <view class="label">售后服务</view>
        </view>
      </view>
    </view>
    <view class="menu-list">
      <view class="menu-item">
        <view class="icon iconfont icon-qiandai"></view>
        <text class="label">推广赚钱</text>
        <text class="arrow iconfont icon-youjiantou"></text>
      </view>
      <view class="menu-item">
        <view class="icon iconfont icon-youhuiquan"></view>
        <text class="label">领券中心</text>
        <view class="icon arrow iconfont icon-youjiantou"></view>
      </view>
      <view class="menu-item">
        <view class="icon iconfont icon-hongbao"></view>
        <text class="label">直接付款</text>
        <view class="icon arrow iconfont icon-youjiantou"></view>
      </view>
      <view class="menu-item">
        <view class="icon iconfont icon-yinhangka"></view>
        <text class="label">我的次卡</text>
        <view class="icon arrow iconfont icon-youjiantou"></view>
      </view>
      <view class="menu-item">
        <view class="icon iconfont icon-dizhi"></view>
        <text class="label">地址管理</text>
        <view class="icon arrow iconfont icon-youjiantou"></view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  @import '@/static/iconfont/iconfont.css';
  @import "../../petcareui/pet-global.css";
  $grey-light-2: #f5f7f9;
  $green-light-2: #ddebc8;
  $green: #c3e6b4;
  $yellow-light: #c7d57e;
  $yellow: #c7d57e;
  $light-green: #b2d76e;

  .content {
    background-color: $grey-light-2;
    padding: 0 0 40rpx 0;
  }

  .top-gradient {
    position: relative;
    height: 400rpx;
    background: linear-gradient(to bottom, $green-light-2, $grey-light-2);
    overflow: hidden;

    &:after {
      content: '';
      position: absolute;
      top: 70%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 500rpx;
      height: 500rpx;
      background-image: url('/static/汪汪喵切图/我的/dog.png');
      background-repeat: no-repeat;
      background-size: contain;
      opacity: 0.8;
    }
  }

  .user-card {
    display: flex;
    background: white;
    margin: 30rpx;
    padding: 40rpx;
    margin-top: -80rpx;
    position: relative;
    border-radius: 32rpx;
    align-items: center;

    .avatar {
      width: 120rpx;
      height: 120rpx;
      background: $green;
      background-image: url('/static/汪汪喵切图/我的/头像.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      border-radius: 50%;
      margin-right: 30rpx;
    }

    .member-wrap {
      margin-top: 10rpx;
      display: flex;
      align-items: center;
      gap: 20rpx;
      margin-bottom: 10rpx;

      .tag {
        background: $yellow-light;
        color: black;
        padding: 4rpx 16rpx;
        border-radius: 16rpx;
        font-size: 24rpx;
        font-weight: bold;
      }

      .name {
        font-size: 32rpx;
        font-weight: bold;
      }
    }

    .qr-code {
      margin-top: -10rpx;
      width: 140rpx;
      height: 80rpx;
      position: absolute;
      right: 40rpx;
      top: 50%;
      transform: translateY(-50%);
      font-size: 34rpx;
      color: #a1a1a1;

      .icon {
        padding-left: 26rpx;
        font-size: 60rpx;
        color: #a1a1a1;
        font-weight: bold;
      }
    }
  }

  .assets {
    margin: 30rpx;
    padding: 40rpx;
    border-radius: 20rpx;
    background: white;

    .assets-title {
      font-size: 32rpx;
      font-weight: bold;
      margin-bottom: 20rpx;
    }

    .assets-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      text-align: center;
      margin-bottom: -20rpx;

      .assets-item {
        padding: 20rpx;

        .number {
          font-size: 40rpx;
          font-weight: bold;
        }

        .label {
          font-size: 28rpx;
          color: #666;
        }
      }
    }
  }

  .order-menu {
    margin: 30rpx;
    padding: 40rpx;
    border-radius: 20rpx;
    background: white;

    .order-title {
      font-size: 32rpx;
      font-weight: bold;
      margin-bottom: 40rpx;
    }

    .order-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      text-align: center;

      .order-item {
        .icon {
          font-size: 48rpx;
          color: $yellow;
        }

        .label {
          padding-top: 10rpx;
          font-size: 28rpx;
          color: #333;
        }
      }
    }
  }

  .menu-list {
    margin: 30rpx;
    padding: 0 30rpx;
    border-radius: 20rpx;
    background: white;

    .menu-item {
      display: flex;
      align-items: center;
      padding: 30rpx 0;
      border-bottom: 2rpx solid #f0f0f0;

      .icon {
        margin-right: 20rpx;
        font-size: 64rpx;
        color: #000000;
      }

      .arrow {
        margin-right: 20rpx;
        font-size: 32rpx;
        color: #cecece;
      }

      .label {
        flex: 1;
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .experience-bar-container {
    margin-top: 6rpx;
    display: flex;
    align-items: center;
    gap: 16rpx;

    .experience-bar {
      width: 100%;
      height: 10rpx;
      background-color: #ddd;
      border-radius: 20rpx;
      overflow: hidden;

      .progress {
        width: 50%;
        height: 100%;
        background-color: $light-green;
      }
    }
  }
</style>