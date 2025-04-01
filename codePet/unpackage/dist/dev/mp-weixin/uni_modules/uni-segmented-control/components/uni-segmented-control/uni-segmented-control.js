"use strict";const n=require("../../../../common/vendor.js"),o={name:"UniSegmentedControl",emits:["clickItem"],props:{current:{type:Number,default:0},values:{type:Array,default(){return[]}},activeColor:{type:String,default:"#2979FF"},inActiveColor:{type:String,default:"transparent"},styleType:{type:String,default:"button"}},data(){return{currentIndex:0}},watch:{current(r){r!==this.currentIndex&&(this.currentIndex=r)}},computed:{},created(){this.currentIndex=this.current},methods:{_onClick(r){this.currentIndex!==r&&(this.currentIndex=r,this.$emit("clickItem",{currentIndex:r}))}}};function i(r,a,t,s,c,l){return{a:n.f(t.values,(u,e,m)=>({a:n.t(u),b:e===c.currentIndex?t.styleType==="text"?t.activeColor:"#fff":t.styleType==="text"?"#000":t.activeColor,c:n.n(t.styleType==="text"&&e===c.currentIndex?"segmented-control__item--text":""),d:n.n(e===0&&t.styleType==="button"?"segmented-control__item--button--first":""),e:n.n(e===t.values.length-1&&t.styleType==="button"?"segmented-control__item--button--last":""),f:e,g:e===c.currentIndex&&t.styleType==="button"?t.activeColor:t.styleType==="button"?t.inActiveColor:"transparent",h:e===c.currentIndex&&t.styleType==="text"||t.styleType==="button"?t.activeColor:t.inActiveColor,i:n.o(d=>l._onClick(e),e)})),b:n.n(t.styleType==="text"?"":"segmented-control__item--button"),c:n.n(t.styleType==="text"?"segmented-control--text":"segmented-control--button"),d:t.styleType==="text"?"":t.activeColor}}const y=n._export_sfc(o,[["render",i],["__scopeId","data-v-86aa1171"]]);wx.createComponent(y);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js.map
