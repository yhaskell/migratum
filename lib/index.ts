#!/usr/bin/env ts-node
const yargs = require('yargs');
// import * as yargs from 'yargs';

import { init, list, create, up, down } from './cli'

const id = (e: any) => e


yargs
.command('init', 'Initalize the migrations in a project', id, init)
.strict()
.help(false)
.version(false)
.demandCommand()

yargs.parse()