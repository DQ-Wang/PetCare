"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  _easycom_uni_file_picker2();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
if (!Math) {
  _easycom_uni_file_picker();
}
const _sfc_main = {
  __name: "release",
  setup(__props) {
    const db = common_vendor.nr.database();
    const files = common_vendor.ref(null);
    const imageValue = common_vendor.ref([]);
    const title = common_vendor.ref("");
    const content = common_vendor.ref("");
    const selectedTags = common_vendor.ref([]);
    const selectedLocation = common_vendor.ref("");
    const tagList = common_vendor.ref([]);
    const locations = common_vendor.ref([
      "厦门大学翔安校区",
      "香山郊野公园",
      "厦门大学翔安校区丰庭食堂",
      "厦门大学信息学院",
      "查看更多"
    ]);
    const imageStyles = common_vendor.ref({
      width: 95,
      height: 95,
      border: {
        color: "#eee",
        width: "1px",
        style: "solid",
        radius: "13rpx"
      }
    });
    const getTags = async () => {
      try {
        const res = await db.collection("opendb-news-categories").orderBy("sort", "asc").get();
        if (res.result && res.result.data) {
          tagList.value = res.result.data;
        } else {
          common_vendor.index.__f__("error", "at pages/release/release.vue:118", "标签数据获取失败", res);
          common_vendor.index.showToast({
            title: "标签加载失败",
            icon: "none"
          });
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/release/release.vue:125", "获取标签错误:", e);
        common_vendor.index.showToast({
          title: "标签加载失败",
          icon: "none"
        });
      }
    };
    const handleTagSelect = (tagId) => {
      const MAX_TAGS = 3;
      const index = selectedTags.value.indexOf(tagId);
      if (index === -1) {
        if (selectedTags.value.length >= MAX_TAGS) {
          return common_vendor.index.showToast({
            title: `最多选择${MAX_TAGS}个标签`,
            icon: "none"
          });
        }
        selectedTags.value.push(tagId);
      } else {
        selectedTags.value.splice(index, 1);
      }
    };
    const handleLocationSelect = (location) => {
      if (location === "查看更多") {
        common_vendor.index.showToast({
          title: "位置功能待实现",
          icon: "none"
        });
      } else {
        selectedLocation.value = location;
      }
    };
    const goBack = () => {
      common_vendor.index.switchTab({
        url: "/pages/home/home"
      });
    };
    function select(e) {
      common_vendor.index.__f__("log", "at pages/release/release.vue:173", "选择文件：", e);
      common_vendor.index.__f__("log", "at pages/release/release.vue:174", imageValue);
    }
    function progress(e) {
      common_vendor.index.__f__("log", "at pages/release/release.vue:178", "上传进度：", e);
    }
    function success(e) {
      common_vendor.index.__f__("log", "at pages/release/release.vue:182", "上传成功", e);
    }
    function fail(e) {
      common_vendor.index.__f__("log", "at pages/release/release.vue:186", "上传失败：", e);
    }
    const handleRelease = async () => {
      if (!title.value.trim())
        return common_vendor.index.showToast({
          title: "请输入标题",
          icon: "none"
        });
      if (!content.value.trim())
        return common_vendor.index.showToast({
          title: "请输入正文内容",
          icon: "none"
        });
      if (selectedTags.value.length === 0)
        return common_vendor.index.showToast({
          title: "请选择至少一个标签",
          icon: "none"
        });
      common_vendor.index.showLoading({
        title: "发布中...",
        mask: true
      });
      try {
        let imageFileIDs = [];
        let imageUrls = [];
        if (imageValue.value.length > 0) {
          try {
            const uploadResult = await files.value.upload();
            common_vendor.index.__f__("log", "at pages/release/release.vue:219", "上传结果:", uploadResult);
            const fileIDs = uploadResult.map((item) => item.fileID || item.url);
            common_vendor.index.__f__("log", "at pages/release/release.vue:223", "提取的fileID:", fileIDs);
            const tempURLsRes = await common_vendor.nr.getTempFileURL({
              fileList: fileIDs
            });
            common_vendor.index.__f__("log", "at pages/release/release.vue:229", "临时URL转换结果:", tempURLsRes);
            imageUrls = tempURLsRes.fileList.map((item) => item.tempFileURL);
            common_vendor.index.__f__("log", "at pages/release/release.vue:233", "转换后的图片URL:", imageUrls);
          } catch (uploadError) {
            common_vendor.index.__f__("error", "at pages/release/release.vue:235", "文件上传失败:", uploadError);
            throw new Error("图片上传失败，请重试");
          }
        }
        const postData = {
          header: title.value,
          content: content.value,
          category_id: selectedTags.value,
          images: imageUrls
        };
        if (selectedLocation.value) {
          postData.location = {
            name: selectedLocation.value,
            latitude: 0,
            longitude: 0
          };
        }
        await db.collection("posts").add(postData);
        common_vendor.index.showToast({
          title: "发布成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/home/home"
          });
        }, 1500);
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/release/release.vue:271", "发布失败:", err);
        common_vendor.index.showToast({
          title: "发布失败: " + (err.message || "请检查网络"),
          icon: "none",
          duration: 3e3
        });
      } finally {
        common_vendor.index.hideLoading();
      }
    };
    common_vendor.onMounted(() => {
      getTags();
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$3,
        b: common_vendor.o(goBack),
        c: common_vendor.sr(files, "2f810819-0", {
          "k": "files"
        }),
        d: common_vendor.o(select),
        e: common_vendor.o(progress),
        f: common_vendor.o(success),
        g: common_vendor.o(fail),
        h: common_vendor.o(($event) => imageValue.value = $event),
        i: common_vendor.p({
          fileMediatype: "image",
          mode: "grid",
          limit: 4,
          ["image-styles"]: imageStyles.value,
          autoUpload: false,
          modelValue: imageValue.value
        }),
        j: title.value,
        k: common_vendor.o(($event) => title.value = $event.detail.value),
        l: -1,
        m: content.value,
        n: common_vendor.o(($event) => content.value = $event.detail.value),
        o: common_assets._imports_1$2,
        p: common_vendor.f(tagList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: selectedTags.value.includes(item._id) ? 1 : "",
            c: common_vendor.o(($event) => handleTagSelect(item._id), item._id),
            d: item._id
          };
        }),
        q: common_assets._imports_2$2,
        r: common_assets._imports_3$2,
        s: common_vendor.f(locations.value, (loc, index, i0) => {
          return {
            a: common_vendor.t(loc),
            b: selectedLocation.value === loc ? 1 : "",
            c: common_vendor.o(($event) => handleLocationSelect(loc), index),
            d: index
          };
        }),
        t: common_assets._imports_4$2,
        v: common_vendor.o(handleRelease)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/release/release.js.map
