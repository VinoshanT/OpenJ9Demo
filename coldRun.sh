#!/bin/bash

TIMEFORMAT='%U'

j9Name=javaj9

if [ $1 -eq 0 ]; then
    time java $2
elif [ $1 -eq 1 ]; then
    time $j9Name -Xint -Xshareclasses:name=test $2 &> /dev/null
else
    time $j9Name -Xint -Xshareclasses:none -Xramcache=testCache $2  &> /dev/null
fi


