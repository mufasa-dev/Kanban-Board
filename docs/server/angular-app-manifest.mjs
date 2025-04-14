
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/kanban/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/kanban"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5267, hash: 'a6c901ebd86c0e82ad3ae0aaa299c5c7b182284af7809fcdd0850095b60927fa', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1062, hash: 'fa9010039e0572cbccf76033f649ba4f4a13cdf4f37af284c9f0eab5cbaa1488', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 28920, hash: '3231d981326d1ef0fd58b8856a85dce492a27319488710b0fa3e350faabeb5b4', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-VE7M36B2.css': {size: 231002, hash: 'N3NLtpJwFZU', text: () => import('./assets-chunks/styles-VE7M36B2_css.mjs').then(m => m.default)}
  },
};
