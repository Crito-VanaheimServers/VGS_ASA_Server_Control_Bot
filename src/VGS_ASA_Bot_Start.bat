@echo off
SETLOCAL ENABLEDELAYEDEXPANSION


TITLE ASA %~1 Server Controller Bot

node src/register-commands.js
@cls
node src/index.js