"""
Script originally written to fix BenchmarkDotNet output
that contained units in the CSV data.
"""

import argparse
import csv
import re
import os

parser = argparse.ArgumentParser(description="Clean up units in CSV file.")
parser.add_argument('filename', metavar='filename',
                    help='file to process.')
parser.add_argument('column', metavar='column',
                    help='column to process.')
parser.add_argument('unit', metavar='unit', nargs='?',
                    help='target unit. Leave blank for most popular unit.')
args = parser.parse_args()

REGEX = r"([\d,]*(\.\d+)?)\s*((\D)*)"
FACTORS = { 
    's': 1, 'ms': 1000, 'us': 1000*1000, 'ns': 1000*1000*1000,
    'B': 1024*1024*1024, 'kB': 1024*1024, 'MB': 1024, 'GB': 1
}

originalName = args.filename + '.orig'
os.replace(args.filename, originalName)
with open(originalName, 'r') as csvfile:
    reader = csv.DictReader(csvfile)
    rows = list(reader)
    headers = list(rows[0])
    unit = args.unit
    # First pass: determine which unit is the most common
    if unit is None:
        unitHistogram = {}
        for row in rows:
            target = row[args.column]
            if target is None:
                raise ValueError()
            matches = re.search(REGEX, target)
            currentUnit = matches.group(3)
            unitHistogram.setdefault(currentUnit, 0)
            unitHistogram[currentUnit] = unitHistogram[currentUnit] + 1

        unit = max(unitHistogram, key=unitHistogram.get)
        print('Determined target conversion unit: ' + unit)
    else:
        print('Using provided conversion unit: ' + unit)

    # Replace the header
    newColumnName = "{0} [{1}]".format(args.column, unit)
    for header in headers:
        if header == args.column:
            headers[headers.index(header)] = newColumnName

    # Convert values to the target unit
    with open(args.filename, 'w+', newline='') as newFile:
        writer = csv.DictWriter(newFile, fieldnames = headers)
        writer.writeheader()
        for row in rows:
            target = row[args.column]
            if target is None:
                raise ValueError()
            matches = re.search(REGEX, target)
            currentUnit = matches.group(3)
            newValue = matches.group(1)

            if (currentUnit not in FACTORS):
                print('No known conversion for ' + matches.group(3))
                newValue = float(matches.group(1).replace(',',''))
            elif (currentUnit == unit):
                #print('No conversion necessary for ' + matches.group(1) + '[' + matches.group(3) + ']')
                newValue = float(matches.group(1).replace(',',''))
            else:
                factor = FACTORS[unit] / FACTORS[currentUnit]
                newValue = float(matches.group(1).replace(',','')) * factor
                #print('Converting ' + matches.group(1) + '[' + matches.group(3) + '] into ' + str(newValue) + ' [' + unit + ']' )

            row.pop(args.column)
            row[newColumnName] = newValue
            writer.writerow(row)
        print('Done.')
