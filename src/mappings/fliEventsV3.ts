import { dataSource, log } from '@graphprotocol/graph-ts';
import {
  RebalanceIterated as RebalanceIteratedEventV3,
  Rebalanced,
  RipcordCalled as RipcordCalledEventV3,
  FlexibleLeverageStrategyExtension,
} from '../../generated/FlexibleLeverageStrategyExtension/FlexibleLeverageStrategyExtension';

import {
  RebalanceIterated as RebalanceIteratedEventBTCV3,
  Rebalanced as RebalancedEventBTCV3,
  RipcordCalled as RipcordCalledEventBTCV3,
  FlexibleLeverageStrategyExtensionBTC,
} from '../../generated/FlexibleLeverageStrategyExtensionBTC/FlexibleLeverageStrategyExtensionBTC';


import {
  RipcordCalled,
  Rebalance,
  Transaction,
} from '../../generated/schema';


import { createGenericId } from '../utils/index';
import { createRebalanceDetails } from '../utils/create';
import { fetchBaseManagerSetToken } from '../utils/setToken';


/******************************************************************/
/************** Eth 2xFli Version 3 Events ************************/
/******************************************************************/

export function handleRebalance(event: Rebalanced): void {
  const id = createGenericId(event);
  let c = FlexibleLeverageStrategyExtension.bind(dataSource.address());

  log.debug('DataSource Address V3:: ', [dataSource.address().toHexString()]);
  let baseManager = c.manager();
  let setTokenAddress = fetchBaseManagerSetToken(baseManager);
  let entity = new Rebalance(`${id}--${event.block.timestamp.toHexString()}`);
  const txn = new Transaction(
    event.transaction.hash.toHex() + '--' + 'rebalanceV3-txn'
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

export function handleRebalanceIterated(event: RebalanceIteratedEventV3): void {
  const id = createGenericId(event);

  let c = FlexibleLeverageStrategyExtension.bind(dataSource.address());
  let baseManager = c.manager();
  let setTokenAddress = fetchBaseManagerSetToken(baseManager);

  let entity = new Rebalance(`${id}--${event.block.timestamp.toHexString()}`);
  const txn = new Transaction(
    event.transaction.hash.toHex() + '--' + 'rebalanceIteratedV3-txn'
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

export function handleRipcordCalled(event: RipcordCalledEventV3): void {
  let entity = new RipcordCalled(
    event.transaction.hash.toHex() + '-RCV3-' + event.logIndex.toString()
  );
  entity.timestamp = event.block.timestamp;
  entity.currentLeverageRatio = event.params._currentLeverageRatio;
  entity.newLeverageRatio = event.params._newLeverageRatio;
  entity.rebalanceNotional = event.params._rebalanceNotional;
  entity.etherIncentive = event.params._etherIncentive;
  entity.save();
}



/******************************************************************/
/************** BTC 2xFli Version 3 Events ************************/
/******************************************************************/


export function handleRebalanceIteratedBTC(
         event: RebalanceIteratedEventBTCV3
       ): void {
         const id = createGenericId(event);

         let c = FlexibleLeverageStrategyExtensionBTC.bind(
           dataSource.address()
         );
         let baseManager = c.manager();
         let setTokenAddress = fetchBaseManagerSetToken(baseManager);

         let entity = new Rebalance(
           `${id}--${event.block.timestamp.toHexString()}`
         );
         const txn = new Transaction(
           event.transaction.hash.toHex() + '--' + 'rebalanceIteratedBTCV3-txn'
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

export function handleRebalanceBTC(event: RebalancedEventBTCV3): void {
         const id = createGenericId(event);
         let c = FlexibleLeverageStrategyExtensionBTC.bind(
           dataSource.address()
         );
         let baseManager = c.manager();
         let setTokenAddress = fetchBaseManagerSetToken(baseManager);
         let entity = new Rebalance(
           `${id}--${event.block.timestamp.toHexString()}`
         );
         const txn = new Transaction(
           event.transaction.hash.toHex() + '--' + 'rebalanceBTCV3-txn'
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

export function handleRipcordCalledBTC(event: RipcordCalledEventBTCV3): void {
         let entity = new RipcordCalled(
           event.transaction.hash.toHex() + '-RCV3-' + event.logIndex.toString()
         );
         entity.timestamp = event.block.timestamp;
         entity.currentLeverageRatio = event.params._currentLeverageRatio;
         entity.newLeverageRatio = event.params._newLeverageRatio;
         entity.rebalanceNotional = event.params._rebalanceNotional;
         entity.etherIncentive = event.params._etherIncentive;
         entity.save();
       }