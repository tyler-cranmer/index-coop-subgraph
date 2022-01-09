import { dataSource, log } from '@graphprotocol/graph-ts';
import {
  // Disengaged as DisengagedEvent,
  // Engaged as EngagedEvent,
  // ExecutionSettingsUpdated as ExecutionSettingsUpdatedEvent,
  // IncentiveSettingsUpdated as IncentiveSettingsUpdatedEvent,
  // MethodologySettingsUpdated as MethodologySettingsUpdatedEvent,
  RebalanceIterated as RebalanceIteratedEventV2,
  Rebalanced as RebalancedEventV2,
  RipcordCalled as RipcordCalledEventV2,
  FlexibleLeverageStrategyAdapterV2,
} from '../../generated/FlexibleLeverageStrategyAdapterV2/FlexibleLeverageStrategyAdapterV2';

import {
  // Disengaged as DisengagedBTC,
  // Engaged as EngagedBTC,
  // ExecutionSettingsUpdated as ExecutionSettingsUpdatedBTC,
  // IncentiveSettingsUpdated as IncentiveSettingsUpdatedBTC,
  // MethodologySettingsUpdated as MethodologySettingsUpdatedBTC,
  RebalanceIterated as RebalanceIteratedEventBTCV2,
  Rebalanced as RebalancedEventBTCV2,
  RipcordCalled as RipcordCalledEventBTCV2,
  FlexibleLeverageStrategyAdapterBTCV2,
} from '../../generated/FlexibleLeverageStrategyAdapterBTCV2/FlexibleLeverageStrategyAdapterBTCV2';


import {
//   Disengaged,
//   Engaged,
//   ExchangeAdded,
//   ExchangeRemoved,
//   ExchangeUpdated,
//   ExecutionSettingsUpdated,
//   IncentiveSettingsUpdated,
//   MethodologySettingsUpdated,
  RipcordCalled,
  Rebalance,
  Transaction,
} from '../../generated/schema';

import { createGenericId } from '../utils/index';
import { createRebalanceDetails } from '../utils/create';
import { fetchBaseManagerSetToken } from '../utils/setToken';



/******************************************************************/
/************** Eth 2xFli Version 2 Events ************************/
/******************************************************************/

