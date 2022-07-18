/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Controllable, ControllableInterface } from "../Controllable";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "controller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "enabled",
        type: "bool",
      },
    ],
    name: "ControllerChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "controllers",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "controller",
        type: "address",
      },
      {
        internalType: "bool",
        name: "enabled",
        type: "bool",
      },
    ],
    name: "setController",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061002d61002261003260201b60201c565b61003a60201b60201c565b6100fe565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b61065c8061010d6000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c8063715018a61461005c5780638da5cb5b14610066578063da8c229e14610084578063e0dba60f146100b4578063f2fde38b146100d0575b600080fd5b6100646100ec565b005b61006e610100565b60405161007b91906104bb565b60405180910390f35b61009e600480360381019061009991906103f2565b610129565b6040516100ab91906104d6565b60405180910390f35b6100ce60048036038101906100c9919061041b565b610149565b005b6100ea60048036038101906100e591906103f2565b6101fa565b005b6100f461027e565b6100fe60006102fc565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60016020528060005260406000206000915054906101000a900460ff1681565b61015161027e565b80600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff167f4c97694570a07277810af7e5669ffd5f6a2d6b74b6e9a274b8b870fd5114cf87826040516101ee91906104d6565b60405180910390a25050565b61020261027e565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610272576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610269906104f1565b60405180910390fd5b61027b816102fc565b50565b6102866103c0565b73ffffffffffffffffffffffffffffffffffffffff166102a4610100565b73ffffffffffffffffffffffffffffffffffffffff16146102fa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102f190610511565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b6000813590506103d7816105f8565b92915050565b6000813590506103ec8161060f565b92915050565b60006020828403121561040457600080fd5b6000610412848285016103c8565b91505092915050565b6000806040838503121561042e57600080fd5b600061043c858286016103c8565b925050602061044d858286016103dd565b9150509250929050565b61046081610542565b82525050565b61046f81610554565b82525050565b6000610482602683610531565b915061048d82610580565b604082019050919050565b60006104a5602083610531565b91506104b0826105cf565b602082019050919050565b60006020820190506104d06000830184610457565b92915050565b60006020820190506104eb6000830184610466565b92915050565b6000602082019050818103600083015261050a81610475565b9050919050565b6000602082019050818103600083015261052a81610498565b9050919050565b600082825260208201905092915050565b600061054d82610560565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b61060181610542565b811461060c57600080fd5b50565b61061881610554565b811461062357600080fd5b5056fea2646970667358221220ea3b256d2f52d66c0759637f49e7ebb7f3f69b0ba36f20df21da67e06eb8e37564736f6c63430008040033";

export class Controllable__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Controllable> {
    return super.deploy(overrides || {}) as Promise<Controllable>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Controllable {
    return super.attach(address) as Controllable;
  }
  connect(signer: Signer): Controllable__factory {
    return super.connect(signer) as Controllable__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ControllableInterface {
    return new utils.Interface(_abi) as ControllableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Controllable {
    return new Contract(address, _abi, signerOrProvider) as Controllable;
  }
}
