"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "release",
  setup(__props) {
    const title = common_vendor.ref("");
    const content = common_vendor.ref("");
    const selectedFiles = common_vendor.ref([]);
    const selectedTags = common_vendor.ref([]);
    const selectedLocation = common_vendor.ref("");
    const previewImages = common_vendor.ref([]);
    const tags = common_vendor.ref(["日常", "宠粮", "洗护", "代看", "救助", "领养", "知识", "经验"]);
    const locations = common_vendor.ref([
      "厦门大学翔安校区",
      "香山郊野公园",
      "厦门大学翔安校区丰庭食堂",
      "厦门大学信息学院",
      "查看更多"
    ]);
    const chooseImage = () => {
      const remainCount = 4 - previewImages.value.length;
      if (remainCount <= 0) {
        common_vendor.index.showToast({
          title: "最多只能上传4张图片",
          icon: "none"
        });
        return;
      }
      common_vendor.index.chooseImage({
        count: remainCount,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          const tempFilePaths = res.tempFilePaths;
          const tempFiles = res.tempFiles;
          tempFilePaths.forEach((path, index) => {
            previewImages.value.push({
              url: path,
              file: tempFiles[index]
            });
          });
          selectedFiles.value = tempFiles;
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/release/release.vue:148", "选择图片失败：", err);
        }
      });
    };
    const handleDeleteImage = (index) => {
      previewImages.value.splice(index, 1);
      selectedFiles.value.splice(index, 1);
    };
    const handleTagSelect = (tag) => {
      const index = selectedTags.value.indexOf(tag);
      if (index === -1) {
        selectedTags.value.push(tag);
      } else {
        selectedTags.value.splice(index, 1);
      }
    };
    const handleLocationSelect = (location) => {
      selectedLocation.value = location;
    };
    const goBack = () => {
      common_vendor.index.switchTab({
        url: "/pages/home/home"
      });
    };
    const handleRelease = async () => {
      if (!title.value.trim()) {
        common_vendor.index.showToast({
          title: "请输入标题",
          icon: "none"
        });
        return;
      }
      if (!content.value.trim()) {
        common_vendor.index.showToast({
          title: "请输入正文内容",
          icon: "none"
        });
        return;
      }
      try {
        const formData = {
          title: title.value,
          content: content.value,
          tags: JSON.stringify(selectedTags.value),
          location: selectedLocation.value
        };
        if (selectedFiles.value.length > 0) {
          const uploadTasks = selectedFiles.value.map((file, index) => {
            return new Promise((resolve, reject) => {
              common_vendor.index.uploadFile({
                url: "YOUR_API_ENDPOINT",
                filePath: file.path,
                name: `image${index}`,
                formData,
                success: (res) => {
                  if (res.statusCode === 200) {
                    resolve(res.data);
                  } else {
                    reject(new Error("上传失败"));
                  }
                },
                fail: (err) => {
                  reject(err);
                }
              });
            });
          });
          await Promise.all(uploadTasks);
          common_vendor.index.showToast({
            title: "发布成功",
            icon: "success"
          });
          setTimeout(() => {
            common_vendor.index.navigateBack();
          }, 1500);
        }
      } catch (error) {
        common_vendor.index.showToast({
          title: error.message || "发布失败",
          icon: "none"
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$3,
        b: common_vendor.o(goBack),
        c: common_vendor.f(previewImages.value, (file, index, i0) => {
          return {
            a: file.url,
            b: common_vendor.o(($event) => handleDeleteImage(index), index),
            c: index
          };
        }),
        d: previewImages.value.length < 4
      }, previewImages.value.length < 4 ? {
        e: common_vendor.o(chooseImage)
      } : {}, {
        f: title.value,
        g: common_vendor.o(($event) => title.value = $event.detail.value),
        h: -1,
        i: content.value,
        j: common_vendor.o(($event) => content.value = $event.detail.value),
        k: common_assets._imports_1$3,
        l: common_vendor.f(tags.value, (tag, index, i0) => {
          return {
            a: common_vendor.t(tag),
            b: selectedTags.value.includes(tag) ? 1 : "",
            c: common_vendor.o(($event) => handleTagSelect(tag), index),
            d: index
          };
        }),
        m: common_assets._imports_2$2,
        n: common_assets._imports_3$2,
        o: common_vendor.f(locations.value, (loc, index, i0) => {
          return {
            a: common_vendor.t(loc),
            b: selectedLocation.value === loc ? 1 : "",
            c: common_vendor.o(($event) => handleLocationSelect(loc), index),
            d: index
          };
        }),
        p: common_assets._imports_4$2,
        q: common_vendor.o(handleRelease)
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/release/release.js.map
