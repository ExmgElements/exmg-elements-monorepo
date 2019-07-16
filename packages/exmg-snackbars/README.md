# exmg-snackbars

This component provides `SNACKBAR` toast functionnalities.

## Instalation

```bash
npm install @exmg/exmg-snackbars --save
```

## Usage

### Simple message

The function hass two main parameters, `message` and `options`

```ts
import {showSnackBar} from '@exmg/exmg-snackbars';

showSnackbar('This is my message', {duration: 2000}); // Will display the message for 2 seconds
```

### Simple message with close button

Setting the `duration` paramater to 0 causes the snackbar to be displayed continuously until closed by user.

```ts
import {showSnackBar} from '@exmg/exmg-snackbars';

showSnackbar('This is my message', {duration: 0, showCloseButton: true}); // Will display the message with close button
```

### Simple message with custom button

Setting the `copyButton` parameter creates a custom snackbar, if no callback is provided the button will close the snackbar.

```ts
import {showSnackBar} from '@exmg/exmg-snackbars';

// With callback
showSnackbar('This is my message', {duration: 0, copyButton: 'UNDO', callbackButton: mySuperUndoFcn});

// Without callback
showSnackbar('This is my message', {duration: 0, copyButton: 'CLOSE THIS '});
```
