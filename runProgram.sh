#!/bin/bash

TIMEFORMAT='%U'

j9Name=javaj9
num=5

for ((i=1; i<=$num; i++)); do
    if [ $1 -eq 0 ]; then
        time java $2 &> /dev/null
    elif [ $1 -eq 1 ]; then
        time $j9Name -Xint -Xshareclasses:name=test  $2 &> /dev/null
    else
        time $j9Name -Xint -Xshareclasses:none -Xramcache=testCache $2  &> /dev/null
    fi
done

