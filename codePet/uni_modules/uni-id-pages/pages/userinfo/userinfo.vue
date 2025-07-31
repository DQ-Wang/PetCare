<!-- 用户资料页 -->
<template>
  <view class="uni-content">

    <view class="section">
      <view class="section-item">
        <view class="item-label">头像</view>
        <view class="right-align-container">
          <view class="avatar-container">
            <view class="circular-avatar">
              <uni-id-pages-avatar width="100rpx" height="100rpx"></uni-id-pages-avatar>
            </view>
          </view>
          <uni-icons type="arrowright" size="18" color="#999"></uni-icons>
        </view>
      </view>
      <view class="divider"></view>
      <view class="section-item" @click="setNickname('')">
        <view class="item-label">昵称</view>
        <view class="item-value">
          {{ userInfo.nickname || '未设置' }}
          <uni-icons type="arrowright" size="18" color="#999"></uni-icons>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="section-item" @click="setGender">
        <view class="item-label">性别</view>
        <view class="item-value">
          {{ genderText || '未知' }}
          <uni-icons type="arrowright" size="18" color="#999"></uni-icons>
        </view>
      </view>
      <view class="divider"></view>

      <view class="section-item" @click="setAge">
        <view class="item-label">年龄</view>
        <view class="item-value">
          {{ ageDisplay }}
          <uni-icons type="arrowright" size="18" color="#999"></uni-icons>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="section-item" @click="bindMobile">
        <view class="item-label">手机号</view>
        <view class="item-value">
          {{ userInfo.mobile || '未绑定' }}
          <uni-icons type="arrowright" size="18" color="#999"></uni-icons>
        </view>
      </view>
      <view class="divider"></view>
      <view class="section-item" v-if="hasPwd" @click="changePassword">
        <view class="item-label">修改密码</view>
        <view class="item-value">
          <uni-icons type="arrowright" size="18" color="#999"></uni-icons>
        </view>
      </view>
      <view class="divider" v-if="hasPwd"></view>
      <view class="section-item" @click="deactivate">
        <view class="item-label">注销账号</view>
        <view class="item-value">
          <uni-icons type="arrowright" size="18" color="#999"></uni-icons>
        </view>
      </view>
    </view>

    <uni-popup ref="dialog" type="dialog">
      <uni-popup-dialog mode="input" :value="userInfo.nickname" @confirm="setNickname"
        :inputType="setNicknameIng?'nickname':'text'" title="设置昵称" placeholder="请输入要设置的昵称">
      </uni-popup-dialog>
    </uni-popup>

    <uni-id-pages-bind-mobile ref="bind-mobile-by-sms" @success="bindMobileSuccess"></uni-id-pages-bind-mobile>

    <uni-popup ref="genderPopup" type="dialog">
      <uni-popup-dialog mode="base" title="选择性别" @confirm="confirmGender">
        <view class="gender-options">
          <view v-for="item in genderOptions" :key="item.value" class="gender-option"
            :class="{selected: selectedGender === item.value}" @click="selectedGender = item.value">
            {{ item.label }}
          </view>
        </view>
      </uni-popup-dialog>
    </uni-popup>

    <uni-popup ref="agePopup" type="dialog">
      <uni-popup-dialog mode="input" :value="tempAge" @confirm="confirmAge" inputType="number" title="设置年龄"
        placeholder="请输入您的年龄" :maxlength="3">
      </uni-popup-dialog>
    </uni-popup>

    <uni-id-pages-bind-mobile ref="bind-mobile-by-sms" @success="bindMobileSuccess"></uni-id-pages-bind-mobile>



    <button class="logoutcss" @click="logout">退出登录</button>
  </view>
</template>

