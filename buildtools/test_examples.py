#!/usr/bin/python

import re
import sys
import glob
import subprocess


BLACKLIST = [
    "googlestreetview"
]


def main():
    if len(sys.argv) > 1:
        split_current, split_number = (int(v) for v in sys.argv[1].split("/"))
        split_current = split_current - 1
    else:
        split_current, split_number = (0, 1)
    return_code, split_current = check("contribs/gmf/apps", "", "contribs/gmf/apps/", split_current, split_number)
    exit(return_code)


def check(folder, file_postfix, make_prefix, split_current, split_number):
    return_code = 0
    re_ = re.compile(r"^{}/([a-zA-Z_]*){}$".format(re.escape(folder), re.escape(file_postfix)))
    for ex in glob.glob("{}/*{}".format(folder, file_postfix)):
        match = re_.search(ex)
        if match is not None and match.group(1) not in BLACKLIST:
            if split_current == 0:
                new_code = subprocess.call(
                    ["make", ".build/{}{}.check.timestamp".format(make_prefix, match.group(1))]
                )
                print('The command "make .build/{}{}.check.timestamp" exited with {}'.format(
                    make_prefix, match.group(1), new_code
                ))
                return_code = max(return_code, new_code)
            split_current = (split_current + 1) % split_number
    return return_code, split_current


if __name__ == '__main__':
    main()
