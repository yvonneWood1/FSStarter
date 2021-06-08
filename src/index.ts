import comments from "./data/comments.json";
import posts from './data/posts.json';
import users from './data/users.json';

comments.repo;
posts.repo;
users.repo;

const generateDelayTime = () => Math.random() * 1500 + 100;

export const getComments = () => new Promise((resolve) => setTimeout(() => resolve(comments), generateDelayTime()));
export const getPosts = () => new Promise((resolve) => setTimeout(() => resolve(posts), generateDelayTime()));
export const getUsers = () => new Promise((resolve) => setTimeout(() => resolve(users), generateDelayTime()));
