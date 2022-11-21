#!/bin/bash
#Stopping existing node servers
echo "Stopping any existing node servers"
pkill node
echo $?
if [ $? -ne 1 ]; then
    echo "Application was stopped"
fi