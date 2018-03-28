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

      var module = cache[name] = new newRequire.Module;

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

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({3:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


(function (window, document, undefined) {
  // 获取数据类型
  const typeOf = arg => {
    const _result = Object.prototype.toString.call(arg);
    return _result.match(/(?<=\s)\w*/g)[0];
  };
  class Query {
    constructor(args) {
      const type = typeOf(args);
      console.log('type', type);
      if (type === 'String') {
        this.elements = Array.prototype.slice.call(document.querySelectorAll(args));
      } else if (type === 'HTMLLIElement' || type === 'HTMLDocument' || type === 'Window') {
        // 初始化dom
        this.elements = [args];
      }

      this.author = 'pengliheng';
      this.version = '0.0.1';
    }
    // 写方法
    css(key, val) {
      this.elements.forEach(dom => {
        dom.style[key] = val;
      });
      return this;
    }
    // 选择第i个元素
    eq(i) {
      this.elements = [this.elements[i]];
      return this;
    }
    // find,查找
    find(selector) {
      let newNode = [];
      this.elements.forEach(dom => {
        newNode = [...newNode, ...dom.querySelectorAll(selector)];
      });
      this.elements = newNode;
      return this;
    }
    attr(attr, val) {
      this.elements.forEach(dom => {
        if (attr.match(/data-/)) {
          dom.dataset[attr.match(/(?<=-)\w*/g)] = val;
        } else {
          dom[attr] = val;
        }
      });
      return this;
    }
    click(func) {
      this.elements.forEach(dom => {
        dom.addEventListener('click', e => func(e));
      });
      return this;
    }
    each(func) {
      this.elements.forEach((dom, i) => {
        func(dom, i);
      });
      return this;
    }
    ready(func) {
      document.addEventListener('DOMContentLoaded', () => {
        func.bind(this.elements[0])();
      });
      return this;
    }
    on(event, func) {
      if (event === 'hover') {
        this.elements.forEach(dom => {
          dom.addEventListener('mouseover', () => {
            const beforeStyle = dom.style;
            func.bind(dom)();
            dom.addEventListener('mouseout', () => {
              dom.style = beforeStyle;
            });
          });
        });
      } else {
        this.elements.forEach(dom => {
          dom.addEventListener(event, () => func.bind(dom)());
        });
      }
      return this;
    }
    append(html) {
      this.elements.forEach(dom => dom.innerHTML += html);
      return this;
    }
    html(html) {
      this.elements.forEach(dom => dom.innerHTML = html);
      return this;
    }

    typeof() {
      return this.elements.map(dom => {
        return Object.prototype.toString.call(dom).replace(/(\[object HTML)|(Element\])/g, '').toLocaleLowerCase();
      });
    }

    is(name) {
      return this.elements.map(dom => {
        return Object.prototype.toString.call(dom).replace(/(\[object HTML)|(Element\])/g, '').toLocaleLowerCase() === name;
      });
    }
  }
  const $ = selector => new Query(selector);
  // 用于写属性
  $.typeOf = typeOf;
  $.ajax = ({
    type, url, dataType, success, error, data
  }) => {
    fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: type,
      body: JSON.stringify(data)
      // credentials: 'include'
    }).then(res => res[dataType]()).then(suc => success(suc)).catch(err => error(err));
  };

  function stop() {
    return this;
  }

  window.$ = $;
  return $;
})(window, document, undefined);

exports.default = $;
},{}],2:[function(require,module,exports) {
"use strict";

var _index = require("../index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const by = (name, minor) => (o, p) => {
//   const a = o[name];
//   const b = p[name];

//   if (a === b) {
//     minor(o, p);
//   }
//   return a < b ? -1 : 1;
// };


(0, _index2.default)('ul').ready(() => {
  // $('ul').css('color', 'red');
  // $('ul li').eq(2).click(() => {
  //   $('li').each((dom, i) => {
  //     $(dom).css('color', `rgb(0,0,${i * 60})`);
  //   });
  // });
  // $.ajax({
  //   url: 'https://chat.pipk.top/graphql',
  //   type: 'POST',
  //   dataType: 'json',
  //   data: {
  //     query: `{
  //       search(query:"yinxin630" , type:USER,first:1){
  //         edges{
  //           node{
  //             ... on User{
  //               repositories(first:100){
  //                 nodes {
  //                   forkCount
  //                   createdAt
  //                   updatedAt
  //                   name
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }`,
  //   },
  //   error(err) {
  //     console.log(err);
  //   },
  //   success(json) {
  // $('ul li').on('click', function () {
  //   $(this).css('color', 'green');
  // });
  // $('ul li').on('hover', function () {
  //   $(this).css('color', 'yellow').css('font-size', '20px');
  // });
  // const Arr = json.data.search.edges[0].node.repositories.nodes;
  // const newArr = Arr.sort(by('createdAt', by('forkCount')));

  // newArr.forEach((arr) => {
  //   $('ul').append(`
  //     <li>
  //       <span>名字: ${arr.name}</span>
  //       <span>createdAt: ${arr.createdAt}</span>
  //       <span>forkCount: ${arr.forkCount}</span>
  //       <span>updatedAt: ${arr.updatedAt}</span>
  //     </li>
  //   `)
  //     .css('color', '#fff')
  //     .css('font-size', '30px')
  //     .css('font-weight', 'blod');
  // });
  // },
  // });
  console.log((0, _index2.default)('li').typeof());
}); // import $ from '@pengliheng/jquery';
},{"../index":3}],0:[function(require,module,exports) {
var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
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

if (!module.bundle.parent && typeof WebSocket !== 'undefined') {
  var ws = new WebSocket('ws://' + window.location.hostname + ':59048/');
  ws.onmessage = function(event) {
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
        window.location.reload();
      }
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
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
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
    return hmrAccept(global.require, id)
  });
}
},{}]},{},[0,2])