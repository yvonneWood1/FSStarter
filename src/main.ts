import { fromEvent } from 'rxjs';
import { getComments, getPosts, getUsers } from './index'

class Posts {

  start: number;
  limit: number;
  filter: Array<any>

  constructor() {
    this.start = 1;
    this.limit = 20;
    this.filter = ['created_at', 'ASC'];
  }
}

let nextLink = document.querySelector('#next');// create an observable of link click
let prevLink = document.querySelector('#prev');// create an observable of link click
let nextClick = fromEvent(nextLink, 'click');
let prevClick = fromEvent(prevLink, 'click');

let postModel = new Posts();
let start = postModel.start;
let limit = postModel.limit;
let filter = postModel.filter;
let nextStart = start + limit as number;
let feedData: any = undefined;
let feedMeta: any = undefined;

const postStream = getPosts().then((posts: any) => {
  feedData = posts.data;
  feedMeta = posts.meta;
  limit = feedMeta.pagination.limit;
  start = feedMeta.pagination.page - 1;
  renderList(feedData, start, limit, ['created_at', 'ASC'])
});

const commentStream = getComments().then((comments: any) => {
  let commentsData = comments.data;
  commentsData.every((comment: any) => {
    let postCommentId: any = comment.postId;
    let postCommentUserId = comment.userId;
    //comments.pipe(filter(ev => postCommentId === postId));
  });
});

const userStream = getUsers().then((users: any) => {
  let usersData = users.data;
  usersData.every((user): any => {
    let userId = user.id;
    // users.pipe(filter(ev => userId === postCommentUserId));
    // users.subscribe(userId => console.log("userId:", userId));
  });
});

const nextListener = nextClick.subscribe({
  // on successful emissions
  next: () => {
    fetchNext(feedData, nextStart, limit, filter);
    // console.log('nextStart:' + nextStart);
    nextStart += limit;
    if (nextStart > feedData.length) {
      // if lastPage of results
      nextLink.parentElement.classList.remove('active');
      nextLink.parentElement.classList.add('disabled');
    }
    prevLink.parentElement.classList.remove('disabled');
    prevLink.parentElement.classList.add('active');
},
  // on errors
  error: error => console.log(error),
  // called once on completion
  complete: () => console.log('complete!')
});

const prevListener = prevClick.subscribe({
  // on successful emissions
  //Next is Prev in this case.
  next: () => {
    nextStart = nextStart - limit;
    fetchNext(feedData, nextStart, limit, filter);
    // console.log('nextStart:' + nextStart);
    if (nextStart < 1) {
      // if lastPage of results
      prevLink.parentElement.classList.remove('active');
      prevLink.parentElement.classList.add('disabled');
    }
    nextLink.parentElement.classList.remove('disabled');
    nextLink.parentElement.classList.add('active');
},
  // on errors
  error: error => console.log(error),
  // called once on completion
  complete: () => console.log('complete!')
});

//TODO : pagination, detailView, summary Data. e.g. number of posts
//TODO: logic to get female or male avatar/ based on userfeed data

function renderList(feed: any, start: number, limit: number, filter: string[]) {
  const spinner = document.querySelector('#spinner');

  renderItems(feed, start, limit);

  if (spinner) {
    spinner.remove();
  }
}

function fetchNext(feed: any, start: number, limit: number, filter: any) {
  renderList(feed, start, limit, filter)
};

function fetcPrev(feed: any, firstOut: number, limit: number, filter: any) {
  start = (firstOut - limit > 0) ? firstOut : 1;
  renderList(feed, start, limit, filter);
}

function renderItems(feed: any, start: number, limit: number) {

  const ul = document.querySelector('ul.img-list');
  // If we are on the last page of results, disable the  Next Link

  // Clear any prev items from list
  ul.innerHTML = "";

  feed.forEach((post: any) => {
    if (post.id >= start && post.id <= start + limit) {
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

      listTitle.textContent = "Big Title" + post.id, ":" + post.title;
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
    }
  });
};

function renderDetailed(feed: any, start: number, limit: number, filter: string[]) {
}