"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var div = document.querySelector('div');
var start = 0;
var limit = 10;
var postStream = index_1.getPosts().then(function (posts) {
    var data = posts.data;
    limit = posts.limit;
    renderList(data, start, limit, ['created_at', 'ASC']);
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
//TODO : pagination, detailView, summary Data. e.g. number of posts
//TODO: logic to get female or male avatar/ based on userfeed data
function renderList(feed, start, limit, filter) {
    if (!start) {
        start = 0;
    }
    ;
    var posts = feed.slice(start, limit);
    var spinner = document.querySelector('#spinner');
    var ul = document.querySelector('ul');
    ul.className = 'list img-list';
    posts.forEach(function (post) {
        var li = document.createElement('li');
        var listDiv = document.createElement('div');
        var listDivInner = document.createElement('div');
        var listDivSub = document.createElement('div');
        var listBody = document.createElement('p');
        var listTitle = document.createElement('h3');
        var listLink = document.createElement('a');
        var thumbnail = document.createElement('img');
        thumbnail.className = 'li-img';
        thumbnail.src = './images/neutral.png';
        li.className = 'list';
        listTitle.textContent = "Big Title: :" + post.title;
        listBody.textContent = 'Body:' + post.body;
        listTitle.className = 'li-head';
        listDivSub.className = 'li-sub';
        listDivInner.className = 'li.text';
        listDivInner.appendChild(listTitle);
        listDivInner.appendChild(listDivSub).appendChild(listBody);
        listLink.href = 'detail.js?post.id= ' + post.id;
        li.appendChild(listLink).appendChild(listDiv).appendChild(thumbnail).append(listDivInner);
        listLink.appendChild(listDivInner);
        ul.appendChild(li);
    });
    spinner.remove();
}
function fetchNext(feed, limit, startId) {
    var posts = feed.filter(function (ev) { return ev.id <= limit; });
}
function fetcPrev(feed, limit, startId) {
    var posts = feed.filter(function (ev) { return ev.id <= limit; });
}
function renderItem(feed, limit, filter) {
}
function renderDetailed(feed, limit, filter) {
}
