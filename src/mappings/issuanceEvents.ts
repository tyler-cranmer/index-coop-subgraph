import {
  FeeRecipientUpdated as FeeRecipientUpdatedEvent,
  IssueCall,
  IssueFeeUpdated as IssueFeeUpdatedEvent,
  RedeemFeeUpdated as RedeemFeeUpdatedEvent,
  SetTokenIssued as SetTokenIssuedEvent,
  SetTokenRedeemed as SetTokenRedeemedEvent,
} from '../../generated/DebtIssuanceModule/DebtIssuanceModule';
import {
  FeeRecipientUpdated,
  IssueFeeUpdated,
  RedeemFeeUpdated,
  Issuer,
  SetToken,
  SetTokenRedeemed,
  Manager,
  Fee,
  TokenIssuance,
  Transaction,
  TokenRedemption,
} from '../../generated/schema';
import { SetToken as SetTokenContract } from '../../generated/SetToken/SetToken'

import { bindTokenAddress, fetchManager, fetchTokenTotalSupply, fetchUnderlyingComponents } from '../utils/setToken';
import { Address, BigInt, ByteArray, Bytes, Entity, ethereum, log } from '@graphprotocol/graph-ts';
import { createGenericId } from '../utils';
import {
  createFee,
  createManager,
  updateManager,
  createIssuance,
  createTxn,
  createIssuer,
  createRedemption,
} from '../utils/create';

export function handleFeeRecipientUpdated(
  event: FeeRecipientUpdatedEvent
): void {
  let entity = new FeeRecipientUpdated(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity._setToken = event.params._setToken;
  entity._newFeeRecipient = event.params._newFeeRecipient;
  entity.save();
}

export function handleIssueFeeUpdated(event: IssueFeeUpdatedEvent): void {
  let entity = new IssueFeeUpdated(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity._setToken = event.params._setToken;
  entity._newIssueFee = event.params._newIssueFee;
  entity.save();
}

export function handleRedeemFeeUpdated(event: RedeemFeeUpdatedEvent): void {
  let entity = new RedeemFeeUpdated(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity._setToken = event.params._setToken;
  entity._newRedeemFee = event.params._newRedeemFee;
  entity.save();
}

export function handleSetTokenIssued(event: SetTokenIssuedEvent): void {
  let id = event.params._issuer
  let setTokenAddress = event.params._setToken
  let timestamp = event.block.timestamp;
  let eventTxnData = event.transaction;

  const txn = createTxn(createGenericId(event), timestamp, event.params._issuer, event.params._to, eventTxnData.gasLimit, eventTxnData.gasPrice)

  txn.save()

  log.debug('txnData:: saved', [txn.id])
  let feeEntity = createFee(createGenericId(event),
    timestamp, event.params._managerFee,
    event.params._protocolFee
  )

  let issuanceEntity =
    createIssuance(createGenericId(event), event.params._to, event.params._quantity)
  issuanceEntity.transaction = txn.id;

  issuanceEntity.save();

  let currentSetTokenContract = bindTokenAddress(setTokenAddress)

  let currentManager = Manager.load(currentSetTokenContract.manager.toString())

  if (currentManager == null) {
    currentManager = createManager(fetchManager(setTokenAddress), setTokenAddress)
  }
  currentManager.save()

  log.debug('currentManager:: saved', [currentManager.id])

  feeEntity.manager = currentManager.id;
  feeEntity.save()

  let setTokenEntity = SetToken.load(setTokenAddress.toHexString())
  if (setTokenEntity == null) {
    setTokenEntity = new SetToken(setTokenAddress.toHexString())
    setTokenEntity.address = setTokenAddress
    setTokenEntity.name = currentSetTokenContract.name()
    // NESTED ENTITY --> set using entity.id
    setTokenEntity.manager = currentManager.id
    // NESTED ENTITY --> set using entity.id
    setTokenEntity.totalSupply = BigInt.fromI32(0);
  }

  // D. save SetToken
  setTokenEntity.save()
  log.debug('setTokenEntity saved::', [setTokenEntity.name])

}
/**
 * type TokenRedemption @entity {
  id: ID!
  setToken: SetToken!  @derivedFrom(field: "redemptions")
  redeemer: Bytes!
  transaction: Transaction!
  quantity: BigInt!
  fee: Fee!
}
 */

export function handleSetTokenRedeemed(event: SetTokenRedeemedEvent): void {
  let redeemFee = createFee(createGenericId(event), event.block.timestamp, event.params._managerFee, event.params._protocolFee)
  redeemFee.save()

  const txn = createTxn(createGenericId(event),
    event.block.timestamp, event.params._redeemer, event.params._to, event.transaction.gasLimit, event.transaction.gasPrice)

  txn.save()

  let entity = createRedemption(createGenericId(event), event.params._redeemer, event.params._quantity, redeemFee.id,
    txn.id
  )
  entity.save();
}
