using System;
using System.IO;
using System.Linq;

/// <summary>
/// Deletes directories inside {path} that have {pattern} in the name.
/// 
/// Usage:
/// DeleteDirectories("H:\\Premiere", new List<string>
/// {
///    "Adobe Premiere Pro Auto-Save",
///    "Adobe Premiere Pro Preview Files"
/// });
/// </summary>
/// <param name="path"></param>
/// <param name="pattern"></param>
void DeleteDirectories(string path, IEnumerable<string> pattern)
{
    try 
    {
        var candidates = Directory.EnumerateDirectories
            ("H:\\Premiere", "*", SearchOption.AllDirectories)
            .Where(d => pattern.Any(p => d.Contains(p)));

        var count = candidates.Count();
        if (count == 0)
        {
            Console.WriteLine($"Found no directories in {path} that match given patterns");
        }
        Console.WriteLine($"Found {count} directories that match the pattern:");
        foreach (var candidate in candidates)
        {
            Console.WriteLine(candidate);
        }
        Console.WriteLine("Input [Y] to remove these directories.");
        var input = Console.ReadLine();
        if (input.ToLower() != "y")
        {
            return;
        }
        foreach (var candidate in candidates)
        {
            Directory.Delete(candidate, true);
        }
        Console.WriteLine($"Deleted {count} directories.");
    }
    catch (Exception ex)
    {
        Console.WriteLine("Error:");
        Console.WriteLine(ex.Message);
    }
}