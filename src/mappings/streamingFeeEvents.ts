import { Address, BigInt } from '@graphprotocol/graph-ts';
import { Fee, Manager, StreamingFee } from '../../generated/schema';
import { FeeActualized } from '../../generated/StreamingFeeModule/StreamingFeeModule';
import { fetchManager } from '../utils/setToken';
import { createFee, createManager } from '../utils/create';
<<<<<<< HEAD
import { createGenericId } from '../utils';
=======
>>>>>>> ff51b26

export function handleFeeActualized(event: FeeActualized): void {
  const id: string = createGenericId(event);
  const timestamp: BigInt = event.block.timestamp;
  const setTokenAddress: Address = event.params._setToken;
  const managerFee: BigInt = event.params._managerFee;
  const protocolFee: BigInt = event.params._protocolFee;
  
  // let streamingFeeEntity: StreamingFee = StreamingFee.load(id);
  // if (streamingFeeEntity == null) {
  //   streamingFeeEntity = new StreamingFee(id);
  // }
  let streamingFeeEntity: StreamingFee = new StreamingFee(id)

<<<<<<< HEAD
  streamingFeeEntity.timestamp = timestamp;
  streamingFeeEntity.setToken = setTokenAddress.toHexString();
  streamingFeeEntity.managerFee = managerFee;
  streamingFeeEntity.protocolFee = protocolFee;
  streamingFeeEntity.save();
  }
=======
  let feeEntity = createFee(event.transaction.hash.toHex() + '-' + event.logIndex.toString(), event.block.timestamp, event.params._managerFee, event.params._protocolFee)

  let currentManager = Manager.load(fetchManager(setTokenAddress))

  if (currentManager == null) {
    currentManager = createManager(fetchManager(setTokenAddress), setTokenAddress)
  }

  currentManager.save()
  // feeEntity.manager = currentManager.id;

  feeEntity.save();
}
>>>>>>> ff51b26
