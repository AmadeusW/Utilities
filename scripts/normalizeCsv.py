"""
Script originally written to fix BenchmarkDotNet output
that contained units in the CSV data.
"""

import argparse
import csv
import re

parser = argparse.ArgumentParser(description="Clean up units in CSV file.")
parser.add_argument('filename', metavar='filename',
                    help='file to process.')
parser.add_argument('column', metavar='column',
                    help='column to process.')
parser.add_argument('unit', metavar='unit', nargs='?',
                    help='target unit. Leave blank for most popular unit.')
args = parser.parse_args()

FACTORS = { 
    's': 1, 'ms': 1000, 'us': 1000*1000, 'ns': 1000*1000*1000,
    'B': 1, 'kB': 1024, 'MB': 1024*1024, 'GB': 1024*1024*1024
}

with open(args.filename, 'r') as csvfile:
    reader = csv.DictReader(csvfile)
    rows = list(reader)
    print(rows)
    unit = args.unit
    # First pass: determine which unit is the most common
    if unit is None:
        unitHistogram = {}
        for row in rows:
            target = row[args.column]
            if target is None:
                raise ValueError()
            matches = re.search(r"(\d*(\.\d+)?)\s*((\D)*)", target)
            currentUnit = matches.group(3)
            unitHistogram.setdefault(currentUnit, 0)
            unitHistogram[currentUnit] = unitHistogram[currentUnit] + 1

        unit = max(unitHistogram, key=unitHistogram.get)
        print('Determined target conversion unit: ' + unit)
    else:
        print('Using provided conversion unit: ' + unit)
    # Convert values to the target unit
    for row in rows:
        target = row[args.column]
        if target is None:
            raise ValueError()
        matches = re.search(r"(\d*(\.\d+)?)\s*((\D)*)", target)
        currentUnit = matches.group(3)
        if (currentUnit not in FACTORS):
            print('No known conversion for ' + matches.group(3))
            # TODO: Skip the rest of the conversion
        elif (currentUnit == unit):
            print('No conversion necessary for ' + matches.group(1) + '[' + matches.group(3) + ']')
        else:
            print('Converting ' + matches.group(1) + '[' + matches.group(3) + '] into [' + unit + ']' )
        factor = FACTORS[unit] / FACTORS[currentUnit]
        newValue = float(matches.group(1)) * factor
        print('New value is ' + str(newValue) + '[' + unit + ']')