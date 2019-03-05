#!/usr/bin/env bash

cd md && ./build.py
cd .. && mkdocs build --clean

