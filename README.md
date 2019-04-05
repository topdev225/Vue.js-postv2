# Futuri Post Programming Calendar

> See the Planning folder for in-depth details on the ideas and planning
> behind this application.

The build system was built with Node 5.x. and uses the Vue.js Webpack template structure, so it may be worth checking out their [guide](http://vuejs-templates.github.io/webpack/) for a good understanding of how the build system works.

The calendar system also uses the Vue.js Loader for webpack, so it is also worth checking out their [documentation](http://vuejs.github.io/vue-loader) on that as well.

## Build Setup

The Node environment uses Node v.5 and has a `.node-version` file setup in case you're using NVM/AVN. Otherwise, you can get started as usual:

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

If you would like to test it out with the API that was stubbed out in Node, you can do the following (in a terminal window separate from the one running your `npm run dev` command):
```bash
# server stubbed out node api on localhost:3000
node api-stub.js
```

To use the legacy styles without re-writing too much I decided to just copy the old `post.less` file as I needed to comment some things out. I have a few overrides beyond that in the `src/styles` directory, mainly for the button gradients which do not work in Firefox and Safari due to this version of bootstrap using a deprecated syntax.
```bash
# less build for backwards-compatible styles
# run this in current directory due to relative paths
../node_modules/less/bin/lessc ../less/post_lift.less ./src/styles/post.css
```

# login credentials for legacy post build
username: liftinteractive
password: login4lift!
post.futurimedia.com/ckuk/post.html

# testing databse and API
https://post.futurimedia.com/wphm/api/v1/
user: WPHM
password: mgdthecaddy
