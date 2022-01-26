<<<<<<< HEAD
import { dataSource, Address, Bytes, ByteArray } from '@graphprotocol/graph-ts';
=======
import { BigInt, ethereum } from "@graphprotocol/graph-ts";
>>>>>>> ff51b26
import {
  RebalanceIterated as RebalanceIteratedEvent,
  Rebalanced as RebalancedEvent,
  RipcordCalled as RipcordCalledEvent,
<<<<<<< HEAD
  FlexibleLeverageStrategyAdapter,
} from '../../generated/FlexibleLeverageStrategyAdapter/FlexibleLeverageStrategyAdapter';

=======
  Rebalanced
} from "../../generated/FlexibleLeverageStrategyAdapter/FlexibleLeverageStrategyAdapter"
>>>>>>> ff51b26
import {
  RebalanceIterated as RebalanceIteratedEventBTC,
  Rebalanced as RebalancedEventBTC,
  RipcordCalled as RipcordCalledEventBTC,
  FlexibleLeverageStrategyAdapterBTC,
} from '../../generated/FlexibleLeverageStrategyAdapterBTC/FlexibleLeverageStrategyAdapterBTC';

import { RebalanceStarted as RebalanceStartedEvent } from '../../generated/GeneralIndexModule/GeneralIndexModule';

import {
<<<<<<< HEAD
=======
  AnyoneCallableUpdated,
  CallerStatusUpdated,
  Disengaged,
  Engaged,
  ExchangeAdded,
  ExchangeRemoved,
  ExchangeUpdated,
  ExecutionSettingsUpdated,
  IncentiveSettingsUpdated,
  MethodologySettingsUpdated,
>>>>>>> ff51b26
  RipcordCalled,
  Transfer as TransferEntity,
  Rebalance,
  Transaction,
<<<<<<< HEAD
  SimpleIndexTokenRedeemed,
  SimpleIndexRebalance,
  SimpleIndexRebalanceDetails,
  SimpleIndexToken,
} from '../../generated/schema';
import { Transfer } from '../../generated/SetToken/SetToken';
import { createGenericId } from '../utils/index';
import { createRebalanceDetails } from '../utils/create';
import { fetchBaseManagerSetToken } from '../utils/setToken';
=======
  RebalanceDetails
} from "../../generated/schema"
import {
  Approval,
  ComponentAdded,
  ComponentRemoved,
  DefaultPositionUnitEdited,
  ExternalPositionDataEdited,
  ExternalPositionUnitEdited,
  Invoked,
  ManagerEdited,
  ModuleAdded,
  ModuleInitialized,
  ModuleRemoved,
  PendingModuleRemoved,
  PositionModuleAdded,
  PositionModuleRemoved,
  PositionMultiplierEdited,
  Transfer
} from "../../generated/SetToken/SetToken"
import { createGenericId } from "../utils";
>>>>>>> ff51b26

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

