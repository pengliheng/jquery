// import $ from '@pengliheng/jquery';
import $ from '../index';

$('ul').ready(() => {
  $('ul').css('color', 'red');
  $('ul li').eq(2).click(() => {
    $('li').each((dom, i) => {
      $(dom).css('color', `rgb(0,0,${i * 60})`);
    });
  });
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
      $('ul li').on('click', function () {
        $(this).css('color', 'green');
      });
      $('ul li').on('hover', function () {
        $(this).css('color', 'yellow').css('font-size', '20px');
      });
    },
  });
});

