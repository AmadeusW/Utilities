using System.IO;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System;

/* Usage:
var pattern = new List<CopyOrder> { ... }; 
FileProcessor.Start(pattern);
*/

static void Log(string message)
{
    Console.WriteLine(String.Concat(DateTime.Now.ToString("hh:mm:ss"), " ", message));
}

class FileProcessor
{
    public static void Start(IEnumerable<CopyOrder> orders, bool forceCopy = false)
    {
        foreach (var order in orders)
        {
            Log($"Registering {Path.GetFileName(order.Source)}");
            var watcher = new FileSystemWatcher(Path.GetDirectoryName(order.Source), Path.GetFileName(order.Source));
            watcher.NotifyFilter = NotifyFilters.LastWrite;
            watcher.Changed += (async (o, e) =>
            {
                await order.Act();
            });
            watcher.EnableRaisingEvents = true;
            if (forceCopy)
            {
                Task.Run(async() => 
                {
                    await order.Act();
                });
            }
        }
    }
}

class CopyOrder
{
    public string Source;
    public string Destination;
    public Action OnCompleted;
    private CancellationTokenSource _tokenSource;

    public CopyOrder(string source, string destination, Action onCompleted = null)
    {
        Source = source;
        Destination = destination;
        OnCompleted = onCompleted;
        _tokenSource = new CancellationTokenSource();
    }

    public async Task Act()
    {
        _tokenSource.Cancel();
        _tokenSource = new CancellationTokenSource();
        var fileName = Path.GetFileName(Source);
        var token = _tokenSource.Token;
        await Task.Delay(1000);
        if (token.IsCancellationRequested)
        {
            Log($"Received another event for {fileName}");
            return;
        }
        Log($"Processing {fileName}");
        var attempts = 5;
        int backoff = 1;
        while (attempts-- > 0)
        {
            try
            {
                File.Copy(Source, Destination, true);
                Log($"Copied {fileName}");
                break;
            }
            catch (IOException)
            {
                Log($"Still unable to copy {fileName}... Waiting {backoff}s.");
                await Task.Delay(backoff*1000);
                backoff *= 2;
                continue;
            }
            catch
            {
                Log($"Error copying {fileName}");
                return;
            }
        }
        if (attempts == 0)
        {
            Log($"Giving up on {fileName}");
        }
        if (OnCompleted != null)
        {
            Log("Invoking post-copy action...");
            OnCompleted.Invoke();
        }
    }
}