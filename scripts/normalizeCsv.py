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

TIME = { 's': 1, 'ms': 1000, 'us': 1000*1000, 'ns': 1000*1000*1000 }
SIZE = { 'B': 1, 'kB': 1024, 'MB': 1024*1024, 'GB': 1024*1024*1024 }

with open(args.filename, 'r') as csvfile:
    reader = csv.DictReader(csvfile)

    unit = args.unit
    # First pass: determine which unit is the most common
    if unit is None:
        unitHistogram = {}
        for row in reader:
            target = row[args.column]
            if target is None:
                raise ValueError()
            matches = re.search(r"(\d*(\.\d+)?)((\D)*)", target)
            currentUnit = matches.group(3)
            unitHistogram.setdefault(currentUnit, 0)
            unitHistogram[currentUnit] = unitHistogram[currentUnit] + 1

        unit = max(unitHistogram, key=unitHistogram.get)
        print('Determined target conversion unit: ' + unit)
    else:
        print('Using provided conversion unit: ' + unit)
    # Convert values to the target unit
