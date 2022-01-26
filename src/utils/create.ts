<<<<<<< HEAD
import { Address, BigInt, Bytes, log, ethereum } from '@graphprotocol/graph-ts';
import {
  Manager,
  Fee,
  TokenIssuance,
  Transaction,
  Component,
  TokenRedemption,
  RebalanceDetails,
  SimpleIndexTokenIssuance,
  TotalSupply,
  TotalSupplySI
} from '../../generated/schema';

export const createTotalSupply = (
  id: string,
  timestamp: BigInt,
  quantity: BigInt,
  setToken: string
): TotalSupply => {
  let totalSupply = new TotalSupply(id);
  totalSupply.timestamp = timestamp;
  totalSupply.quantity = quantity;
  totalSupply.setToken = setToken;
  return totalSupply;
};
=======
import {
  Address,
  BigInt,
  Bytes,
    log,
  ethereum
} from '@graphprotocol/graph-ts';
import { Manager, Fee, TokenIssuance, Transaction, Issuer } from '../../generated/schema';

>>>>>>> ff51b26

export const createFee = (
  id: string,
  timestamp: BigInt,
  managerPayout: BigInt,
  protocolPayout: BigInt
): Fee => {
  let fee = new Fee(id);
  fee.timestamp = timestamp;
  fee.managerPayout = managerPayout;
  fee.protocolPayout = protocolPayout;
<<<<<<< HEAD
=======
  fee.transaction = id;
>>>>>>> ff51b26
  return fee;
};

export const createManager = (id: string, address: Address): Manager => {
  let manager = new Manager(id);
<<<<<<< HEAD
  manager.setTokenAddress = address;
  manager.totalFees = BigInt.fromI32(0);
  // manager.setToken = address.toHexString();
=======
  manager.address = address;
  manager.feeAccrualHistory = [];
  manager.totalFees = BigInt.fromI32(0);
>>>>>>> ff51b26
  return manager;
};

export const updateManager = (
  id: string,
  address: Address,
  fee: Fee
): Manager => {
  let manager = Manager.load(id);
  return manager as Manager;
};

export const createIssuance = (
  id: string,
  buyerAddress: Bytes,
  quantity: BigInt
): TokenIssuance => {
  let issuanceEntity = new TokenIssuance(id);
  issuanceEntity.buyerAddress = buyerAddress;
  issuanceEntity.quantity = quantity;
  return issuanceEntity;
};

<<<<<<< HEAD

export const createTxn = (
  id: string,
  timestamp: BigInt,
  from: Bytes,
  to: Bytes,
  gasLimit: BigInt,
  gasPrice: BigInt
): Transaction => {
  let txnObject = new Transaction(id);
  txnObject.from = from;
  txnObject.to = to;
  txnObject.timestamp = timestamp;
  txnObject.gasLimit = gasLimit;
  txnObject.gasPriceInGwei = gasPrice;
  return txnObject;
};

export const createRedemption = (
  id: string,
  redeemer: Bytes,
  quantity: BigInt,
  feeId: string
  // transaction: string
): TokenRedemption => {
  let entity = new TokenRedemption(id);
  entity.redeemer = redeemer;
  entity.quantity = quantity;
  entity.fee = feeId;
  // entity.transaction = transaction;
  return entity;
};

export const createComponent = (id: string, address: Address): Component => {
  let component = new Component(id);
  component.address = address;
  component.positionValue = BigInt.fromI32(0);

  return component;
};

export const createRebalanceDetails = (
  id: string,
  _currentLeverageRatio: BigInt,
  _newLeverageRatio: BigInt,
  _totalRebalanceNotional: BigInt,
  _chunkRebalanceNotional: BigInt
): RebalanceDetails => {
  let entity = new RebalanceDetails(id);
  entity.currentLeverageRatio = _currentLeverageRatio;
  entity.newLeverageRatio = _newLeverageRatio;
  entity.chunkRebalanceNotional = _chunkRebalanceNotional;
  entity.totalRebalanceNotional = _totalRebalanceNotional;
  return entity;
};


/* Simple Index Token Helper Functions */
export const createSimpleIssuance = (
  id: string,
  buyerAddress: Bytes,
  quantity: BigInt
): SimpleIndexTokenIssuance => {
  let issuanceEntity = new SimpleIndexTokenIssuance(id);
  issuanceEntity.buyerAddress = buyerAddress;
  issuanceEntity.quantity = quantity;
  return issuanceEntity;
};


export const createTotalSupplySI = (
  id: string,
  timestamp: BigInt,
  quantity: BigInt,
  setToken: string
): TotalSupplySI => {
  let totalSupply = new TotalSupplySI(id);
  totalSupply.timestamp = timestamp;
  totalSupply.quantity = quantity;
  totalSupply.setToken = setToken;
  return totalSupply;
};
=======
export const createGenericId = (event: ethereum.Event): string =>
  '' + event.transaction.hash.toHex() + '-' + event.logIndex.toString() + '';

export const createTxn = (id: string, timestamp: BigInt): Transaction => {
  let txnObject = new Transaction(id);
  txnObject.timestamp = timestamp;
  return txnObject;
};

export const createIssuer = (address: Address): Issuer => {
  let newIssuer = new Issuer(address.toHexString());
  newIssuer.address = address;
  newIssuer.setTokensIssued = [];
  return newIssuer;
};

>>>>>>> ff51b26
