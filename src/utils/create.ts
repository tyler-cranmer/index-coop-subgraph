import { Address, BigInt, Bytes, log, ethereum } from '@graphprotocol/graph-ts';
import {
  Manager,
  Fee,
  TokenIssuance,
  Transaction,
  Issuer,
//   Component,
  TokenRedemption
} from '../../generated/schema';

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
  return fee;
};


export const createManager = (id: string, address: Address): Manager => {
  let manager = new Manager(id);
  manager.address = address;
  manager.totalFees = BigInt.fromI32(0);
  return manager;
};


export const updateManager = (id: string, address: Address, fee: Fee): Manager => {
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

export const createIssuer = (address: Address): Issuer => {
  let newIssuer = new Issuer(address.toHexString());
  newIssuer.address = address;
  return newIssuer;
};

export const createRedemption = (
  id: string,
  redeemer: Bytes,
  quantity: BigInt,
  feeId: string,
  transaction: string
): TokenRedemption => {
  let entity = new TokenRedemption(id);
  entity.redeemer = redeemer;
  entity.quantity = quantity;
  entity.fee = feeId;
  entity.transaction = transaction;
  return entity;
};
