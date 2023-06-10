import { useState } from "react";
import Folder from "./components/Folder";
import useTraverseTree from "./components/hooks/use-traverse-tree";
import explorer from "./data/folderData";
import "./styles.css";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode, deleteNode } = useTraverseTree();
  // console.log(explorerData);

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };
  const handleDeleteNode = (currentData, folderId) => {
    const finalTreeDelete = deleteNode(explorerData, currentData, folderId);
    setExplorerData(finalTreeDelete);
  };

  return (
    <div className="App">
      <Folder
        handleDeleteNode={handleDeleteNode}
        handleInsertNode={handleInsertNode}
        explorerData={explorerData}
      />
    </div>
  );
}
