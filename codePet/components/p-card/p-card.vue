<template>
  <view class="card">
    <slot></slot>
  </view>
</template>

<script>

</script>

<style lang="scss" scoped>
  @import "../../petcareui/pet-global.css";

  .card {
    background: #fff;
    border-radius: 16rpx; //边框圆角
    margin: 20rpx; //外边距
    padding: 30rpx; //内边距
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
    margin-bottom: 5rpx;
  }
</style>