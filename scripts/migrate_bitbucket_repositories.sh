git clone git@bitbucket.org:exmachina/exmg-cms-breadcrumbs.git

#!/usr/bin/env bash

##############################################
#  Script to import repositories from bitbucket
#  Commit history should be persisted in mono repo
###############################################

bitbucket_org=exmachina

###### repositories names to migrate ###########
###############################################

### ALREADY MIGRATED REPOS:
#repos_to_import="exmg-paper-token-input exmg-dialogs exmg-button exmg-paper-combobox"
#repos_to_import="exmg-form exmg-copy-to-clipboard exmg-cms-styles exmg-markdown-editor exmg-radio-group exmg-sortable exmg-cli"
#repos_to_import="exmg-paper-sidemenu exmg-swagger-client exmg-snackbars exmg-tslint exmg-date-format exmg-paper-datatable"
#repos_to_import="exmg-paper-stepper exmg-long-ago exmg-paper-card exmg-web-socket exmg-paper-tooltip exmg-ckeditor"

#### NOT MIGRATED exmg-dialog
#repos_to_import=exmg-dialog

###########################################################################################################
####### set var repos_to_import as string with names of repositories which should be migrated separated by spaces
repos_to_import="exmg-cms-breadcrumbs"
src_dir=packages

git checkout -b monorepo-migration
for repo in $(echo $repos_to_import); do
  git subtree add -P  $src_dir/$repo git@bitbucket.org:$bitbucket_org/$repo.git master
done
