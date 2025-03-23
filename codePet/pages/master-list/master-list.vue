<template>
  <view class="pet-list-container ">
    <view class="pet-list-ele">
      <image src="../../static/汪汪喵切图/师傅列表/选择icon.png" mode="aspectFit" class="pet-pic-icon"></image>
      <view class="pet-text-cut">服务范围</view>
    </view>
    <view class="pet-list-ele">
      <image src="../../static/汪汪喵切图/师傅列表/选择icon.png" mode="aspectFit" class="pet-pic-icon"></image>
      <view class="pet-text-cut">服务时间</view>
    </view>
    <view class="pet-list-ele">
      <image src="../../static/汪汪喵切图/师傅列表/选择icon.png" mode="aspectFit" class="pet-pic-icon"></image>
      <view class="pet-text-cut">更多筛选</view>
    </view>
    <view class="pet-list-ele">
      <image src="../../static/汪汪喵切图/师傅列表/选择icon.png" mode="aspectFit" class="pet-pic-icon"></image>
      <view class="pet-text-cut" style="color:lightgreen">北京 西城XXX</view>
    </view>
  </view>
  <view class="pet-master-list">
    <view class="pet-master" v-for="item in 4">
      <image src="../../static/汪汪喵切图/师傅列表/头像.png" mode="aspectFit" class="pet-avatar"></image>
      <view class="pet-introduction">
        <view style="display:flex">
          <view style="font-weight:bold;margin-right:16rpx">张女士</view>
          <view class="pet-online" style="font-size:28rpx;margin-top:2rpx">在线</view>
        </view>
        <view style="margin-top:16rpx;font-size:28rpx">3年喂养经验丰富|猫狗双全</view>
        <view style="margin-top:16rpx;font-size:32rpx;color:red;font-weight: 800;">￥49.9起</view>
      </view>
      <view class="pet-distance-order">
        <view class="pet-distance">13km</view>
        <view class="pet-order">下单</view>
      </view>
    </view>


    <!-- <view class="pet-wizard">
      <img src="../../static/汪汪喵切图/公共/首页2icon@2x.png" class="pet-wizard-image" />
      <img src="../../static/汪汪喵切图/公共/分类2icon@2x.png" class="pet-wizard-image" />
      <img src="../../static/汪汪喵切图/公共/需求icon@2x.png" class="pet-wizard-image pet-unique" />
      <img src="../../static/汪汪喵切图/公共/师傅列表1icon@2x.png" class="pet-wizard-image" />
      <img src="../../static/汪汪喵切图/公共/我的2icon@2x.png" class="pet-wizard-image" />
      <text class="pet-wizard-text">首页</text>
      <text class="pet-wizard-text">分类</text>
      <text class="pet-wizard-text">需求</text>
      <text class="pet-wizard-text" style="font-weight:800;color:black">师傅列表</text>
      <text class="pet-wizard-text">我的</text>
    </view> -->
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

<style>
  @import "../../petcareui/pet-global.css";
  @import "../../petcareui/master_list.css";
</style>