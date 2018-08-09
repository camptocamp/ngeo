[main]
host = https://www.transifex.com

[ngeo.gmf-apps-${tx_version.strip()}]
source_file = ../../../.build/locale/apps.pot
source_lang = en
type = PO
% for lang in languages.split():
trans.${lang} = ../../../.build/locale/${lang}/LC_MESSAGES/apps.po
% endfor
