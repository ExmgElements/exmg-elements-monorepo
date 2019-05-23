#!/usr/bin/env bash
github_org=ExmgElements
#my_repos="exmg-paper-token-input exmg-dialogs exmg-button exmg-paper-combobox"
my_repos="exmg-form exmg-copy-to-clipboard exmg-cms-styles exmg-markdown-editor exmg-radio-group exmg-sortable exmg-cli exmg-paper-sidemenu exmg-swagger-client exmg-snackbars exmg-tslint exmg-date-format exmg-paper-datatable exmg-paper-stepper exmg-long-ago exmg-paper-card exmg-web-socket exmg-paper-tooltip exmg-ckeditor exmg-dialog"
src_dir=packages
git checkout -b monorepo-migration
for repo in $(echo $my_repos); do
  #mkdir $src_dir/$repo
  git subtree add -P  $src_dir/$repo git@github.com:$github_org/$repo.git master
#  git remote add $repo git@github.com:$github_org/$repo.git
#  git fetch $repo
#  git read-tree --prefix=$src_dir/$repo -u $repo/master
#  git add $src_dir/$repo
#  git commit -m "Migrated $repo to $src_dir/$repo"
done
#git push -u origin HEAD
