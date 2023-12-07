@echo off
@cls

@if not exist mcrcon.exe (
  @echo ERROR: Cannot find "mcrcon.exe". Bailing out!
  @echo.
  @pause
  @exit
)

@set /p host="Enter host (default: 127.0.0.1): "
@if "%host%"=="" set host=127.0.0.1

@set /p port="Enter port (default: 25575): "
@if "%port%"=="" set port=25575

@set /p passwd="Enter password: "
@if "%passwd%"=="" set passwd=

@echo.
mcrcon.exe -t -H %host% -P %port% -p %passwd%
@echo.

@set "host="
@set "port="
@set "passwd="

@pause

