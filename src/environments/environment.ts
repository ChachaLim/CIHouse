// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDP3EqnB0XwStxsEWmcPlplGLcLM_9hcqU",
    authDomain: "airbnb-bench.firebaseapp.com",
    databaseURL: "https://airbnb-bench.firebaseio.com",
    projectId: "airbnb-bench",
    storageBucket: "airbnb-bench.appspot.com",
    messagingSenderId: "80321094993"
  }
};