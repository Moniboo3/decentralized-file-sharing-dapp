// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileSharing {
    struct File {
        string ipfsHash;
        address owner;
        address[] sharedWith;
    }

    mapping(string => File) private files;
    mapping(address => string[]) private fileHashes;
    mapping(address => mapping(address => string[])) private sharedFileHashes;

    function storeFileHash(string memory fileHash) public {
        fileHashes[msg.sender].push(fileHash);
    }

    function getFileHashes(address account) public view returns (string[] memory) {
        return fileHashes[account];
    }

    function shareFileHash(address recipient, string memory fileHash) public {
        sharedFileHashes[msg.sender][recipient].push(fileHash);
    }

    function getSharedFileHashes(address recipient) public view returns (string[] memory) {
        return sharedFileHashes[msg.sender][recipient];
    }

    function addFile(string memory _fileName, string memory _ipfsHash) public {
        require(bytes(files[_fileName].ipfsHash).length == 0, "File already exists");
        files[_fileName] = File(_ipfsHash, msg.sender, new address[](0));
    }

    function shareFile(string memory _fileName, address _recipient) public {
        require(files[_fileName].owner == msg.sender, "Only file owner can share");
        files[_fileName].sharedWith.push(_recipient);
    }

    function getFile(string memory _fileName) public view returns (string memory) {
        require(
            files[_fileName].owner == msg.sender ||
            isSharedWith(_fileName, msg.sender) ||
            isSharedWithAccount(msg.sender, files[_fileName].ipfsHash),
            "Access denied"
        );
        return files[_fileName].ipfsHash;
    }

    function isSharedWith(string memory _fileName, address _address) private view returns (bool) {
        for (uint256 i = 0; i < files[_fileName].sharedWith.length; i++) {
            if (files[_fileName].sharedWith[i] == _address) {
                return true;
            }
        }
        return false;
    }

    function isSharedWithAccount(address account, string memory fileHash) private view returns (bool) {
        for (uint256 i = 0; i < sharedFileHashes[msg.sender][account].length; i++) {
            if (keccak256(bytes(sharedFileHashes[msg.sender][account][i])) == keccak256(bytes(fileHash))) {
                return true;
            }
        }
        return false;
    }
}