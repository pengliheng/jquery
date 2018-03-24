

(function (window,document,undefined) {
  // 获取数据类型
  const typeOf = (arg) =>{
    const _result = Object.prototype.toString.call(arg)
    return _result.match(/(?<=\s)\w*/g)[0];
  }
  class Query {
    constructor(args) {
      const type = typeOf(args)
      console.log('type',type);
      if(type==='String') {
        this.elements = document.querySelectorAll(args);
      }else if(type === 'HTMLLIElement'){
        this.elements = [args];
      }
      
      this.author = 'pengliheng';
      this.version = '0.0.1';
    }
    // 写方法
    css(key, val) {
      this.elements.forEach((dom) => { dom.style[key] = val; });
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
      this.elements.forEach((dom) => {
        newNode = [
          ...newNode,
          ...dom.querySelectorAll(selector),
        ];
      });
      this.elements = newNode;
      return this;
    }
    attr(attr, val) {
      this.elements.forEach((dom) => {
        if (attr.match(/data-/)) {
          dom.dataset[attr.match(/(?<=-)\w*/g)] = val;
        } else {
          dom[attr] = val;
        }
      });
      return this;
    }
    click(func) {
      this.elements.forEach(dom=>{
        dom.addEventListener('click',e=>func(e))
      })
      return this
    }
    each(func){
      this.elements.forEach((dom,i)=>{
        func(dom,i)
      })
      return this;
    }
    ready(func){
      console.log(this.elements);
      this.elements[0].addEventListener("DOMContentLoaded", (e)=>{
        (func.bind(e.target))();
      });
    }
    on(event,func){
      if(event==='hover'){
        this.elements.forEach(dom=>{
          dom.addEventListener('mouseover', e => {
            (func.bind(e.target))();
          });
        })
      } else {
        this.elements.forEach(dom=>{
          dom.addEventListener(event, e => {
            (func.bind(e.target))();
          });
        });
      }
    }
  }
  const $ = selector => new Query(selector);
  // 用于写属性
  $.typeOf = typeOf;
  $.ajax = ({
    type, url, dataType, success, error, data,
  }) => {
    fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: type,
      body: JSON.stringify(data),
      // credentials: 'include'
    })
      .then(res => res[dataType]())
      .then(suc => success(suc))
      .catch(err => error(err));
  };

  function stop() {
    return this
  }

  window.$ = $;
  return $;
}(window,document,undefined));

export default $;
