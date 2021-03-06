# Scripts

[Go back to repo home](https://github.com/AmadeusW/utilities)

Featuring:
* [mkgit - mkdir on steroids](#scriptsmkgitsh)
* [git-alias - my essential git aliases](#scriptsgit-aliascmd)
* [getignore - download the right .gitignore](#scriptsgetignoresh)
* [open - simple aliases](#scriptsopennim)

Also starring:
* [Gets duplicate directories in two paths](#scriptsgetduplicatedirsnim)
* [Normalizes BenchmarkDotNet csv output](#scriptsnormalize-csvpy)
* [Delete directories that match pattern](#scriptsdelete-directoriescsx)
* [Watch for file changes and copy updated files](#scriptsfile-automationcsx)
* [Enable and disable Fusion Log](#scriptsfusion-logcsx)

## Description and sample usage - my favs

### scripts\mkgit.sh

mkdir on steroids: Creates a directory, and within it: initializes git repo, creates src\ and readme.md, downloads a .gitignore file for the specified language from [GitHub's gitignore repository](https://github.com/github/gitignore)

```
mkgit myproject Rust
```

---

### scripts\git-alias.cmd
Brings my favorite git aliases

_Comes in handy on a freshly installed OS_

The ones I use a lot:

* `git st` shows status in a minimal format
* `git put "commit message"` commits all unstaged files in single command
* `git last` shows details of the last commit
* `git diffs` shows diff of staged changes - `diff --cached`
* `git diffl` shows diff of the commit - `diff HEAD HEAD~`
* `git d` shows diff of the working tree, followed by minimal status
* `git ls` shows a concise and abundant log
* `git please` is `push --force-with-lease`

---

### scripts\getignore.sh

Downloads a .gitignore file for the specified language from [GitHub's gitignore repository](https://github.com/github/gitignore) and renames it to `.gitignore`

Note: Online repository uses PascalCase to specify the gitignore file.

```
getignore Node
```

on Windows, use the Linux subsystem
```
bash getignore VisualStudio
```

---

### scripts\open.nim

Use shortcuts to access files

Param -a records the alias
```
> open -a dl C:\users\ama\Downloads
> open -a utilities /mnt/c/src/utilities
> open -a dosbox %localappdata%\DOSBox\dosbox-0.74.conf
```
Param -r prints alias' target
```
> open -r utilities
/mnt/c/src/utilities
```
Param -l lists aliases

Without parameters, the alias is executed
```
> open dosbox
(text editor opens the file)
> open dl
(explorer opens the directory)
```

---

## Description and sample usage - scripts for specific tasks

### scripts\getDuplicateDirs.nim

Finds subdirectories in the two trees that contain files with the same name. Useful to find duplicates when merging music collections.

```
getDuplicateDirs /path/one /path/two
```

---

### scripts\normalize-csv.py
Normalizes magnitude of values in specified column of a CSV file, 
removes unit and places it in the column header.

_BenchmarkDotNet 0.10.1 produces .csv files that can't be easily analyzed in software_

Sample:
```
python .\normalize-csv.py "D:\sample.csv" Mean
```
Turns
```
...,Mean,...
...,0.987 s,...
...,"1,234 ms",...
....512.32 ms,...
```
into
```
...,Mean [ms],...
...,987,...
...,1234,...
....512.32,...
```

---

### scripts\delete-directories.csx
Deletes (after receiving confirmation) all directories inside `path` that contain any of the elements of the `pattern` 

Sample:
```csharp
#load delete-directories.csx
DeleteDirectories("H:\\Premiere", new List<string>
{
    "Adobe Premiere Pro Auto-Save",
    "Adobe Premiere Pro Preview Files"
});
```

---

### scripts\file-automation.csx
Watches for file changes and copies modified files. 

Optionally executes a custom `Action` afterwards.

_I use it to copy build output to a remote share, and again from there to a remote desktop. After copying to a remote desktop, I start a `Process` that does extra work_

Sample:
```csharp
#load file-automation.csx
var hostPattern = new List<CopyOrder>
{
    new CopyOrder(@"C:\file1.txt", @"\\share\file1.txt"),
    new CopyOrder(@"C:\file2.txt", @"\\share\file2.txt"),
};
FileProcessor.Start(hostPattern);
```
```csharp
#load file-automation.csx
var clientPattern = new List<CopyOrder>
{
    new CopyOrder(@"\\share\file1.txt", @"D:\file1.txt", () => { /* file1 custom action */ }),
    new CopyOrder(@"\\share\file2.txt", @"D:\file2.txt", () => { /* file2 custom action */ }),
};
FileProcessor.Start(clientPattern);
```
To force-copy files when the script starts, use `FileProcessor.Start(pattern, force: true);` 

---

### scripts\fusion-log.csx
Enables or disables the Fusion Log capabilities.
Stores logs in `%temp%\FusionLog`

_Fusion Log is heavy on resources, so I keep it enabled only when I need it._

Sample:
Run VS developer command prompt *as administrator*

To toggle Fusion Log:
```
csi "D:\Utilities\scripts\fusion-log.csx"
```

To explicitly enable Fusion Log:
```
csi "D:\Utilities\scripts\fusion-log.csx" 1
```

To explicitly disable Fusion Log:

```
csi "D:\Utilities\scripts\fusion-log.csx" 0
```

---
