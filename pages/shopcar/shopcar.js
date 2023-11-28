// pages/shopcar/shopcar.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buylist: [],
    checkout: false,
    imgBaseUrl: '',
    counts: 0
  },
  changeCheckot(e) {
    let id = e.target.dataset.sid
    this.data.buylist.forEach(item => {
      if (item.commodity_id == id) {
        item.checked = !item.checked
      }
    }
    )
    this.setData({
      buylist: this.data.buylist
    })
    this.reduce()
    this.somes()
    wx.setStorageSync('shopinfo', this.data.buylist)
  },
  //和
  reduce() {
    let nums = this.data.buylist.filter((item) => item.checked == true)
    let sx = nums.reduce((total, item) =>
      total + item.commodity_price * item.shopnum
      , 0)
    this.setData(
      {
        counts: sx * 100
      }
    )
  },
  // 全选反选
  somes(){
   let sx =  this.data.buylist.filter(item => item.checked == true)
   if(sx.length == this.data.buylist.length){
    this.setData({
      checkout:true
    })
   }else{
    this.setData({
      checkout:false
    })
   }
  },
  quanxun(){
    this.setData({
      checkout:!this.data.checkout
    })
    this.data.buylist.forEach(
      item => 
      item.checked = !item.checked
    )
     this.setData({
      buylist:this.data.buylist
    })
    this.reduce()
  },
  //加减按钮
  // 减
  min(e){
    let id = e.target.dataset.sid
    this.data.buylist.forEach(item => {
      if (item.commodity_id == id) {
        if(item.shopnum == 1){
          item.shopnum = 1
        }else{
          item.shopnum--
        }
      }
    }
    )
    this.setData({
      buylist:this.data.buylist
    })
    this.reduce()
    this.somes()
    wx.setStorageSync('shopinfo', this.data.buylist)
  },
  // 加
  add(e){
      let id = e.target.dataset.sid
      this.data.buylist.forEach(item => {
        if (item.commodity_id == id) {
            item.shopnum++
        }
      }
      )
      this.setData({
        buylist:this.data.buylist
      })
      this.reduce()
      wx.setStorageSync('shopinfo', this.data.buylist)
  },
  //删除
  remove(e){
    let id = e.target.dataset.sid
    this.data.buylist.forEach((item,index) => {
      if (item.commodity_id == id) {
          this.data.buylist.splice(index,1)
          wx.setStorageSync('shopinfo', this.data.buylist)
          this.somes()
          this.reduce()
      }
    }
    )
    this.setData({
      buylist:this.data.buylist
    })
    this.somes()
  },
  //提交订单
  onClickButton(){
    let data=this.data.buylist
    wx.navigateTo({
      url: '/pages/myOrder/myOrder',
      success:function (res) {
        res. eventChannel.emit('addorder', data);
      }
    })
    setTimeout(()=>{
      this.setData({
      buylist:[]
      })
      wx.setStorageSync('shopinfo', this.data.buylist)
    },1000)
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      buylist: wx.getStorageSync('shopinfo'),
      imgBaseUrl: app.globalData.imgBaseUrl
    })
    this.reduce()
      this.somes()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.somes()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      buylist: wx.getStorageSync('shopinfo'),
    })
    this.reduce()
    this.somes()
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