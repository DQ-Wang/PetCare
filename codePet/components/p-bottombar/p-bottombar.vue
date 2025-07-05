<template>
  <view class="bottom-bar">
    <view class="price-info">
      <text class="price-label">实付</text>
      <text class="price-value">¥{{ price }}</text>
    </view>
    <button class="pay-button" @click="emit('submit')">{{ buttonText }}</button>
  </view>
</template>

<script setup>
  const props = defineProps({
    price: {
      type: [Number, String],
      default: '0.00'
    },
    buttonText: {
      type: String,
      default: '立即支付'
    }
  })

  const emit = defineEmits(['submit'])
</script>

<style scoped>
  .bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120rpx;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30rpx;
    box-shadow: 0 -2rpx 8rpx rgba(0, 0, 0, 0.05);
    z-index: 999;
  }

  .price-info {

    display: flex;
    align-items: baseline;

  }

  .price-label {
    font-size: 28rpx;
    color: #333;
    margin-right: 8rpx;
  }

  .price-value {
    font-size: 36rpx;
    font-weight: bold;
    color: #e94f4f;
  }

  .pay-button {
    /* border: 1px solid #333; */
    background-color: #b2e281;
    color: #fff;
    align-items: center;
    padding: 5rpx 40rpx;
    border-radius: 50rpx;
    font-weight: bolder;
    font-size: 30rpx;
    height: 85rpx;
    width: 40%;
    margin-right: 1%;
    /*按钮距离右边的位置*/

  }
</style>