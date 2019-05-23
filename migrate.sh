#!/usr/bin/env bash
github_org=ExmgElements
###### repositories names to migrate ###########
###############################################
#my_repos="exmg-paper-token-input exmg-dialogs exmg-button exmg-paper-combobox"
#my_repos="exmg-form exmg-copy-to-clipboard exmg-cms-styles exmg-markdown-editor exmg-radio-group exmg-sortable exmg-cli"
#my_repos="exmg-paper-sidemenu exmg-swagger-client exmg-snackbars exmg-tslint exmg-date-format exmg-paper-datatable"
#my_repos="exmg-paper-stepper exmg-long-ago exmg-paper-card exmg-web-socket exmg-paper-tooltip exmg-ckeditor exmg-dialog"
src_dir=packages
git checkout -b monorepo-migration
for repo in $(echo $my_repos); do
  git subtree add -P  $src_dir/$repo git@github.com:$github_org/$repo.git master
done
