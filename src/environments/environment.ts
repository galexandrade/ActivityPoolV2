// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  publicApiUrl: 'http://totvsjoi-hcm08.jv01.local:9090/task-manager/api/public/v1',
  apiUrl: 'http://totvsjoi-hcm08.jv01.local:9090/task-manager/api/v1',
  apiPool: 'http://totvsjoi-hcm08.jv01.local:9090/pool-reader/api/rest'
};
