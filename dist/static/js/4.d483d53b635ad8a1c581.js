webpackJsonp([4],{"6R45":function(t,e){},"d+tq":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("4YfN"),s=i.n(n),a=i("9rMa"),r={computed:s()({},Object(a.d)({infoList:function(t){return t.details.typeList},yearList:function(t){return t.details.years},active:function(t){return t.details.active}})),methods:s()({},Object(a.b)({getInfoList:"getInfoList"}),{back:function(){window.history.go(-1)},init:function(){console.log(this.yearList)},getinfoList:function(t){this.$store.dispatch("getInfoList",t)}}),beforeMount:function(){},mounted:function(){var t=this;this.$store.dispatch("getDetailData",{id:this.$route.query.id,cb:function(){t.getinfoList({year:"2018",index:0})}})}},c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"type"},[i("p",{on:{click:t.back}},[t._v("全部车款")]),t._v(" "),i("div",{staticClass:"type-list"},[i("div",{staticClass:"item-list"},[i("div",{staticClass:"type-nav"},t._l(t.yearList,function(e,n){return i("span",{key:n,class:t.active==n?"active":"",on:{click:function(i){t.getInfoList({year:e,index:n})}}},[t._v(t._s(e))])})),t._v(" "),t._l(t.infoList,function(e,n){return e.list.length?i("div",{key:n},[i("p",[i("span",[t._v(t._s(e.info))])]),t._v(" "),i("ul",t._l(e.list,function(e,n){return i("li",{key:n},[i("p",[i("span",[t._v(t._s(e.market_attribute.year)+"版")]),t._v(" "),i("span",[t._v(t._s(e.car_name))])]),t._v(" "),i("p",[i("span",[t._v(t._s(e.horse_power)+"马力")]),t._v(" "),i("span",[t._v(t._s(e.gear_num)+"档")])]),t._v(" "),i("p",[i("span",[t._v("指导价 "+t._s(e.market_attribute.dealer_price_max))]),t._v(" "),i("span",[t._v(t._s(e.market_attribute.dealer_price_min)+"起")])])])}))]):t._e()})],2)])])},staticRenderFns:[]};var o=i("C7Lr")(r,c,!1,function(t){i("6R45")},"data-v-ae900f2a",null);e.default=o.exports}});
//# sourceMappingURL=4.d483d53b635ad8a1c581.js.map