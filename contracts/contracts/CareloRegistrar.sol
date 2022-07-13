//SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;
import "@ensdomains/ens-contracts/contracts/registry/ENSRegistry.sol";
import "@ensdomains/ens-contracts/contracts/resolvers/Multicallable.sol";
import "@ensdomains/ens-contracts/contracts/resolvers/profiles/ContentHashResolver.sol";
import "@ensdomains/ens-contracts/contracts/resolvers/profiles/TextResolver.sol";
import "./VirtualBaseRegistrar.sol";

contract CareloRegistrar is
    Multicallable,
    VirtualBaseRegistrar,
    ContentHashResolver,
    TextResolver
{
    bytes4 private constant CARELO_CONTROLLER_ID =
        bytes4(
            keccak256("registerEntity(uint256,bytes,string)") ^
                keccak256("transferEntity(address,address,uint256,string)") ^
                keccak256("transferEntity(address,address,uint256)")
        );

    constructor(ENSRegistry _ens, bytes32 _baseNode)
        VirtualBaseRegistrar(_ens, _baseNode)
    {}

    function isAuthorised(bytes32 node) internal view override returns (bool) {
        address owner = ens.owner(node);
        return owner == msg.sender || isApprovedForAll(owner, msg.sender);
    }

    function registerEntity(
        uint256 id,
        bytes calldata contenthash,
        string calldata url
    ) public {
        bytes32 node = keccak256(abi.encodePacked(baseNode, bytes32(id)));
        _register(id, msg.sender, 60 * 60 * 24 * 365 * 100000, false);
        ens.setSubnodeRecord(
            baseNode,
            bytes32(id),
            msg.sender,
            address(this),
            0
        );
        hashes[node] = contenthash;
        emit ContenthashChanged(node, contenthash);

        texts[node]["URL"] = url;
        emit TextChanged(node, "URL", url);
    }

    function transferEntity(
        address from,
        address to,
        uint256 id,
        string calldata newURL
    ) public {
        bytes32 node = keccak256(abi.encodePacked(baseNode, bytes32(id)));
        safeTransferFrom(from, to, id);
        ens.setSubnodeOwner(baseNode, bytes32(id), to);

        texts[node]["URL"] = newURL;
        emit TextChanged(node, "URL", newURL);
    }

    function transferEntity(
        address from,
        address to,
        uint256 id
    ) public {
        safeTransferFrom(from, to, id);
        ens.setSubnodeOwner(baseNode, bytes32(id), to);
    }

    function supportsInterface(bytes4 interfaceID)
        public
        pure
        virtual
        override(
            Multicallable,
            ContentHashResolver,
            TextResolver,
            VirtualBaseRegistrar
        )
        returns (bool)
    {
        return
            interfaceID == CARELO_CONTROLLER_ID ||
            interfaceID == type(IMulticallable).interfaceId ||
            super.supportsInterface(interfaceID);
    }
}
