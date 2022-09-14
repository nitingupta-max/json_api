const express = require("express");
const route = express.Router();
const fetch = require("node-fetch");

const url = "https://jsonplaceholder.typicode.com/todos";
exports.todos = (req, res) => {
  const fetchApi = async () => {
    const response = await fetch(url);

    const resj = await response.json();
    const resjson = resj; // copy orginal data into resjson

    for (let [key, value] of Object.entries(resjson)) {
      delete value.userId;
    }

    res.send(resjson);
  };

  fetchApi();
};

exports.user = (req, res) => {
  const { id } = req.params;
  const URL = `https://jsonplaceholder.typicode.com/users/${id}`;
  const fetchApi = async () => {
    // fetch users API
    const response = await fetch(URL);
    const resj = await response.json();
    const resjson = resj; // copy original data to resjson

    //  fetch TODOS API
    const response2 = await fetch(url);
    const resjson2 = await response2.json();

    const del = ["address", "website", "company", "username"];
    // delete unwanted data

    for (let i = 0; i < del.length; i++) {
      delete resjson?.[del[i]];
    }

    const todos = [];

    // find todos
    for (let [key, value] of Object.entries(resjson2)) {
      if (value.userId == resjson.id) {
        todos.push(value);
      }
    }

    // combining both resjson and todos
    const combined = { ...resjson, todos };

    res.send(combined);
  };

  fetchApi();
};
