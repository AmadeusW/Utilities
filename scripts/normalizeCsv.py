import argparse
import csv

parser = argparse.ArgumentParser(description="Clean up units in CSV file.")
parser.add_argument('filename', metavar='filename', help='file to process.')
parser.add_argument('column', metavar='column', help='column to process.')
parser.add_argument('unit', metavar='unit', nargs='?', help='target unit. Leave blank for most popular unit.')

args = parser.parse_args()

with open (filename, 'w') as csvfile:
    reader = csv.reader(csvfile)
    headers = reader.next()
    column = headers.index(args.column)
    print(column)
    