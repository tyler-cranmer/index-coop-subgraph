/* eslint-disable prefer-const */
import {
  Address,
  BigInt,
  ByteArray,
  Bytes,
  log,
} from '@graphprotocol/graph-ts';
import { SetToken } from '../../generated/SetToken/SetToken';
import { BaseManagerV1 } from '../../generated/FlexibleLeverageStrategyExtension/BaseManagerV1';

// fetches the basemanager token address for FLIadapters"
export function fetchBaseManagerSetToken(baseManagerAddress: Address): string {
  let baseMan = BaseManagerV1.bind(baseManagerAddress);
  let token = baseMan.setToken();

  return token.toHexString();
}

export function fetchTokenTotalSupply(tokenAddress: Address): BigInt {
  let contract = SetToken.bind(tokenAddress);
  let totalSupplyResult = contract.try_totalSupply();

  // [TG] no idea as to how i32 is doing here but assuming it allows typecasting from different int to a uint32
  // removing `as i32` from the code below breaks build
  return totalSupplyResult.value;
}

export const bindTokenAddress = (address: Address): SetToken =>
  SetToken.bind(address);

export function fetchUnderlyingComponents(tokenAddress: Address): Address[] {
  let contract = SetToken.bind(tokenAddress);
  let tokenComponentsResult = contract.getComponents(); // returns Address []
  return tokenComponentsResult;
}

export function fetchManager(tokenAddress: Address): string {
  let contract = SetToken.bind(tokenAddress);
  // msg below is shown in vscode. reading it we can infer the result t
  // intellisence: (method) SetToken.5(): ethereum.CallResult<Address>
  let result = contract.manager();
  // convert from Address to string so it can be used within Manager.load(string)
  return result.toHexString();
}

export function getIssuerAddress(tokenAddress: Address): string {
  let contract = SetToken.bind(tokenAddress);
  // msg below is shown in vscode. reading it we can infer the result t
  // intellisence: (method) SetToken.try_manager(): ethereum.CallResult<Address>
  let result = contract.try_controller();
  // convert from Address to string so it can be used within Manager.load(string)
  // toHexString() needed for UTF character reasons
  // TODO: !result.reverted ? result.value : fallback hex string
  return result.value.toHexString();
}
