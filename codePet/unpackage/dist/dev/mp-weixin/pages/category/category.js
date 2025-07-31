"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      items: ["猫咪", "狗狗"],
      current: 0,
      searchKeyword: "",
      isSearching: false,
      searchResults: [],
      catServices: [
        {
          image: "/static/汪汪喵切图/分类/图.png",
          title: "接宠洗澡/美容",
          price: "50.00"
        },
        {
          image: "/static/汪汪喵切图/分类/图.png",
          title: "上门清理猫砂",
          price: "200.00",
          unit: "次"
        },
        {
          image: "/static/汪汪喵切图/分类/图.png",
          title: "上门喂猫",
          price: "49.90",
          unit: "次"
        }
      ],
      dogServices: [
        {
          image: "/static/汪汪喵切图/分类/图.png",
          title: "接宠洗澡/美容",
          price: "50.00"
        },
        {
          image: "/static/汪汪喵切图/分类/图.png",
          title: "上门清理",
          price: "200.00",
          unit: "次"
        },
        {
          image: "/static/汪汪喵切图/分类/图.png",
          title: "上门喂狗",
          price: "49.90",
          unit: "次"
        }
      ]
    };
  },
  methods: {
    locate() {
    },
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
    onSearch(e) {
      const keyword = e.trim().toLowerCase();
      if (!keyword) {
        this.isSearching = false;
        this.searchResults = [];
        return;
      }
      this.isSearching = true;
      const allServices = [...this.catServices, ...this.dogServices];
      this.searchResults = allServices.filter(
        (item) => item.title.toLowerCase().includes(keyword)
      );
    },
    enterService(e) {
      common_vendor.index.navigateTo({
        url: `/pages/Washcare_details/Washcare_details?&type=door`
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  (_easycom_uni_icons2 + _easycom_uni_search_bar2 + _easycom_uni_segmented_control2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_search_bar + _easycom_uni_segmented_control)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$4,
    b: common_vendor.o((...args) => $options.locate && $options.locate(...args)),
    c: common_vendor.p({
      color: "#bababa",
      size: "40",
      type: "home"
    }),
    d: common_vendor.o($options.onSearch),
    e: common_vendor.o($options.onSearch),
    f: common_vendor.o(($event) => $data.searchKeyword = $event),
    g: common_vendor.p({
      placeholder: "搜索",
      bgColor: "#fff",
      radius: 60,
      cancelButton: "none",
      modelValue: $data.searchKeyword
    }),
    h: !$data.isSearching
  }, !$data.isSearching ? {
    i: common_vendor.o($options.onClickItem),
    j: common_vendor.p({
      current: $data.current,
      values: $data.items,
      ["style-type"]: "button",
      ["active-color"]: "#b2d76e"
    })
  } : {}, {
    k: $data.isSearching
  }, $data.isSearching ? common_vendor.e({
    l: $data.searchResults.length === 0
  }, $data.searchResults.length === 0 ? {} : {
    m: common_vendor.f($data.searchResults, (item, index, i0) => {
      return common_vendor.e({
        a: item.image,
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.price),
        d: item.unit
      }, item.unit ? {
        e: common_vendor.t(item.unit)
      } : {}, {
        f: index,
        g: common_vendor.o((...args) => $options.enterService && $options.enterService(...args), index)
      });
    })
  }) : common_vendor.e({
    n: $data.current === 0
  }, $data.current === 0 ? {
    o: common_vendor.f($data.catServices, (item, index, i0) => {
      return common_vendor.e({
        a: item.image,
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.price),
        d: item.unit
      }, item.unit ? {
        e: common_vendor.t(item.unit)
      } : {}, {
        f: index,
        g: common_vendor.o((...args) => $options.enterService && $options.enterService(...args), index)
      });
    })
  } : {}, {
    p: $data.current === 1
  }, $data.current === 1 ? {
    q: common_vendor.f($data.dogServices, (item, index, i0) => {
      return common_vendor.e({
        a: item.image,
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.price),
        d: item.unit
      }, item.unit ? {
        e: common_vendor.t(item.unit)
      } : {}, {
        f: index,
        g: common_vendor.o((...args) => $options.enterService && $options.enterService(...args), index)
      });
    })
  } : {}));
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/category/category.js.map
