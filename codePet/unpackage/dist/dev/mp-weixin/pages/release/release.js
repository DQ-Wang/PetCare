"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const js_sdk_qqmapWxJssdk1_2_qqmapWxJssdk = require("../../js_sdk/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js");
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
    const qqmapsdk = common_vendor.ref(null);
    const currentLocation = common_vendor.ref(null);
    const locations = common_vendor.ref([]);
    const locationLoaded = common_vendor.ref(false);
    const visibleLocations = common_vendor.computed(() => {
      return locations.value.slice(0, 4);
    });
    common_vendor.onMounted(() => {
      getTags();
      initMap();
      common_vendor.index.$on("locationSelected", (locationData) => {
        common_vendor.index.__f__("log", "at pages/release/release.vue:107", "收到位置选择事件", locationData);
        addNewLocation(locationData);
      });
    });
    const initMap = () => {
      qqmapsdk.value = new js_sdk_qqmapWxJssdk1_2_qqmapWxJssdk.QQMapWX({
        key: "NJDBZ-3U5KT-VVCXD-VKCO5-M6M33-6WFDR"
      });
      common_vendor.wx$1.getSetting({
        success: (res) => {
          if (res.authSetting["scope.userLocation"]) {
            getCurrentLocation();
          } else {
            common_vendor.wx$1.authorize({
              scope: "scope.userLocation",
              success: () => {
                common_vendor.index.__f__("log", "at pages/release/release.vue:127", "位置授权成功");
                getCurrentLocation();
              },
              fail: (err) => {
                common_vendor.index.__f__("log", "at pages/release/release.vue:131", "位置授权失败", err);
                showLocationAuthDialog();
              }
            });
          }
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/release/release.vue:138", "获取设置失败", err);
          showLocationAuthDialog();
        }
      });
    };
    const showLocationAuthDialog = () => {
      common_vendor.wx$1.showModal({
        title: "位置权限请求",
        content: "需要您的位置信息来查找附近地点",
        success(res) {
          if (res.confirm) {
            common_vendor.wx$1.openSetting({
              success(settingRes) {
                if (settingRes.authSetting["scope.userLocation"]) {
                  getCurrentLocation();
                } else {
                  common_vendor.wx$1.showToast({ title: "权限请求被拒绝", icon: "none" });
                }
              }
            });
          }
        }
      });
    };
    const getCurrentLocation = () => {
      common_vendor.wx$1.getLocation({
        type: "gcj02",
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/release/release.vue:170", "获取位置成功", res);
          currentLocation.value = {
            latitude: res.latitude,
            longitude: res.longitude
          };
          getNearbyPOI();
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/release/release.vue:178", "获取位置失败", err);
          common_vendor.index.showModal({
            title: "定位失败",
            content: "请检查位置权限设置",
            showCancel: false,
            success: () => {
              common_vendor.wx$1.openSetting();
            }
          });
        }
      });
    };
    const getNearbyPOI = () => {
      if (!currentLocation.value)
        return;
      qqmapsdk.value.reverseGeocoder({
        location: {
          latitude: currentLocation.value.latitude,
          longitude: currentLocation.value.longitude
        },
        get_poi: 1,
        poi_options: "radius=150;page_size=8;policy=2;orderby=_distance",
        success: (res) => {
          var _a, _b;
          if (((_b = (_a = res.result) == null ? void 0 : _a.pois) == null ? void 0 : _b.length) > 0) {
            const sortedPois = res.result.pois.sort((a, b) => a._distance - b._distance);
            const nearbyLocations = sortedPois.map((poi) => ({
              title: poi.title,
              distance: poi._distance,
              poi
            }));
            if (nearbyLocations[0].distance > 200) {
              nearbyLocations.unshift({
                title: "当前位置",
                distance: 0,
                poi: null
              });
            }
            locations.value = nearbyLocations;
          } else {
            locations.value = [
              { title: "当前位置", distance: 0, poi: null }
            ];
          }
          locationLoaded.value = true;
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/release/release.vue:229", "获取地点失败", err);
          locations.value = [
            { title: "当前位置", distance: 0, poi: null }
          ];
          locationLoaded.value = true;
        }
      });
    };
    const gotoLocationList = () => {
      if (!locationLoaded.value) {
        return common_vendor.index.showToast({ title: "地点信息尚未加载完成", icon: "none" });
      }
      if (currentLocation.value) {
        common_vendor.index.navigateTo({
          url: `/pages/release/locationList?lat=${currentLocation.value.latitude}&lng=${currentLocation.value.longitude}`
        });
      } else {
        common_vendor.index.showToast({ title: "位置信息未获取，请稍后再试", icon: "none" });
      }
    };
    const addNewLocation = (locationData) => {
      common_vendor.index.__f__("log", "at pages/release/release.vue:255", "[发布页] 添加新位置:", locationData.title);
      const exists = visibleLocations.value.some((loc) => {
        if (loc.poi && locationData.poi && loc.poi.id) {
          return loc.poi.id === locationData.poi.id;
        }
        return loc.title.trim().toLowerCase() === locationData.title.trim().toLowerCase();
      });
      if (!exists) {
        common_vendor.index.__f__("log", "at pages/release/release.vue:266", "位置不存在，添加新位置");
        locations.value.unshift({
          title: locationData.title,
          poi: locationData.poi
        });
      } else {
        common_vendor.index.__f__("log", "at pages/release/release.vue:272", "位置已存在:", locationData.title);
      }
      selectedLocation.value = locationData.title;
    };
    const handleLocationSelect = (location) => {
      selectedLocation.value = location;
    };
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
          common_vendor.index.__f__("error", "at pages/release/release.vue:305", "标签数据获取失败", res);
          common_vendor.index.showToast({
            title: "标签加载失败",
            icon: "none"
          });
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/release/release.vue:312", "获取标签错误:", e);
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
    const goBack = () => {
      common_vendor.index.switchTab({
        url: "/pages/home/home"
      });
    };
    function select(e) {
      common_vendor.index.__f__("log", "at pages/release/release.vue:347", "选择文件：", e);
      common_vendor.index.__f__("log", "at pages/release/release.vue:348", imageValue);
    }
    function progress(e) {
      common_vendor.index.__f__("log", "at pages/release/release.vue:352", "上传进度：", e);
    }
    function success(e) {
      common_vendor.index.__f__("log", "at pages/release/release.vue:356", "上传成功", e);
    }
    function fail(e) {
      common_vendor.index.__f__("log", "at pages/release/release.vue:360", "上传失败：", e);
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
        let uploadResult = [];
        if (imageValue.value.length > 0) {
          uploadResult = await files.value.upload();
          common_vendor.index.__f__("log", "at pages/release/release.vue:390", "upload result:", JSON.stringify(uploadResult, null, 2));
          common_vendor.index.__f__("log", "at pages/release/release.vue:391", "上传结果:", uploadResult);
          imageFileIDs = uploadResult.map((item) => item.fileID || item.url).filter((id) => typeof id === "string" && id.startsWith("cloud://"));
          common_vendor.index.__f__("log", "at pages/release/release.vue:396", "上传的 fileID:", imageFileIDs);
        }
        if (imageFileIDs.length !== uploadResult.length) {
          throw new Error("有图片上传失败或 fileID 非法");
        }
        const postData = {
          header: title.value,
          content: content.value,
          category_id: selectedTags.value,
          images: imageFileIDs
          // ✅ 只存 fileID
        };
        if (selectedLocation.value) {
          postData.location = {
            address: selectedLocation.value
          };
        }
        await db.collection("posts").add(postData);
        common_vendor.index.showToast({
          title: "发布成功",
          icon: "success"
        });
        common_vendor.index.reLaunch({
          url: "/pages/release/release"
          // 重新加载当前页面
        });
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/Commity/Commity"
          });
        }, 1500);
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/release/release.vue:442", "发布失败:", err);
        common_vendor.index.showToast({
          title: "发布失败: " + (err.message || "请检查网络"),
          icon: "none",
          duration: 3e3
        });
      } finally {
        common_vendor.index.hideLoading();
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$3,
        b: common_vendor.o(goBack),
        c: common_vendor.sr(files, "4c7048b1-0", {
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
        q: common_assets._imports_0$4,
        r: common_assets._imports_3$2,
        s: common_vendor.f(visibleLocations.value, (loc, index, i0) => {
          return {
            a: common_vendor.t(loc.title),
            b: selectedLocation.value === loc.title ? 1 : "",
            c: common_vendor.o(($event) => handleLocationSelect(loc.title), index),
            d: index
          };
        }),
        t: common_vendor.o(gotoLocationList),
        v: common_assets._imports_4$2,
        w: common_vendor.o(handleRelease)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/release/release.js.map
