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
  Component,

} from '../../generated/schema';
import { SetToken as SetTokenContract } from '../../generated/SetToken/SetToken';

import {
  bindTokenAddress,
  fetchManager,
  fetchTokenTotalSupply,
  fetchUnderlyingComponents,
} from '../utils/setToken';
import {
  createFee,
  createManager,
  updateManager,
  createIssuance,
  createGenericId,
  createTxn,
  createIssuer,
  createComponent,
} from '../utils/create';
import {
  Address,
  BigInt,
  ByteArray,
  Bytes,
  Entity,
  ethereum,
  log,
} from '@graphprotocol/graph-ts';

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

/**
 * We should pull out all "create" functions and place them elsewhere
 * This should also entail each function being assessed for the data it is creating so that:
 * 1. the properties being save adhere to the desired index coop graph specificiation
 * 2. a. the codebase follows the D.R.Y. principle of programming. Each function is self-sufficient in regards to saving data.
 *    b. from there, entities should be shared via the entity.id relationship, as opposed to duplicating logic throughout codebase
 */

// Update this to include additional info
export function handleSetTokenIssued(event: SetTokenIssuedEvent): void {
  let id = event.params._issuer;
  let setTokenAddress = event.params._setToken;
  let timestamp = event.block.timestamp;
  let eventTxnData = event.transaction;

  const txn = createTxn(createGenericId(event), timestamp);

  txn.gasLimit = eventTxnData.gasLimit;
  txn.gasPriceInGwei = eventTxnData.gasPrice;

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

  issuanceEntity.save();

  let currentManager = Manager.load(fetchManager(setTokenAddress));

  if (currentManager == null) {
    currentManager = createManager(
      fetchManager(setTokenAddress),
      setTokenAddress
    );
  }
  // A. managerFees is equal to current feeAccrualHistory array
  let managerFees = currentManager.feeAccrualHistory;
  // B. Use managerFees variable to update manager's feeAccrualHistoryArray to include the latest Fee.id
  managerFees.push(feeEntity.id);
  // C. Set updated feeAccrualHistory onto our Manager entity by setting currentManager.feeAccrualHistory = managerFees
  currentManager.feeAccrualHistory = managerFees;
  // D. currentManager.feeAccrualHistory is now set to the managerFees array (and therefore includes the latest Fee.id)
  currentManager.save();

  log.debug('currentManager:: saved', [currentManager.id]);

  // feeEntity.manager = currentManager.id;
  feeEntity.save();

  let issuerEntity = Issuer.load(id.toHexString());
  if (issuerEntity == null) {
    issuerEntity = createIssuer(event.params._issuer);
  }

  // Same process as managerFees array above.
  let issuersTokensIssued = issuerEntity.setTokensIssued;
  // push in issuanceEntity.id
  issuersTokensIssued.push(issuanceEntity.id);
  // set updated array to equal new .setTokensIssued array
  issuerEntity.setTokensIssued = issuersTokensIssued;
  issuerEntity.save();

  log.debug('issuerEntity saved::', [issuerEntity.id]);

  let setTokenEntity = SetToken.load(setTokenAddress.toHexString());
  if (setTokenEntity == null) {
    setTokenEntity = new SetToken(setTokenAddress.toHexString());
    setTokenEntity.address = setTokenAddress;
    setTokenEntity.name = bindTokenAddress(setTokenAddress).name();
    // NESTED ENTITY --> set using entity.id
    setTokenEntity.manager = currentManager.id;
    // NESTED ENTITY --> set using entity.id
    setTokenEntity.issuer = issuerEntity.id;
    setTokenEntity.issuances = [];
    setTokenEntity.components = [];


    setTokenEntity.totalSupply = BigInt.fromI32(0);
  }

  // creating and setting component entity.
  let listComponents = fetchUnderlyingComponents(setTokenAddress);
  let existingComponents = setTokenEntity.components;
  let contract = SetTokenContract.bind(setTokenAddress);
  for (let i = 0; i < listComponents.length; i++) {
    let componentEntity = Component.load(listComponents[i].toHexString());
    if (componentEntity == null) {
      componentEntity = createComponent(
        listComponents[i].toHexString(),
        listComponents[i]
      );
    }
    let componentValue = contract.getDefaultPositionRealUnit(listComponents[i]);
    componentEntity.positionValue = componentValue;
    componentEntity.save();

    existingComponents.push(componentEntity.id);
    setTokenEntity.components = existingComponents;
  }

  /** Same process for updating nested managerFees & setTokensIssued arrays */
  // A. create variable equal to the current .issuances array
  let existingIssuances = setTokenEntity.issuances;
  // B. push the most recent issuanceEntity.id into this array
  existingIssuances.push(issuanceEntity.id);
  // C. reassign setTokenEntity.issuances to be equal to updated array (containing the entity.id added above)
  setTokenEntity.issuances = existingIssuances;
  // D. save SetToken
  setTokenEntity.save();
  log.debug('setTokenEntity saved::', [setTokenEntity.name]);
}

export function handleSetTokenRedeemed(event: SetTokenRedeemedEvent): void {
  let entity = new SetTokenRedeemed(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.setToken = event.params._setToken;
  entity.redeemer = event.params._redeemer;
  entity.to = event.params._to;
  entity.quantity = event.params._quantity;
  entity.managerFee = event.params._managerFee;
  entity.protocolFee = event.params._protocolFee;
  entity.save();
}
