#! python

import sys
import requests
import urllib3
from sys import argv
from os import listdir
from shutil import rmtree
from json import loads

urllib3.disable_warnings()


def main():
    try:
        url = "https://api.github.com/repos/%s/ngeo/branches?per_page=100" \
            % argv[1]
        expected = [
            branch["name"] for branch in loads(requests.get(url).content)
        ]
        expected.append("index.html")
        expected.append(".git")
        for path in listdir(argv[2]):
            if path not in expected:
                print("Remove: %s" % path)
                rmtree("%s/%s" % (argv[2], path))
    except:
        print("WARN %s seems unreachable (%s)." % (
            url, sys.exc_info()[1]
        ))

if __name__ == "__main__":
    main()
