'use strict';
const db = uniCloud.database();

module.exports = {
  /**
   * 获取当前用户的详细信息（昵称 + 头像）
   * @returns {Object} 用户信息对象 { nickname, avatar_file, avatarTempURL }
   */
  async getCurrentUserInfo() {
    const {
      uid
    } = this.getClientInfo(); // 获取当前登录用户 UID
    if (!uid) {
      throw new Error('未登录');
    }

    const res = await db.collection('uni-id-users')
      .doc(uid)
      .field('nickname,avatar_file')
      .get();

    const user = res.data?.[0];
    if (!user) {
      throw new Error('用户不存在');
    }

    const tempRes = await uniCloud.getTempFileURL({
      fileList: [user.avatar_file.url]
    });

    return {
      nickname: user.nickname,
      avatar_file: user.avatar_file,
      avatarTempURL: tempRes.fileList?.[0]?.tempFileURL || ''
    };
  }
};