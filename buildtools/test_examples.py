#!/usr/bin/python

import re
import glob
import subprocess


def main():
    return_code = 0
    return_code = max(return_code, check("examples", ".html", ""))
    return_code = max(return_code, check("contribs/gmf/examples", ".html", "contribs/gmf/"))
    return_code = max(return_code, check("contribs/gmf/apps", "", "contribs/gmf/apps/"))
    exit(return_code)


def check(folder, file_postfix, make_prefix):
    return_code = 0
    re_ = re.compile(r"^{}/([a-zA-Z_]*){}$".format(re.escape(folder), re.escape(file_postfix)))
    for ex in glob.glob("{}/*{}".format(folder, file_postfix)):
        match = re_.search(ex)
        if match is not None:
            return_code = max(return_code, subprocess.call(
                ["make", ".build/{}{}.check.timestamp".format(make_prefix, match.group(1))]
            ))
    return return_code

if __name__ == '__main__':
    main()
