import { ethereum, Address } from "@graphprotocol/graph-ts";

export function isNullEthValue(value: string): boolean {
    return value == '0x0000000000000000000000000000000000000000000000000000000000000001'
  }

export const createGenericId = (event: ethereum.Event): string =>
  '' + event.transaction.hash.toHex() + '-' + event.logIndex.toString() + '';

export const createComponentId = (
         address: Address,
         timestamp: string
       ): string => '' + address.toHex() + '-' + timestamp + '';
