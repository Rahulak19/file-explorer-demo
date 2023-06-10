import React, { useState, useRef, useEffect } from "react";
import "../styles.css";

const Folder = (props) => {
  let { handleInsertNode, handleDeleteNode, explorerData } = props;
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null
  });
  const [showEdit, setShowEdit] = useState(false);
  const [inpChange, setInpChange] = useState(false);
  const handleNewFolder = (e, isFolder) => {
    // e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder
    });
  };
  const inputElement = useRef("");

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorerData.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };
  const handleDelete = (e) => {
    console.log(
      "handle delete data : " + explorerData + " id : " + explorerData?.id
    );

    handleDeleteNode(explorerData, explorerData.id);
  };

  const handleName = (e) => {
    setShowEdit(true);
    let nameSpan = document.getElementById("folderName");
  };
  function inputNameChange(e) {
    explorerData.name = e.target.value;
    setInpChange(true);
  }
  function afterEdit(e) {
    inpChange ? setShowEdit(false) : "";
  }
  if (explorerData && explorerData?.isFolder) {
    return (
      <>
        <div style={{ marginTop: "5px" }}>
          <div className="folder" onClick={() => setExpand(!expand)}>
            <span id="folderName">
              {expand && !showEdit ? "📂" : "📁"}
              {showEdit ? (
                <input
                  type="text"
                  autoFocus
                  ref={inputElement}
                  defaultValue={explorerData.name}
                  onChange={(e) => inputNameChange(e)}
                  onBlur={(e) => afterEdit(e)}
                />
              ) : (
                explorerData.name
              )}

              {/* {expand ? "📂" : "📁"}
              {explorerData.name} */}
            </span>
            <div>
              <button onClick={(e) => handleNewFolder(e, true)}>📂+</button>
              <button onClick={(e) => handleNewFolder(e, false)}>📃+</button>
              <button onClick={(e) => handleDelete(e)}>🗑️</button>
              <button onClick={(e) => handleName(e)}>✏️</button>
            </div>
          </div>
          <div
            style={{ display: expand ? "block" : "none", paddingLeft: "20px" }}
          >
            {showInput.visible && (
              <div className="inputContainer">
                <span>{showInput.isFolder ? "📂" : "📄"}</span>
                <input
                  type="text"
                  autoFocus
                  onBlur={() => setShowInput({ ...showInput, visible: false })}
                  className="inputContainer__input"
                  onKeyDown={onAddFolder}
                />
              </div>
            )}
            {explorerData.items.map((exp) => {
              return (
                <Folder
                  handleDeleteNode={handleDeleteNode}
                  handleInsertNode={handleInsertNode}
                  explorerData={exp}
                  key={exp?.id}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  } else if (explorerData && !explorerData?.isFolder) {
    return (
      <>
        <span className="file">📄{explorerData?.name}</span>
      </>
    );
  } else {
    return <></>;
  }
};

export default Folder;
