const useTraverseTree = () => {
  function insertNode(tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: []
      });
      return tree;
    }
    let latestNode = [];
    latestNode = tree.items.map((obj) => {
      return insertNode(obj, folderId, item, isFolder);
    });
    return { ...tree, items: latestNode };
  }
  function deleteNode(tree, currentTree, folderId) {
    // console.log("sas", tree);
    // console.log("fid", folderId);
    console.log(" tid : " + tree?.id + " folderId  : " + folderId);
    if (tree?.id === folderId) {
      tree = null;
      return tree;
    }
    let latestNode = [];
    latestNode = tree?.items?.map((obj) => {
      console.log("Inside Map : " + JSON.stringify(obj));
      console.log("Folder : " + folderId);
      return deleteNode(obj, currentTree, folderId);
    });
    // tree = null;
    return { ...tree, items: latestNode };
  }
  function renameNode() {}
  return { insertNode, deleteNode, renameNode };
};

export default useTraverseTree;
