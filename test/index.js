// import $ from '@pengliheng/jquery';
import $ from '../index';

$('ul').css('color', 'red');
$('ul li').eq(2).click(() => {
  $('li').each((dom, i) => {
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

