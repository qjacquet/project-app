// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    hmr       : false,

    server    : 'http://localhost:3000',

    auth0 : {
        clientID: '__AUTH0_CLIENT_ID__',
        domain: '__AUTH0_NAMESPACE__',
        audience: 'https://__AUTH0_NAMESPACE__/userinfo',
    }
};
