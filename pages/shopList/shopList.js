// pages/shopList/shopList.js
const http = require('../../utils/getList.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:1,
    imgBaseUrl:'',
    shopLists:[],
    id:null,
    count:0,
    loding:false,
    inpval:'',
    act:false
  },
  getinpval(e){
    this.setData({
      inpval:e.detail.value
    })
  },
  //发送查询
  async getInplist(val){
    let { data } = await http({
      url:`getWineClassify?name=${val}`,
      method:"get"
    })
    this.setData({
      shopLists:data,
    })
  },
  sendSer(){
    this.getInplist(this.data.inpval)
  },
  goShopmsg(e){
    let id = e.currentTarget.dataset.sid
    wx.navigateTo({
      url: `/pages/shopDetails/shopDetails?id=${id}`,
    })
  },
//
  async cassify(id){
    let { data } = await http({
      url:`getWineClassify?id=${id}`
    })
    this.setData({
      shopLists:data
    })
  },
  async cassify2(id){
    let { data } = await http({
      url:`getSalesClassify?id=${id}`
    })
    this.setData({
      shopLists:data
    })
  },
  //高到低
  async cassify3(id){
    let { data } = await http({
      url:`getDescClassify?id=${id}`
    })
    this.setData({
      shopLists:data
    })
  },
  //低到高
  async cassify4(id){
    let { data } = await http({
      url:`getAscClassify?id=${id}`
    })
    this.setData({
      shopLists:data
    })
  },
  changTab(e){
    let id = e.target.dataset.nid
    if(id == 1 || id == 3){
      this.cassify(this.data.id)
    }else if(id == 2){
      this.cassify2(this.data.id)
    }else if(id == 4){
      if(!this.data.act){
        this.cassify4(this.data.id)
        this.setData({
          act:true
        })
      }else{
        this.cassify3(this.data.id)
        this.setData({
          act:false
        })
      }
    }
    this.setData({
      index:id
    })
  },
  async getShopLists(id){
    let {data} = await http({
      url:`getWineClassify?id=${id}`,
      method:"get",
    })
    
    let list = data.slice(0,5)
    this.setData({
        shopLists:list,
        count:list.length
      })
},
async newGetShopLists(){
  let {data} = await http({
    url:`getWineClassifys?id=${this.data.id}&count=${this.data.count}`,
    method:"get",
  })
  console.log(data);
  let list = [...this.data.shopLists,...data]
  // console.log(list);
  this.setData({
      loding:false,
      shopLists:list,
      count:list.length
    })
    if(this.data.act){
      this.cassify4(this.data.id)
    }else{
      this.cassify3(this.data.id)
    }
    // 弹框加载
    // wx.hideLoading()
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
    this.getShopLists(id)
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
    // loding加载
    this.setData({
      loding:true
    })
    //弹框加载
    // wx.showLoading({
    //   title: '加载中',
    // })
    this.newGetShopLists()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})