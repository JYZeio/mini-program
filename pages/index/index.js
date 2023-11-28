// index.js
const http = require('../../utils/getList.js')
const app = getApp()
Page({
  data: {
    indicatorDots: false,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    imgList:[
      "../../image/lunbotu/banner1.jpg",
      "../../image/lunbotu/banner2.jpg",
      "../../image/lunbotu/banner3.jpg",
      "../../image/lunbotu/banner4.jpg",
    ],
    classify:[
      {
        url:'../../image/navWine/pijiu.png',
        text:'啤酒',
        id:1
      },
      {
        url:'../../image/navWine/baijiu.png',
        text:'白酒',
        id:2
      },
      {
        url:'../../image/navWine/hongjiu.png',
        text:'红酒',
        id:3
      },
      {
        url:'../../image/navWine/yangjiu.png',
        text:'洋酒',
        id:4
      },
      {
        url:'../../image/navWine/all.png',
        text:'全部'
      },
    ],
    shopList:[],
    imgBaseUrl:''
  },
  //发送请求
  async getShopList(that){
      let {data} = await http({
        url:'getFoursWine',
        method:"get",
        data:{}
      })
      that.setData({
        shopList:data
      })
      // console.log(data);
  },
  //点击跳转商品详情
  shopdetail(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/shopList/shopList?id=${id}`,
    })
  },
  //跳转到商品更多页面
  goMore(e){
    let id = e.target.dataset.wid
    wx.navigateTo({
      url: `/pages/shopList/shopList?id=${id}`,
    })
  },
  //跳转到商品的信息信息页面
  goShopDetails(e){
    let id = e.currentTarget.dataset.shopid
    // console.log(id);
    wx.navigateTo({
      url: `/pages/shopDetails/shopDetails?id=${id}`,
    })
  },
  onLoad(){
    let that = this;
    this.getShopList(that);
    this.setData({
      imgBaseUrl: app.globalData.imgBaseUrl
    })
  }
})

