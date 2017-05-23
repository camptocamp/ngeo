[main]
host = https://www.transifex.com

[ngeo.ngeo-${tx_version.strip()}]
source_file = .build/locale/ngeo.pot
source_lang = en
type = PO
% for lang in languages.split():
trans.${lang} = .build/locale/${lang}/LC_MESSAGES/ngeo.po
% endfor

[ngeo.gmf-${tx_version.strip()}]
source_file = .build/locale/gmf.pot
source_lang = en
type = PO
% for lang in languages.split():
trans.${lang} = .build/locale/${lang}/LC_MESSAGES/gmf.po
% endfor
