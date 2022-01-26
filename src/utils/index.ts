<<<<<<< HEAD
import { ethereum, Address } from "@graphprotocol/graph-ts";
=======
import { ethereum } from "@graphprotocol/graph-ts";
>>>>>>> ff51b26

export function isNullEthValue(value: string): boolean {
    return value == '0x0000000000000000000000000000000000000000000000000000000000000001'
  }

export const createGenericId = (event: ethereum.Event): string =>
<<<<<<< HEAD
  '' + event.transaction.hash.toHex() + '-' + event.logIndex.toString() + '';

export const createComponentId = (
         address: Address,
         timestamp: string
       ): string => '' + address.toHex() + '-' + timestamp + '';
=======
'' + event.transaction.hash.toHex() + '-' + event.logIndex.toString() + '';
>>>>>>> ff51b26
