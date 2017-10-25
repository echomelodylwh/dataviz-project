

## Development

This project uses NPM and Webpack. To get started, clone the repository and install dependencies like this:

```
cd dataviz-project-template
npm install
```

You'll need to build the JavaScript bundle using WebPack, using this command:

```
npm run build
```

To see the page run, you'll need to serve the site using a local HTTP server.

```
npm install -g http-server
http-server
```

Now the site should be available at localhost:8080.

For automatic refreshing during development, you can start the Webpack Dev Server like this:

```
npm run serve
```

## Deployment

To deploy your project using GitHub Pages, first enable GitHub pages in the settings tab.

Each time you want to deploy a new version of the site, run the following commands:

```
npm run build
git add -f dist/bundle.js
git commit -m 'updated bundle'
git push
```

Be sure to also first install dependencies with

```
npm install
```
