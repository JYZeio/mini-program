// pages/shopDetails/shopDetails.js
const http = require('../../utils/getList.js')
const app = getApp()
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 3000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    imgBaseUrl: '',
    id:null,
    shopMage:[],
    amount:0
  },
  
  async shopMessage(id){
    let {data} = await http({
      url:`getOneWine?id=${id}`,
      method:"get",
    })
    this.setData({
        shopMage:data
      })
},
//计算商品的总数量
count(){  
  // let list = app.globalData.shopinfo
  let list =  [...wx.getStorageSync('shopinfo')]
  let num = list.filter((item) => item.checked == true).reduce( (total, item) => (total += item.shopnum), 0);
  this.setData({
    amount:num
  })
},
addshopcar(e){
  Toast.success('加入成功');
  let { commodity_name , commodity_id, commodity_price, picture_url } = e.currentTarget.dataset.shopinfo
   // 判断商品是否存在
   let existingItem = app.globalData.shopinfo.find(item => item.commodity_id === commodity_id);
   if (existingItem) {
     // 商品已存在，更新数量
     existingItem.shopnum++;
   } else {
     // 商品不存在，添加新商品
     let obj = {
       commodity_name: commodity_name,
       commodity_id: commodity_id,
       commodity_price: commodity_price,
       picture_url:picture_url,
       shopnum: 1,
       checked: true
     };
     app.globalData.shopinfo.push(obj);
   }
   //计算总数量
  wx.setStorageSync("shopinfo",app.globalData.shopinfo)
  this.count()
},
//跳转购物车
goshopcar(){
  // console.log(123);
  wx.navigateTo({
    url: '/pages/minShop/minShop',
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let id = options.id
    this.setData({
      imgBaseUrl: app.globalData.imgBaseUrl,
      id:options.id
    })
    this.shopMessage(id)
    this.count()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.count()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})