import {
  Address,
  BigInt,
  Bytes,
    log,
  ethereum
} from '@graphprotocol/graph-ts';
import { Manager, Fee, TokenIssuance, Transaction, Issuer, Component } from '../../generated/schema';

export const createComponent = (id: string, address: Address): Component => {
  let component = new Component(id);
  component.name = 'name';
  component.address = address;
  component.positionValue = BigInt.fromI32(0);

  return component;
}; 

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
  fee.transaction = id;
  return fee;
};

export const createManager = (id: string, address: Address): Manager => {
  let manager = new Manager(id);
  manager.address = address;
  manager.feeAccrualHistory = [];
  manager.totalFees = BigInt.fromI32(0);
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

