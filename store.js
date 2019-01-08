function Store(){
  let pageOptionsName = ['data', 'onLoad', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onShareAppMessage'],
      options = arguments.length > 0 ? arguments[0] : {},
      originPage = Page,
      pageThis = [];

  //重写page
  Page = function Page(){
    let pageOpitons = arguments.length > 0 ? arguments[0] : {},
        onLoad = pageOpitons.onLoad;

    pageOpitons.onLoad = function(){
      pageThis.push(this);
      onLoad && onLoad.call(this);
      debugger;
    }

    //原生的Page执行
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