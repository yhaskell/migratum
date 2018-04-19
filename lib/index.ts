#!/usr/bin/env ts-node
const yargs = require('yargs');
// import * as yargs from 'yargs';

import { init, connect, list, create, up, down } from './cli'

const idFunc = (e: any) => e


yargs
.command('init', 'Initalize the migrations in a project', idFunc, init)
.command('connect <url>', 'Connect migratum to a database', idFunc, ({url}: any) => connect(url))
.command('list', 'List migrations and their status', idFunc, list)
.command('create <name>', 'Create a new migration', idFunc, ({name}: any) => create(name))
.command('up [migration]', 'Migrate up to a given migration', idFunc, ({ migration }: any) => up(migration))
.command('down <migration>', 'Migrate down to a given migration', idFunc, ({ migration }: any) => down(migration))
.strict()
.help(false)
.version(false)
.demandCommand()

yargs.parse()