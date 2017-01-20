"""Script originally written to fix  """

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
unitHistogram = {}

with open (args.filename, 'r') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        target = row[args.column]
        if target == None:
            raise ValueError()
        print(target)

        matches = re.search(r"(\d*(\.\d+)?)((\D)*)", target)
        value = matches.group(1)
        unit = matches.group(3)
        print(value)
        print(unit)
        unitHistogram.setdefault(unit, 0)
        unitHistogram[unit] = unitHistogram[unit] + 1

print(unitHistogram)
