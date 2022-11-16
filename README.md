# tonejs-react-starter

A small react (typescript) app that lets you trigger pitches on tone.js with minimal fuss.

It's NOT meant to be very flexible and the starter for any tone.js project in React.

![screenshot of react app](docs/screenshot.png)

# install and run

```
yarn
yarn start
```

# deploy

Adding it as a new Netlify site should Just Work, but here are the details:

From the project's root directory, running: 

```
yarn build
```

will build everything into a `dist` directory, which can be distributed.

That's the directory netlify / your web host will have to serve.