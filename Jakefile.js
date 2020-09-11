'use strict';
const { desc, file, directory, rule, task, FileList, Task } = require('jake');
const exec = require('child_process').execSync;
const http = require('http');
const { curl } = require('./lib_cjs/curl');

const SRCS = ['inbox.rho'];

directory(',deployed');

SRCS.forEach(src => {
  desc(`deploy ${src}`);
  task(`,deployed/${src}`, [src, ',deployed', 'shard'], async () => {
    console.log(await curl(`${shard.api}/status`, { http }));
  });
});

desc('deploy *.rho');
task('default', SRCS.map(src => `,deployed/${src}`), () => {
  console.log({ SRCS });
});

exports.shard = shard;
/**
 * See also https://github.com/rchain-community/rchain-docker-shard
 * https://github.com/rchain-community/liquid-democracy/issues/17
 * https://github.com/tgrospic/rnode-client-js
 */
function shard() {
  exec('docker-compose up -d', { cwd: 'docker-shard' });
}
shard.api = `http://127.0.0.1:40403`;
