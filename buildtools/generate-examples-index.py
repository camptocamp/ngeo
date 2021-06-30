# The MIT License (MIT)
#
# Copyright (c) Camptocamp SA
#
# Permission is hereby granted, free of charge, to any person obtaining a copy of
# this software and associated documentation files (the "Software"), to deal in
# the Software without restriction, including without limitation the rights to
# use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
# the Software, and to permit persons to whom the Software is furnished to do so,
# subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
# FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
# COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
# IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
# CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import os
from argparse import ArgumentParser

import bs4
from mako.template import Template

if __name__ == "__main__":

    examples = []

    parser = ArgumentParser()
    parser.add_argument(
        "--app",
        action="append",
        nargs=3,
        metavar=("TITLE", "HREF", "DESC"),
        help="Add an application",
        default=[],
    )
    parser.add_argument(
        "template",
        nargs=1,
        help="The template",
    )
    parser.add_argument(
        "example",
        nargs="+",
        help="Example file",
    )

    args = parser.parse_args()

    for application in args.app:
        examples.append(
            {
                "title": "<b>%s</b>" % application[0],
                "href": application[1],
                "desc": application[2],
            }
        )

    for examplefile in args.example:
        basename = os.path.basename(examplefile)
        soup = bs4.BeautifulSoup(open(examplefile), "html.parser")
        example = {}
        if soup.title is None:
            raise Exception("Example %s has no title." % basename)
        example["title"] = soup.title.string
        example["href"] = basename
        descelt = soup.find(id="desc")
        if descelt is None:
            raise Exception("Example %s has no description." % basename)
        example["desc"] = "" if descelt is None else "".join(map(str, descelt.contents))
        examples.append(example)

    template = Template(filename=args.template[0])
    print(template.render(examples=examples))
