import { dataSource, Address , Bytes, ByteArray } from '@graphprotocol/graph-ts';
import {
  RebalanceIterated as RebalanceIteratedEvent,
  Rebalanced as RebalancedEvent,
  RipcordCalled as RipcordCalledEvent,
  FlexibleLeverageStrategyAdapter,
} from '../../generated/FlexibleLeverageStrategyAdapter/FlexibleLeverageStrategyAdapter';

import {
  RebalanceIterated as RebalanceIteratedEventBTC,
  Rebalanced as RebalancedEventBTC,
  RipcordCalled as RipcordCalledEventBTC,
  FlexibleLeverageStrategyAdapterBTC,
} from '../../generated/FlexibleLeverageStrategyAdapterBTC/FlexibleLeverageStrategyAdapterBTC';

import { RebalanceStarted as RebalanceStartedEvent} from '../../generated/GeneralIndexModule/GeneralIndexModule';

import {
  RipcordCalled,
  Transfer as TransferEntity,
  Rebalance,
  Transaction,
  SimpleIndexTokenRedeemed,
  SimpleIndexRebalance,
  SimpleIndexRebalanceDetails,
  SimpleIndexToken
} from '../../generated/schema';
import { Transfer } from '../../generated/SetToken/SetToken';
import { createGenericId } from '../utils/index';
import { createRebalanceDetails } from '../utils/create';
import { fetchBaseManagerSetToken } from '../utils/setToken';

export function handleTransfer(event: Transfer): void {
  let id = event.transaction.hash.toHexString();
  let FliTransferEntity = new TransferEntity(id);
  FliTransferEntity.txnHash = event.transaction.hash;
  FliTransferEntity.timestamp = event.block.timestamp;
  FliTransferEntity.from = event.params.from;
  FliTransferEntity.to = event.params.to;
  FliTransferEntity.value = event.params.value;
  FliTransferEntity.save();
}

/******************************************************************/
/************** Eth 2xFli Version 1 Events ************************/
/******************************************************************/

export function handleRebalanceIterated(event: RebalanceIteratedEvent): void {
  const id = createGenericId(event);

  let c = FlexibleLeverageStrategyAdapter.bind(dataSource.address());
  let baseManager = c.manager();
  let setTokenAddress = fetchBaseManagerSetToken(baseManager);

  let entity = new Rebalance(`${id}--${event.block.timestamp.toHexString()}`);
  const txn = new Transaction(
    event.transaction.hash.toHex() + '--' + 'rebalanceIterated-txn'
  );
  txn.timestamp = event.block.timestamp;
  txn.gasLimit = event.transaction.gasLimit;
  txn.gasPriceInGwei = event.transaction.gasPrice;
  txn.save();
  let rebalanceDetailsEntity = createRebalanceDetails(
    id,
    event.params._currentLeverageRatio,
    event.params._newLeverageRatio,
    event.params._totalRebalanceNotional,
    event.params._chunkRebalanceNotional
  );
  rebalanceDetailsEntity.save();
  entity.transaction = txn.id;
  entity.transactionHash = event.transaction.hash;
  entity.rebalanceDetails = rebalanceDetailsEntity.id;
  entity.setToken = setTokenAddress;
  entity.save();
}

export function handleRebalance(event: RebalancedEvent): void {
  const id = createGenericId(event);
  let c = FlexibleLeverageStrategyAdapter.bind(dataSource.address());
  let baseManager = c.manager();
  let setTokenAddress = fetchBaseManagerSetToken(baseManager);
  let entity = new Rebalance(`${id}--${event.block.timestamp.toHexString()}`);
  const txn = new Transaction(
    event.transaction.hash.toHex() + '--' + 'rebalance-txn'
  );
  txn.timestamp = event.block.timestamp;
  txn.gasLimit = event.transaction.gasLimit;
  txn.gasPriceInGwei = event.transaction.gasPrice;
  txn.save();
  let rebalanceDetailsEntity = createRebalanceDetails(
    id,
    event.params._currentLeverageRatio,
    event.params._newLeverageRatio,
    event.params._totalRebalanceNotional,
    event.params._chunkRebalanceNotional
  );
  rebalanceDetailsEntity.save();
  entity.transaction = txn.id;
  entity.transactionHash = event.transaction.hash;
  entity.setToken = setTokenAddress;
  entity.rebalanceDetails = rebalanceDetailsEntity.id;
  entity.save();
}

export function handleRipcordCalled(event: RipcordCalledEvent): void {
  let entity = new RipcordCalled(
    event.transaction.hash.toHex() + '-RC-' + event.logIndex.toString()
  );
  entity.timestamp = event.block.timestamp;
  entity.currentLeverageRatio = event.params._currentLeverageRatio;
  entity.newLeverageRatio = event.params._newLeverageRatio;
  entity.rebalanceNotional = event.params._rebalanceNotional;
  entity.etherIncentive = event.params._etherIncentive;
  entity.save();
}



