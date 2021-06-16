import { delay, filter, map, reduce, switchMap } from 'rxjs/operators';
import { Observable, ReplaySubject, Subscriber, using } from 'rxjs';

import { getComments, getPosts, getUsers } from './index'

const div = document.querySelector('div');
import { postList } from './model/postList';

let l2 = document.createElement('l2');
let h3 = document.createElement('h3');
let h4 = document.createElement('l4');

const postStream = getPosts().then((posts: any) => {
  let data = posts.data;
  renderList(data, 10, ['created_at', 'ASC'])
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

function renderList(feed: any, limit: number, filter: string[]) {
  console.log('paint');

  let posts = feed.slice(0, limit);
  const ul = document.querySelector('ul');

  //console.log(posts);


  posts.forEach((post: any) => {
    // post.every(item => {
    // console.log("Single: " + post);
    
    // posts.every(comment => {
    let li = document.createElement('li');

    li.textContent = ("Big Title: :" + post.title, 'Id: :' + post.id + 'Body:' + post.body);

    // posts.every(user => {
    //   li.textContent.concat('userId: ' + user.id);
    ul.appendChild(li);
    console.log(li.textContent);
  });
}


function fetchNext(feed: any, limit: number, startId: number) {
  let posts = feed.filter(ev => ev.id <= limit)
}

function renderItem(feed: any, limit: number, filter: string[]) {
}

function renderDetailed(feed: any, limit: number, filter: string[]) {
}