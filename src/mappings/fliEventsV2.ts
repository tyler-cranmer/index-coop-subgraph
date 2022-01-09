import { dataSource, log } from '@graphprotocol/graph-ts';
import {
  // Disengaged as DisengagedEvent,
  // Engaged as EngagedEvent,
  // ExecutionSettingsUpdated as ExecutionSettingsUpdatedEvent,
  // IncentiveSettingsUpdated as IncentiveSettingsUpdatedEvent,
  // MethodologySettingsUpdated as MethodologySettingsUpdatedEvent,
  RebalanceIterated as RebalanceIteratedEventV2,
  Rebalanced as RebalancedEventV2,
  // RipcordCalled as RipcordCalledEvent,
  FlexibleLeverageStrategyAdapterV2,
} from '../../generated/FlexibleLeverageStrategyAdapterV2/FlexibleLeverageStrategyAdapterV2';

import {
//   Disengaged,
//   Engaged,
//   ExchangeAdded,
//   ExchangeRemoved,
//   ExchangeUpdated,
//   ExecutionSettingsUpdated,
//   IncentiveSettingsUpdated,
//   MethodologySettingsUpdated,
//   RipcordCalled,
  Rebalance,
  Transaction,
} from '../../generated/schema';

import { createGenericId } from '../utils/index';
import { createRebalanceDetails } from '../utils/create';
import { fetchBaseManagerSetToken } from '../utils/setToken';

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

// export function handleRipcordCalled(event: RipcordCalledEvent): void {
//   let entity = new RipcordCalled(
//     event.transaction.hash.toHex() + '-' + event.logIndex.toString()
//   );
//   entity.timestamp = event.block.timestamp;
//   entity.currentLeverageRatio = event.params._currentLeverageRatio;
//   entity.newLeverageRatio = event.params._newLeverageRatio;
//   entity.rebalanceNotional = event.params._rebalanceNotional;
//   entity.etherIncentive = event.params._etherIncentive;
//   entity.save();
// }
