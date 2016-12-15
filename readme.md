#Tools and Utilities

This repo contains pieces of code that I use either frequently or only once.

Some .csx files require [scriptcs](http://scriptcs.net/), some work with just [csi](https://msdn.microsoft.com/en-us/magazine/mt614271.aspx)

* [Delete directories that match pattern](#scriptsdelete-directoriescsx)
* [Watch for file changes and copy updated files](#scriptsfile-automationcsx)
* [Enable and disable Fusion Log](#scriptsfusion-logcsx)

## Description and sample usage:

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