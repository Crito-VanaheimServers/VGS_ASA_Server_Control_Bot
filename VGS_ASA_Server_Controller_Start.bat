@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

TITLE VGS ASA Server Controller Bot

node src/register-commands.js
@cls
node src/index.js