# code-executor Angular Frontend

This project provides a front-end for the Python Code Executor Environment for sandboxed Docker-container remote code execution provided in
the [edwardUL99/code-executor](https://github.com/edwardUL99/code-executor) repository. It is developed using Angular 13

A live deployment can be found at [Code Executor](https://code-executor.herokuapp.com)

## Build
Run `npm install` before any build steps to install any dependencies

Run `ng serve` for a quick-start development server and navigate to `http://localhost:4200/`. To run a production build, run `ng build --configuration=production && node server.js`. The production build sends code execution requests to a code execution back-end hossted at 
`https://code-executor-proxy.herokuapp.com` which proxies requests to an Amazon AWS EC2 instance with the docker images built. To route to
your own code executor back-end setup from the code-executor repository, change the `executor_url` property in `src/environments/environment.prod.ts` and build again.
