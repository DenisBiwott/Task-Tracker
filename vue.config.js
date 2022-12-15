const { defineConfig } = require('@vue/cli-service');

// This is the API from which the tasks are fetched.

/*
You can use any of these:
  - Cloning the API from here:// https://github.com/DenisBiwott/Task-Tracker-API and running locally.
  - Using an instance of the above API hosted on cyclic here: https://puce-kingfisher-tutu.cyclic.app/tasks/ 
    by addng the URL without the trailing 'tasks/' to an env file. ( Simple but could get outdated )
  - Using `json-server` a 'fake' backend by installing it globally using `npm i -g json-server` and running it: `npm run backend` (The simplest)
*/

const tasks_api = process.env.TASKS_API || 'http://localhost:3000/';

console.log(`API Serving tasks is ${tasks_api}`);

module.exports = {
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
        // Target API backend hosted in cyclic
        target: tasks_api,
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api': '/' },
      },
    },
  },
};
