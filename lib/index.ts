#!/usr/bin/env ts-node
const yargs = require('yargs');
// import * as yargs from 'yargs';

import { init, connect, list, create, up, down } from './cli'

const id = (e: any) => e


yargs
.command('init', 'Initalize the migrations in a project', id, init)
.command('connect <connection-string>', 'Connect migratum to a database', id, (args: any) => connect(args['connection-string']))
.command('list', 'List migrations and their status', id, list)
.command('create <name>', 'Create a new migration', id, ({name}: any) => create(name))
.command('up [migration]', 'Migrate up to a given migration', id, ({ migration }: any) => up(migration))
.command('down <migration>', 'Migrate down to a given migration', id, ({ migration }: any) => down(migration))
.strict()
.help(false)
.version(false)
.demandCommand()

yargs.parse()