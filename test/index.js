// import $ from '@pengliheng/jquery';
import $ from '../index';


$(document).ready(function () {
  $('ul').css('color', 'red');
  $('ul li').eq(2).click(() => {
    $('li').each((dom, i) => {
      $(dom).css('font-size', `${(i + 1) * 10}px`);
    });
  });
  console.log('ready', this);
  $.ajax({
    url: 'https://chat.pipk.top/graphql',
    type: 'POST',
    dataType: 'json',
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
      $('ul > li').eq(3).on('hover', function () {
        $(this).css('color', 'blue');
      });
    },
  });
});