<script>
  const uniIdCo = uniCloud.importObject("uni-id-co")
  import {
    store,
    mutations
  } from '@/uni_modules/uni-id-pages/common/store.js'
  export default {
    computed: {
      userInfo() {
        return store.userInfo
      },
      realNameStatus() {
        if (!this.userInfo.realNameAuth) {
          return 0
        }

        return this.userInfo.realNameAuth.authStatus
      },
      genderText() {
        const genderMap = {
          0: '未知',
          1: '男',
          2: '女'
        };
        return genderMap[this.userInfo.gender] || '未知';
      },
      ageDisplay() {
        return this.userInfo.age ? parseInt(this.userInfo.age) : '未设置';
      }
    },
    data() {
      return {
        univerifyStyle: {
          authButton: {
            "title": "本机号码一键绑定", // 授权按钮文案
          },
          otherLoginButton: {
            "title": "其他号码绑定",
          }
        },
        // userInfo: {
        // 	mobile:'',
        // 	nickname:''
        // },
        hasPwd: false,
        showLoginManage: false, //通过页面传参隐藏登录&退出登录按钮
        setNicknameIng: false,

        selectedGender: '',
        genderOptions: [{
            label: '未知',
            value: 0
          },
          {
            label: '男',
            value: 1
          },
          {
            label: '女',
            value: 2
          }
        ],
        tempAge: ''
      }
    },
    async onShow() {
      await mutations.updateUserInfo() // 确保拉取最新数据
      this.univerifyStyle.authButton.title = "本机号码一键绑定"
      this.univerifyStyle.otherLoginButton.title = "其他号码绑定"
    },
    async onLoad(e) {
      if (e.showLoginManage) {
        this.showLoginManage = true //通过页面传参隐藏登录&退出登录按钮
      }
      //判断当前用户是否有密码，否则就不显示密码修改功能
      let res = await uniIdCo.getAccountInfo()
      this.hasPwd = res.isPasswordSet

      this.selectedGender = this.userInfo.gender
      this.tempBirthday = this.userInfo.birthday
    },
    methods: {
      login() {
        uni.navigateTo({
          url: '/uni_modules/uni-id-pages/pages/login/login-withoutpwd',
          complete: (e) => {
            // console.log(e);
          }
        })
      },
      logout() {
        mutations.logout()
      },
      bindMobileSuccess() {
        mutations.updateUserInfo()
      },
      changePassword() {
        uni.navigateTo({
          url: '/uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd',
          complete: (e) => {
            // console.log(e);
          }
        })
      },
      bindMobile() {
        // #ifdef APP-PLUS
        uni.preLogin({
          provider: 'univerify',
          success: this.univerify(), //预登录成功
          fail: (res) => { // 预登录失败
            // 不显示一键登录选项（或置灰）
            console.log(res)
            this.bindMobileBySmsCode()
          }
        })
        // #endif

        // #ifdef MP-WEIXIN
        this.$refs['bind-mobile-by-sms'].open()
        // #endif

        // #ifdef H5
        //...去用验证码绑定
        this.bindMobileBySmsCode()
        // #endif
      },
      univerify() {
        uni.login({
          "provider": 'univerify',
          "univerifyStyle": this.univerifyStyle,
          success: async e => {
            uniIdCo.bindMobileByUniverify(e.authResult).then(res => {
              mutations.updateUserInfo()
            }).catch(e => {
              console.log(e);
            }).finally(e => {
              // console.log(e);
              uni.closeAuthView()
            })
          },
          fail: (err) => {
            console.log(err);
            if (err.code == '30002' || err.code == '30001') {
              this.bindMobileBySmsCode()
            }
          }
        })
      },
      bindMobileBySmsCode() {
        uni.navigateTo({
          url: './bind-mobile/bind-mobile'
        })
      },
      setNickname(nickname) {
        if (nickname) {
          mutations.updateUserInfo({
            nickname
          })
          this.setNicknameIng = false
          this.$refs.dialog.close()
        } else {
          this.$refs.dialog.open()
        }
      },
      deactivate() {
        uni.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/userinfo/deactivate/deactivate"
        })
      },
      async bindThirdAccount(provider) {
        const uniIdCo = uniCloud.importObject("uni-id-co")
        const bindField = {
          weixin: 'wx_openid',
          alipay: 'ali_openid',
          apple: 'apple_openid',
          qq: 'qq_openid'
        } [provider.toLowerCase()]

        if (this.userInfo[bindField]) {
          await uniIdCo['unbind' + provider]()
          await mutations.updateUserInfo()
        } else {
          uni.login({
            provider: provider.toLowerCase(),
            onlyAuthorize: true,
            success: async e => {
              const res = await uniIdCo['bind' + provider]({
                code: e.code
              })
              if (res.errCode) {
                uni.showToast({
                  title: res.errMsg || '绑定失败',
                  duration: 3000
                })
              }
              await mutations.updateUserInfo()
            },
            fail: async (err) => {
              console.log(err);
              uni.hideLoading()
            }
          })
        }
      },
      realNameVerify() {
        uni.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/userinfo/realname-verify/realname-verify"
        })
      },
      setGender() {
        this.selectedGender = this.userInfo.gender
        this.$refs.genderPopup.open()
      },

      confirmGender() {
        mutations.updateUserInfo({
          gender: parseInt(this.selectedGender)
        });
        this.$refs.genderPopup.close();
      },

      setAge() {
        this.tempAge = this.userInfo.age || '';
        this.$refs.agePopup.open();
      },

      confirmAge(value) {
        if (value === '') {
          mutations.updateUserInfo({
            age: null
          });
          this.$refs.agePopup.close();
          return;
        }

        const age = parseInt(value);
        if (isNaN(age) || age < 0 || age > 150) {
          uni.showToast({
            title: '请输入0-150之间的有效年龄',
            icon: 'none',
            duration: 3000
          });
          return;
        }

        mutations.updateUserInfo({
          age: age.toString()
        });
        this.$refs.agePopup.close();
      },

    }
  }
