#!/usr/bin/env python
# -*- coding: utf-8 -*-

## 사용법 : til 디렉토리에서 python build.py 를 실행하면 index.md 파일을 생성합니다.
## index.md에는 .md 확장자를 가진 파일들의 목록이 디렉토리별로 들어갑니다.

from __future__ import unicode_literals
from __future__ import print_function

import os
import os.path
import shutil



dicts = {}

# get directory
for dirpath, dirnames, filenames in os.walk('.'):
    # pass ., .git
    if dirpath == "." or dirpath.startswith('.git') or dirpath.startswith('./.git'):
        continue

    category = os.path.basename( dirpath ).title()
    dicts[category] = {}

    # get .md filelist
    for filename in filenames:
        name, ext = os.path.splitext(filename)
        title = name.title().replace('_', ' ').replace('-', ' ')
        if ext.lower() != ".md":
            continue

        dicts[category][title] = os.path.join(dirpath, filename)

indexfile = open("index.md", "w")

# print out to index.md
for category in dicts:
    print(category, file=indexfile)
    print('====', file=indexfile)
    print('', file=indexfile)
    for title in dicts[category]:
        print("* [%s](%s)"  %( title , dicts[category][title]), file=indexfile)
    print('', file=indexfile)

indexfile.close()
