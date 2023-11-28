//定义全局公共的访问基础路径
const baseUrl = "http://118.190.158.17:8006/AopAndMyBatis2/wxview/"
//封装函数
function http(options){
	return new Promise((resolve,reject)=>{ 
	  wx.request({
		url: baseUrl+options.url,
		method:options.method || "GET",
		data:options.data || {},
		header:{
		  token:wx.getStorageSync('token') || ""
		},
		success(res){
		  resolve(res)
		},
		fail(){
		  reject("请求失败！")
		}
	  })
	})
  }
module.exports = http