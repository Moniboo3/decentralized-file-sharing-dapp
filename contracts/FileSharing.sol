// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileSharing {
    struct File {
        string content;
        address owner;
        address[] sharedWith;
    }

    mapping(string => File) private files;
    mapping(address => string[]) private fileHashes;
    mapping(address => mapping(address => string[])) private sharedFileHashes;

    function storeFileHash(string memory fileHash) public {
        fileHashes[msg.sender].push(fileHash);
    }

    function getFileHashes() public view returns (string[] memory) {
        return fileHashes[msg.sender];
    }

    function shareFileHash(address recipient, string memory fileHash) public {
        sharedFileHashes[msg.sender][recipient].push(fileHash);
    }

    function getSharedFileHashes(address recipient) public view returns (string[] memory) {
        return sharedFileHashes[msg.sender][recipient];
    }

    function addFile(string memory _fileName, string memory _content) public {
        require(bytes(files[_fileName].content).length == 0, "File already exists");
        files[_fileName] = File(_content, msg.sender, new address[](0));
    }

    function shareFile(string memory _fileName, address _recipient) public {
        require(files[_fileName].owner == msg.sender, "Only file owner can share");
        files[_fileName].sharedWith.push(_recipient);
    }

    function getFile(string memory _fileName) public view returns (string memory) {
        require(
            files[_fileName].owner == msg.sender ||
            isSharedWith(_fileName, msg.sender),
            "Access denied"
        );
        return files[_fileName].content;
    }

    function isSharedWith(string memory _fileName, address _address) private view returns (bool) {
        for (uint256 i = 0; i < files[_fileName].sharedWith.length; i++) {
            if (files[_fileName].sharedWith[i] == _address) {
                return true;
            }
        }
        return false;
    }
}