import React, { Component } from "react";
import { getBlogDetail, saveBlogDetail } from "../../api/index";
import { Prompt } from "react-router-dom";
import { Modal } from "antd";

export default class AddBlog extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      content: "",
      showPrompt: true,
      editor: null,
    };
  }
  componentDidMount() {
    getBlogDetail({
      id: this.props.match.params.id,
    }).then((res) => {
      if (res.code === 200) {
        this.setState({
          content: res.data.content,
        });
      }
    });
    this.setState({
      editor: window.editormd("editormd", {
        height: "calc(100% - 22px - 32px)",
        onchange() {
          if (this.state.editor) {
            this.state.editor.getMarkdown();
          }
        },
      }),
    });
  }
  onChange() {}

  render() {
    return (
      <>
        <Prompt
          when={this.state.showPrompt}
          message={(location) => {
            console.log(location);
            Modal.confirm({
              title: "是否保存当前修改？",
              onCancel: () => {
                this.setState(
                  {
                    showPrompt: false,
                  },
                  () => {
                    this.props.history.push({
                      pathname: location.pathname,
                    });
                  }
                );
              },
              onOk: () => {
                saveBlogDetail({
                  id: this.props.match.params.id,
                  content: this.state.editor.getMarkdown(),
                }).then((res) => {
                  if (res.code === 200) {
                    this.setState(
                      {
                        showPrompt: false,
                      },
                      () => {
                        this.props.history.push({
                          pathname: location.pathname,
                        });
                      }
                    );
                  }
                });
              },
            });
            return false;
          }}
        ></Prompt>
        <div id="editormd">
          <textarea
            value={this.state.content}
            onChange={this.onChange}
            style={{ display: "none" }}
          ></textarea>
        </div>
      </>
    );
  }
}