/******************************************************************/
/*************** BTC 2xFli Version 1 Events ************************/
/******************************************************************/


export function handleRebalanceIteratedBTC(
         event: RebalanceIteratedEventBTC
       ): void {
         const id = createGenericId(event);

         let c = FlexibleLeverageStrategyAdapterBTC.bind(dataSource.address());
         let baseManager = c.manager();
         let setTokenAddress = fetchBaseManagerSetToken(baseManager);

         let entity = new Rebalance(
           `${id}--${event.block.timestamp.toHexString()}`
         );
         const txn = new Transaction(
           event.transaction.hash.toHex() + '--' + 'rebalanceIteratedBTC-txn'
         );
         txn.timestamp = event.block.timestamp;
         txn.gasLimit = event.transaction.gasLimit;
         txn.gasPriceInGwei = event.transaction.gasPrice;
         txn.save();
         let rebalanceDetailsEntity = createRebalanceDetails(
           id,
           event.params._currentLeverageRatio,
           event.params._newLeverageRatio,
           event.params._totalRebalanceNotional,
           event.params._chunkRebalanceNotional
         );
         rebalanceDetailsEntity.save();
         entity.transaction = txn.id;
         entity.transactionHash = event.transaction.hash;
         entity.rebalanceDetails = rebalanceDetailsEntity.id;
         entity.setToken = setTokenAddress;
         entity.save();
       }


export function handleRebalanceBTC(event: RebalancedEventBTC): void {
         const id = createGenericId(event);
         let c = FlexibleLeverageStrategyAdapterBTC.bind(dataSource.address());
         let baseManager = c.manager();
         let setTokenAddress = fetchBaseManagerSetToken(baseManager);
         let entity = new Rebalance(
           `${id}--${event.block.timestamp.toHexString()}`
         );
         const txn = new Transaction(
           event.transaction.hash.toHex() + '--' + 'rebalanceBTC-txn'
         );
         txn.timestamp = event.block.timestamp;
         txn.gasLimit = event.transaction.gasLimit;
         txn.gasPriceInGwei = event.transaction.gasPrice;
         txn.save();
         let rebalanceDetailsEntity = createRebalanceDetails(
           id,
           event.params._currentLeverageRatio,
           event.params._newLeverageRatio,
           event.params._totalRebalanceNotional,
           event.params._chunkRebalanceNotional
         );
         rebalanceDetailsEntity.save();
         entity.transaction = txn.id;
         entity.transactionHash = event.transaction.hash;
         entity.setToken = setTokenAddress;
         entity.rebalanceDetails = rebalanceDetailsEntity.id;
         entity.save();
       }

export function handleRipcordCalledBTC(event: RipcordCalledEventBTC): void {
         let entity = new RipcordCalled(
           event.transaction.hash.toHex() + '-RC-' + event.logIndex.toString()
         );
         entity.timestamp = event.block.timestamp;
         entity.currentLeverageRatio = event.params._currentLeverageRatio;
         entity.newLeverageRatio = event.params._newLeverageRatio;
         entity.rebalanceNotional = event.params._rebalanceNotional;
         entity.etherIncentive = event.params._etherIncentive;
         entity.save();
}
       

/******************************************************************/
/*************** Simple Index Rebalance Events ************************/
/******************************************************************/

export function handleRebalanceStarted(event: RebalanceStartedEvent): void {
  const id = createGenericId(event);
  const setTokenAddress = event.params._setToken
  const SimpleIndexTokenEntity = SimpleIndexToken.load(setTokenAddress.toHexString())

  if (SimpleIndexTokenEntity !== null) {
    let entity = new SimpleIndexRebalance(
      `${id}--${event.block.timestamp.toHexString()}`
    );

    const txn = new Transaction(
      event.transaction.hash.toHex() + '--' + 'rebalance-txn'
    );
    txn.timestamp = event.block.timestamp;
    txn.gasLimit = event.transaction.gasLimit;
    txn.gasPriceInGwei = event.transaction.gasPrice;
    txn.save();

    let rebalanceDetailsEntity = new SimpleIndexRebalanceDetails(id);
    rebalanceDetailsEntity.targetUnits = event.params.aggregateTargetUnits;
    rebalanceDetailsEntity.positionMultiplier = event.params.positionMultiplier;
    
    // rebalanceDetailsEntity.components = event.params
    //   .aggregateComponents as Array<Address>;

    rebalanceDetailsEntity.save();
    entity.transaction = txn.id;
    entity.transactionHash = event.transaction.hash;
    entity.setToken = setTokenAddress.toHexString();
    entity.rebalanceDetails = rebalanceDetailsEntity.id;
    entity.save();

  }
  

}