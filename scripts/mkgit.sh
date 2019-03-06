#!/bin/bash
mkdir $1
cd $1
git init
wget https://raw.githubusercontent.com/github/gitignore/master/$2.gitignore
mv $2.gitignore .gitignore
mkdir src
echo -e "$1\n=" > readme.md
