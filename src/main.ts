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
  let posts = feed.slice(0, limit);
  const ul = document.querySelector('ul');

  posts.forEach((post: any) => {
    let li = document.createElement('li');
    li.textContent = ("Big Title: :" + post.title, 'Id: :' + post.id + 'Body:' + post.body);
    let thumbnail = document.createElement('img');
    thumbnail.src = './images/neutral.png';
    li.appendChild(thumbnail);
    ul.appendChild(li);
  });
}


// TODO: Achieve this Mark up pattern for List
// <li>
//     <a href="#" class="inner">
//       <div class="li-img">
//         <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/12005/balloon-sq1.jpg" alt="Hot air balloons" />
//       </div>
//       <div class="li-text">
//         <h3 class="li-head">Title of Content</h3>
//         <div class="li-sub">
//           <p>Summary of content.</p>
//         </div>
//       </div>
//     </a>
//   </li>
//   <li>

function fetchNext(feed: any, limit: number, startId: number) {
  let posts = feed.filter(ev => ev.id <= limit)
}

function renderItem(feed: any, limit: number, filter: string[]) {
}

function renderDetailed(feed: any, limit: number, filter: string[]) {
}