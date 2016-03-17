# secret-santa

This project uses npm for dependency management and to run scripts/commands (with the help of grunt behind the scenes)

### Projet setup:
- Install the secret-santa project :
```sh
npm install
```

### Commands:

- **Build** application for **development**
```sh
npm run webpack
#or
npm run webpack:dev
```

- **Build** application for **production**
```sh
npm run webpack:prod
```

- **Build** application for development and **launch development server**:
```sh
npm run webpack-dev-server
#development server is live at http://localhost:9090
```

- **Build** application for development and **watch** source folder for changes (sourcemaps won't work. Please prefer the dev server option):
```sh
npm run webpack:watch
```
