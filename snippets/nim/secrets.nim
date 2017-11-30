import json
let configuration = parseFile("C:/Users/ama/OneDrive/config/secrets.json")
echo(configuration["apiKey"])
echo(configuration["apiSecret"])