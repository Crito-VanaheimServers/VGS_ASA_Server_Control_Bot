%~dp0mcrcon.exe -H 127.0.0.1 -P 27020 -p Charlie2012 "ListPlayers">%~dp0rcon_BotStatus.txt
for /f "usebackq tokens=* delims=" %%a in ("%~dp0rcon_BotStatus.txt") do (echo(%%a)>>~.txt
move /y  ~.txt "%~dp0rcon_BotStatus.txt"