#! python

import sys
import requests
import urllib3
from os import listdir
from shutil import rmtree

urllib3.disable_warnings()


def main():
    url = "https://api.github.com/repos/{}/ngeo/branches?per_page=100".format(sys.argv[1])
    try:
        json = requests.get(url).json()
        expected = [
            branch["name"] for branch in json
        ]
        expected.append("index.html")
        expected.append(".git")
        expected.append(".nojekyll")
        for path in listdir(sys.argv[2]):
            if path not in expected:
                print("Remove: {}".format(path))
                rmtree("{}/{}".format(sys.argv[2], path))
    except Exception as e:
        print("WARN {} seems unreachable ({}).".format(url, e))


if __name__ == "__main__":
    main()
