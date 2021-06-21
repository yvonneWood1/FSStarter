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
    var spinner = document.querySelector('#spinner');
    if (feed && feed.length) {
        renderItems(feed);
    }
    if (spinner) {
        spinner.remove();
    }
}
function fetchNext(feed, lastOut, limit) {
    start = lastOut + 1;
    renderList(feed, start, limit, ['created_at', 'ASC']);
}
;
function fetcPrev(feed, firstOut, limit) {
    start = (firstOut - 10 > 0) ? firstOut : 1;
    renderList(feed, start, limit, ['created_at', 'ASC']);
}
function renderItems(feed) {
    var ul = document.querySelector('ul.img-list');
    // Clear any prev items from list
    ul.innerHTML = "";
    if (!start) {
        start = 0;
    }
    ;
    if (!limit) {
        limit = 10;
    }
    ;
    var posts = feed.slice(start, limit);
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
}
;
function renderDetailed(feed, start, limit, filter) {
}
