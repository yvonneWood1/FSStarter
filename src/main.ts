import { map, reduce, takeWhile } from "rxjs/operators";
import { getPosts, getComments, getUsers } from './index';
import { from, asyncScheduler, Observable, observable } from 'rxjs';

const div = document.querySelector('div');

let ul = document.createElement('ul');
let li = document.createElement('li');

const feedType = new Array(["posts", "comments", "users"]);

getPosts().then((posts: any) => {
  console.log(posts);
  getComments().then((comments: any) => {
    posts.map(comments.id == posts.id).reduce((list: any) => {
      console.log(list);

      list.getUsers().then((users: any) => {
        users.map(comments.id == users.id).reduce((list: any) => {
          console.log(list);
          return list;
        });
      });
    });
  });
  paint(posts, feedType["posts"]);
});

function paint(feed: any, feedType: String) {
  console.log('paint');

  let posts = new Array(feed.data);

  console.log(posts);

  posts.every(post => {
    post.every(postItem => {
      div.textContent = "Big Title: :" + postItem.title;
      div.appendChild(div).appendChild(ul);
      posts.every(comment => {
        li.textContent = ("Title: :" + comment.title + 'Body:' + comment.body);
        posts.every(user => {
        });
      });
      ul.appendChild(ul);
    });
  });
}
