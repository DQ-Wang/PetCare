<template>
  <view class="pet-container">
    <p-card class="shop-info">
      <view class="shop-header">
        <view class="shop-name">思北店</view>
        <view class="shop-distance">1.24km</view>
      </view>
      <view class="divider-line"></view>
      <view class="staff-info">
        <image class="avatar" src="/static/汪汪喵切图/分类/图.png" mode="aspectFill" />
        <view class="staff-detail">
          <text>李师傅</text>
          <text>联系电话：123456789</text>
          <text>洗护时间：13:30</text>
        </view>
      </view>
    </p-card>
    <p-card class="service-info">
      <view class="section-title">服务详情</view>
      <view class="divider-line"></view>
      <view class="service-line">洗护对象：猫</view>
      <view class="service-line">洗护套餐：基础护理</view>
      <view class="service-line">基础服务：全程录像，检查环境隐患</view>
      <view class="service-line last">增值服务：宠物健康基础检查</view>
      <view class="divider-line"></view>
      <view class="price-info">
        <text class="price-label">总计</text>
        <text class="price-value">¥55</text>
      </view>
    </p-card>
    <p-card class="coupon-info">
      <view class="section-title">优惠详情</view>
      <view class="divider-line"></view>
      <view class="coupon-line">
        <view class="coupon-left">
          <view class=" iconfont icon-youhuiquan" style="font-size: 40rpx;"></view>
          <text class="coupon-name">优惠券</text>
        </view>
        <view class="coupon-right">
          <text class="coupon-amount">-¥5</text>
          <view class="arrow iconfont icon-youjiantou"></view>
        </view>
      </view>
    </p-card>

    <p-card class="contact-info">
      <view class="info-line">
        <text>预留电话</text>
        <text>123456789</text>
      </view>
      <view class="divider-line"></view>
      <view class="info-line " @click="goToRemark">
        <text>备注</text>
        <view class="arrow iconfont icon-youjiantou"></view>
      </view>
    </p-card>
    <p-bottombar :price="50" @submit="handleSubmit"></p-bottombar>
  </view>

</template>

<script setup>
  function handleSubmit() {
    // 这里处理点击支付的逻辑，比如下单、跳转支付页
    uni.showToast({
      title: '提交成功',
      icon: 'success'
    })
  }
</script>

<style lang="scss" scoped>
  @import "../../petcareui/pet-global.css";
  @import '@/static/iconfont/iconfont.css';

  .divider-line {
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1rpx;
    margin-bottom: 25rpx;

    background-color: #e2e2e2;
  }

  .shop-info {
    display: flex;
    flex-direction: column;

    .shop-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20rpx;
      align-items: flex-end;

      .shop-name {
        font-size: 34rpx;
        font-weight: bold;
        color: #333;
        margin-right: 10rpx;
      }

      .shop-distance {
        margin-left: auto;
        color: #666;
        font-size: 26rpx;
        margin-right: 10rpx;
      }
    }



    .staff-info {
      display: flex;

      .avatar {
        width: 140rpx;
        height: 140rpx;
        border-radius: 16rpx;
        margin-right: 24rpx;
      }

      .staff-detail {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10rpx;
        padding-top: 0rpx;
        margin-bottom: 10rpx;


        text {
          font-size: 28rpx;
          margin-bottom: 5rpx;
          color: #333;


          &:first-child {
            font-size: 32rpx;
          }
        }

      }
    }
  }

  .service-info {
    display: flex;
    flex-direction: column;

    .section-title {
      font-size: 30rpx;
      font-weight: bold;
      margin-bottom: 20rpx;
    }

    .service-line {
      font-size: 28rpx;
      margin-bottom: 10rpx;
      color: #333;

    }

    .service-line.last {
      margin-bottom: 20rpx;
    }

    .price-info {
      display: flex;
      align-items: baseline;
      justify-content: flex-end;

      .price-label {
        font-size: 28rpx;
        color: #333;
        margin-right: 8rpx;
      }

      .price-value {
        font-size: 36rpx;
        font-weight: bold;
        // color: #e94f4f;
      }
    }
  }

  .coupon-info {
    display: flex;
    flex-direction: column;

    .section-title {
      font-size: 30rpx;
      font-weight: bold;
      margin-bottom: 20rpx;
    }

    .coupon-line {
      display: flex;
      align-items: baseline;
      justify-content: space-between;



      .coupon-left {
        display: flex;
        gap: 10rpx;

        align-items: center;

        .coupon-name {
          font-size: 28rpx;
        }
      }



      .coupon-right {
        display: flex;
        align-items: center;
        gap: 5rpx;

        .coupon-amount {
          color: #e94f4f;

        }


        .arrow {
          margin-right: 0rpx;
          font-size: 32rpx;
          color: #cecece;
        }
      }


    }
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .info-line {
      margin-bottom: 20rpx;
      display: flex;
      justify-content: space-between;
      font-size: 28rpx;

      .arrow {
        margin-right: 0rpx;
        font-size: 32rpx;
        color: #cecece;
      }
    }

  }
</style>