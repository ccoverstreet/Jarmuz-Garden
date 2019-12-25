# Jarmuz-Garden
## Server-side component of Jarmuz


Jarmuz Garden is the server portion of Jarmuz that handles package requests and returns packages containing the program json metadata and start scripts.

# Package Format
Each program is its own git repository. Jarmuz simply provides a quick way of installing the package with premade start scripts and build directions. 

Each package has a json file containing metadata:
```Javascript
{
	"name": "ccoverstreet/CIS",
	"version": 2.0,
	"scriptname_unix": "CIS",
	"scriptname_windows": "CIS.bat",
	"sourcerepo": "https://github.com/ccoverstreet/CIS",
	"build_directions": "make"
}
```

The name of the package should be the full name of the git repository and the server-side storage file structure uses the full name of the repo. The client-side also uses the full name as a sort of path to clone each repo in a ".jarmuz/sources" directory. In the root install directory, jarmuz will place either the scriptname_unix file or the scriptname_windows file depending on OS. Once a user adds the root directory of Jarmuz to their system PATH, jarmuz commands and programs can be used as simple terminal commands. 

# Project Goals

The goal of this project is to make installing git programs easier, more manageable, and more accessible. By adding more premade packages to the server-side, Jarmuz will become more robust as a sort of git package manager. 
