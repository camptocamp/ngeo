import sys
import os
import bs4
from mako.template import Template

if __name__ == '__main__':

    examples = []
    for examplefile in sys.argv[2:]:
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
        example['desc'] = '' if descelt is None else \
                ''.join(map(str, descelt.contents))
        examples.append(example)

    templatefilename = sys.argv[1]
    template = Template(filename=templatefilename)
    output = template.render(examples=examples)
    print output
