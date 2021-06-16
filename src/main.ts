import { delay, filter, map, reduce, switchMap } from 'rxjs/operators';
import { Observable, ReplaySubject, Subscriber, using } from 'rxjs';

import { getComments, getPosts, getUsers } from './index'

const div = document.querySelector('div');
import { postList } from './model/postList';

let ul = document.createElement('ul');
let li = document.createElement('li');
let l2 = document.createElement('l2');
let h3 = document.createElement('h3');
let h4 = document.createElement('l4');

const postStream = getPosts().then((posts:any) => {
  let data = posts.data;
  data.every((post: any) => {
    let postId: any = post.id;
  })
});

const commentStream = getComments().then((response: any) => {
  let comments = response.data;
  comments.every((comment: any) => {
    let postCommentId: any = comment.postId;
    let postCommentUserId = comment.userId;

    //comments.pipe(filter(ev => postCommentId === postId));
  });
});

const userStream = getUsers().then((response: any) => {
  let users = response.data;
  users.every((user): any => {
    let userId = user.id;
    // users.pipe(filter(ev => userId === postCommentUserId));
    // users.subscribe(userId => console.log("userId:", userId));
  });
});

function renderList(feed: any, limit: number, filter: string[] ) {
  console.log('paint');

  let posts = new Array(feed.data[0]);


  //console.log(posts);

  posts.every(post => {
    // post.every(item => {
    // console.log("Single: " + post);
    div.textContent = "Big Title: :" + post.title;

    // posts.every(comment => {
    li.textContent = ('Id: :' + post.id + 'Body:' + post.body);

    // posts.every(user => {
    //   li.textContent.concat('userId: ' + user.id);
    div.appendChild(ul).appendChild(li);
 
  });

  function renderItem(feed: any, limit: number, filter: string[]) {
  }

  function renderDetailed(feed: any, limit: number, filter: string[]) {
  }
};
