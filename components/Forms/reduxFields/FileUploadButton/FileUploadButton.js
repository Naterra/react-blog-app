import React, { Component } from "react";



class FileUploadButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file_name: null
    };
    // Events
    this.handleChange = this.handleChange.bind(this);


    // Refs
    this.inputFile = React.createRef();
  }

  handleChange(e) {
    const { input: { onChange } } = this.props;
    const file = e.target.files[0];
    console.warn("__handleChange::file", file);

    // Update current input value
    onChange(file);
    // onChange({file, name:file.name});

  }



  render() {
    const { input, btnTitle, label, resetKey } = this.props;
    const { value, ...inputProps } = this.props.input;
    // const fileName = this.state.file_name ? <span style={{ display: "inline-block", marginRight: "20px", transition: "all 0.5s ease" }}>{this.state.file_name || ""}</span> : "";

    return (
      <div className="file-field input-field">
        <div className="btn">
          <span>{btnTitle || 'File'}</span>
          <input  {...inputProps} type="file"  onChange={e=>this.handleChange(e)} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>

        {/*{value && value != "string" && value != "" ? (*/}
          {/*<i className="material-icons small" style={{ color: "#226ba5", verticalAlign: "text-top", marginRight: "5px" }}>*/}
            {/*insert_drive_file*/}
          {/*</i>*/}
        {/*) : ""}*/}
        {/*{fileName}*/}

        {/*<button className="btn btn-success" style={{ display: "inline-block" }} onClick={this.openFileExplorer}>*/}
          {/*Chose files to upload*/}
        {/*</button>*/}
        {/*<input {...inputProps} key={resetKey} type="file" onChange={this.handleChange} ref={this.inputFile} style={{ display: "none" }} />*/}
      </div>
    );
  }
}

export default  FileUploadButton;
