<template>
  <view class="pet-container">
    <view class="pet-item pet-item-header">
      <view style="display:flex;grid-area:header">
        <text class="pet-title">门店</text>
        <text class="pet-unfold">
          <text style="margin-right:18rpx">思北店</text>
          <img src="../../static/汪汪喵切图/洗护详情/箭头icon@3x.png" width="10rpx" height="10rpx">
        </text>
      </view>
    </view>
    <view class="pet-item pet-item-header">
      <view style="display:flex;grid-area:header">
        <text class="pet-title">洗护对象</text>
        <text class="pet-unfold">
          <img src="../../static/汪汪喵切图/洗护详情/箭头icon@3x.png" width="10rpx" height="10rpx">
        </text>
      </view>
    </view>
    <view class="pet-item pet-item-complete">
      <view style="display:flex;grid-area:header">
        <text class="pet-title">洗护套餐</text>
        <text class="pet-unfold">
          <text class="pet-omit" style="margin-right:5rpx">点击图标可查看洗护步骤</text>
          <img src="../../static/汪汪喵切图/洗护详情/箭头icon@3x.png" width="10rpx" height="10rpx">
        </text>
      </view>
      <view class="pet-main" style="grid-area:main1">
        <img src="../../static/汪汪喵切图/洗护详情/高级护理.png" width="70rpx">
        <img src="../../static/汪汪喵切图/洗护详情/选择@3x.png" width="20rpx" style="margin:30rpx 45rpx">
        <view style="font-size:28rpx">基础护理</view>
        <view class="pet-omit" style="margin-top:20rpx">日常清洁</view>
      </view>
      <view class="pet-main" style="grid-area:main2">
        <img src="../../static/汪汪喵切图/洗护详情/基础护理.png" width="70rpx">
        <img src="../../static/汪汪喵切图/洗护详情/选择@3x.png" width="20rpx" style="margin:30rpx 45rpx">
        <view style="font-size:28rpx">高级护理</view>
        <view class="pet-omit" style="margin-top:20rpx">深度清洁</view>
      </view>
      <view class="pet-main" style="grid-area:main3"></view>
      <view class="pet-main" style="grid-area:main4"></view>
    </view>
    <view class="pet-item pet-item-complete" style="height:360rpx">
      <view style="display:flex;grid-area:header">
        <text class="pet-title">基础服务</text>
      </view>
      <view class="pet-main" style="grid-area:main1">
        <img src="../../static/汪汪喵切图/洗护详情/录像icon@3x.png" width="32rpx" style="position:absolute;margin:42rpx">
        <img src="../../static/汪汪喵切图/洗护详情/圆框@3x.png" width="62rpx">
        <view style="font-size:28rpx;margin-top:30rpx">全程录像</view>
      </view>
      <view class="pet-main" style="grid-area:main2">
        <img src="../../static/汪汪喵切图/洗护详情/环境icon@3x.png" width="30rpx" style="position:absolute;margin:38rpx">
        <img src="../../static/汪汪喵切图/洗护详情/圆框@3x.png" width="62rpx">
        <view style="font-size:28rpx;margin-top:30rpx;white-space: nowrap">检查环境隐患</view>
      </view>
      <view class="pet-main" style="grid-area:main3">
        <img src="../../static/汪汪喵切图/洗护详情/食水icon@3x.png" width="35rpx" style="position:absolute;margin:40rpx">
        <img src="../../static/汪汪喵切图/洗护详情/圆框@3x.png" width="62rpx">
        <view style="font-size:28rpx;margin:30rpx 0 0 15rpx;white-space: nowrap">清洁,补充食水</view>
      </view>
      <view class="pet-main" style="grid-area:main4">
        <img src="../../static/汪汪喵切图/洗护详情/打扫icon@3x.png" width="24rpx" style="position:absolute;margin:32rpx">
        <img src="../../static/汪汪喵切图/洗护详情/圆框@3x.png" width="62rpx">
        <view style="font-size:28rpx;margin-top:30rpx;">打扫卫生</view>
      </view>
    </view>
    <view class="pet-item pet-item-complete">
      <view style="display:flex;grid-area:header">
        <text class="pet-title">增值服务</text>
      </view>
      <view class="pet-main" style="grid-area:main1">
        <img src="../../static/汪汪喵切图/洗护详情/检查icon@3x.png" width="32rpx" style="position:absolute;margin:32rpx">
        <img src="../../static/汪汪喵切图/洗护详情/圆框@3x.png" width="62rpx">
        <view style="font-size:28rpx;margin-top:30rpx">全程录像</view>
        <view class="pet-omit" style="margin-top:20rpx">检查五官，肛门，皮毛等健康情况</view>
      </view>
      <view class="pet-main" style="grid-area:main2">
        <img src="../../static/汪汪喵切图/洗护详情/梳毛icon@3x.png" width="28rpx" style="position:absolute;margin:34rpx">
        <img src="../../static/汪汪喵切图/洗护详情/圆框@3x.png" width="62rpx">
        <view style="font-size:28rpx;margin-top:30rpx;white-space: nowrap">梳毛和五官清洁</view>
        <view class="pet-omit" style="margin-top:20rpx">用排梳梳理毛发，清洁五官</view>
      </view>
      <view class="pet-main" style="grid-area:main3">
        <img src="../../static/汪汪喵切图/洗护详情/喂药icon@3x.png" width="32rpx" style="position:absolute;margin:30rpx">
        <img src="../../static/汪汪喵切图/洗护详情/圆框@3x.png" width="62rpx">
        <view style="font-size:28rpx;margin:30rpx 0 0 15rpx;white-space: nowrap">喂药服务</view>
        <view class="pet-omit" style="margin-top:20rpx">给宠物驱虫，喂药服务</view>
      </view>
      <view class="pet-main" style="grid-area:main4">
        <img src="../../static/汪汪喵切图/洗护详情/互动icon@3x.png" width="32rpx" style="position:absolute;margin:32rpx">
        <img src="../../static/汪汪喵切图/洗护详情/圆框@3x.png" width="62rpx">
        <view style="font-size:28rpx;margin-top:30rpx;">友爱互动</view>
        <view class="pet-omit" style="margin-top:20rpx">提供不低于10分钟的游戏时间</view>
      </view>
    </view>
    <view style="height:30rpx"></view>
  </view>
  <view class="pet-order-column">
    <span class="pet-cost">预计费用：¥ 0</span>
    <span class="pet-order-button" @click="gotoCheckout">预约</span>
  </view>
</template>

<script setup>
  function gotoCheckout() { //需要传参数：师傅详情，服务详情，用户详情
    uni.navigateTo({
      url: "/pages/Checkout/In-Store"
    })
  }
</script>

<style>
  @import "../../petcareui/pet-global.css";
  @import "../../petcareui/washcare_details.css";
</style>