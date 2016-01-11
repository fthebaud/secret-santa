# secret-santa

This project uses npm for dependency management, and do run command (with the help of grunt behind the scenes)

### Projet setup:
- Please install globally the following node modules
```sh
# http-server
npm install -g http-server
```
```sh
# grunt command line interpreter
npm install -g grunt-cli
```

- Then install the secret-santa project (you have the be in the project's root directory) :
```sh
npm install
```

### Commands:

- Deploy the application locally in debug mode (without minification, concatenation, etc.) :
```sh
# Application will be live at http://localhost:9090/index.html
npm run serve:debug
```

- Deploy the application on a github page

 - solution 1 : Build the application, then manually copy the content of the dist directory in the gh-pages branch and push to remote.

 - solution 2 : Use a subtree. The drawback is that git has to know about your subtree, i.e. first we have to commit generated files in project's source control. To automatically push a new version after each commit, use a post-commit hook (see http://githooks.com/).
```sh
 git subtree push --prefix dist origin gh-pages
```
