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
import { createFee, createManager, updateManager, createIssuance, createGenericId, createTxn, createIssuer } from '../utils/create';
import { Address, BigInt, ByteArray, Bytes, Entity, ethereum, log } from '@graphprotocol/graph-ts';
import { createGenericId } from '../utils';

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

<<<<<<< HEAD
=======
export const createFee = (id: string, timestamp: BigInt, managerPayout: BigInt, protocolPayout: BigInt): Fee => {
  let fee = new Fee(id)
  fee.timestamp = timestamp;
  fee.managerPayout = managerPayout;
  fee.protocolPayout = protocolPayout;
  return fee
}

export const createManager = (id: string, address: Address): Manager => {
  let manager = new Manager(id)
  manager.address = address;
  manager.totalFees = BigInt.fromI32(0)
  return manager
}

const updateManager = (id: string, address: Address,
  fee: Fee): Manager => {
  let manager = Manager.load(id)
  return manager as Manager
}

const createIssuance = (id: string, buyerAddress: Bytes, quantity: BigInt): TokenIssuance => {
  let issuanceEntity = new TokenIssuance(id)
  issuanceEntity.buyerAddress = buyerAddress;
  issuanceEntity.quantity = quantity
  return issuanceEntity
}

>>>>>>> 2b4836b (removed code for nesting entities within one another in exchange for reverse lookups via derivedFrom. update schema as per yesterdays discussion and cleaned up code)
/**
 * We should pull out all "create" functions and place them elsewhere
 * This should also entail each function being assessed for the data it is creating so that:
 * 1. the properties being save adhere to the desired index coop graph specificiation
 * 2. a. the codebase follows the D.R.Y. principle of programming. Each function is self-sufficient in regards to saving data. 
 *    b. from there, entities should be shared via the entity.id relationship, as opposed to duplicating logic throughout codebase
 */

// Update this to include additional info
<<<<<<< HEAD
=======
const createTxn = (id: string, timestamp: BigInt, from: Bytes
  , to: Bytes, gasLimit: BigInt, gasPrice: BigInt): Transaction => {
  let txnObject = new Transaction(id)
  txnObject.from = from
  txnObject.to = to
  txnObject.timestamp = timestamp;

  txnObject.gasLimit = gasLimit;
  txnObject.gasPriceInGwei = gasPrice;
  return txnObject
}

const createIssuer = (address: Address): Issuer => {
  let newIssuer = new Issuer(address.toHexString())
  newIssuer.address = address;
  return newIssuer
}

>>>>>>> 2b4836b (removed code for nesting entities within one another in exchange for reverse lookups via derivedFrom. update schema as per yesterdays discussion and cleaned up code)
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
    event.params._protocolFee, 
  )


  let issuanceEntity =
    createIssuance(createGenericId(event), event.params._to, event.params._quantity)
  issuanceEntity.transaction = txn.id;

  issuanceEntity.save();



  let currentManager = Manager.load(fetchManager(setTokenAddress))

  if (currentManager == null) {
    currentManager = createManager(fetchManager(setTokenAddress), setTokenAddress)
  }
  currentManager.save()

  log.debug('currentManager:: saved', [currentManager.id])

  // feeEntity.manager = currentManager.id;
  feeEntity.save()

  let issuerEntity = Issuer.load(id.toHexString())
  if (issuerEntity == null) {
    issuerEntity = createIssuer(event.params._issuer)
  }

<<<<<<< HEAD
  // Same process as managerFees array above.
  let issuersTokensIssued = issuerEntity.setTokensIssued
  // push in issuanceEntity.id
  issuersTokensIssued.push(issuanceEntity.id)
  // set updated array to equal new .setTokensIssued array
  issuerEntity.setTokensIssued = issuersTokensIssued
=======
>>>>>>> 2b4836b (removed code for nesting entities within one another in exchange for reverse lookups via derivedFrom. update schema as per yesterdays discussion and cleaned up code)
  issuerEntity.save()

  log.debug('issuerEntity saved::', [issuerEntity.id])


  let setTokenEntity = SetToken.load(setTokenAddress.toHexString())
  if (setTokenEntity == null) {
    setTokenEntity = new SetToken(setTokenAddress.toHexString())
    setTokenEntity.address = setTokenAddress
    setTokenEntity.name = bindTokenAddress(setTokenAddress).name()
    // NESTED ENTITY --> set using entity.id
    setTokenEntity.manager = currentManager.id
    // NESTED ENTITY --> set using entity.id
<<<<<<< HEAD
    setTokenEntity.issuer = issuerEntity.id
    setTokenEntity.issuances = []
    // Tyler

    setTokenEntity.comp = [];

    setTokenEntity.totalSupply = BigInt.fromI32(0);
  }
 
  // let existingComp = []
  let temp = fetchUnderlyingComponents(setTokenAddress);
 log.debug('setTokenEntity saved::', temp);

  /** Same process for updating nested managerFees & setTokensIssued arrays */
  // A. create variable equal to the current .issuances array
  let existingIssuances = setTokenEntity.issuances;
  // B. push the most recent issuanceEntity.id into this array
  existingIssuances.push(issuanceEntity.id);
  // C. reassign setTokenEntity.issuances to be equal to updated array (containing the entity.id added above)
  setTokenEntity.issuances = existingIssuances;
=======
    setTokenEntity.totalSupply = BigInt.fromI32(0);
  }

>>>>>>> 2b4836b (removed code for nesting entities within one another in exchange for reverse lookups via derivedFrom. update schema as per yesterdays discussion and cleaned up code)
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

const createRedemption = (id: string, redeemer: Bytes, quantity: BigInt, feeId: string, transaction: string): TokenRedemption => {
  let entity = new TokenRedemption(id)
  entity.redeemer = redeemer;
  entity.quantity = quantity;
  entity.fee = feeId
  entity.transaction = transaction;
  return entity
}
export function handleSetTokenRedeemed(event: SetTokenRedeemedEvent): void {
<<<<<<< HEAD
  let entity = new SetTokenRedeemed(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.setToken = event.params._setToken;
  entity.redeemer = event.params._redeemer;
  entity.to = event.params._to;
  entity.quantity = event.params._quantity;
  entity.managerFee = event.params._managerFee;
  entity.protocolFee = event.params._protocolFee;
=======
  let redeemFee = createFee(createGenericId(event), event.block.timestamp, event.params._managerFee, event.params._protocolFee)
  redeemFee.save()

  const txn = createTxn(createGenericId(event),
    event.block.timestamp, event.params._redeemer, event.params._to, event.transaction.gasLimit, event.transaction.gasPrice)

  txn.save()

  let entity = createRedemption(createGenericId(event), event.params._redeemer, event.params._quantity, redeemFee.id,
    txn.id
  )
>>>>>>> 2b4836b (removed code for nesting entities within one another in exchange for reverse lookups via derivedFrom. update schema as per yesterdays discussion and cleaned up code)
  entity.save();
}