</script>
<style lang="scss" scoped>
  @import "@/uni_modules/uni-id-pages/common/login-page.scss";

  .uni-content {
    padding: 0;
  }

  .logoutcss {
    width: 625rpx;
    border-radius: 23.44rpx;
    box-shadow: 0rpx 1.56rpx 7.81rpx rgba(0, 0, 0, 0.1);
    margin: 30rpx auto;
    background: rgba(178, 215, 110, 1);
    color: #FFFFFF;
  }

  .section {


    width: 625rpx;
    border-radius: 23.44rpx;
    box-shadow: 0rpx 1.56rpx 7.81rpx rgba(0, 0, 0, 0.1);
    padding: 20rpx;
    margin: 35rpx auto;
    background-color: #FFFFFF;

    .section-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 80rpx;
      margin: 10rpx 0;

      .item-label {
        font-size: 28.13rpx;
        font-weight: 500;
        line-height: 40.72rpx;
        color: rgba(84, 75, 79, 1);

      }



      .item-value {
        display: flex;
        align-items: center;

        font-size: 26.56rpx;
        font-weight: 500;
        line-height: 65.63rpx;
        color: rgba(84, 75, 79, 1);
        margin-right: 20rpx;

        uni-icons {
          margin-left: 15rpx;
        }
      }

      .right-align-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex: 1;

        .avatar-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 109rpx;
          height: 109rpx;
          margin-right: 20rpx;

          .circular-avatar {
            border-radius: 50%;
            overflow: hidden;
          }
        }
      }
    }

    .divider {
      width: 562.5rpx;
      height: 1.56rpx;
      background: rgba(204, 204, 204, 1);
      display: flex;


    }
  }

  .gender-options {
    display: flex;
    justify-content: space-around;
    padding: 30rpx 0;
    gap: 5rpx;
  }

  .gender-option {
    padding: 15rpx 30rpx;
    border: 1px solid #e0e0e0;
    border-radius: 8rpx;
    font-size: 30rpx;

    &.selected {
      border-color: rgba(178, 215, 110, 1);
      color: #FFFFFF;
      background-color: rgba(178, 215, 110, 1);
    }
  }
</style>