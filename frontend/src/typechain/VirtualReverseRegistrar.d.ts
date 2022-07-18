/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface VirtualReverseRegistrarInterface extends ethers.utils.Interface {
  functions: {
    "claim(address)": FunctionFragment;
    "claimForAddr(address,address)": FunctionFragment;
    "claimWithResolver(address,address)": FunctionFragment;
    "claimWithResolverForAddr(address,address,address)": FunctionFragment;
    "controllers(address)": FunctionFragment;
    "defaultResolver()": FunctionFragment;
    "ens()": FunctionFragment;
    "node(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setController(address,bool)": FunctionFragment;
    "setName(string)": FunctionFragment;
    "setNameForAddr(address,address,string)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "claim", values: [string]): string;
  encodeFunctionData(
    functionFragment: "claimForAddr",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "claimWithResolver",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "claimWithResolverForAddr",
    values: [string, string, string]
  ): string;
  encodeFunctionData(functionFragment: "controllers", values: [string]): string;
  encodeFunctionData(
    functionFragment: "defaultResolver",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "ens", values?: undefined): string;
  encodeFunctionData(functionFragment: "node", values: [string]): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setController",
    values: [string, boolean]
  ): string;
  encodeFunctionData(functionFragment: "setName", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setNameForAddr",
    values: [string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimForAddr",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimWithResolver",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimWithResolverForAddr",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "controllers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "defaultResolver",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "ens", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "node", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setController",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setName", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setNameForAddr",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "ControllerChanged(address,bool)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "ReverseClaimed(address,bytes32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ControllerChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ReverseClaimed"): EventFragment;
}

export type ControllerChangedEvent = TypedEvent<
  [string, boolean] & { controller: string; enabled: boolean }
>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export type ReverseClaimedEvent = TypedEvent<
  [string, string] & { addr: string; node: string }
>;

export class VirtualReverseRegistrar extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: VirtualReverseRegistrarInterface;

  functions: {
    claim(
      owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimForAddr(
      addr: string,
      owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimWithResolver(
      owner: string,
      resolver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimWithResolverForAddr(
      addr: string,
      owner: string,
      resolver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    controllers(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    defaultResolver(overrides?: CallOverrides): Promise<[string]>;

    ens(overrides?: CallOverrides): Promise<[string]>;

    node(addr: string, overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setController(
      controller: string,
      enabled: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setName(
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setNameForAddr(
      addr: string,
      owner: string,
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  claim(
    owner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimForAddr(
    addr: string,
    owner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimWithResolver(
    owner: string,
    resolver: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimWithResolverForAddr(
    addr: string,
    owner: string,
    resolver: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  controllers(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  defaultResolver(overrides?: CallOverrides): Promise<string>;

  ens(overrides?: CallOverrides): Promise<string>;

  node(addr: string, overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setController(
    controller: string,
    enabled: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setName(
    name: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setNameForAddr(
    addr: string,
    owner: string,
    name: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    claim(owner: string, overrides?: CallOverrides): Promise<string>;

    claimForAddr(
      addr: string,
      owner: string,
      overrides?: CallOverrides
    ): Promise<string>;

    claimWithResolver(
      owner: string,
      resolver: string,
      overrides?: CallOverrides
    ): Promise<string>;

    claimWithResolverForAddr(
      addr: string,
      owner: string,
      resolver: string,
      overrides?: CallOverrides
    ): Promise<string>;

    controllers(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    defaultResolver(overrides?: CallOverrides): Promise<string>;

    ens(overrides?: CallOverrides): Promise<string>;

    node(addr: string, overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setController(
      controller: string,
      enabled: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    setName(name: string, overrides?: CallOverrides): Promise<string>;

    setNameForAddr(
      addr: string,
      owner: string,
      name: string,
      overrides?: CallOverrides
    ): Promise<string>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ControllerChanged(address,bool)"(
      controller?: string | null,
      enabled?: null
    ): TypedEventFilter<
      [string, boolean],
      { controller: string; enabled: boolean }
    >;

    ControllerChanged(
      controller?: string | null,
      enabled?: null
    ): TypedEventFilter<
      [string, boolean],
      { controller: string; enabled: boolean }
    >;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    "ReverseClaimed(address,bytes32)"(
      addr?: string | null,
      node?: BytesLike | null
    ): TypedEventFilter<[string, string], { addr: string; node: string }>;

    ReverseClaimed(
      addr?: string | null,
      node?: BytesLike | null
    ): TypedEventFilter<[string, string], { addr: string; node: string }>;
  };

  estimateGas: {
    claim(
      owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimForAddr(
      addr: string,
      owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimWithResolver(
      owner: string,
      resolver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimWithResolverForAddr(
      addr: string,
      owner: string,
      resolver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    controllers(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    defaultResolver(overrides?: CallOverrides): Promise<BigNumber>;

    ens(overrides?: CallOverrides): Promise<BigNumber>;

    node(addr: string, overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setController(
      controller: string,
      enabled: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setName(
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setNameForAddr(
      addr: string,
      owner: string,
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    claim(
      owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimForAddr(
      addr: string,
      owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimWithResolver(
      owner: string,
      resolver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimWithResolverForAddr(
      addr: string,
      owner: string,
      resolver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    controllers(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    defaultResolver(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ens(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    node(
      addr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setController(
      controller: string,
      enabled: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setName(
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setNameForAddr(
      addr: string,
      owner: string,
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
