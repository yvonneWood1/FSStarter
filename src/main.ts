import { map, takeWhile } from "rxjs/operators";
import { getPosts, getComments, getUsers } from './index';
import { from, asyncScheduler, Observable, observable } from 'rxjs';

const div = document.querySelector('div');

let l1 = document.createElement('div' ? 'className' : 'post');
let l2 = document.createElement('li');

class Post {
  constructor(
    public id: number,
    public user_id: string,
    public title: string,
    public body: string,
    public created_at: Date,
    public updated_at: Date
  ) { }
};

getPosts().then((posts) => {
  paint(posts);
});

getComments().then((comments) => {
  paint(comments);
});

getUsers().then((users) => {
  paint(users);
});


// postList = getPosts().then((posts: Promise<any>) :any => {
//   map(({ user_id }) => user_id),
//     map(({ title }) => title),
//     map(({ body }) => body),
//     map(({ created_at }) => created_at),
//     map(({ updated_at }) => updated_at)
//   l1.textContent = posts[0].title;
//   div.appendChild(l1);
//   return posts;
// });

// const posts = getPosts().then((posts: Promise<any>) => {
//   posts.
//     map(({ id }) => id),
//     map(({ user_id }) => user_id),
//     map(({ title }) => title),
//     map(({ body }) => body),
//     map(({ created_at }) => created_at),
//     map(({ updated_at }) => updated_at)
// });
function paint(feed: any): any {
  console.log('paint');

  let posts = new Array(feed.data);

  console.log(posts);

  posts.every(post => {
      post.every(postItem => {
        l1.textContent = "Title: :" + postItem.title;
        div.appendChild(l1);
        l2.textContent = ('Body:' + postItem.body);
        l1.appendChild(l2);

      });
  });
}
