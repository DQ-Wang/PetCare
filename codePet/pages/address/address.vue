<template>
  <view class="pet-container">
    <!-- 地址列表 -->
    <view v-if="addressList.length > 0" class="address-list">
      <view v-for="(item, index) in addressList" :key="index" class="address-card">
        <view class="address-info">
          <view class="top-row">
            <text class="name">{{ item.name }}</text>
            <text class="phone">{{ item.phone }}</text>
            <view v-if="item.isDefault" class="default-tag">默认</view>
          </view>
          <view class="address-text">{{ item.province }}{{ item.city }}{{ item.district }}{{ item.detail }}</view>
        </view>
        <view class="action-buttons">
          <view class="btn edit-btn" @click="editAddress(item)">
            <text class="icon iconfont icon-bianji"></text>
            编辑
          </view>
          <view class="btn delete-btn" @click="deleteAddress(index)">
            <text class="icon iconfont icon-shanchu"></text>
            删除
          </view>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view v-else class="empty-state">
      <image class="empty-image" src="/static/汪汪喵切图/我的订单/没有订单.png" mode="aspectFit" />
      <text class="empty-text">还没有地址信息</text>
    </view>

    <!-- 底部添加按钮 -->
    <view class="add-button" @click="addAddress">
      <text class="icon iconfont icon-tianjia"></text>
      新增地址
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const addressList = ref([
  {
    name: '张三',
    phone: '138****5678',
    province: '重庆市',
    city: '重庆市',
    district: '江北区',
    detail: '观音桥步行街100号',
    isDefault: true
  }
]);

function addAddress() {
  uni.showToast({ title: '添加地址', icon: 'none' });
}

function editAddress(item) {
  uni.showToast({ title: '编辑地址', icon: 'none' });
}

function deleteAddress(index) {
  uni.showModal({
    title: '提示',
    content: '确定删除该地址吗？',
    success: (res) => {
      if (res.confirm) {
        addressList.value.splice(index, 1);
      }
    }
  });
}
</script>

<style lang="scss" scoped>
@import '@/static/iconfont/iconfont.css';
@import "../../petcareui/pet-global.css";

.address-list {
  padding: 20rpx;
}

.address-card {
  background: #fff;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);

  .address-info {
    margin-bottom: 20rpx;

    .top-row {
      display: flex;
      align-items: center;
      margin-bottom: 16rpx;

      .name {
        font-size: 32rpx;
        font-weight: bold;
        color: #333;
        margin-right: 20rpx;
      }

      .phone {
        font-size: 28rpx;
        color: #666;
        flex: 1;
      }

      .default-tag {
        background: #b2d76e;
        color: #fff;
        padding: 4rpx 16rpx;
        border-radius: 8rpx;
        font-size: 24rpx;
      }
    }

    .address-text {
      font-size: 28rpx;
      color: #666;
      line-height: 1.6;
    }
  }

  .action-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 20rpx;
    border-top: 1rpx solid #f0f0f0;
    padding-top: 20rpx;

    .btn {
      display: flex;
      align-items: center;
      padding: 10rpx 24rpx;
      border-radius: 25rpx;
      font-size: 28rpx;

      .icon {
        margin-right: 8rpx;
        font-size: 28rpx;
      }

      &.edit-btn {
        border: 1rpx solid #b2d76e;
        color: #b2d76e;
      }

      &.delete-btn {
        border: 1rpx solid #9e9e9e;
        color: #666;
      }
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;

  .empty-image {
    width: 400rpx;
    height: 400rpx;
    margin-bottom: 40rpx;
  }

  .empty-text {
    font-size: 28rpx;
    color: #999;
  }
}

.add-button {
  position: fixed;
  bottom: 40rpx;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 600rpx;
  height: 88rpx;
  background: #b2d76e;
  color: #fff;
  border-radius: 44rpx;
  font-size: 32rpx;
  font-weight: bold;
  box-shadow: 0 8rpx 16rpx rgba(178, 215, 110, 0.3);

  .icon {
    margin-right: 12rpx;
    font-size: 36rpx;
  }
}
</style>
