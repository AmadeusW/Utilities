# Opens a file\directory given its alias

import os, yaml.serialization, tables, streams

let configDir = getConfigDir() & "utilities"
let configPath = configDir & DirSep & "locations.yaml"
var aliases = initTable[string, string](1)

if not existsDir(configDir):
    createDir(configDir)

if not existsFile(configPath):
    var emptyFile = newFileStream(configPath, fmWrite)
     # Note: Initial data (aliases) is incorrect and prevents this script from running
    dump(aliases, emptyFile)
    emptyFile.close()

var data = newFileStream(configPath, fmRead)
load(data, aliases)
data.close()

if paramCount() == 0 or paramStr(1) == "-h" or paramStr(1) == "-help" or paramStr(1) == "-?" or paramStr(1) == "--help":
    echo "Usage: "
    echo "Execute:          open [alias]"
    echo "List all aliases: open -l"
    echo "Print alias:      open -r [alias]"
    echo "Add alias:        open -a [alias] [path]"
    if (paramCount() == 1):
        echo "Configuration is stored at " & configPath

elif paramStr(1) == "-a":
    if (paramCount() != 3):
        echo "Usage: open -a [alias] [path]"
    doAssert paramCount() == 3
    aliases[paramStr(2)] = paramStr(3)
    data = newFileStream(configPath, fmWrite)
    dump(aliases, data)
    data.close()

elif paramStr(1) == "-l":
    for key, value in aliases.pairs:
        echo key & ": " & value

elif paramStr(1) == "-r":
    if (paramCount() != 2):
        echo "Usage: open -r [alias]"
    doAssert paramCount() == 2
    if aliases.contains(paramStr(2)):
        echo aliases[paramStr(2)]
    else:
        echo "No such alias: " & paramStr(2)

else:
    if (paramCount() != 1):
        echo "Usage: open [alias]"
    doAssert paramCount() == 1
    if aliases.contains(paramStr(1)):
        var nvm = execShellCmd("start " & aliases[paramStr(1)])
    else:
        echo "No such alias: " & paramStr(2)
