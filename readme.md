Tools and Utilities
===

Perpetually work in progress, this repo contains pieces of code that help me in one way or another.


scripts\delete-directories.csx
---
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

scripts\file-automation.csx
---
Watches for file changes and copies modified files. Optionally, executes a custom `Action` afterwards.

Sample:
```csharp
#load file-automation.csx
var hostPattern = new List<CopyOrder>
{
    new CopyOrder(@"C:\file1.txt", @"\\share\file1.txt"),
    new CopyOrder(@"C:\file2.txt", @"\\share\file2.txt"),
};
CopyOrder.Start(hostPattern);
```
```csharp
#load file-automation.csx
var clientPattern = new List<CopyOrder>
{
    new CopyOrder(@"\\share\file1.txt", @"D:\file1.txt", () => { /* file1 custom action */ }),
    new CopyOrder(@"\\share\file2.txt", @"D:\file2.txt", () => { /* file2 custom action */ }),
};
CopyOrder.Start(clientPattern);
```