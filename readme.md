# Excel to Mo
Convert excel files(.xlsx) into human readable .po files, and automatically compile to .mo, for use with Wordpress or any gettext tool

Requires npm, and gettext to be installed and command msgfmt globally available, to get it, run: 
- `brew install gettext` 
- and then link it `brew link --force gettext`

## Instructions
- Pull this repo, run `npm install` 
- put example.xlsx in the root of the repo
- run `exceltomo convert example.xslx`, po and mo files should show up in the root directory.

## Structure of expected excel file

| language | key    | string   |
|----------|--------|----------|
| en_GB    | potato | potato   |
| pt_PT    | potato | batata   |
| de_DE    | potato | kartofel |
