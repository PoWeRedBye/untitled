const express = require("express");
const { AxiosTheAgent } = require("./src/AxiosControllerClass");

const app = new express();

app.use((request) => {
  AxiosTheAgent.setAccessToken(request.headers['x-access-token']);
});
