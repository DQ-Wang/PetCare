<template>
  <view class=""><!-- 如果上传不回显则要在web后台设置跨域配置 -->
    <uni-file-picker ref="file" v-model="imageValue" mode="grid" limit="9" return-type="array"
      :auto-upload="false" /><!-- 默认上传图像，由fileMediatype控制 -->
    <button @click="onSubmit">上传</button>
    <view v-for="(item,index) in imageValue" :key="index">



    </view>

  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue';

  const imageValue = ref([]) //file-picker中v-model绑定的属性只能是数组[]或对象{}
  const file = ref(null);

  const onSubmit = () => {
    console.log(imageValue.value);
    file.value.upload()

  }
</script>

<style>

</style>