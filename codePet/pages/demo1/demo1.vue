<template>
  <view class="layout">
    <input v-model="formData.name" placeholder="请输入昵称" />
    <input v-model="formData.age" placeholder="请输入年龄" />
    <button @click="handleAdd">新增</button>
  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue';

  const formData = ref({
    name: "",
    age: ""
  })
  const db = uniCloud.database(); //连接到云服务器
  const handleAdd = async () => { //自定义的button监听事件
    uni.showLoading({
      title: "新增中..."
    })
    // try {
    //   const dataToAdd = {
    //     name: formData.value.name,
    //     age: Number(formData.value.age)
    //   }
    try {
      let res = await db.collection("users").add(formData.value);

      if (res.result.errCode === 0) {
        console.log(res);
        uni.showToast({
          title: '新增成功'
        })
      }


    } catch (err) {

      uni.showModal({
        content: err.errMsg || '新增失败',
        showCancel: false
      })
    } finally {
      uni.hideLoading()

    }

    // db.collection("users").add({
    //   name: "小小怪",
    //   age: 33,
    //   gender: 1
    // }).then(res => {
    //   console.log(res);
    //   uni.showToast({
    //     title: '新增成功'
    //   })

    // }).catch(err => {
    //   uni.showModal({
    //     content: err.errMsg || '新增失败',
    //     showCancel: false
    //   })

    // }).finally(() => {
    //   uni.hideLoading()
    // })
  }
</script>

<style lang="scss" scoped>
  .layout {
    padding: 30 rpx;

    input {
      border: 1px solid #eee;
      margin-bottom: 30rpx;
      height: 80rpx;
      padding: 0 20rpx;
    }
  }
</style>