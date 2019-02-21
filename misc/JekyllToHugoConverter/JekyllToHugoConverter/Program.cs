using System;
using System.Collections.Generic;
using System.IO;

namespace JekyllToHugoConverter
{
    class Program
    {
        static void Main(string[] args)
        {
            var files = Directory.EnumerateFiles(@"C:\src\elamalara.github.io\jekyll\_data\categories", "*.yml");
            Dictionary<string, Art> pieces = new Dictionary<string, Art>();
            foreach (var file in files)
            {
                Console.WriteLine($"Reading {file}");
                LoadData(file, pieces);
            }
            foreach (var piece in pieces.Values)
            {
                Console.WriteLine($"Saving {piece.Title}");
                SaveData(@"C:\src\elamalara.github.io\content\art", piece);
            }
        }

        private static void LoadData(string file, Dictionary<string, Art> pieces)
        {
            Art current = null;
            string tag = string.Empty;

            foreach (var line in File.ReadAllLines(file))
            {
                if (line.StartsWith("-"))
                {
                    var key = line.Split(':')[1].Trim();
                    if (pieces.TryGetValue(key, out var existingPiece))
                    {
                        current = existingPiece;
                        current.AddTag(tag);
                        Console.WriteLine($"Updating {key}");
                    }
                    else
                    {
                        current = new Art(key);
                        current.AddTag(tag);
                        pieces.Add(key, current);
                        Console.WriteLine($"Processing {key}");
                    }
                }
                if (current == null)
                {
                    if (line.StartsWith("title:"))
                    {
                        tag = line.Split(':')[1].Trim();
                    }
                    continue; // we are in front matter, there is no point continuing
                }

                var parts = line.Split(':');
                if (parts.Length == 1)
                    continue; // we did not split, don't continue

                var property = parts[0];
                var value = parts[1].Trim();
                switch (property.TrimStart('-', ' ', '\t'))
                {
                    case "internal":
                        break;
                    case "title":
                        current.Title = value.Trim('"').Replace("\"", "\\\"");
                        break;
                    case "description":
                        var newValue = value.Trim('"').Replace("\"", "\\\"");
                        if (newValue == "Please write a brief description.")
                            break;
                        current.Description = newValue;
                        break;
                    case "url":
                        current.Url = value.Trim('"');
                        break;
                }
            }
        }

        private static void SaveData(string directoryPath, Art piece)
        {
            Directory.CreateDirectory(directoryPath);
            File.WriteAllText(Path.Combine(directoryPath, piece.Internal + ".md"), piece.ToMd());
        }
    }
}
