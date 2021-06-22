import { fromEvent } from 'rxjs';
import { getComments, getPosts, getUsers } from './index'

let start: number = 0;
let limit: number = 10;

// grab DOM elements
const nextLink = document.querySelector('#next');
// create an observable of link click
const nextClick = fromEvent(nextLink, 'click');
// subscribe to event and fetch next 10 from stream on click

const subscription = nextClick.subscribe({
  // on successful emissions
  next: () => renderList(postStream, start, limit, ['created_at', 'ASC']),
  // on errors
  error: error => console.log(error),
  // called once on completion
  complete: () => console.log('complete!')
});

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

  if (feed && feed.length) {
    renderItems(feed, start, limit);
  }

  if (spinner) {
    spinner.remove();
  }
}

function fetchNext(feed: any, lastOut: number, limit: number) {
  start = lastOut + 1;
  renderList(feed, start, limit, ['created_at', 'ASC'])
};

function fetcPrev(feed: any, firstOut: number, limit: number) {
  start = (firstOut - 10 > 0) ? firstOut : 1;
  renderList(feed, start, limit, ['created_at', 'ASC'])
}

function renderItems(feed: any, start: number, limit: number) {

  const ul = document.querySelector('ul.img-list');
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

function renderDetailed(feed: any, start: number, limit: number, filter: string[]) {
}