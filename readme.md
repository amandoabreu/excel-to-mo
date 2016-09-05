# Excel to Mo
Convert excel files(.xlsx) into human readable .po files, and automatically compile to .mo, for use with Wordpress or any gettext tool

Requires gettext to be installed and command msgfmt globally available run: `brew install gettext` and then link it `brew link --force gettext`

Pull this repo, put example.xlsx in the root of the repo, run `exceltomo convert example.xslx`, po and mo files should also show up in the root directory.