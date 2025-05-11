"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      imageStyles: {
        width: 95,
        height: 95,
        border: {
          radius: "13rpx"
        }
      },
      tags: ["日常", "宠粮", "洗护", "代看", "救助", "领养", "知识", "经验"],
      locations: [
        "厦门大学翔安校区",
        "香山郊野公园",
        "厦门大学翔安校区丰庭食堂",
        "厦门大学信息学院",
        "查看更多"
      ]
    };
  },
  methods: {}
};
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  _easycom_uni_file_picker2();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
if (!Math) {
  _easycom_uni_file_picker();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$3,
    b: common_vendor.p({
      limit: "4",
      ["del-icon"]: true,
      ["image-styles"]: $data.imageStyles
    }),
    c: -1,
    d: common_assets._imports_1$2,
    e: common_vendor.f($data.tags, (tag, index, i0) => {
      return {
        a: common_vendor.t(tag),
        b: index
      };
    }),
    f: common_assets._imports_2$2,
    g: common_assets._imports_3$2,
    h: common_vendor.f($data.locations, (loc, index, i0) => {
      return {
        a: common_vendor.t(loc),
        b: index
      };
    }),
    i: common_assets._imports_4$2
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
