import {
  FeeRecipientUpdated as FeeRecipientUpdatedEvent,
  IssueFeeUpdated as IssueFeeUpdatedEvent,
  RedeemFeeUpdated as RedeemFeeUpdatedEvent,
  SetTokenIssued as SetTokenIssuedEvent,
  SetTokenRedeemed as SetTokenRedeemedEvent,
} from '../../generated/DebtIssuanceModule/DebtIssuanceModule';

import {
  SetTokenIssued as SimpleIndexTokenIssuedEvent,
  SetTokenRedeemed as SimpleIndexTokenRedeemedEvent,
} from '../../generated/BasicIssuanceModule/BasicIssuanceModule';

import {
  FeeRecipientUpdated,
  IssueFeeUpdated,
  RedeemFeeUpdated,
  SetToken,
  Manager,
  Component,
  SimpleIndexToken,
  // SimpleIndexTokenRedeemed,
} from '../../generated/schema';
import { SetToken as SetTokenContract } from '../../generated/SetToken/SetToken';

import {
  bindTokenAddress,
  fetchManager,
  fetchUnderlyingComponents,
} from '../utils/setToken';
import { Address, BigInt, log } from '@graphprotocol/graph-ts';
import { createGenericId, createComponentId } from '../utils';
import {
  createFee,
  createManager,
  createIssuance,
  createTxn,
  createRedemption,
  createComponent,
  createSimpleIssuance,
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

  log.debug('currentManager:: {}', [currentManager.id]);

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
  log.debug('setTokenEntity saved:: {}', [setTokenEntity.name]);
}

export function handleSetTokenRedeemed(event: SetTokenRedeemedEvent): void {
  const setTokenAddress = event.params._setToken;

  const txn = createTxn(
    createGenericId(event),
    event.block.timestamp,
    event.params._redeemer,
    event.params._to,
    event.transaction.gasLimit,
    event.transaction.gasPrice
  );

  txn.save();

  let redeemFee = createFee(
    createGenericId(event),
    event.block.timestamp,
    event.params._managerFee,
    event.params._protocolFee
  );
  redeemFee.transaction = txn.id;
  redeemFee.save();

  let entity = createRedemption(
    createGenericId(event),
    event.params._redeemer,
    event.params._quantity,
    redeemFee.id
  );
  entity.setToken = setTokenAddress.toHexString();
  entity.save();
}

export function handleSimpleIndexTokenIssued(
  event: SimpleIndexTokenIssuedEvent
): void {
  const BED = Address.fromString('0x2af1df3ab0ab157e1e2ad8f88a7d04fbea0c7dc6');
  const DATA = Address.fromString('0x33d63ba1e57e54779f7ddaeaa7109349344cf5f1');
  const DPI = Address.fromString('0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b');
  const MVI = Address.fromString('0x72e364F2ABdC788b7E918bc238B21f109Cd634D7');
  let setTokenAddress = event.params._setToken;

  log.debug(`SetTOKENADDRESS:: {}`, [setTokenAddress.toHexString()]);
  if (
    setTokenAddress == DPI ||
    setTokenAddress == BED ||
    setTokenAddress == DATA ||
    setTokenAddress == MVI
  ) {
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

    let issuanceEntity = createSimpleIssuance(
      createGenericId(event),
      event.params._to,
      event.params._quantity
    );

    issuanceEntity.transaction = txn.id;
    issuanceEntity.SimpleIndexToken = setTokenAddress.toHexString();
    issuanceEntity.save();

    let currentSimpleIndexContract = bindTokenAddress(setTokenAddress);
    // let currentManager = Manager.load(currentSimpleIndexContract.manager.toString());
    // if (currentManager == null) {
    //   currentManager = createManager(
    //     fetchManager(setTokenAddress),
    //     setTokenAddress
    //   );
    // }
    // currentManager.save();

    let simpleIndexTokenEntity = SimpleIndexToken.load(
      setTokenAddress.toHexString()
    );
    if (simpleIndexTokenEntity == null) {
      simpleIndexTokenEntity = new SimpleIndexToken(
        setTokenAddress.toHexString()
      );
    }
    simpleIndexTokenEntity.address = setTokenAddress;
    simpleIndexTokenEntity.name = currentSimpleIndexContract.name();
    // THIS IS WHERE MANAGER WOULD GO
    simpleIndexTokenEntity.totalSupply = currentSimpleIndexContract.totalSupply();
    simpleIndexTokenEntity.save();
  } 
}

// export function handleSimpleIndexTokenRedeemed(
//   event: SimpleIndexTokenRedeemedEvent
// ): void {
//   const setTokenAddress = event.params._setToken;
//   const txn = createTxn(
//     createGenericId(event),
//     event.block.timestamp,
//     event.params._redeemer,
//     event.params._to,
//     event.transaction.gasLimit,
//     event.transaction.gasPrice
//   );

//   txn.save();

//   let entity = createSim

// };
