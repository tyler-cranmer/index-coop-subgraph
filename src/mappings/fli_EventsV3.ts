import { dataSource, log } from '@graphprotocol/graph-ts';
import {
  ExchangeAdded as ExchangeAddedEvent,
  ExchangeRemoved as ExchangeRemovedEvent,
  ExchangeUpdated as ExchangeUpdatedEvent,
  RebalanceIterated as RebalanceIteratedEventV3,
  Rebalanced,
  FlexibleLeverageStrategyExtension,
} from '../../generated/FlexibleLeverageStrategyExtension/FlexibleLeverageStrategyExtension';
import {
  Disengaged,
  Engaged,
  ExchangeAdded,
  ExchangeRemoved,
  ExchangeUpdated,
  ExecutionSettingsUpdated,
  IncentiveSettingsUpdated,
  MethodologySettingsUpdated,
  RipcordCalled,
  Transfer as TransferEntity,
  Rebalance,
  Transaction,
} from '../../generated/schema';

import { Transfer } from '../../generated/SetToken/SetToken';
import { createGenericId } from '../utils/index';
import { createRebalanceDetails } from '../utils/create';
import { fetchBaseManagerSetToken } from '../utils/setToken';

export function handleExchangeAdded(event: ExchangeAddedEvent): void {
  let entity = new ExchangeAdded(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.exchangeName = event.params._exchangeName;
  entity.twapMaxTradeSize = event.params.twapMaxTradeSize;
  entity.exchangeLastTradeTimestamp = event.params.exchangeLastTradeTimestamp;
  entity.incentivizedTwapMaxTradeSize =
    event.params.incentivizedTwapMaxTradeSize;
  entity.leverExchangeData = event.params.leverExchangeData;
  entity.deleverExchangeData = event.params.deleverExchangeData;
  entity.save();
}

export function handleExchangeRemoved(event: ExchangeRemovedEvent): void {
  let entity = new ExchangeRemoved(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.exchangeName = event.params._exchangeName;
  entity.save();
}

export function handleExchangeUpdated(event: ExchangeUpdatedEvent): void {
  let entity = new ExchangeUpdated(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.exchangeName = event.params._exchangeName;
  entity.twapMaxTradeSize = event.params.twapMaxTradeSize;
  entity.exchangeLastTradeTimestamp = event.params.exchangeLastTradeTimestamp;
  entity.incentivizedTwapMaxTradeSize =
    event.params.incentivizedTwapMaxTradeSize;
  entity.leverExchangeData = event.params.leverExchangeData;
  entity.deleverExchangeData = event.params.deleverExchangeData;
  entity.save();
}

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
