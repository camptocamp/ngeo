#!/usr/bin/python

import re
import sys
import glob
import subprocess


def main():
    if len(sys.argv) > 1:
        split_current, split_number = (int(v) for v in sys.argv[1].split("/"))
        split_current = split_current - 1
    else:
        split_current, split_number = (0, 1)
    return_code_1, split_current = check("examples", ".html", "", split_current, split_number)
    return_code_2, split_current = check("contribs/gmf/examples", ".html", "contribs/gmf/", split_current, split_number)
    return_code_3, split_current = check("contribs/gmf/apps", "", "contribs/gmf/apps/", split_current, split_number)
    exit(max(return_code_1, return_code_2, return_code_3))


def check(folder, file_postfix, make_prefix, split_current, split_number):
    return_code = 0
    re_ = re.compile(r"^{}/([a-zA-Z_]*){}$".format(re.escape(folder), re.escape(file_postfix)))
    for ex in glob.glob("{}/*{}".format(folder, file_postfix)):
        match = re_.search(ex)
        if match is not None:
            if split_current == 0:
                return_code = max(return_code, subprocess.call(
                    ["make", ".build/{}{}.check.timestamp".format(make_prefix, match.group(1))]
                ))
            split_current = (split_current + 1) % split_number
    return return_code, split_current


if __name__ == '__main__':
    main()
