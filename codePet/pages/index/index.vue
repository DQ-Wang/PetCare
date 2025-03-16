<template>
  <view class="pet-container">


    <view class="section">
      <view class="list">
        <view class="row" v-for="item in 3">
          <view class="left">
            <uni-icons type="download-filled" size="25" color="#c6d47f"></uni-icons>
            <view class="text">我的下载</view>
          </view>
          <view class="right">
            <view class="text">33</view>
            <uni-icons type="right" size="15" color="#aaa"></uni-icons>
          </view>
        </view>
      </view>
    </view>

    <view></view>

    <view class="section"></view>



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

<style lang="scss" scoped>
  @import '../../petcareui/pet-global.css';

  .section {
    width: 690rpx;
    margin: 20px auto; //注意，设置主要是文本的块时，需要用margin居中块
    border: 1px solid #eee;
    border-radius: 10rpx;
    box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.05);
    background: $p-card-color;


    .list {
      .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 30rpx;
        height: 100rpx;
        border-bottom: 1px solid #eee;

        &:last-child {
          border-bottom: 0;
        }


        .left {
          display: flex;
          align-items: center;
          padding-left: 20rpx;
          color: $p-text-color;
        }

        .right {
          display: flex;
          align-items: center;

          .text {
            font-size: 28rpx;
            color: $p-text-secondary;

          }
        }
      }
    }

  }
</style>