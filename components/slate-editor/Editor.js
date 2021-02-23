import React from "react";
import { Value } from "slate";
import Html from "slate-html-serializer";
import { Editor } from "slate-react";
import { Button, Icon, Toolbar } from "./components";
import ControlMenu from "./ControlMenu";
import HoverMenu from "./HoverMenu";
import { initialValue } from "./initial-value";
import { renderMark, renderNode } from "./renderers";
import { rules } from "./rules";

const html = new Html({ rules });

export default class SlateEditor extends React.Component {
  // Set the initial value when the app is first constructed.
  state = {
    value: Value.create(),
    isLoaded: false,
  };

  componentDidMount() {
    const valueFromProps = this.props.initialValue;
    const value = valueFromProps
      ? Value.fromJSON(html.deserialize(valueFromProps))
      : Value.fromJSON(initialValue);

    this.updateMenu();
    this.setState({ isLoaded: true, value });
  }

  componentDidUpdate = () => {
    this.updateMenu();
  };

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    this.setState({ value });
  };

  onKeyDown = (event, change, next) => {
    const { isLoading } = this.props;

    if (!isLoading && event.which === 83 && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      this.save();
      return;
    }

    next();
  };

  updateMenu = () => {
    const menu = this.menu;
    if (!menu) return;

    const { value } = this.state;
    const { fragment, selection } = value;

    if (selection.isBlurred || selection.isCollapsed || fragment.text === "") {
      menu.removeAttribute("style");
      return;
    }

    const native = window.getSelection();
    const range = native.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    menu.style.opacity = 1;
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;

    menu.style.left = `${
      rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width / 2
    }px`;
  };

  getTitle() {
    const { value } = this.state;
    const firstBlock = value.document.getBlocks().get(0);
    const secondBlock = value.document.getBlocks().get(1);

    const title = firstBlock && firstBlock.text ? firstBlock.text : "No Title";
    const subtitle =
      secondBlock && secondBlock.text ? secondBlock.text : "No Subtitle";

    return {
      title,
      subtitle,
    };
  }

  save() {
    const { value } = this.state;
    const { save, isLoading } = this.props;
    const headingValues = this.getTitle();
    const text = html.serialize(value);
    debugger;
    !isLoading && save(text, headingValues);
  }

  // Render the editor.
  render() {
    const { isLoaded } = this.state;

    return (
      <>
        {isLoaded && (
          <Editor
            {...this.props}
            placeholder="Enter some text..."
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            renderMark={renderMark}
            renderNode={renderNode}
            renderEditor={this.renderEditor}
          />
        )}
      </>
    );
  }

  renderEditor = (props, editor, next) => {
    const children = next();
    const { isLoading } = props;

    return (
      <React.Fragment>
        <Toolbar>
          <InsertImageButton editor={editor} />
        </Toolbar>
        <ControlMenu
          isLoading={isLoading}
          save={() => this.save()}
        ></ControlMenu>
        {children}

        <HoverMenu innerRef={(menu) => (this.menu = menu)} editor={editor} />
        <style jsx>
          {`
            @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
          `}
        </style>
      </React.Fragment>
    );
  };
}

/// IMAGE STUFF
const withImages = (editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");

        if (mime === "image") {
          reader.addEventListener("load", () => {
            const url = reader.result;
            insertImage(editor, url);
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const insertImage = (editor, url) => {
  const text = { text: "" };
  const image = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
};

const Element = (props) => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case "image":
      return <ImageElement {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const ImageElement = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img
          src={element.url}
          className={css`
            display: block;
            max-width: 100%;
            max-height: 20em;
            box-shadow: ${selected && focused ? "0 0 0 3px #B4D5FF" : "none"};
          `}
        />
      </div>
      {children}
    </div>
  );
};

const InsertImageButton = (editor) => {
  // const editor = useSlateStatic();
  return (
    <Button
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt("Enter the URL of the image:");
        if (!url) return;
        insertImage(editor, url);
      }}
    >
      <Icon>image</Icon>
    </Button>
  );
};

const isImageUrl = (url) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions.includes(ext);
};
