<template>
  <view class="uni-container">
    <uni-forms ref="formRef" :model="formData" :rules="rules" validate-trigger="submit" err-show-type="toast">
      <!-- 图片上传 -->
      <uni-forms-item name="images" label="图片">
        <uni-file-picker ref="file" v-model="formData.images" file-mediatype="image" mode="grid" :limit="9"
          file-extname="jpg,png,jpeg" :image-styles="{ width: '100px', height: '100px' }" :auto-upload="false" />
      </uni-forms-item>

      <!-- 标题 -->
      <uni-forms-item name="header" label="标题" required>
        <uni-easyinput placeholder="帖子的标题" v-model="formData.header" />
      </uni-forms-item>

      <!-- 正文 -->
      <uni-forms-item name="content" label="正文" required>
        <uni-easyinput placeholder="帖子内容" v-model="formData.content" />
      </uni-forms-item>

      <!-- 标签选择 -->
      <uni-forms-item name="category_id" label="标签">
        <uni-data-checkbox :multiple="true" v-model="formData.category_id" :localdata="formOptions.categories" />
      </uni-forms-item>

      <!-- 地理位置 -->
      <uni-forms-item name="location" label="地理位置">
        <uni-easyinput placeholder="填写地理位置" v-model="formData.location" />
      </uni-forms-item>

      <!-- 提交按钮 -->
      <view class="uni-button-group">
        <button type="primary" class="uni-button" @click="submit">提交</button>
      </view>
    </uni-forms>
  </view>
</template>

<script setup>
  import {
    ref,
    reactive,
    onMounted
  } from 'vue'
  import {
    validator
  } from '@/js_sdk/validator/posts.js'

  const db = uniCloud.database()
  const dbCollectionName = 'posts'

  const formRef = ref()
  const file = ref(null)

  const formData = reactive({
    images: [], // 存储选择的图片（带url）
    header: '',
    content: '',
    category_id: [],
    location: ''
  })

  const formOptions = reactive({
    categories: []
  })

  const rules = reactive({})

  // 动态获取校验规则
  function getValidator(fields) {
    let result = {}
    for (let key in validator) {
      if (fields.includes(key)) {
        result[key] = validator[key]
      }
    }
    return result
  }

  // 加载标签分类
  async function loadCategories() {
    try {
      const res = await db.collection('opendb-news-categories').orderBy('sort', 'asc').get()
      console.log('数据库返回结果：', res)
      if (Array.isArray(res.result?.data)) {
        formOptions.categories = res.result.data.map(item => ({
          text: item.name,
          value: item._id
        }))
      } else {
        throw new Error('标签数据格式错误')
      }
    } catch (err) {
      console.error('加载分类失败：', err)
      uni.showToast({
        icon: 'none',
        title: '加载标签失败'
      })
    }
  }

  // 提交按钮事件
  const submit = () => {
    uni.showLoading({
      mask: true
    })
    formRef.value
      .validate()
      .then(() => {
        submitForm()
      })
      .catch(() => {
        uni.hideLoading()
      })
  }

  // 实际提交数据：手动上传图片，提交表单
  const submitForm = async () => {
    try {
      // 1. 上传图片
      const uploadResult = await file.value.upload()

      // 2. 将 fileID 转为 http 链接
      const fileIDs = uploadResult.map(item => item.fileID || item.url)
      const tempURLsRes = await uniCloud.getTempFileURL({
        fileList: fileIDs
      })
      formData.images = tempURLsRes.fileList.map(item => item.tempFileURL)
      // // 1. 上传图片，获取上传结果（含 fileID）
      // const uploadResult = await file.value.upload()

      // // 2. 提取上传后的 fileID（或 url）填入 formData.images
      // formData.images = uploadResult.map(item => item.url || item.fileID)

      // 3. 提交到数据库

      await db.collection("posts").add({
        header: formData.header,
        content: formData.content,
        category_id: formData.category_id,
        images: formData.images, // 如果上传了图片
        location: formData.location
      })

      uni.showToast({
        title: '新增成功',
        icon: 'none'
      })

      // const eventChannel = uni.getOpenerEventChannel()
      // eventChannel.emit('refreshData')
      setTimeout(() => uni.navigateBack(), 500)
    } catch (err) {
      uni.showModal({
        content: err.message || '请求服务失败',
        showCancel: false
      })
    } finally {
      uni.hideLoading()
    }
  }


  onMounted(() => {
    Object.assign(rules, getValidator(Object.keys(formData)))
    loadCategories()
  })
</script>

<style>
  .uni-container {
    padding: 15px;
  }

  .uni-button-group {
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }

  .uni-button {
    width: 184px;
  }
</style>