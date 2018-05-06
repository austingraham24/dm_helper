## PanelButtonToggle
This component utilizes the Panel component of React-Bootstrap and further enhances it. Using the collabsilbe aspect of the panel component, the PanelButtonToggle provides a panel with a button in the header to toggle if the panel is shown or not.

- [What's New](#what's-new)
- [Using the Component](#using-the-component)
- [Examples and notes](#examples-and-notes)


## What's New
Looking into fully incorporating a toolbar feature into the panel header that is fully customizeable

## Using the Component
Here is an example of using the component:
```
<PanelButtonToggle title={"Traits and Abilities"} defaultOpened>
    {/*Panel Content*/}
</PanelButtonToggle> 
```
**Parameters:**<br>
Name | Type | Default | Required | Description
--- | --- | --- | --- | ---
title | string | | false | the string to be used as the panel title
bsStyle | string | "default" | false | bootstrap styling of panel as seen in react-bootstrap [panel documentation](https://react-bootstrap.github.io/components/panel/)
style | object | | false | a custom style object to further manipulate/customize the panel
defaultOpened | bool | false | false | does the panel mount in the expanded state?
toolbar | array [react elements] | | false | an array of items to render for additional functionality on the panel

## Examples and Notes
**No Props**<br>
Using the component without providing any props creates a panel with no title and is collapsed by default.
```
<PanelButtonToggle>
    Hello!
</PanelButtonToggle>
```
![Blank Props Panel](https://i.imgur.com/tPP6fxy.png)

**DefaultOpened**<br>
Providing the default opened prop will mount the panel in its expanded state
```
<PanelButtonToogle defaultOpened>
    This panel is expanded by default
</PanelButtonToogle>
```
![Default Expanded](https://i.imgur.com/0ShUpd9.png)

**Providing a Title**<br>
```
<PanelButtonToogle title="This is the panel title" defaultOpened>
    This panel is expanded by default
</PanelButtonToogle>
```
![Panel with Title](https://i.imgur.com/rJeMvQ2.png)

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
    <PanelButtonToogle title="Title" defaultOpened toolbar={toolbar}>
        This panel is expanded by default
    </PanelButtonToogle>

    //expanded panel with second toolbar
    <PanelButtonToogle title="Title" defaultOpened toolbar={toolbar2}>
        This panel is expanded by default
    </PanelButtonToogle>

    //same as first toolbar but collapsed
    <PanelButtonToogle title="Title" toolbar={toolbar}>
        This panel is expanded by default
    </PanelButtonToogle>
);
```
![Panel with Toolbar](https://i.imgur.com/vLhArkn.png)