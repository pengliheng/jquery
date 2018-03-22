// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({16:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (window, document, undefined) {
  // 获取数据类型
  var typeOf = function typeOf(arg) {
    var _result = Object.prototype.toString.call(arg);
    return _result.match(/(?<=\s)\w*/g)[0];
  };

  var Query = function () {
    function Query(args) {
      _classCallCheck(this, Query);

      var type = typeOf(args);
      if (type === 'String') {
        this.elements = document.querySelectorAll(args);
      } else if (type === 'HTMLLIElement') {
        // 初始化dom
        console.log(type);
        this.elements = [args];
      }
      this.author = 'pengliheng';
      this.version = '0.0.1';
    }
    // 写方法


    _createClass(Query, [{
      key: 'css',
      value: function css(key, val) {
        this.elements.forEach(function (dom) {
          dom.style[key] = val;
        });
        return this;
      }
      // 选择第i个元素

    }, {
      key: 'eq',
      value: function eq(i) {
        this.elements = [this.elements[i]];
        return this;
      }
      // find,查找

    }, {
      key: 'find',
      value: function find(selector) {
        var newNode = [];
        this.elements.forEach(function (dom) {
          newNode = [].concat(_toConsumableArray(newNode), _toConsumableArray(dom.querySelectorAll(selector)));
        });
        this.elements = newNode;
        return this;
      }
    }, {
      key: 'attr',
      value: function attr(_attr, val) {
        this.elements.forEach(function (dom) {
          if (_attr.match(/data-/)) {
            dom.dataset[_attr.match(/(?<=-)\w*/g)] = val;
          } else {
            dom[_attr] = val;
          }
        });
        return this;
      }
    }, {
      key: 'click',
      value: function click(func) {
        this.elements.forEach(function (dom) {
          dom.addEventListener('click', function (e) {
            return func(e);
          });
        });
        return this;
      }
    }, {
      key: 'each',
      value: function each(func) {
        this.elements.forEach(function (dom, i) {
          func(dom, i);
        });
        return this;
      }
    }]);

    return Query;
  }();

  var $ = function $(selector) {
    return new Query(selector);
  };
  // 用于写属性
  $.typeOf = typeOf;
  $.ajax = function (_ref) {
    var type = _ref.type,
        url = _ref.url,
        dataType = _ref.dataType,
        success = _ref.success,
        error = _ref.error,
        data = _ref.data;

    fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: type,
      body: JSON.stringify(data)
      // credentials: 'include'
    }).then(function (res) {
      return res[dataType]();
    }).then(function (suc) {
      return success(suc);
    }).catch(function (err) {
      return error(err);
    });
  };
  window.$ = $;
  return $;
})(window, document, undefined);

exports.default = $;
},{}],5:[function(require,module,exports) {
'use strict';

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _index2.default)('ul').css('color', 'red'); // import $ from '@pengliheng/jquery';

(0, _index2.default)('ul li').eq(2).click(function () {
  (0, _index2.default)('li').each(function (dom, i) {
    (0, _index2.default)(dom).css('font-size', (i + 1) * 10 + 'px');
  });
});
_index2.default.ajax({
  url: 'https://chat.pipk.top/graphql',
  type: 'POST',
  data: {
    query: '{\n      viewer{\n        login\n      }\n    }'
  },
  error: function error(err) {
    console.log(err);
  },
  success: function success(json) {
    console.log(json);
  },

  dataType: 'json'
});
},{"../index":16}],27:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '63382' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[27,5])
//# sourceMappingURL=/dist/0eaf72b4d0f0e4927de7bf731831f60a.map