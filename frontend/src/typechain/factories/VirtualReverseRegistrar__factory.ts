/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  VirtualReverseRegistrar,
  VirtualReverseRegistrarInterface,
} from "../VirtualReverseRegistrar";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract ENS",
        name: "ensAddr",
        type: "address",
      },
      {
        internalType: "contract NameResolver",
        name: "resolverAddr",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
    ],
    name: "ReverseClaimed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "claim",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "claimForAddr",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "resolver",
        type: "address",
      },
    ],
    name: "claimWithResolver",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "resolver",
        type: "address",
      },
    ],
    name: "claimWithResolverForAddr",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
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
    name: "defaultResolver",
    outputs: [
      {
        internalType: "contract NameResolver",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ens",
    outputs: [
      {
        internalType: "contract ENS",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "node",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
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
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "setName",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "setNameForAddr",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
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
  "0x60806040523480156200001157600080fd5b506040516200208538038062002085833981810160405281019062000037919062000402565b620000576200004b6200028260201b60201c565b6200028a60201b60201c565b81600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166302571be37f91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e260001b6040518263ffffffff1660e01b81526004016200015b919062000482565b60206040518083038186803b1580156200017457600080fd5b505afa15801562000189573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620001af9190620003aa565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161462000279578073ffffffffffffffffffffffffffffffffffffffff16631e83409a336040518263ffffffff1660e01b815260040162000221919062000465565b602060405180830381600087803b1580156200023c57600080fd5b505af115801562000251573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620002779190620003d6565b505b5050506200056d565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000815190506200035f8162000505565b92915050565b60008151905062000376816200051f565b92915050565b6000815190506200038d8162000539565b92915050565b600081519050620003a48162000553565b92915050565b600060208284031215620003bd57600080fd5b6000620003cd848285016200034e565b91505092915050565b600060208284031215620003e957600080fd5b6000620003f98482850162000365565b91505092915050565b600080604083850312156200041657600080fd5b600062000426858286016200037c565b9250506020620004398582860162000393565b9150509250929050565b6200044e816200049f565b82525050565b6200045f81620004b3565b82525050565b60006020820190506200047c600083018462000443565b92915050565b600060208201905062000499600083018462000454565b92915050565b6000620004ac82620004e5565b9050919050565b6000819050919050565b6000620004ca826200049f565b9050919050565b6000620004de826200049f565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b62000510816200049f565b81146200051c57600080fd5b50565b6200052a81620004b3565b81146200053657600080fd5b50565b6200054481620004bd565b81146200055057600080fd5b50565b6200055e81620004d1565b81146200056a57600080fd5b50565b611b08806200057d6000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80638d9522b81161008c578063c47f002711610066578063c47f002714610273578063da8c229e146102a3578063e0dba60f146102d3578063f2fde38b146102ef576100ea565b80638d9522b8146101f55780638da5cb5b14610225578063bffbe61c14610243576100ea565b80633f15457f116100c85780633f15457f1461017f5780634709bf4b1461019d578063715018a6146101cd578063828eab0e146101d7576100ea565b80630ccc4a7f146100ef5780630f5a54661461011f5780631e83409a1461014f575b600080fd5b6101096004803603810190610104919061132d565b61030b565b6040516101169190611650565b60405180910390f35b610139600480360381019061013491906112f1565b6104a9565b6040516101469190611650565b60405180910390f35b6101696004803603810190610164919061129f565b6104be565b6040516101769190611650565b60405180910390f35b6101876104d3565b6040516101949190611725565b60405180910390f35b6101b760048036038101906101b291906112f1565b6104f9565b6040516101c49190611650565b60405180910390f35b6101d5610697565b005b6101df6106ab565b6040516101ec9190611740565b60405180910390f35b61020f600480360381019061020a919061137c565b6106d1565b60405161021c9190611650565b60405180910390f35b61022d610a03565b60405161023a91906115f1565b60405180910390f35b61025d6004803603810190610258919061129f565b610a2c565b60405161026a9190611650565b60405180910390f35b61028d60048036038101906102889190611471565b610a89565b60405161029a9190611650565b60405180910390f35b6102bd60048036038101906102b8919061129f565b610b53565b6040516102ca9190611635565b60405180910390f35b6102ed60048036038101906102e891906113e3565b610b73565b005b6103096004803603810190610304919061129f565b610c24565b005b6000833373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614806103915750600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b806104455750600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e985e9c582336040518363ffffffff1660e01b81526004016103f492919061160c565b60206040518083038186803b15801561040c57600080fd5b505afa158015610420573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610444919061141f565b5b80610455575061045481610ca8565b5b610494576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161048b9061179b565b60405180910390fd5b61049f858585610d66565b9150509392505050565b60006104b6338484610d66565b905092915050565b60006104cc33836000610d66565b9050919050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000823373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16148061057f5750600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b806106335750600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e985e9c582336040518363ffffffff1660e01b81526004016105e292919061160c565b60206040518083038186803b1580156105fa57600080fd5b505afa15801561060e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610632919061141f565b5b80610643575061064281610ca8565b5b610682576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106799061179b565b60405180910390fd5b61068e84846000610d66565b91505092915050565b61069f610ffc565b6106a9600061107a565b565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000833373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614806107575750600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b8061080b5750600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e985e9c582336040518363ffffffff1660e01b81526004016107ba92919061160c565b60206040518083038186803b1580156107d257600080fd5b505afa1580156107e6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061080a919061141f565b5b8061081b575061081a81610ca8565b5b61085a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108519061179b565b60405180910390fd5b60006108898630600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16610d66565b9050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637737221382866040518363ffffffff1660e01b81526004016108e89291906116f5565b600060405180830381600087803b15801561090257600080fd5b505af1158015610916573d6000803e3d6000fd5b50505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166306ab59237f91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e260001b6109858961113e565b886040518463ffffffff1660e01b81526004016109a49392919061166b565b602060405180830381600087803b1580156109be57600080fd5b505af11580156109d2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109f69190611448565b5080925050509392505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60007f91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e260001b610a5b8361113e565b604051602001610a6c9291906115c5565b604051602081830303815290604052805190602001209050919050565b600080610ab93330600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16610d66565b9050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637737221382856040518363ffffffff1660e01b8152600401610b189291906116f5565b600060405180830381600087803b158015610b3257600080fd5b505af1158015610b46573d6000803e3d6000fd5b5050505080915050919050565b60016020528060005260406000206000915054906101000a900460ff1681565b610b7b610ffc565b80600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff167f4c97694570a07277810af7e5669ffd5f6a2d6b74b6e9a274b8b870fd5114cf8782604051610c189190611635565b60405180910390a25050565b610c2c610ffc565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610c9c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c939061175b565b60405180910390fd5b610ca58161107a565b50565b60008173ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff1660e01b815260040160206040518083038186803b158015610cf057600080fd5b505afa925050508015610d2157506040513d601f19601f82011682018060405250810190610d1e91906112c8565b60015b610d2e5760009050610d61565b3373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16149150505b919050565b600080610d728561113e565b905060007f91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e260001b82604051602001610dac9291906115c5565b6040516020818303038152906040528051906020012090506000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630178b8bf836040518263ffffffff1660e01b8152600401610e219190611650565b60206040518083038186803b158015610e3957600080fd5b505afa158015610e4d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e7191906112c8565b905060008073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff1614158015610edd57508173ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff1614155b9050600081610eec5782610eee565b865b9050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16635ef2c7f07f91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e260001b878b8560006040518663ffffffff1660e01b8152600401610f779594939291906116a2565b600060405180830381600087803b158015610f9157600080fd5b505af1158015610fa5573d6000803e3d6000fd5b50505050838973ffffffffffffffffffffffffffffffffffffffff167f6ada868dd3058cf77a48a74489fd7963688e5464b2b0fa957ace976243270e9260405160405180910390a383955050505050509392505050565b6110046111c6565b73ffffffffffffffffffffffffffffffffffffffff16611022610a03565b73ffffffffffffffffffffffffffffffffffffffff1614611078576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161106f9061177b565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600060285b60008111156111b9576001810390507f3031323334353637383961626364656600000000000000000000000000000000600f84161a81536010830492506001810390507f3031323334353637383961626364656600000000000000000000000000000000600f84161a8153601083049250611143565b5060286000209050919050565b600033905090565b60006111e16111dc846117e0565b6117bb565b9050828152602081018484840111156111f957600080fd5b6112048482856118e3565b509392505050565b60008135905061121b81611a8d565b92915050565b60008151905061123081611a8d565b92915050565b60008135905061124581611aa4565b92915050565b60008151905061125a81611aa4565b92915050565b60008151905061126f81611abb565b92915050565b600082601f83011261128657600080fd5b81356112968482602086016111ce565b91505092915050565b6000602082840312156112b157600080fd5b60006112bf8482850161120c565b91505092915050565b6000602082840312156112da57600080fd5b60006112e884828501611221565b91505092915050565b6000806040838503121561130457600080fd5b60006113128582860161120c565b92505060206113238582860161120c565b9150509250929050565b60008060006060848603121561134257600080fd5b60006113508682870161120c565b93505060206113618682870161120c565b92505060406113728682870161120c565b9150509250925092565b60008060006060848603121561139157600080fd5b600061139f8682870161120c565b93505060206113b08682870161120c565b925050604084013567ffffffffffffffff8111156113cd57600080fd5b6113d986828701611275565b9150509250925092565b600080604083850312156113f657600080fd5b60006114048582860161120c565b925050602061141585828601611236565b9150509250929050565b60006020828403121561143157600080fd5b600061143f8482850161124b565b91505092915050565b60006020828403121561145a57600080fd5b600061146884828501611260565b91505092915050565b60006020828403121561148357600080fd5b600082013567ffffffffffffffff81111561149d57600080fd5b6114a984828501611275565b91505092915050565b6114bb8161182d565b82525050565b6114ca8161183f565b82525050565b6114d98161184b565b82525050565b6114f06114eb8261184b565b611956565b82525050565b6114ff81611889565b82525050565b61150e816118ad565b82525050565b61151d816118d1565b82525050565b600061152e82611811565b611538818561181c565b93506115488185602086016118f2565b6115518161198f565b840191505092915050565b600061156960268361181c565b9150611574826119a0565b604082019050919050565b600061158c60208361181c565b9150611597826119ef565b602082019050919050565b60006115af60498361181c565b91506115ba82611a18565b606082019050919050565b60006115d182856114df565b6020820191506115e182846114df565b6020820191508190509392505050565b600060208201905061160660008301846114b2565b92915050565b600060408201905061162160008301856114b2565b61162e60208301846114b2565b9392505050565b600060208201905061164a60008301846114c1565b92915050565b600060208201905061166560008301846114d0565b92915050565b600060608201905061168060008301866114d0565b61168d60208301856114d0565b61169a60408301846114b2565b949350505050565b600060a0820190506116b760008301886114d0565b6116c460208301876114d0565b6116d160408301866114b2565b6116de60608301856114b2565b6116eb6080830184611514565b9695505050505050565b600060408201905061170a60008301856114d0565b818103602083015261171c8184611523565b90509392505050565b600060208201905061173a60008301846114f6565b92915050565b60006020820190506117556000830184611505565b92915050565b600060208201905081810360008301526117748161155c565b9050919050565b600060208201905081810360008301526117948161157f565b9050919050565b600060208201905081810360008301526117b4816115a2565b9050919050565b60006117c56117d6565b90506117d18282611925565b919050565b6000604051905090565b600067ffffffffffffffff8211156117fb576117fa611960565b5b6118048261198f565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600061183882611855565b9050919050565b60008115159050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600067ffffffffffffffff82169050919050565b60006118948261189b565b9050919050565b60006118a682611855565b9050919050565b60006118b8826118bf565b9050919050565b60006118ca82611855565b9050919050565b60006118dc82611875565b9050919050565b82818337600083830152505050565b60005b838110156119105780820151818401526020810190506118f5565b8381111561191f576000848401525b50505050565b61192e8261198f565b810181811067ffffffffffffffff8211171561194d5761194c611960565b5b80604052505050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f43616c6c6572206973206e6f74206120636f6e74726f6c6c6572206f7220617560008201527f74686f72697365642062792061646472657373206f722074686520616464726560208201527f737320697473656c660000000000000000000000000000000000000000000000604082015250565b611a968161182d565b8114611aa157600080fd5b50565b611aad8161183f565b8114611ab857600080fd5b50565b611ac48161184b565b8114611acf57600080fd5b5056fea264697066735822122002f0d1f3b73e7ef3ef357b20539d22fee81158d143e6b50cbc5cd81b9f5ee2a564736f6c63430008040033";

export class VirtualReverseRegistrar__factory extends ContractFactory {
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
    ensAddr: string,
    resolverAddr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<VirtualReverseRegistrar> {
    return super.deploy(
      ensAddr,
      resolverAddr,
      overrides || {}
    ) as Promise<VirtualReverseRegistrar>;
  }
  getDeployTransaction(
    ensAddr: string,
    resolverAddr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(ensAddr, resolverAddr, overrides || {});
  }
  attach(address: string): VirtualReverseRegistrar {
    return super.attach(address) as VirtualReverseRegistrar;
  }
  connect(signer: Signer): VirtualReverseRegistrar__factory {
    return super.connect(signer) as VirtualReverseRegistrar__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VirtualReverseRegistrarInterface {
    return new utils.Interface(_abi) as VirtualReverseRegistrarInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): VirtualReverseRegistrar {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as VirtualReverseRegistrar;
  }
}
