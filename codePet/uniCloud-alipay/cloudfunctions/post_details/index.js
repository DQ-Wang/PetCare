// cloudfunctions/getArticleById/index.js
'use strict';
exports.main = async (event, context) => {
  const { _id } = event;
  // 引入 uniCloud 数据库 API
  const db = uniCloud.database();
  const collection = db.collection('posts'); // 替换成实际存储数据的集合名
  try {
    // 根据 _id 查询单条数据
    const res = await collection.doc(_id).get();
    return {
      code: 200,
      data: res.data[0], // 查询结果的第一条数据（因为 doc 查询单条）
      message: '查询成功'
    };
  } catch (e) {
    return {
      code: 500,
      data: null,
      message: '查询失败：' + e.message
    };
  }
};