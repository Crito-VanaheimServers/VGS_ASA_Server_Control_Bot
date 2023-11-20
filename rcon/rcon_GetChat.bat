%~dp0mcrcon.exe -H 127.0.0.1 -P 27020 -p Charlie2012 "GetChat">%~dp0rcon_GetChat.txt
for /f "usebackq tokens=* delims=" %%a in ("%~dp0rcon_GetChat.txt") do (echo(%%a)>>~.txt
move /y  ~.txt "%~dp0rcon_GetChat.txt"