<<<<<<< HEAD
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
=======
export function handleExchangeAdded(event: ExchangeAddedEvent): void {
  let entity = new ExchangeAdded(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.exchangeName = event.params._exchangeName
  entity.twapMaxTradeSize = event.params.twapMaxTradeSize
  entity.exchangeLastTradeTimestamp = event.params.exchangeLastTradeTimestamp
  entity.incentivizedTwapMaxTradeSize =
    event.params.incentivizedTwapMaxTradeSize
  entity.leverExchangeData = event.params.leverExchangeData
  entity.deleverExchangeData = event.params.deleverExchangeData
  entity.save()
}

export function handleExchangeRemoved(event: ExchangeRemovedEvent): void {
  let entity = new ExchangeRemoved(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.exchangeName = event.params._exchangeName
  entity.save()
}

export function handleExchangeUpdated(event: ExchangeUpdatedEvent): void {
  let entity = new ExchangeUpdated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.exchangeName = event.params._exchangeName
  entity.twapMaxTradeSize = event.params.twapMaxTradeSize
  entity.exchangeLastTradeTimestamp = event.params.exchangeLastTradeTimestamp
  entity.incentivizedTwapMaxTradeSize =
    event.params.incentivizedTwapMaxTradeSize
  entity.leverExchangeData = event.params.leverExchangeData
  entity.deleverExchangeData = event.params.deleverExchangeData
  entity.save()
}

export function handleAnyoneCallableUpdated(
  event: AnyoneCallableUpdatedEvent
): void {
  let entity = new AnyoneCallableUpdated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.status = event.params._status
  entity.save()
}

export function handleCallerStatusUpdated(
  event: CallerStatusUpdatedEvent
): void {
  let entity = new CallerStatusUpdated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.caller = event.params._caller
  entity.status = event.params._status
  entity.save()
}

export function handleDisengaged(event: DisengagedEvent): void {
  let entity = new Disengaged(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.timestamp = event.block.timestamp
  entity.currentLeverageRatio = event.params._currentLeverageRatio
  entity.newLeverageRatio = event.params._newLeverageRatio
  entity.chunkRebalanceNotional = event.params._chunkRebalanceNotional
  entity.totalRebalanceNotional = event.params._totalRebalanceNotional
  entity.save()
}

export function handleEngaged(event: EngagedEvent): void {
  let entity = new Engaged(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.timestamp = event.block.timestamp
  entity.currentLeverageRatio = event.params._currentLeverageRatio
  entity.newLeverageRatio = event.params._newLeverageRatio
  entity.chunkRebalanceNotional = event.params._chunkRebalanceNotional
  entity.totalRebalanceNotional = event.params._totalRebalanceNotional
  entity.save()
}

export function handleExecutionSettingsUpdated(
  event: ExecutionSettingsUpdatedEvent
): void {
  let entity = new ExecutionSettingsUpdated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.unutilizedLeveragePercentage =
    event.params._unutilizedLeveragePercentage
  entity.twapMaxTradeSize = event.params._twapMaxTradeSize
  entity.twapCooldownPeriod = event.params._twapCooldownPeriod
  entity.slippageTolerance = event.params._slippageTolerance
  entity.exchangeName = event.params._exchangeName
  entity.exchangeData = event.params._exchangeData
  entity.save()
}

export function handleIncentiveSettingsUpdated(
  event: IncentiveSettingsUpdatedEvent
): void {
  let entity = new IncentiveSettingsUpdated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.etherReward = event.params._etherReward
  entity.incentivizedLeverageRatio = event.params._incentivizedLeverageRatio
  entity.incentivizedSlippageTolerance =
    event.params._incentivizedSlippageTolerance
  entity.incentivizedTwapCooldownPeriod =
    event.params._incentivizedTwapCooldownPeriod
  entity.incentivizedTwapMaxTradeSize =
    event.params._incentivizedTwapMaxTradeSize
  entity.save()
}

export function handleMethodologySettingsUpdated(
  event: MethodologySettingsUpdatedEvent
): void {
  let entity = new MethodologySettingsUpdated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.targetLeverageRatio = event.params._targetLeverageRatio
  entity.minLeverageRatio = event.params._minLeverageRatio
  entity.maxLeverageRatio = event.params._maxLeverageRatio
  entity.recenteringSpeed = event.params._recenteringSpeed
  entity.rebalanceInterval = event.params._rebalanceInterval
  entity.save()
}

const createRebalanceDetails = (id: string, _currentLeverageRatio: BigInt, _newLeverageRatio: BigInt, _totalRebalanceNotional: BigInt, _chunkRebalanceNotional: BigInt ): RebalanceDetails => {
  let entity = new RebalanceDetails(id)
  entity.currentLeverageRatio= _currentLeverageRatio
  entity.newLeverageRatio= _newLeverageRatio
  entity.chunkRebalanceNotional= _chunkRebalanceNotional
  entity.totalRebalanceNotional= _totalRebalanceNotional
  return entity
}

export function handleRebalanceIteratedEvent(event: RebalanceIteratedEvent): void {
  const id = createGenericId(event);
  let entity = new Rebalance(`${id}--${event.block.timestamp.toHexString()}`)
  const txn = new Transaction(event.transaction.hash.toHex() + '--' + 'rebalance-txn')
  txn.timestamp = event.block.timestamp;
  txn.gasLimit = event.transaction.gasLimit;
  txn.gasPriceInGwei = event.transaction.gasPrice;
  txn.save()
  let rebalanceDetailsEntity = createRebalanceDetails(id, event.params._currentLeverageRatio, event.params._newLeverageRatio, event.params._totalRebalanceNotional, event.params._chunkRebalanceNotional);
  rebalanceDetailsEntity.save()
  entity.transaction = txn.id;
  entity.transactionHash = event.transaction.hash;
  entity.rebalanceDetails = rebalanceDetailsEntity.id
  entity.save()
}

export function handleRebalanceEvent(event: RebalancedEvent): void {
  const id = createGenericId(event);
  let entity = new Rebalance(`${id}--${event.block.timestamp.toHexString()}`)
  const txn = new Transaction(event.transaction.hash.toHex() + '--' + 'rebalance-txn')
  txn.timestamp = event.block.timestamp;
  txn.gasLimit = event.transaction.gasLimit;
  txn.gasPriceInGwei = event.transaction.gasPrice;
  txn.save()
  let rebalanceDetailsEntity = createRebalanceDetails(id, event.params._currentLeverageRatio, event.params._newLeverageRatio, event.params._totalRebalanceNotional, event.params._chunkRebalanceNotional);
  rebalanceDetailsEntity.save()
  entity.transaction = txn.id;
  entity.transactionHash = event.transaction.hash;
  entity.rebalanceDetails = rebalanceDetailsEntity.id
  entity.save()
>>>>>>> ff51b26
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

  let entity = new Rebalance(`${id}--${event.block.timestamp.toHexString()}`);
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
  let entity = new Rebalance(`${id}--${event.block.timestamp.toHexString()}`);
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

/**********************************************************************/
/*************** Simple Index Rebalance Events ***********************/
/*********************************************************************/

export function handleRebalanceStarted(event: RebalanceStartedEvent): void {
  const id = createGenericId(event);
  const setTokenAddress = event.params._setToken;
  const SimpleIndexTokenEntity = SimpleIndexToken.load(
    setTokenAddress.toHexString()
  );

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

    let components = event.params.aggregateComponents;
    let temp: Bytes[] = []
    for (let i=0; i < components.length; i++){
      let hexS = components[i].toHexString()
      let BS = ByteArray.fromHexString(hexS) as Bytes
      temp.push(BS)
    }

    rebalanceDetailsEntity.components = temp

    rebalanceDetailsEntity.save();
    entity.transaction = txn.id;
    entity.transactionHash = event.transaction.hash;
    entity.setToken = setTokenAddress.toHexString();
    entity.rebalanceDetails = rebalanceDetailsEntity.id;
    entity.save();
  }
}
