<template>
  <view class="pet-container">
    <button @click="addPost">新增</button>


  </view>
</template>

<script setup>
  const db = uniCloud.database();

  const add = () => {
    db.collection("posts").add({
      header: "标题2",
      content: "内容2"
    }).then(res => {
      console.log(res);
    })
  }
</script>

<style lang="scss" scoped>
  @import "../../petcareui/pet-global.css";
</style>