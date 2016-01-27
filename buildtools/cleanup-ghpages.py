#! python

import requests
import urllib3
from sys import argv
from os import listdir
from shutil import rmtree
from json import loads

urllib3.disable_warnings()


def main():
    expected = [
        branch["name"] for branch in
        loads(requests.get(
            "https://api.github.com/repos/%s/ngeo/branches" % argv[1]
        ).content)
    ]
    expected.append("index.html")
    expected.append(".git")
    for path in listdir(argv[2]):
        if path not in expected:
            print("Remove: %s" % path)
            rmtree("%s/%s" % (argv[2], path))

if __name__ == "__main__":
    main()
