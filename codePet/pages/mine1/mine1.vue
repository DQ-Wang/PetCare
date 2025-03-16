<template>
  <view class="content">
    <view class="top-gradient">
    </view>
    <view class="user-card">
      <view class="avatar"></view>
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
    padding: 0 0 20px 0;
  }

  .top-gradient {
    position: relative;
    height: 200px;
    background: linear-gradient(to bottom, $green-light-2, $grey-light-2);
    overflow: hidden;

    &:after {
      content: '';
      position: absolute;
      top: 70%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 250px;
      height: 250px;
      background-image: url('/static/汪汪喵切图/我的/dog.png');
      background-repeat: no-repeat;
      background-size: contain;
      opacity: 0.8;
    }
  }

  .user-card {
    display: flex;
    background: white;
    margin: 15px;
    padding: 20px;
    margin-top: -40px;
    position: relative;
    border-radius: 16rpx;
    align-items: center;

    .avatar {
      width: 60px;
      height: 60px;
      background: $green;
      background-image: url('/static/汪汪喵切图/我的/头像.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      border-radius: 50%;
      margin-right: 15px;
    }

    .member-wrap {
      margin-top: 5px;
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 5px;

      .tag {
        background: $yellow-light;
        color: black;
        padding: 2px 8px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: bold;
      }

      .name {
        font-size: 18px;
        font-weight: bold;
      }
    }

    .qr-code {
      margin-top: -5px;
      width: 70px;
      height: 40px;
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 17px;
      color: #a1a1a1;

      .icon {
        padding-left: 13px;
        font-size: 30px;
        color: #a1a1a1;
        font-weight: bold;
      }
    }
  }

  .assets {
    margin: 15px;
    padding: 20px;
    border-radius: 10px;
    background: white;

    .assets-title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .assets-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      text-align: center;
      margin-bottom: -10px;

      .assets-item {
        padding: 10px;

        .number {
          font-size: 20px;
          font-weight: bold;
        }

        .label {
          font-size: 14px;
          color: #666;
        }
      }
    }
  }

  .order-menu {
    margin: 15px;
    padding: 20px;
    border-radius: 10px;
    background: white;

    .order-title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .order-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      text-align: center;

      .order-item {
        .icon {
          font-size: 24px;
          color: $yellow;
        }

        .label {
          padding-top: 5px;
          font-size: 14px;
          color: #333;
        }
      }
    }
  }

  .menu-list {
    margin: 15px;
    padding: 0 15px;
    border-radius: 10px;
    background: white;

    .menu-item {
      display: flex;
      align-items: center;
      padding: 15px 0;
      border-bottom: 1px solid #f0f0f0;

      .icon {
        margin-right: 10px;
        font-size: 2em;
        color: #000000;
      }

      .arrow {
        margin-right: 10px;
        font-size: 1em;
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
    margin-top: 3px;
    display: flex;
    align-items: center;
    gap: 8px;

    .experience-bar {
      width: 100%;
      height: 5px;
      background-color: #ddd;
      border-radius: 10px;
      overflow: hidden;

      .progress {
        width: 50%;
        height: 100%;
        background-color: $light-green;
      }
    }
  }
</style>