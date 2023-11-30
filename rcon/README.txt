Name:     mcrcon (minecraft rcon)
Version:  0.7.2
Date:     31.10.2021

Description:
    mcrcon is console based Minecraft rcon client for remote administration and server maintenance scripts.

License:
    zlib/libpng License

Contact:
    WWW:  https://github.com/Tiiffi/mcrcon/
    MAIL: tiiffi+mcrcon at gmail

===================================================================================

Batch (.bat) scripts included in Windows binary package:

 launch.bat:
   Prompts user for server information and starts "mcrcon.exe" in terminal mode.
   
 create_shortcut.bat:
   Prompts user for server infromation and creates .bat launch script.

===================================================================================

Usage:
    mcrcon [OPTIONS] [COMMANDS]

    Send rcon commands to Minecraft server.

    Options:
      -H		Server address (default: localhost)
      -P		Port (default: 25575)
      -p		Rcon password
      -t		Terminal mode
      -s		Silent mode
      -c		Disable colors
      -r		Output raw packets
      -w		Wait for specified duration (seconds) between each command (1 - 600s)
      -h		Print usage
      -v		Version information

    Server address, port and password can be set with following environment variables:
      MCRCON_HOST
      MCRCON_PORT
      MCRCON_PASS

    - mcrcon will start in terminal mode if no commands are given
    - Command-line options will override environment variables
    - Rcon commands with spaces must be enclosed in quotes

    Example:
	    mcrcon -H my.minecraft.server -p password -w 5 "say Server is restarting!" save-all stop

===================================================================================

Changelog:

    0.7.2
     - Quit gracefully when Ctrl-D or Ctrl+C is pressed
     - Remove "exit" and "quit" as quitting commands
        * these are actual rcon commands on some servers
     - Suppress compiler warning (strncpy)
     - fix erroneous string length in packet building function
     - Fix typo in ANSI escape sequence for LCYAN
     - Make stdout and stderr unbuffered

    0.7.1
     - Deprecate `-i` flag for invoking terminal mode
     - Add workaround to prevent server-side bug.
       * https://bugs.mojang.com/browse/MC-154617

    0.7.0
     - Add `-w` option for rcon command throttling
       * Thanks HorlogeSkynet @ Github

    For more details: https://github.com/Tiiffi/mcrcon/blob/master/CHANGELOG.md

