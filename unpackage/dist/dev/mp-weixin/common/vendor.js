(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 17:
/*!*************************************************!*\
  !*** F:/officeProject/dmhs/service/executeS.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _apixConfig = _interopRequireDefault(__webpack_require__(/*! ./apixConfig.js */ 18));
var _utils = __webpack_require__(/*! ../utils/utils.js */ 19);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var executeS = function executeS(params) {var
  apixkey = params.apixkey,payload = params.payload,_params$requestOption = params.requestOptions,requestOptions = _params$requestOption === void 0 ? {} : _params$requestOption;
  var reqconfig = _apixConfig.default[apixkey];
  if (reqconfig) {
    var paramsPayload = payload || {};
    var resoponse = new Promise(function (resove, reject) {
      return uni.request(_objectSpread({
        url: reqconfig.url,
        method: reqconfig.method,
        responseType: 'Object',
        header: {
          'content-Type': 'application/json'
          // 'token':getStorage('userInfo')?getStorage('userInfo').token:''
        },
        data: paramsPayload },
      requestOptions, {
        success: function success(res) {
          if (res.statusCode === 200) {
            resove(res.data);
          }
        },
        fail: function fail(res) {
          uni.showToast({
            title: res.errMsg,
            mask: true,
            duration: 1500 });

          reject(res);
          // return res.data
        } }));

    }).catch(function (error) {return error;});
    return resoponse;

  }
  var error = new Error("\u6CA1\u6709\u627E\u5230[".concat(params.apixkey, "]\u4E0B\u7684\u5BF9\u5E94\u8BF7\u6C42\u914D\u7F6E"));
  console.error(error);
  return error;
};var _default =
executeS;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 177:
/*!******************************************************!*\
  !*** F:/officeProject/dmhs/static/images/descbg.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 18:
/*!***************************************************!*\
  !*** F:/officeProject/dmhs/service/apixConfig.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var PROXY_SYSTEM = '/'; //接口地址配置
//const PROXY_SYSTEM = 'http://192.168.50.71:8080';
var API_PRE = '';
var configApixs = function configApixs(_ref) {var PROXY_SYSTEM = _ref.PROXY_SYSTEM,API_PRE = _ref.API_PRE;
  var CMS_SERVICE = "".concat(API_PRE, "/api");
  return {
    getPartyFileClassNames: { url: "".concat(PROXY_SYSTEM).concat(CMS_SERVICE, "/mainResource/getPartyFileClassNames"), method: 'GET' }, // 获取文件分类名称接口
    getAllFiles: { url: "".concat(PROXY_SYSTEM).concat(CMS_SERVICE, "/mainResource/getAllFiles"), method: 'GET' } // 资源中心查询文件接口
  };
};var _default =

configApixs({ PROXY_SYSTEM: PROXY_SYSTEM, API_PRE: API_PRE });exports.default = _default;

/***/ }),

/***/ 19:
/*!********************************************!*\
  !*** F:/officeProject/dmhs/utils/utils.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.upLoad = exports.getStorage = exports.setStorage = exports.showMsg = exports.formatTime = exports.backTo = exports.linkTo = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 20));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * 链接跳转
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * */
var linkTo = function linkTo(url) {
  console.log(url, 'url');
  uni.navigateTo({
    url: url });

};
// 返回
exports.linkTo = linkTo;var backTo = function backTo() {var delta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  uni.navigateBack({
    delta: delta });

};
// 时间格式转换
exports.backTo = backTo;var formatTime = function formatTime(time, format) {
  format = format ? format : "yyyy-MM-dd hh:mm:ss";
  var date = new Date(time);
  var yyyy = date.getFullYear();
  var MM = addZero(date.getMonth() + 1);
  var dd = addZero(date.getDate());
  var hh = addZero(date.getHours());
  var mm = addZero(date.getMinutes());
  var ss = addZero(date.getSeconds());

  return format.replace("yyyy", yyyy).
  replace("MM", MM).
  replace("dd", dd).
  replace("hh", hh).
  replace("mm", mm).
  replace("ss", ss);
};exports.formatTime = formatTime;
var addZero = function addZero(num) {
  num = num + '';
  if (num.length < 2) {
    return '0' + num;
  }
  return num;
};

//消息提示
var showMsg = function showMsg(title) {var icon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
  uni.showToast({
    title: title,
    icon: icon,
    duration: 1500,
    mask: true });

};

//设置缓存
exports.showMsg = showMsg;var setStorage = function setStorage(key, data) {return uni.setStorage({
    key: key,
    data: data });};


//读取缓存
exports.setStorage = setStorage;var getStorage = function getStorage(key) {
  try {
    var value = uni.getStorageSync(key);
    if (value) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

//上传文件
exports.getStorage = getStorage;var upLoad = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(url) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
              new Promise(function (resove, reject) {
                uni.uploadFile({
                  url: '',
                  filePath: url,
                  name: 'file',
                  success: function success(res) {
                    if (res.statusCode === 200) {
                      resove(JSON.parse(res.data));
                    }
                  },
                  fail: function fail(res) {
                    uni.showToast({
                      title: res.msg,
                      mask: true,
                      duration: 1500 });

                    reject(res);
                  } });

              }));case 2:return _context.abrupt("return", _context.sent);case 3:case "end":return _context.stop();}}}, _callee);}));return function upLoad(_x) {return _ref.apply(this, arguments);};}();exports.upLoad = upLoad;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!*********************************************************************************************!*\
  !*** ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 21);

/***/ }),

/***/ 21:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 22);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 210:
/*!***********************************************************!*\
  !*** F:/officeProject/dmhs/components/uni-icons/icons.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 22:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!****************************************!*\
  !*** F:/officeProject/dmhs/pages.json ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map