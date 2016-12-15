bool toggleFusionLog, enableFusionLog;
var args = Environment.GetCommandLineArgs();
ProcessArguments(args, ref toggleFusionLog, ref enableFusionLog);
const string keyName = @"HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Fusion";

if (toggleFusionLog)
{
    object currentState = Microsoft.Win32.Registry.GetValue(keyName, "EnableLog", 0);
    Console.WriteLine("FusionLog was " + (currentState.Equals(1) ? "enabled..." : "disabled..."));
    enableFusionLog = currentState.Equals(1) ? false : true; 
}

if (enableFusionLog)
{
    var location = Path.Combine(Path.GetTempPath(), "FusionLog");
    System.IO.Directory.CreateDirectory(location);
    Microsoft.Win32.Registry.SetValue(keyName, "ForceLog", 1, Microsoft.Win32.RegistryValueKind.DWord);
    Microsoft.Win32.Registry.SetValue(keyName, "LogFailures", 1, Microsoft.Win32.RegistryValueKind.DWord);
    Microsoft.Win32.Registry.SetValue(keyName, "LogResourceBinds", 1, Microsoft.Win32.RegistryValueKind.DWord);
    Microsoft.Win32.Registry.SetValue(keyName, "EnableLog", 1, Microsoft.Win32.RegistryValueKind.DWord);
    Microsoft.Win32.Registry.SetValue(keyName, "LogPath", location, Microsoft.Win32.RegistryValueKind.String);
    Console.WriteLine("FusionLog is enabled. Logs are located at " + location);
}
else
{
    Microsoft.Win32.Registry.SetValue(keyName, "ForceLog", 0, Microsoft.Win32.RegistryValueKind.DWord);
    Microsoft.Win32.Registry.SetValue(keyName, "LogFailures", 0, Microsoft.Win32.RegistryValueKind.DWord);
    Microsoft.Win32.Registry.SetValue(keyName, "LogResourceBinds", 0, Microsoft.Win32.RegistryValueKind.DWord);
    Microsoft.Win32.Registry.SetValue(keyName, "EnableLog", 0, Microsoft.Win32.RegistryValueKind.DWord);
    Console.WriteLine("FusionLog is disabled.");
}

void ProcessArguments(string[] args, ref bool toggle, ref bool enable)
{
    if (args.Length > 2)
    {
        var desiredState = args[2];
        if (desiredState == "0")
        {
            toggle = false;
            enable = false;
            return;
        }
        else if (desiredState == "1")
        {
            toggle = false;
            enable = true;
            return;
        }
    }
    toggle = true;
    return;
}
