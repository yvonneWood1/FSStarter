"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var div = document.querySelector('div');
var ul = document.createElement('ul');
var li = document.createElement('li');
var l2 = document.createElement('l2');
var h3 = document.createElement('h3');
var h4 = document.createElement('l4');
var postStream = index_1.getPosts().then(function (posts) {
    var data = posts.data;
    data.every(function (post) {
        var postId = post.id;
    });
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
    console.log('paint');
    var posts = new Array(feed.data[0]);
    //console.log(posts);
    posts.every(function (post) {
        // post.every(item => {
        // console.log("Single: " + post);
        div.textContent = "Big Title: :" + post.title;
        // posts.every(comment => {
        li.textContent = ('Id: :' + post.id + 'Body:' + post.body);
        // posts.every(user => {
        //   li.textContent.concat('userId: ' + user.id);
        div.appendChild(ul).appendChild(li);
    });
    function renderItem(feed, limit, filter) {
    }
    function renderDetailed(feed, limit, filter) {
    }
}
;
