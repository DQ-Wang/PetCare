<template>
  <view class="layout">
    <view class="head">
      共{{queryParams.total}}条记录，以获取{{userList.length}}条记录
    </view>
    <input @confirm="onConfirm" type="text" class="search" v-model="keyword" placeholder="请输入搜索内容" />
    <view class="box" v-for="item,index in userList" :key="item._id">
      <view>序号：{{index+1}}</view>
      <view>id:{{item._id}}</view>
      <view>昵称：{{item.name}}</view>
      <view>年龄：{{item.age}}</view>
      <view>性别：{{item.gender}}</view>
      <view>创建时间：{{item.createtime}}</view>




    </view>

  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue';
  import {
    onLoad
  } from '@dcloudio/uni-app';
  import {
    onReachBottom
  } from '@dcloudio/uni-app'

  onLoad(() => {
    getData()
  })
  const keyword = ref("");
  const db = uniCloud.database();
  const queryParams = ref({
    pageNum: 1,
    pageSize: 7,
    total: 0
  }) //常用方法
  const noData = ref(false);
  const userList = ref([])


  const onConfirm = () => {
    userList.value = [];
    getData();
  }


  const getData = async () => {
    let current = queryParams.value.pageSize * (queryParams.value.pageNum - 1);
    let res = await db.collection("users").where(`${new RegExp(keyword.value,'i')}.test(name)`).orderBy("age desc")
      .skip(current).limit(7).field(
        "name,age,createtime,gender") //where用法同mysql
      .get({
        getCount: true
      }); //同mysql,getCount获得该表中数据的个数
    console.log(res);
    if (res.result.errCode === 0) {
      userList.value = [...userList.value, ...res.result.data]; //!!!触底的延长更新
      queryParams.value.total = res.result.count;
      if (queryParams.value.pageSize > res.result.data.length) noData.value = true;
    } else {
      uni.showToast({
        title: res.result.errMsg || '返回错误',
        icon: 'none'
      })
    }
  }
  onReachBottom(() => { //触底更新
    if (noData.value) return;
    console.log("触底");
    queryParams.value.pageNum++;
    getData();
  })
</script>

<style lang="scss" scoped>
  .layout {
    .head {
      text-align: center;
      padding: 10rpx 0;
      font-size: 26rpx;
      color: #888;

    }

    .search {
      margin: 30rpx;
      border: 1px solid #eee;
      padding: 0 20rpx;
      height: 70rpx;
    }

    .box {
      padding: 10rpx 30rpx;
      border-bottom: 1px solid #eee;
    }
  }
</style>