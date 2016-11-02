using System;
using System.IO;

IList<string> EnumerateDirectories(string path, string pattern)
{
    try 
    {
        var dirs = Directory.EnumerateDirectories(path, pattern);
        dirs.All(n => { 
     
        });
        Console.WriteLine(n);
        return ; 
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.Message);
        return null;
    }
}

var dirs = Directory.EnumerateDirectories("C:\\", "*i*", SearchOption.AllDirectories);