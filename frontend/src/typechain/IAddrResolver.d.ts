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
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface IAddrResolverInterface extends ethers.utils.Interface {
  functions: {
    "addr(bytes32)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "addr", values: [BytesLike]): string;

  decodeFunctionResult(functionFragment: "addr", data: BytesLike): Result;

  events: {
    "AddrChanged(bytes32,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AddrChanged"): EventFragment;
}

export type AddrChangedEvent = TypedEvent<
  [string, string] & { node: string; a: string }
>;

export class IAddrResolver extends BaseContract {
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

  interface: IAddrResolverInterface;

  functions: {
    addr(node: BytesLike, overrides?: CallOverrides): Promise<[string]>;
  };

  addr(node: BytesLike, overrides?: CallOverrides): Promise<string>;

  callStatic: {
    addr(node: BytesLike, overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "AddrChanged(bytes32,address)"(
      node?: BytesLike | null,
      a?: null
    ): TypedEventFilter<[string, string], { node: string; a: string }>;

    AddrChanged(
      node?: BytesLike | null,
      a?: null
    ): TypedEventFilter<[string, string], { node: string; a: string }>;
  };

  estimateGas: {
    addr(node: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    addr(
      node: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}