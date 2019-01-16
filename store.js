function Store(){
  let pageOptionsName = ['data', 'onLoad', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onShareAppMessage'],
      options = arguments.length > 0 ? arguments[0] : {},
      originPage = Page,
      pageThis = [],
      store = {};  //储存store

  function _setData(options){
    let _store = Object.assign(store, options);
    this.setData({
      $Store: _store
    });
  }

  //重写page
  Page = function (){
    let pageOpitons = arguments.length > 0 ? arguments[0] : {},
        //onLoad = pageOpitons.onLoad,  //保存原来的onLoad，保证onLoad的正确执行
        onShow = pageOpitons.onShow,
        onUnload = pageOpitons.onUnload;
    
    /*pageOpitons.onLoad = function(options){
      //搜集页面对象
      pageThis.push(this);
      //执行原来的onLoad
      onLoad && onLoad.call(this);
      _setData.call(this);
    }*/
    pageOpitons.onShow = function (options) {
      //搜集页面对象
      pageThis.push(this);
      //执行原来的onLoad
      onShow && onShow.call(this);
      _setData.call(this);
    }

    pageOpitons.onUnload = function(options){
      pageThis.pop();
      onUnload && onUnload.call(this);
      console.log('_index: ', pageThis[pageThis.length - 1]);
      _setData.call(pageThis[pageThis.length - 1]);
    }

    //执行原来的Page
    originPage(pageOpitons);
  }

  class Store{
    constructor(){

    }

    setState(options){
      if (Object.prototype.toString.call(options) !== '[object Object]') {
        console.error(`setState方法必须传入对象`);
        return;
      }
      store = Object.assign(store, options);
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