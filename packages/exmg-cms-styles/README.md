# \<exmg-cms-styles\>

The `exmg-cms-styles` component provides simple ways to use Material Design CSS styles
in your application. The following imports are available:


* exmg-cms-global-page.html - Global layout which can be used in a CMS project by including it in the main app.html. Also the exmg-cms-global-layout-mixin.html should be used to add some functionality needed for collapsing the menu etc. Please see the layout.html in the demo folder for an example.
* exmg-cms-page.html - Styles definitions for al supported page types like pages containing cards/tables and tabs. Please see the examples in the demo folder.
* exmg-cms-color.html - This element contains the primary and secondary color palette.
* exmg-cms-default-theme.html - This element overrides the default paper colors to our EM color set.

Please visit the [demo](http://ExmgElements.github.io/exmg-cms-styles/) page for live examples.

## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `polymer serve` to serve your element locally.

## Viewing element demo page

```
$ polymer serve
```

## Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
