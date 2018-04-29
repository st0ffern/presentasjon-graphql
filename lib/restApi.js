const fetch = require("node-fetch");
const Dataloader = require("dataloader");

const getUrlInJSON = (url) => {
	console.log("HTTP: https://jsonplaceholder.typicode.com/"+url)
	return fetch("https://jsonplaceholder.typicode.com/"+url)
	.then(res => res.json())
}

const getUsers = () => {
	return getUrlInJSON("users");
}
const getUser = (id) => {
	return getUrlInJSON("users/"+id);
}
const getPosts = () => {
	return getUrlInJSON("posts");
}
const getPost = (id) => {
	return getUrlInJSON("psots/"+id);
}

module.exports = {
	getUsers: getUsers,
	getUser: getUser,
	getPosts: getPosts,
	getPost: getPost,
}