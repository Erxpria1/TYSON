#!/usr/bin/env node
require('dotenv').config();
const { spawn } = require('child_process');
const args = process.argv.slice(2);
const child = spawn('npx', ['expo', 'start', ...args], { stdio: 'inherit', shell: true });
child.on('exit', (code) => process.exit(code));
