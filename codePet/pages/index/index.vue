<template>
  <view class="pet-container"><!-- 如果上传不回显则要在web后台设置跨域配置 -->
    <!-- <uni-file-picker ref="file" v-model="imageValue" mode="grid" limit="9" return-type="array"
      :auto-upload="false" /> --><!-- 默认上传图像，由fileMediatype控制 -->
    <!-- <button @click="onSubmit">上传</button>
    <view v-for="(item,index) in imageValue" :key="index"> --><!-- </view> -->
    <view class="item" v-for="(item,index) in listData" :key="item._id">
      <view>标题：{{item.header}}</view>
      <view>内容：{{item.content}}</view>
      <view>发布者：{{item?.user_id[0]?.nickname || "匿名"}}</view>
      <!-- 注意“？”的用法 -->

    </view>

  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue';
  const db = uniCloud.database();
  console.log(uniCloud.getCurrentUserInfo().uid); //获取当亲登录用户的id
  const listData = ref([])
  const getData = async () => {
    try {
      let postTemp = db.collection("posts").where('user_id == $cloudEnv_uid')
        .getTemp(); //查询当前用户发表的文章，“$cloudEnc_uid存储当前登录用户的id”
      let userTemp = await db.collection("uni-id-users").field("nickname,_id")
        .getTemp(); //查id表必须要使用field字段，否则有些权限无法查到
      let {
        result: {
          data
        }
      } = await db.collection(postTemp, userTemp).get();
      listData.value = data;
      console.log(data);
    } catch (err) {
      uni.showModal({
        title: err.message,
        showCancel: false
      })
    }
  }
  getData();


  // const imageValue = ref([]) //file-picker中v-model绑定的属性只能是数组[]或对象{}
  // const file = ref(null);

  // const onSubmit = () => {
  //   console.log(imageValue.value);
  //   file.value.upload()

  // }
</script>

<style lang="scss" scoped>
  .item {
    padding: 30rpx;
    border-bottom: 1px solid #eee;
  }
</style>