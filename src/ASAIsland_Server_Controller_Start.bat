@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

TITLE ASA Island Server Controller Bot

node src/register-commands.js
@cls
node src/index.js