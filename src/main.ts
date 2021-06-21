import { delay, filter, map, reduce, switchMap } from 'rxjs/operators';
import { Observable, ReplaySubject, Subscriber, using } from 'rxjs';

import { getComments, getPosts, getUsers } from './index'

const div = document.querySelector('div');
import { postList } from './model/postList';

let start: number = 0;
let limit: number = 10;

const postStream = getPosts().then((posts: any) => {
  let data = posts.data;
  limit = posts.limit;
  renderList(data, start, limit, ['created_at', 'ASC'])
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

//TODO : pagination, detailView, summary Data. e.g. number of posts
//TODO: logic to get female or male avatar/ based on userfeed data


function renderList(feed: any, start: number, limit: number, filter: string[]) {
  const spinner = document.querySelector('#spinner');  
  renderItems(feed);
  spinner.remove();
}  

function fetchNext( feed: any, limit: number, startId: number) {
  let posts = feed.filter(ev => ev.id <= limit)
}

function fetcPrev( feed: any, limit: number, startId: number) {
  let posts = feed.filter(ev => ev.id <= limit)
}

function renderItems(feed: any) {

  const ul = document.querySelector('ul');
  ul.className = 'list img-list';
  // Clear any prev items from list
  ul.innerHTML = "";
  
  if (!start) { start = 0 };
  if (!limit) { limit = 10 };
  let posts = feed.slice(start, limit);

  posts.forEach((post: any) => {
    let li = document.createElement('li');
    let listDiv = document.createElement('div');
    let listDivInner = document.createElement('div');
    let listDivSub = document.createElement('div');
    let listBody = document.createElement('p');
    let listTitle = document.createElement('h3');
    let listLink = document.createElement('a');

    let thumbnail = document.createElement('img');
    thumbnail.className = 'li-img';
    thumbnail.src = './images/neutral.png';

    li.className = 'list';

    listTitle.textContent = "Big Title: :" + post.title;
    listBody.textContent = 'Body:' + post.body;
    listTitle.className = 'li-head';
    listDivSub.className = 'li-sub';
    listDivInner.className = 'li.text'

    listDivInner.appendChild(listTitle);
    listDivInner.appendChild(listDivSub).appendChild(listBody);
    listLink.href = 'detail.js?post.id= ' + post.id;

    li.appendChild(listLink).appendChild(listDiv).appendChild(thumbnail).append(listDivInner);
    listLink.appendChild(listDivInner);
    ul.appendChild(li);
  });
};

function renderDetailed(feed: any, limit: number, filter: string[]) {
}