// import $ from '@pengliheng/jquery';
import $ from '../index';


const by = (name, minor) => (o, p) => {
  const a = o[name];
  const b = p[name];

  if (a === b) {
    minor(o, p);
  }
  return a < b ? -1 : 1;
};


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
        search(query:"yinxin630" , type:USER,first:1){
          edges{
            node{
              ... on User{
                repositories(first:100){
                  nodes {
                    forkCount
                    createdAt
                    updatedAt
                    name
                  }
                }
              }
            }
          }
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
      const Arr = json.data.search.edges[0].node.repositories.nodes;
      const newArr = Arr.sort(by('createdAt', by('forkCount')));

      newArr.forEach((arr) => {
        $('ul').append(`
          <li>
            <span>名字: ${arr.name}</span>
            <span>createdAt: ${arr.createdAt}</span>
            <span>forkCount: ${arr.forkCount}</span>
            <span>updatedAt: ${arr.updatedAt}</span>
          </li>
        `)
          .css('color', '#fff')
          .css('font-size', '30px')
          .css('font-weight', 'blod');
      });
    },
  });
});