export function handleRebalanceIterated(
  event: RebalanceIteratedEventV2
): void {
  const id = createGenericId(event);

  let c = FlexibleLeverageStrategyAdapterV2.bind(dataSource.address());
  let baseManager = c.manager();
  let setTokenAddress = fetchBaseManagerSetToken(baseManager);

  let entity = new Rebalance(`${id}--${event.block.timestamp.toHexString()}`);
  const txn = new Transaction(
    event.transaction.hash.toHex() + '--' + 'rebalanceIteratedV2-txn'
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

export function handleRebalance(event: RebalancedEventV2): void {
  const id = createGenericId(event);
  let c = FlexibleLeverageStrategyAdapterV2.bind(dataSource.address());
  let baseManager = c.manager();
  let setTokenAddress = fetchBaseManagerSetToken(baseManager);
  let entity = new Rebalance(`${id}--${event.block.timestamp.toHexString()}`);
  const txn = new Transaction(
    event.transaction.hash.toHex() + '--' + 'rebalanceV2-txn'
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

export function handleRipcordCalled(event: RipcordCalledEventV2): void {
  let entity = new RipcordCalled(
    event.transaction.hash.toHex() + '-RCV2-' + event.logIndex.toString()
  );
  entity.timestamp = event.block.timestamp;
  entity.currentLeverageRatio = event.params._currentLeverageRatio;
  entity.newLeverageRatio = event.params._newLeverageRatio;
  entity.rebalanceNotional = event.params._rebalanceNotional;
  entity.etherIncentive = event.params._etherIncentive;
  entity.save();
}


/******************************************************************/
/************** BTC 2xFli Version 2 Events ************************/
/******************************************************************/


// export function handleDisengaged(event: DisengagedEvent): void {
//   let entity = new Disengaged(
//     event.transaction.hash.toHex() + '-' + event.logIndex.toString()
//   );
//   entity.timestamp = event.block.timestamp;
//   entity.currentLeverageRatio = event.params._currentLeverageRatio;
//   entity.newLeverageRatio = event.params._newLeverageRatio;
//   entity.chunkRebalanceNotional = event.params._chunkRebalanceNotional;
//   entity.totalRebalanceNotional = event.params._totalRebalanceNotional;
//   entity.save();
// }

// export function handleEngaged(event: EngagedEvent): void {
//   let entity = new Engaged(
//     event.transaction.hash.toHex() + '-' + event.logIndex.toString()
//   );
//   entity.timestamp = event.block.timestamp;
//   entity.currentLeverageRatio = event.params._currentLeverageRatio;
//   entity.newLeverageRatio = event.params._newLeverageRatio;
//   entity.chunkRebalanceNotional = event.params._chunkRebalanceNotional;
//   entity.totalRebalanceNotional = event.params._totalRebalanceNotional;
//   entity.save();
// }

// export function handleExecutionSettingsUpdated(
//   event: ExecutionSettingsUpdatedEvent
// ): void {
//   let entity = new ExecutionSettingsUpdated(
//     event.transaction.hash.toHex() + '-' + event.logIndex.toString()
//   );
//   entity.unutilizedLeveragePercentage =
//     event.params._unutilizedLeveragePercentage;
//   entity.twapMaxTradeSize = event.params._twapMaxTradeSize;
//   entity.twapCooldownPeriod = event.params._twapCooldownPeriod;
//   entity.slippageTolerance = event.params._slippageTolerance;
//   entity.exchangeName = event.params._exchangeName;
//   entity.exchangeData = event.params._exchangeData;
//   entity.save();
// }

// export function handleIncentiveSettingsUpdated(
//   event: IncentiveSettingsUpdatedEvent
// ): void {
//   let entity = new IncentiveSettingsUpdated(
//     event.transaction.hash.toHex() + '-' + event.logIndex.toString()
//   );
//   entity.etherReward = event.params._etherReward;
//   entity.incentivizedLeverageRatio = event.params._incentivizedLeverageRatio;
//   entity.incentivizedSlippageTolerance =
//     event.params._incentivizedSlippageTolerance;
//   entity.incentivizedTwapCooldownPeriod =
//     event.params._incentivizedTwapCooldownPeriod;
//   entity.incentivizedTwapMaxTradeSize =
//     event.params._incentivizedTwapMaxTradeSize;
//   entity.save();
// }

// export function handleMethodologySettingsUpdated(
//   event: MethodologySettingsUpdatedEvent
// ): void {
//   let entity = new MethodologySettingsUpdated(
//     event.transaction.hash.toHex() + '-' + event.logIndex.toString()
//   );
//   entity.targetLeverageRatio = event.params._targetLeverageRatio;
//   entity.minLeverageRatio = event.params._minLeverageRatio;
//   entity.maxLeverageRatio = event.params._maxLeverageRatio;
//   entity.recenteringSpeed = event.params._recenteringSpeed;
//   entity.rebalanceInterval = event.params._rebalanceInterval;
//   entity.save();
// }

export function handleRebalanceIteratedBTC(
         event: RebalanceIteratedEventBTCV2
       ): void {
         const id = createGenericId(event);

         let c = FlexibleLeverageStrategyAdapterBTCV2.bind(
           dataSource.address()
         );
         let baseManager = c.manager();
         let setTokenAddress = fetchBaseManagerSetToken(baseManager);

         let entity = new Rebalance(
           `${id}--${event.block.timestamp.toHexString()}`
         );
         const txn = new Transaction(
           event.transaction.hash.toHex() + '--' + 'rebalanceIteratedBTCV2-txn'
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

export function handleRebalanceBTC(event: RebalancedEventBTCV2): void {
         const id = createGenericId(event);
         let c = FlexibleLeverageStrategyAdapterBTCV2.bind(
           dataSource.address()
         );
         let baseManager = c.manager();
         let setTokenAddress = fetchBaseManagerSetToken(baseManager);
         let entity = new Rebalance(
           `${id}--${event.block.timestamp.toHexString()}`
         );
         const txn = new Transaction(
           event.transaction.hash.toHex() + '--' + 'rebalanceBTCV2-txn'
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

export function handleRipcordCalledBTC(event: RipcordCalledEventBTCV2): void {
         let entity = new RipcordCalled(
           event.transaction.hash.toHex() + '-RCV2-' + event.logIndex.toString()
         );
         entity.timestamp = event.block.timestamp;
         entity.currentLeverageRatio = event.params._currentLeverageRatio;
         entity.newLeverageRatio = event.params._newLeverageRatio;
         entity.rebalanceNotional = event.params._rebalanceNotional;
         entity.etherIncentive = event.params._etherIncentive;
         entity.save();
       }