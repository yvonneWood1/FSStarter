"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var div = document.querySelector('div');
var l1 = document.createElement('div' ? 'className' : 'post');
var l2 = document.createElement('li');
var Post = /** @class */ (function () {
    function Post(id, user_id, title, body, created_at, updated_at) {
        this.id = id;
        this.user_id = user_id;
        this.title = title;
        this.body = body;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
    return Post;
}());
;
index_1.getPosts().then(function (posts) {
    paint(posts);
});
index_1.getComments().then(function (comments) {
    paint(comments);
});
index_1.getUsers().then(function (users) {
    paint(users);
});
// postList = getPosts().then((posts: Promise<any>) :any => {
//   map(({ user_id }) => user_id),
//     map(({ title }) => title),
//     map(({ body }) => body),
//     map(({ created_at }) => created_at),
//     map(({ updated_at }) => updated_at)
//   l1.textContent = posts[0].title;
//   div.appendChild(l1);
//   return posts;
// });
// const posts = getPosts().then((posts: Promise<any>) => {
//   posts.
//     map(({ id }) => id),
//     map(({ user_id }) => user_id),
//     map(({ title }) => title),
//     map(({ body }) => body),
//     map(({ created_at }) => created_at),
//     map(({ updated_at }) => updated_at)
// });
function paint(feed) {
    console.log('paint');
    var posts = new Array(feed.data);
    console.log(posts);
    posts.every(function (post) {
        post.every(function (postItem) {
            l1.textContent = "Title: :" + postItem.title;
            div.appendChild(l1);
            l2.textContent = ('Body:' + postItem.body);
            l1.appendChild(l2);
        });
    });
}
