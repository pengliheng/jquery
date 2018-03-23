### jquery write by pengliheng


### 完成的任务
- [x] $.ajax
- [x] $('div').eq(index)
- [x] $('div').each(func)
- [x] $('div').attr('id','idName')
- [x] $('div').ready(function(){})
- [x] $('div').on('click',function(){})
- [x] $('div').css('font-size','13px')


### usage
```js
// 修改颜色
$('ul li').css('color', 'red').css('data-index','dataStore').
$('ul li').eq(2).click(() => {
  $('li').each((dom, i) => {    // dom就是被循环的元素，为$(dom)提供初始化该dom，第i个元素。
    $(dom).css('font-size', `${(i + 1) * 10}px`);
  });
});
$.ajax({
  url: 'https://chat.pipk.top/graphql',
  type: 'POST',
  data: {
    query: `{
      viewer{
        login
      }
    }`,
  },
  error(err) {
    console.log(err);
  },
  success(json) {
    console.log(json);
  },
  dataType: 'json',
});
```


## how to publish an Private package


do you wanna to publish your package like that??`@pengliheng/<package name>`?

- first step.
```
npm init --scope=<username>
```
- second step.
```
npm config set scope <username>
```
- third step.
```
npm publish --access=public
```
- finally , u can install package with below option
```
npm install @username/project-name --save
```


refrence: [14.How to Work with Scoped Packages](https://docs.npmjs.com/getting-started/scoped-packages)