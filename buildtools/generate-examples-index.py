import os
import bs4
from mako.template import Template
from argparse import ArgumentParser

if __name__ == '__main__':

    examples = []

    parser = ArgumentParser()
    parser.add_argument(
        '--app', action='append', nargs=3, metavar=('TITLE', 'HREF', 'DESC'),
        help='Add an application', default=[],
    )
    parser.add_argument(
        'template', nargs=1, help='The template',
    )
    parser.add_argument(
        'example', nargs='+', help='Example file',
    )

    args = parser.parse_args()

    for application in args.app:
        examples.append({
            'title': '<b>%s</b>' % application[0],
            'href': application[1],
            'desc': application[2],
        })

    for examplefile in args.example:
        basename = os.path.basename(examplefile)
        soup = bs4.BeautifulSoup(open(examplefile))
        example = {}
        if soup.title is None:
            raise Exception('Example %s has no title.' % basename)
        example['title'] = soup.title.string
        example['href'] = basename
        descelt = soup.find(id='desc')
        if descelt is None:
            raise Exception('Example %s has no description.' % basename)
        example['desc'] = \
            '' if descelt is None else \
            ''.join(map(str, descelt.contents))
        examples.append(example)

    template = Template(filename=args.template[0])
    print(template.render(examples=examples))
