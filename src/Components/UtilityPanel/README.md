## UtilityPanel
This component utilizes the Panel component of React-Bootstrap and further enhances it. Using the collabsilbe aspect of the panel component, the UtilityPanel provides a panel with a button in the header to toggle if the panel is shown or not.

- [What's New](#what's-new)
- [Using the Component](#using-the-component)
- [Examples and notes](#examples-and-notes)


## What's New
Looking into fully incorporating a toolbar feature into the panel header that is fully customizeable

## Using the Component
Here is an example of using the component:
```
<UtilityPanel title={"Traits and Abilities"} defaultOpened>
    {/*Panel Content*/}
</UtilityPanel> 
```
**Parameters:**<br>

| Name | Type | Default | Required | Description |
| ----- | ----- | ----- | ----- | ----- |
| bsStyle | string | "default" | false | bootstrap styling of panel as seen in react-bootstrap [panel documentation](https://react-bootstrap.github.io/components/panel/) |
| collapsible | bool | false | false | can this panel collapse? a toggle button is provided if true |
| closedTitle | string | | false | a unique string to be used when the panel is collapsed. Think of it as a special override to the title. If this prop is not provided, the title prop is used in both states. |
| defaultOpened | bool | false | false | does the panel mount in the expanded state? |
| deletable | bool | false | false | does this panel need to provide a way to delete it? Provides an xsmall red delete button if true (see next prop) |
| deleteFunction | func | | false* | the function to pass to the delete button's onClick listener. If deletable is false, passing this prop does nothing.
| style | object | | false | a custom style object to further manipulate/customize the panel |
| title | string | | false | the string to be used as the panel title |
| toolbar | array [react elements] | | false | an array of items to render for additional functionality on the panel |

\*passing deletable as true but providing no deleteFunction means clicking the provided delete button will do nothing.

## Examples and Notes
**No Props**<br>
Using the component without providing any props creates a panel with no title and is collapsed by default.
```
<UtilityPanel>
    Hello!
</UtilityPanel>
```
![Blank Props Panel](https://i.imgur.com/tPP6fxy.png)

**DefaultOpened**<br>
Providing the default opened prop will mount the panel in its expanded state
```
<UtilityPanel defaultOpened>
    This panel is expanded by default
</UtilityPanel>
```
![Default Expanded](https://i.imgur.com/0ShUpd9.png)

**Providing a Title**<br>
```
<UtilityPanel title="This is the panel title" defaultOpened>
    This panel is expanded by default
</UtilityPanel>
```
![Panel with Title](https://i.imgur.com/rJeMvQ2.png)

**Deletable**<br>
Should you want to be able to delete a panel, pass the deletable prop and a function to call when it is done.
```
deleteFunction() {
    {/* delete code goes here */}
}

render() {
    return (
        <UtilityPanel 
            title="Deletable Panel"
            deleteFunction={this.deleteFunction.bind(this)}
            deletable
        >
            This panel is deletable
        </UtilityPanel>
    );
}
```
![Deletable Panel](https://i.imgur.com/8J2mHHi.png)

**Providing a Toolbar**<br>
The toolbar feature is experimental. Pass in an array of react elements that will be rendered next to the toggle button.<br><br>
The toolbar renders each element with the style of 'float: right'. The most logical element is a button given an onclick function as a prop.<br><br>
**Special Notes:**<br>
* Currently, due to the nature of float behavior, the last item in the toolbar props array with be the first (left-most) item of the toolbar. Discussions of taking the prop and reversing it to render for a more expected layout (as in in order of the array given) are underway.

* Current behavior hides the toolbar when the panel is collapsed.
```
//toolbar with 1 item
let toolbar = [<Button bsSize="xsmall" bsStyle="primary" onClick={() => {this.toggleEditing()}}>Edit</Button>]

//toolbar with 2 items (edit, save)
let toolbar2 = [<Button bsSize="xsmall" bsStyle="primary">Edit</Button>, <Button bsSize="xsmall" bsStyle="success">Save</Button>]

return (
    //expanded panel with first toolbar
    <UtilityPanel title="Title" defaultOpened toolbar={toolbar}>
        This panel is expanded by default
    </UtilityPanel>

    //expanded panel with second toolbar
    <UtilityPanel title="Title" defaultOpened toolbar={toolbar2}>
        This panel is expanded by default
    </UtilityPanel>

    //same as first toolbar but collapsed
    <UtilityPanel title="Title" toolbar={toolbar}>
        This panel is expanded by default
    </UtilityPanel>
);
```
![Panel with Toolbar](https://i.imgur.com/vLhArkn.png)