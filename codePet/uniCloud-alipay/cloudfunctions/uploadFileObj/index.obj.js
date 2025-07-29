module.exports = {
  _before() {
    // 预处理，如权限验证可以放这
  },

  /**
   * 删除云存储中的图片
   * @param {Object} arrs 删除的图片 fileID 数组
   */
  async remove(arrs) {
    if (!Array.isArray(arrs) || arrs.length === 0) {
      return {
        code: 1,
        msg: '参数必须是非空数组'
      }
    }

    return await uniCloud.deleteFile({
      fileList: arrs
    })
  }
}