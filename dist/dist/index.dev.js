"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsers = exports.getPosts = exports.getComments = void 0;

var _comments = _interopRequireDefault(require("./comments.json"));

var _posts = _interopRequireDefault(require("./posts.json"));

var _users = _interopRequireDefault(require("./users.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

sourceType: module;

var generateDelayTime = function generateDelayTime() {
  return Math.random() * 1500 + 100;
};

var getComments = function getComments() {
  return new Promise(function (resolve) {
    return setTimeout(function () {
      return resolve(_comments["default"]);
    }, generateDelayTime());
  });
};

exports.getComments = getComments;

var getPosts = function getPosts() {
  return new Promise(function (resolve) {
    return setTimeout(function () {
      return resolve(_posts["default"]);
    }, generateDelayTime());
  });
};

exports.getPosts = getPosts;

var getUsers = function getUsers() {
  return new Promise(function (resolve) {
    return setTimeout(function () {
      return resolve(_users["default"]);
    }, generateDelayTime());
  });
};

exports.getUsers = getUsers;