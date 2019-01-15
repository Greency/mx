function Store(){
  let pageOptionsName = ['data', 'onLoad', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onShareAppMessage'],
      options = arguments.length > 0 ? arguments[0] : {},
      originPage = Page,
      pageThis = [];

  //重写page
  Page = function (){
    let pageOpitons = arguments.length > 0 ? arguments[0] : {},
        onLoad = pageOpitons.onLoad;  //保存原来的onLoad，保证onLoad的正确执行

    pageOpitons.onLoad = function(options){
      //搜集页面对象
      pageThis.push(this);
      //执行原来的onLoad
      onLoad && onLoad.call(this);
    }

    pageOpitons.onUnload = function(options){
      pageThis.pop();
      onUnload && onUnload.call(this);
    }

    //执行原来的Page
    originPage(pageOpitons);
  }

  class Store{
    constructor(){

    }

    getThis(){
      return pageThis;
    }
  }

  return new Store();
}

module.exports = {
  Store,
}