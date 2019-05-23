# exmg-form

This component provides basic form functionality. It is made on top of ```<iron-form>```.

You can put any children elements inside of it, but only elements implementing IronFormElementBehavior will be serialized.
Also, any element implementing IronFormElementBehavior have to implement validate() method. In other case form will not be working.

Read more: IronFormElementBehavior (https://github.com/PolymerElements/iron-form-element-behavior).

Events:
1. **submit** - when submit button pressed. Will contain all form serialized data. Submit event will not fire when any of required fields are not set. 
2. **cancel** - when cancel button pressed.

Attributes:
1. **hide-cancel-button**
2. **submit-button-copy**
3. **inline** - whether or not try to display form in single line

```
<exmg-form
    @submit="${this.submit}"
    @cancel="${this.cancel}"
    ?hide-cancel-button=${false}
    submit-button-copy="Submit"
    ?inline=${false}
>
    <paper-input label="text input" required></paper-input>
    <paper-input label="text input" value="pre-filled"></paper-input>
    <paper-input label="password input" type="password"></paper-input>
    <paper-input label="disabled input" disabled value="batman"></paper-input>
    <paper-input name="name" label="Summary" required always-float-label></paper-input>
    <paper-input name="estimate" label="Estimates" type="number" always-float-label style="max-width:180px;"></paper-input>

    <paper-textarea label="autoresizing textarea input"></paper-textarea>

    <exmg-paper-combobox label="Project" name="combobox" style="max-width:280px;" always-float-label required>
      <paper-item>PlayToTV</paper-item>
      <paper-item>Website</paper-item>
    </exmg-paper-combobox>
    <p class="help">Some issue types are unavailable due to incompatible field configuration and/or workflow associations.</p>
    <hr />
    <p class="help">Start typing to get a list of possible matches.</p>
    <exmg-paper-token-input name="tokens" label="Components" always-float-label>
      <paper-item>javascript</paper-item>
      <paper-item>css</paper-item>
    </exmg-paper-token-input>
    <p class="help">Start typing to get a list of possible matches or press down to select.</p>
    <p class="help">Estimated time needed to resolve this issue in hours.</p>
    <label>Message</label>
    <exmg-markdown-editor name="markdown" required>
      <marked-element markdown="# Hello Word!">
        <div slot="markdown-html"></div>
      </marked-element>
    </exmg-markdown-editor>
</exmg-form>
```
