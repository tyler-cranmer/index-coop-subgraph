import {
  FeeRecipientUpdated as FeeRecipientUpdatedEvent,
  IssueFeeUpdated as IssueFeeUpdatedEvent,
  RedeemFeeUpdated as RedeemFeeUpdatedEvent,
  SetTokenIssued as SetTokenIssuedEvent,
  SetTokenRedeemed as SetTokenRedeemedEvent,
} from '../../generated/DebtIssuanceModule/DebtIssuanceModule';

import { SetTokenIssued as BasicSetTokenIssuedEvent } from '../../generated/DebtIssuanceModule/BasicIssuanceModule';
import {
  FeeRecipientUpdated,
  IssueFeeUpdated,
  RedeemFeeUpdated,
  SetToken,
  Manager,
  Component,
} from '../../generated/schema';
import { SetToken as SetTokenContract } from '../../generated/SetToken/SetToken';

import {
  bindTokenAddress,
  fetchManager,
  fetchUnderlyingComponents,
} from '../utils/setToken';
import { BigInt, log } from '@graphprotocol/graph-ts';
import { createGenericId, createComponentId } from '../utils';
import {
  createFee,
  createManager,
  createIssuance,
  createTxn,
  createRedemption,
  createComponent,
} from '../utils/create';

export function handleFeeRecipientUpdated(
  event: FeeRecipientUpdatedEvent
): void {
  let entity = new FeeRecipientUpdated(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.setToken = event.params._setToken;
  entity.newFeeRecipient = event.params._newFeeRecipient;
  entity.save();
}

export function handleIssueFeeUpdated(event: IssueFeeUpdatedEvent): void {
  let entity = new IssueFeeUpdated(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.setToken = event.params._setToken;
  entity.newIssueFee = event.params._newIssueFee;
  entity.save();
}

export function handleRedeemFeeUpdated(event: RedeemFeeUpdatedEvent): void {
  let entity = new RedeemFeeUpdated(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.setToken = event.params._setToken;
  entity.newRedeemFee = event.params._newRedeemFee;
  entity.save();
}

export function handleSetTokenIssued(event: SetTokenIssuedEvent): void {
  let id = event.params._issuer;
  let setTokenAddress = event.params._setToken;
  let timestamp = event.block.timestamp;
  let eventTxnData = event.transaction;

  const txn = createTxn(
    createGenericId(event),
    timestamp,
    event.params._issuer,
    event.params._to,
    eventTxnData.gasLimit,
    eventTxnData.gasPrice
  );

  txn.save();

  log.debug('txnData:: saved', [txn.id]);
  let feeEntity = createFee(
    createGenericId(event),
    timestamp,
    event.params._managerFee,
    event.params._protocolFee
  );

  let issuanceEntity = createIssuance(
    createGenericId(event),
    event.params._to,
    event.params._quantity
  );
  issuanceEntity.transaction = txn.id;
  issuanceEntity.setToken = setTokenAddress.toHexString();

  issuanceEntity.save();

  let currentSetTokenContract = bindTokenAddress(setTokenAddress);

  let currentManager = Manager.load(currentSetTokenContract.manager.toString());

  if (currentManager == null) {
    currentManager = createManager(
      fetchManager(setTokenAddress),
      setTokenAddress
    );
  }
  currentManager.save();

  log.debug('currentManager:: saved', [currentManager.id]);

  feeEntity.manager = currentManager.id;
  feeEntity.save();

  let setTokenEntity = SetToken.load(setTokenAddress.toHexString());
  if (setTokenEntity == null) {
    setTokenEntity = new SetToken(setTokenAddress.toHexString());
    setTokenEntity.address = setTokenAddress;
    setTokenEntity.name = currentSetTokenContract.name();
    // NESTED ENTITY --> set using entity.id
    setTokenEntity.manager = currentManager.id;
    // NESTED ENTITY --> set using entity.id
    setTokenEntity.totalSupply = BigInt.fromI32(0);
    setTokenEntity.components = [];
  }

  // creating and setting component entity.
  let listComponents = fetchUnderlyingComponents(setTokenAddress);
  let existingComponents = setTokenEntity.components;
  let contract = SetTokenContract.bind(setTokenAddress);
  for (let i = 0; i < listComponents.length; i++) {
    let componentEntity = Component.load(listComponents[i].toHexString());
    if (componentEntity == null) {
      componentEntity = createComponent(
        createComponentId(listComponents[i], timestamp.toHexString()),
        listComponents[i]
      );
    }
    let componentValue = contract.getDefaultPositionRealUnit(listComponents[i]);
    componentEntity.positionValue = componentValue;
    componentEntity.save();

    existingComponents.push(componentEntity.id);
    setTokenEntity.components = existingComponents;
  }

  // D. save SetToken
  setTokenEntity.save();
  log.debug('setTokenEntity saved::', [setTokenEntity.name]);
}



export function handleSetTokenRedeemed(event: SetTokenRedeemedEvent): void {
  const setTokenAddress: string = `0xaa6e8127831c9de45ae56bb1b0d4d4da6e5665bd`; 
  let redeemFee = createFee(
    createGenericId(event),
    event.block.timestamp,
    event.params._managerFee,
    event.params._protocolFee
  );
  redeemFee.save();

  const txn = createTxn(
    createGenericId(event),
    event.block.timestamp,
    event.params._redeemer,
    event.params._to,
    event.transaction.gasLimit,
    event.transaction.gasPrice
  );

  txn.save();

  let entity = createRedemption(
    createGenericId(event),
    event.params._redeemer,
    event.params._quantity,
    redeemFee.id,
    txn.id
  );
  entity.setToken = setTokenAddress;
  entity.save();
}
