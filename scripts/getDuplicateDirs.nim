# Finds duplicate directories in two locations
# Usage:  nim c -r .\getDuplicateDirs.nim "\location\one" "\location\two"
import os
doAssert paramCount() == 2
for kind1, path1 in walkDir(paramStr(1)):
    if kind1 == pcDir:
        for kind2, path2 in walkDir(paramStr(2)):
            if kind2 == pcDir:
                if path1.extractFilename == path2.extractFilename:
                    echo("\"" & path1 & "\" & \"" & path2 & "\"")
