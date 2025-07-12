<template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
      <uni-forms-item name="post_id" label="" required>
        <uni-easyinput placeholder="帖子 ID，posts 表中的 `_id` 字段" v-model="formData.post_id"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="comment_content" label="评论内容" required>
        <uni-easyinput placeholder="评论内容" v-model="formData.comment_content" trim="right"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="like_count" label="">
        <uni-easyinput placeholder="评论的点赞数" type="number" v-model="formData.like_count"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="comment_type" label="" required>
        <uni-easyinput placeholder="评论类型：0 表示评论帖子，1 表示回复其他评论" type="number" v-model="formData.comment_type"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="reply_user_id" label="">
        <uni-easyinput placeholder="被回复用户的 ID（仅当为回复时有效）" v-model="formData.reply_user_id"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="reply_comment_id" label="">
        <uni-easyinput placeholder="被回复评论的 ID（仅当为回复时有效）" v-model="formData.reply_comment_id"></uni-easyinput>
      </uni-forms-item>
      <view class="uni-button-group">
        <button type="primary" class="uni-button" @click="submit">提交</button>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../js_sdk/validator/opendb-news-comments.js';

  const db = uniCloud.database();
  const dbCollectionName = 'opendb-news-comments';

  function getValidator(fields) {
    let result = {}
    for (let key in validator) {
      if (fields.indexOf(key) > -1) {
        result[key] = validator[key]
      }
    }
    return result
  }

  

  export default {
    data() {
      let formData = {
        "post_id": "",
        "comment_content": "",
        "like_count": null,
        "comment_type": null,
        "reply_user_id": "",
        "reply_comment_id": ""
      }
      return {
        formData,
        formOptions: {},
        rules: {
          ...getValidator(Object.keys(formData))
        }
      }
    },
    onLoad(e) {
      if (e.id) {
        const id = e.id
        this.formDataId = id
        this.getDetail(id)
      }
    },
    onReady() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      
      /**
       * 验证表单并提交
       */
      submit() {
        uni.showLoading({
          mask: true
        })
        this.$refs.form.validate().then((res) => {
          return this.submitForm(res)
        }).catch(() => {
        }).finally(() => {
          uni.hideLoading()
        })
      },

      /**
       * 提交表单
       */
      submitForm(value) {
        // 使用 clientDB 提交数据
        return db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
          uni.showToast({
            icon: 'none',
            title: '修改成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        })
      },

      /**
       * 获取表单数据
       * @param {Object} id
       */
      getDetail(id) {
        uni.showLoading({
          mask: true
        })
        db.collection(dbCollectionName).doc(id).field("post_id,comment_content,like_count,comment_type,reply_user_id,reply_comment_id").get().then((res) => {
          const data = res.result.data[0]
          if (data) {
            this.formData = data
            
          }
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        }).finally(() => {
          uni.hideLoading()
        })
      }
    }
  }
</script>

<style>
  .uni-container {
    padding: 15px;
  }

  .uni-input-border,
  .uni-textarea-border {
    width: 100%;
    font-size: 14px;
    color: #666;
    border: 1px #e5e5e5 solid;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .uni-input-border {
    padding: 0 10px;
    height: 35px;

  }

  .uni-textarea-border {
    padding: 10px;
    height: 80px;
  }

  .uni-button-group {
    margin-top: 50px;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    justify-content: center;
  }

  .uni-button {
    width: 184px;
  }
</style>
