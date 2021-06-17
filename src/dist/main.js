"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var div = document.querySelector('div');
var l2 = document.createElement('l2');
var h3 = document.createElement('h3');
var h4 = document.createElement('l4');
var postStream = index_1.getPosts().then(function (posts) {
    var data = posts.data;
    renderList(data, 10, ['created_at', 'ASC']);
});
var commentStream = index_1.getComments().then(function (response) {
    var comments = response.data;
    comments.every(function (comment) {
        var postCommentId = comment.postId;
        var postCommentUserId = comment.userId;
        //comments.pipe(filter(ev => postCommentId === postId));
    });
});
var userStream = index_1.getUsers().then(function (response) {
    var users = response.data;
    users.every(function (user) {
        var userId = user.id;
        // users.pipe(filter(ev => userId === postCommentUserId));
        // users.subscribe(userId => console.log("userId:", userId));
    });
});
function renderList(feed, limit, filter) {
    var posts = feed.slice(0, limit);
    var ul = document.querySelector('ul');
    posts.forEach(function (post) {
        var li = document.createElement('li');
        li.textContent = ("Big Title: :" + post.title, 'Id: :' + post.id + 'Body:' + post.body);
        var thumbnail = document.createElement('img');
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
function fetchNext(feed, limit, startId) {
    var posts = feed.filter(function (ev) { return ev.id <= limit; });
}
function renderItem(feed, limit, filter) {
}
function renderDetailed(feed, limit, filter) {
}
