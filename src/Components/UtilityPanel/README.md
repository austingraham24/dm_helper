## UtilityPanel
This component utilizes the Panel component of React-Bootstrap and further enhances it. Using the collabsilbe aspect of the panel component, the UtilityPanel provides a panel with a button in the header to toggle if the panel is shown or not.

**What's New:**<br>
Looking into fully incorporating a toolbar feature into the panel header that is fully customizeable

## Using the Component
Here is an example of using the component:
```
<UtilityPanel title={"Traits and Abilities"} defaultOpened>
    {/*Panel Content*/}
</UtilityPanel> 
```
## Parameters:

| Name | Type | Default | Required | Description |
| ----- | ----- | ----- | ----- | ----- |
| bsStyle | string | "default" | false | bootstrap styling of panel as seen in react-bootstrap [panel documentation](https://react-bootstrap.github.io/components/panel/) |
| [collapsible](#collapsible) | bool | false | false | can this panel collapse? a toggle button is provided if true |
| [closedTitle](#providing-titles) | string | | false | a unique string to be used when the panel is collapsed. Think of it as a special override to the title. If this prop is not provided, the title prop is used in both states. |
| [defaultOpened](#defaultopened) | bool | false | false | does the panel mount in the expanded state? |
| [deletable](#deletable) | bool | false | false | does this panel need to provide a way to delete it? Provides an xsmall red delete button if true (see next prop) |
| [deleteFunction](#deletable) | func | | false* | the function to pass to the delete button's onClick listener. If deletable is false, passing this prop does nothing.
| style | object | | false | a custom style object to further manipulate/customize the panel |
| [title](#providing-titles) | string | | false | the string to be used as the panel title |
| [toolbar](#providing-a-toolbar) | array [react elements] | | false | an array of items to render for additional functionality on the panel |

\*passing deletable as true but providing no deleteFunction means clicking the provided delete button will do nothing.

## No Props
Using the component without providing any props creates a panel with no title.
```
<UtilityPanel>Hello World!</UtilityPanel>
```
![NoPropsPanel](https://i.imgur.com/9d5ZznJ.png)

## Collapsible
Providing the collapsible prop creates a collapsible panel and provided default open and close controlls.
```
<UtilityPanel collapsible>
    Hello!
</UtilityPanel>
```
![Blank Props Panel](https://i.imgur.com/tPP6fxy.png)

## DefaultOpened
Providing the default opened prop will mount the panel in its expanded state.<br>
_If this prop is provided it is assumed you are using a collapsible panel, so providing the collapsible prop is not required but is helpful for streamlined readability._
```
<UtilityPanel defaultOpened>
    This panel is expanded by default
</UtilityPanel>

<UtilityPanel collapsible defaultOpened>
    This panel is expanded by default
</UtilityPanel>
```
![Default Expanded](https://i.imgur.com/0ShUpd9.png)<br>
[Back to Parameters](#parameters)

## Providing Titles
the title prop will show in the panel heading in both the open and closed states
```
<UtilityPanel title="This is the panel title" defaultOpened>
    This panel is expanded by default
</UtilityPanel>
```
![Panel with Title](https://i.imgur.com/rJeMvQ2.png)
<br><br>alternatively, you can provide a title for the open state and one for the closed state
```
<UtilityPanel 
    title="OpenTitle" 
    closedTitle="Closed Title" 
    defaultOpened
>
    This panel is expanded by default
</UtilityPanel>
```
![Panel with delete title](https://i.imgur.com/z5OOXpO.png)<br>
[Back to Parameters](#parameters)

## Deletable
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
![Deletable Panel](https://i.imgur.com/8J2mHHi.png)<br>
[Back to Parameters](#parameters)

## Providing a Toolbar
The toolbar feature is experimental. Pass in an array of react elements that will be rendered next to the toggle button.<br><br>
The toolbar renders each element with the style of 'float: right'. The most logical element is a button given an onclick function as a prop.
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
![Panel with Toolbar](https://i.imgur.com/vLhArkn.png)<br><br>
**Special Notes:**<br>
* Currently, due to the nature of float behavior, the last item in the toolbar props array with be the first (left-most) item of the toolbar. Discussions of taking the prop and reversing it to render for a more expected layout (as in in order of the array given) are underway.

* Current behavior hides the toolbar when the panel is collapsed.

[Back to Parameters](#parameters)