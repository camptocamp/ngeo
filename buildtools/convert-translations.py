import argparse
import json
import sys
from pathlib import Path

import polib

if __name__ == "__main__":

    parser = argparse.ArgumentParser(
        description="""
Script to convert .po and .pot translation files to .json files for i18next.
Output files are saved to .build/locale/webcomponent/{language}/app.json.
Existing app.json files are overwritten
""",
        epilog="""
To convert one (or more) specific file:
    .build/python-venv/bin/python3 buildtools/convert-translations.py ".build/locale/gmf.pot"
To convert all .po and .pot files in the project:
    .build/python-venv/bin/python3 buildtools/convert-translations.py `find .build -name "*.po*"`
""",
        formatter_class=argparse.RawTextHelpFormatter,
    )

    parser.add_argument(
        "input_file",
        nargs="+",
    )
    args = parser.parse_args()
    input_files = args.input_file
    i18n = dict()

    for input_file in input_files:

        print(f"Reading {input_file}")
        pofile = polib.pofile(input_file)
        lang = pofile.metadata.get("Language") or "en"
        if lang not in i18n:
            i18n[lang] = dict()

        for entry in pofile:
            i18n[lang][entry.msgid] = entry.msgstr if lang != "en" else entry.msgid

    for lang in i18n:
        output_dir = f".build/locale/webcomponent/{lang}"
        output_file = f"{output_dir}/app.json"
        Path(output_dir).mkdir(parents=True, exist_ok=True)
        print(f"Writing {output_file}")
        with open(output_file, "w") as f:
            f.write(json.dumps(i18n[lang], indent=2))
