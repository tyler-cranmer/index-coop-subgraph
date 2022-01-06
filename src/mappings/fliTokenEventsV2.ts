import { dataSource } from '@graphprotocol/graph-ts';
import {
  Engaged as EngagedEvent,
  //   ExecutionSettingsUpdated as ExecutionSettingsUpdatedEvent,
  //   IncentiveSettingsUpdated as IncentiveSettingsUpdatedEventV2,
  MethodologySettingsUpdated as MethodologySettingsUpdatedEvent,
  RebalanceIterated as RebalanceIteratedEvent,
  Rebalanced as RebalancedEvent,
  RipcordCalled as RipcordCalledEvent,
  FlexibleLeverageStrategyAdapterV2,
} from '../../generated/FlexibleLeverageStrategyAdapterV2/FlexibleLeverageStrategyAdapterV2';
import {
  Engaged,
  //   ExecutionSettingsUpdated,
  //   IncentiveSettingsUpdated,
  MethodologySettingsUpdated,
  RipcordCalled,
  Transfer as TransferEntity,
  Rebalance,
  Transaction,
} from '../../generated/schema';
import { Transfer } from '../../generated/SetToken/SetToken';
import { createGenericId } from '../utils';
import { createRebalanceDetails } from '../utils/create';
import { fetchBaseManagerToken } from '../utils/setToken';

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

export function handleEngaged(event: EngagedEvent): void {
  let entity = new Engaged(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.timestamp = event.block.timestamp;
  entity.currentLeverageRatio = event.params._currentLeverageRatio;
  entity.newLeverageRatio = event.params._newLeverageRatio;
  entity.chunkRebalanceNotional = event.params._chunkRebalanceNotional;
  entity.totalRebalanceNotional = event.params._totalRebalanceNotional;
  entity.save();
}

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
//   event: IncentiveSettingsUpdatedEventV2
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

export function handleMethodologySettingsUpdated(
  event: MethodologySettingsUpdatedEvent
): void {
  let entity = new MethodologySettingsUpdated(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.targetLeverageRatio = event.params._targetLeverageRatio;
  entity.minLeverageRatio = event.params._minLeverageRatio;
  entity.maxLeverageRatio = event.params._maxLeverageRatio;
  entity.recenteringSpeed = event.params._recenteringSpeed;
  entity.rebalanceInterval = event.params._rebalanceInterval;
  entity.save();
}

export function handleRebalanceIteratedEvent(
  event: RebalanceIteratedEvent
): void {
  const id = createGenericId(event);
  let c = FlexibleLeverageStrategyAdapterV2.bind(dataSource.address());
  let baseManagerAddress = c.manager();
  let setTokenAddress: string = fetchBaseManagerToken(baseManagerAddress);
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
  entity.rebalanceDetails = rebalanceDetailsEntity.id;
  entity.setToken = setTokenAddress;
  entity.save();
}

export function handleRebalanceEvent(event: RebalancedEvent): void {
  const id = createGenericId(event);
  let c = FlexibleLeverageStrategyAdapterV2.bind(dataSource.address());
  let baseManagerAddress = c.manager();
  let setTokenAddress: string = fetchBaseManagerToken(baseManagerAddress);
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

export function handleRipcordCalledV2(event: RipcordCalledEvent): void {
  let entity = new RipcordCalled(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  const txn = new Transaction(
    event.transaction.hash.toHex() + '--' + 'ripcordV2-txn'
  );
  txn.timestamp = event.block.timestamp;
  txn.gasLimit = event.transaction.gasLimit;
  txn.gasPriceInGwei = event.transaction.gasPrice;
  txn.save();

  entity.timestamp = event.block.timestamp;
  entity.currentLeverageRatio = event.params._currentLeverageRatio;
  entity.newLeverageRatio = event.params._newLeverageRatio;
  entity.rebalanceNotional = event.params._rebalanceNotional;
  entity.etherIncentive = event.params._etherIncentive;
  entity.transaction = txn.id;
  entity.save();
}
