import { delay, filter, map, reduce, switchMap } from 'rxjs/operators';
import { Observable, ReplaySubject, Subscriber, using } from 'rxjs';

import { getComments, getPosts, getUsers } from './index'

const div = document.querySelector('div');
import { postList } from './model/postList';

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

//TODO : pagination, detailView, summary Data. e.g. number of posts
//TODO: logic to get female or male avatar/ based on userfeed data
//TODO: Loading messahe- replace with spinner and remove after render

function renderList(feed: any, limit: number, filter: string[]) {
  let posts = feed.slice(0, limit);
  const ul = document.querySelector('ul');

  posts.forEach((post: any) => {
    let li = document.createElement('li');
    let listDiv = document.createElement('div');
    let listDivInner = document.createElement('div');
    let listBody = document.createElement('p');
    let listTitle = document.createElement('h3');
    let listLink = document.createElement('a');

    let thumbnail = document.createElement('img');
    thumbnail.className = 'li-img';
    thumbnail.src = './images/neutral.png';

    listTitle.textContent = "Big Title: :" + post.title;
    li.textContent = 'Id: :' + post.id;
    listDivInner.appendChild(listTitle).appendChild(listBody).textContent = 'Body:' + post.body;
    listDivInner.appendChild(listBody).textContent = 'Body:' + post.body;
    listLink.href = 'detail.js?post.id= ' + post.id;

    li.appendChild(listLink).appendChild(listDiv).appendChild(thumbnail);
    li.appendChild(listDivInner);
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