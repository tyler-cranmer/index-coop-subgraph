// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AnyoneCallableUpdated extends ethereum.Event {
  get params(): AnyoneCallableUpdated__Params {
    return new AnyoneCallableUpdated__Params(this);
  }
}

export class AnyoneCallableUpdated__Params {
  _event: AnyoneCallableUpdated;

  constructor(event: AnyoneCallableUpdated) {
    this._event = event;
  }

  get _status(): boolean {
    return this._event.parameters[0].value.toBoolean();
  }
}

export class CallerStatusUpdated extends ethereum.Event {
  get params(): CallerStatusUpdated__Params {
    return new CallerStatusUpdated__Params(this);
  }
}

export class CallerStatusUpdated__Params {
  _event: CallerStatusUpdated;

  constructor(event: CallerStatusUpdated) {
    this._event = event;
  }

  get _caller(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _status(): boolean {
    return this._event.parameters[1].value.toBoolean();
  }
}

export class Disengaged extends ethereum.Event {
  get params(): Disengaged__Params {
    return new Disengaged__Params(this);
  }
}

export class Disengaged__Params {
  _event: Disengaged;

  constructor(event: Disengaged) {
    this._event = event;
  }

  get _currentLeverageRatio(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _newLeverageRatio(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get _chunkRebalanceNotional(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get _totalRebalanceNotional(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class Engaged extends ethereum.Event {
  get params(): Engaged__Params {
    return new Engaged__Params(this);
  }
}

export class Engaged__Params {
  _event: Engaged;

  constructor(event: Engaged) {
    this._event = event;
  }

  get _currentLeverageRatio(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _newLeverageRatio(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get _chunkRebalanceNotional(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get _totalRebalanceNotional(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class ExecutionSettingsUpdated extends ethereum.Event {
  get params(): ExecutionSettingsUpdated__Params {
    return new ExecutionSettingsUpdated__Params(this);
  }
}

export class ExecutionSettingsUpdated__Params {
  _event: ExecutionSettingsUpdated;

  constructor(event: ExecutionSettingsUpdated) {
    this._event = event;
  }

  get _unutilizedLeveragePercentage(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _twapMaxTradeSize(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get _twapCooldownPeriod(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get _slippageTolerance(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get _exchangeName(): string {
    return this._event.parameters[4].value.toString();
  }

  get _leverExchangeData(): Bytes {
    return this._event.parameters[5].value.toBytes();
  }

  get _deleverExchangeData(): Bytes {
    return this._event.parameters[6].value.toBytes();
  }
}

export class IncentiveSettingsUpdated extends ethereum.Event {
  get params(): IncentiveSettingsUpdated__Params {
    return new IncentiveSettingsUpdated__Params(this);
  }
}

export class IncentiveSettingsUpdated__Params {
  _event: IncentiveSettingsUpdated;

  constructor(event: IncentiveSettingsUpdated) {
    this._event = event;
  }

  get _etherReward(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _incentivizedLeverageRatio(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get _incentivizedSlippageTolerance(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get _incentivizedTwapCooldownPeriod(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get _incentivizedTwapMaxTradeSize(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class MethodologySettingsUpdated extends ethereum.Event {
  get params(): MethodologySettingsUpdated__Params {
    return new MethodologySettingsUpdated__Params(this);
  }
}

export class MethodologySettingsUpdated__Params {
  _event: MethodologySettingsUpdated;

  constructor(event: MethodologySettingsUpdated) {
    this._event = event;
  }

  get _targetLeverageRatio(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _minLeverageRatio(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get _maxLeverageRatio(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get _recenteringSpeed(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get _rebalanceInterval(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class RebalanceIterated extends ethereum.Event {
  get params(): RebalanceIterated__Params {
    return new RebalanceIterated__Params(this);
  }
}

export class RebalanceIterated__Params {
  _event: RebalanceIterated;

  constructor(event: RebalanceIterated) {
    this._event = event;
  }

  get _currentLeverageRatio(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _newLeverageRatio(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get _chunkRebalanceNotional(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get _totalRebalanceNotional(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class Rebalanced extends ethereum.Event {
  get params(): Rebalanced__Params {
    return new Rebalanced__Params(this);
  }
}

export class Rebalanced__Params {
  _event: Rebalanced;

  constructor(event: Rebalanced) {
    this._event = event;
  }

  get _currentLeverageRatio(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _newLeverageRatio(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get _chunkRebalanceNotional(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get _totalRebalanceNotional(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class RipcordCalled extends ethereum.Event {
  get params(): RipcordCalled__Params {
    return new RipcordCalled__Params(this);
  }
}

export class RipcordCalled__Params {
  _event: RipcordCalled;

  constructor(event: RipcordCalled) {
    this._event = event;
  }

  get _currentLeverageRatio(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _newLeverageRatio(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get _rebalanceNotional(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get _etherIncentive(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class FlexibleLeverageStrategyAdapterBTCV2__getExecutionResultValue0Struct extends ethereum.Tuple {
  get unutilizedLeveragePercentage(): BigInt {
    return this[0].toBigInt();
  }

  get twapMaxTradeSize(): BigInt {
    return this[1].toBigInt();
  }

  get twapCooldownPeriod(): BigInt {
    return this[2].toBigInt();
  }

  get slippageTolerance(): BigInt {
    return this[3].toBigInt();
  }

  get exchangeName(): string {
    return this[4].toString();
  }

  get leverExchangeData(): Bytes {
    return this[5].toBytes();
  }

  get deleverExchangeData(): Bytes {
    return this[6].toBytes();
  }
}

export class FlexibleLeverageStrategyAdapterBTCV2__getIncentiveResultValue0Struct extends ethereum.Tuple {
  get etherReward(): BigInt {
    return this[0].toBigInt();
  }

  get incentivizedLeverageRatio(): BigInt {
    return this[1].toBigInt();
  }

  get incentivizedSlippageTolerance(): BigInt {
    return this[2].toBigInt();
  }

  get incentivizedTwapCooldownPeriod(): BigInt {
    return this[3].toBigInt();
  }

  get incentivizedTwapMaxTradeSize(): BigInt {
    return this[4].toBigInt();
  }
}

export class FlexibleLeverageStrategyAdapterBTCV2__getMethodologyResultValue0Struct extends ethereum.Tuple {
  get targetLeverageRatio(): BigInt {
    return this[0].toBigInt();
  }

  get minLeverageRatio(): BigInt {
    return this[1].toBigInt();
  }

  get maxLeverageRatio(): BigInt {
    return this[2].toBigInt();
  }

  get recenteringSpeed(): BigInt {
    return this[3].toBigInt();
  }

  get rebalanceInterval(): BigInt {
    return this[4].toBigInt();
  }
}

export class FlexibleLeverageStrategyAdapterBTCV2__getStrategyResultValue0Struct extends ethereum.Tuple {
  get setToken(): Address {
    return this[0].toAddress();
  }

  get leverageModule(): Address {
    return this[1].toAddress();
  }

  get comptroller(): Address {
    return this[2].toAddress();
  }

  get collateralPriceOracle(): Address {
    return this[3].toAddress();
  }

  get borrowPriceOracle(): Address {
    return this[4].toAddress();
  }

  get targetCollateralCToken(): Address {
    return this[5].toAddress();
  }

  get targetBorrowCToken(): Address {
    return this[6].toAddress();
  }

  get collateralAsset(): Address {
    return this[7].toAddress();
  }

  get borrowAsset(): Address {
    return this[8].toAddress();
  }

  get collateralDecimalAdjustment(): BigInt {
    return this[9].toBigInt();
  }

  get borrowDecimalAdjustment(): BigInt {
    return this[10].toBigInt();
  }
}

export class FlexibleLeverageStrategyAdapterBTCV2 extends ethereum.SmartContract {
  static bind(address: Address): FlexibleLeverageStrategyAdapterBTCV2 {
    return new FlexibleLeverageStrategyAdapterBTCV2(
      "FlexibleLeverageStrategyAdapterBTCV2",
      address
    );
  }

  anyoneCallable(): boolean {
    let result = super.call("anyoneCallable", "anyoneCallable():(bool)", []);

    return result[0].toBoolean();
  }

  try_anyoneCallable(): ethereum.CallResult<boolean> {
    let result = super.tryCall("anyoneCallable", "anyoneCallable():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  callAllowList(param0: Address): boolean {
    let result = super.call("callAllowList", "callAllowList(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBoolean();
  }

  try_callAllowList(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "callAllowList",
      "callAllowList(address):(bool)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  getCurrentEtherIncentive(): BigInt {
    let result = super.call(
      "getCurrentEtherIncentive",
      "getCurrentEtherIncentive():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getCurrentEtherIncentive(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getCurrentEtherIncentive",
      "getCurrentEtherIncentive():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getCurrentLeverageRatio(): BigInt {
    let result = super.call(
      "getCurrentLeverageRatio",
      "getCurrentLeverageRatio():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getCurrentLeverageRatio(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getCurrentLeverageRatio",
      "getCurrentLeverageRatio():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getExecution(): FlexibleLeverageStrategyAdapterBTCV2__getExecutionResultValue0Struct {
    let result = super.call(
      "getExecution",
      "getExecution():((uint256,uint256,uint256,uint256,string,bytes,bytes))",
      []
    );

    return changetype<
      FlexibleLeverageStrategyAdapterBTCV2__getExecutionResultValue0Struct
    >(result[0].toTuple());
  }

  try_getExecution(): ethereum.CallResult<
    FlexibleLeverageStrategyAdapterBTCV2__getExecutionResultValue0Struct
  > {
    let result = super.tryCall(
      "getExecution",
      "getExecution():((uint256,uint256,uint256,uint256,string,bytes,bytes))",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<
        FlexibleLeverageStrategyAdapterBTCV2__getExecutionResultValue0Struct
      >(value[0].toTuple())
    );
  }

  getIncentive(): FlexibleLeverageStrategyAdapterBTCV2__getIncentiveResultValue0Struct {
    let result = super.call(
      "getIncentive",
      "getIncentive():((uint256,uint256,uint256,uint256,uint256))",
      []
    );

    return changetype<
      FlexibleLeverageStrategyAdapterBTCV2__getIncentiveResultValue0Struct
    >(result[0].toTuple());
  }

  try_getIncentive(): ethereum.CallResult<
    FlexibleLeverageStrategyAdapterBTCV2__getIncentiveResultValue0Struct
  > {
    let result = super.tryCall(
      "getIncentive",
      "getIncentive():((uint256,uint256,uint256,uint256,uint256))",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<
        FlexibleLeverageStrategyAdapterBTCV2__getIncentiveResultValue0Struct
      >(value[0].toTuple())
    );
  }

  getMethodology(): FlexibleLeverageStrategyAdapterBTCV2__getMethodologyResultValue0Struct {
    let result = super.call(
      "getMethodology",
      "getMethodology():((uint256,uint256,uint256,uint256,uint256))",
      []
    );

    return changetype<
      FlexibleLeverageStrategyAdapterBTCV2__getMethodologyResultValue0Struct
    >(result[0].toTuple());
  }

  try_getMethodology(): ethereum.CallResult<
    FlexibleLeverageStrategyAdapterBTCV2__getMethodologyResultValue0Struct
  > {
    let result = super.tryCall(
      "getMethodology",
      "getMethodology():((uint256,uint256,uint256,uint256,uint256))",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<
        FlexibleLeverageStrategyAdapterBTCV2__getMethodologyResultValue0Struct
      >(value[0].toTuple())
    );
  }

  getStrategy(): FlexibleLeverageStrategyAdapterBTCV2__getStrategyResultValue0Struct {
    let result = super.call(
      "getStrategy",
      "getStrategy():((address,address,address,address,address,address,address,address,address,uint256,uint256))",
      []
    );

    return changetype<
      FlexibleLeverageStrategyAdapterBTCV2__getStrategyResultValue0Struct
    >(result[0].toTuple());
  }

  try_getStrategy(): ethereum.CallResult<
    FlexibleLeverageStrategyAdapterBTCV2__getStrategyResultValue0Struct
  > {
    let result = super.tryCall(
      "getStrategy",
      "getStrategy():((address,address,address,address,address,address,address,address,address,uint256,uint256))",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<
        FlexibleLeverageStrategyAdapterBTCV2__getStrategyResultValue0Struct
      >(value[0].toTuple())
    );
  }

  lastTradeTimestamp(): BigInt {
    let result = super.call(
      "lastTradeTimestamp",
      "lastTradeTimestamp():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_lastTradeTimestamp(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "lastTradeTimestamp",
      "lastTradeTimestamp():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  manager(): Address {
    let result = super.call("manager", "manager():(address)", []);

    return result[0].toAddress();
  }

  try_manager(): ethereum.CallResult<Address> {
    let result = super.tryCall("manager", "manager():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  shouldRebalance(): i32 {
    let result = super.call("shouldRebalance", "shouldRebalance():(uint8)", []);

    return result[0].toI32();
  }

  try_shouldRebalance(): ethereum.CallResult<i32> {
    let result = super.tryCall(
      "shouldRebalance",
      "shouldRebalance():(uint8)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  shouldRebalanceWithBounds(
    _customMinLeverageRatio: BigInt,
    _customMaxLeverageRatio: BigInt
  ): i32 {
    let result = super.call(
      "shouldRebalanceWithBounds",
      "shouldRebalanceWithBounds(uint256,uint256):(uint8)",
      [
        ethereum.Value.fromUnsignedBigInt(_customMinLeverageRatio),
        ethereum.Value.fromUnsignedBigInt(_customMaxLeverageRatio)
      ]
    );

    return result[0].toI32();
  }

  try_shouldRebalanceWithBounds(
    _customMinLeverageRatio: BigInt,
    _customMaxLeverageRatio: BigInt
  ): ethereum.CallResult<i32> {
    let result = super.tryCall(
      "shouldRebalanceWithBounds",
      "shouldRebalanceWithBounds(uint256,uint256):(uint8)",
      [
        ethereum.Value.fromUnsignedBigInt(_customMinLeverageRatio),
        ethereum.Value.fromUnsignedBigInt(_customMaxLeverageRatio)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  twapLeverageRatio(): BigInt {
    let result = super.call(
      "twapLeverageRatio",
      "twapLeverageRatio():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_twapLeverageRatio(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "twapLeverageRatio",
      "twapLeverageRatio():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _manager(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _strategy(): ConstructorCall_strategyStruct {
    return changetype<ConstructorCall_strategyStruct>(
      this._call.inputValues[1].value.toTuple()
    );
  }

  get _methodology(): ConstructorCall_methodologyStruct {
    return changetype<ConstructorCall_methodologyStruct>(
      this._call.inputValues[2].value.toTuple()
    );
  }

  get _execution(): ConstructorCall_executionStruct {
    return changetype<ConstructorCall_executionStruct>(
      this._call.inputValues[3].value.toTuple()
    );
  }

  get _incentive(): ConstructorCall_incentiveStruct {
    return changetype<ConstructorCall_incentiveStruct>(
      this._call.inputValues[4].value.toTuple()
    );
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall_strategyStruct extends ethereum.Tuple {
  get setToken(): Address {
    return this[0].toAddress();
  }

  get leverageModule(): Address {
    return this[1].toAddress();
  }

  get comptroller(): Address {
    return this[2].toAddress();
  }

  get collateralPriceOracle(): Address {
    return this[3].toAddress();
  }

  get borrowPriceOracle(): Address {
    return this[4].toAddress();
  }

  get targetCollateralCToken(): Address {
    return this[5].toAddress();
  }

  get targetBorrowCToken(): Address {
    return this[6].toAddress();
  }

  get collateralAsset(): Address {
    return this[7].toAddress();
  }

  get borrowAsset(): Address {
    return this[8].toAddress();
  }

  get collateralDecimalAdjustment(): BigInt {
    return this[9].toBigInt();
  }

  get borrowDecimalAdjustment(): BigInt {
    return this[10].toBigInt();
  }
}

export class ConstructorCall_methodologyStruct extends ethereum.Tuple {
  get targetLeverageRatio(): BigInt {
    return this[0].toBigInt();
  }

  get minLeverageRatio(): BigInt {
    return this[1].toBigInt();
  }

  get maxLeverageRatio(): BigInt {
    return this[2].toBigInt();
  }

  get recenteringSpeed(): BigInt {
    return this[3].toBigInt();
  }

  get rebalanceInterval(): BigInt {
    return this[4].toBigInt();
  }
}

export class ConstructorCall_executionStruct extends ethereum.Tuple {
  get unutilizedLeveragePercentage(): BigInt {
    return this[0].toBigInt();
  }

  get twapMaxTradeSize(): BigInt {
    return this[1].toBigInt();
  }

  get twapCooldownPeriod(): BigInt {
    return this[2].toBigInt();
  }

  get slippageTolerance(): BigInt {
    return this[3].toBigInt();
  }

  get exchangeName(): string {
    return this[4].toString();
  }

  get leverExchangeData(): Bytes {
    return this[5].toBytes();
  }

  get deleverExchangeData(): Bytes {
    return this[6].toBytes();
  }
}

export class ConstructorCall_incentiveStruct extends ethereum.Tuple {
  get etherReward(): BigInt {
    return this[0].toBigInt();
  }

  get incentivizedLeverageRatio(): BigInt {
    return this[1].toBigInt();
  }

  get incentivizedSlippageTolerance(): BigInt {
    return this[2].toBigInt();
  }

  get incentivizedTwapCooldownPeriod(): BigInt {
    return this[3].toBigInt();
  }

  get incentivizedTwapMaxTradeSize(): BigInt {
    return this[4].toBigInt();
  }
}

export class DisengageCall extends ethereum.Call {
  get inputs(): DisengageCall__Inputs {
    return new DisengageCall__Inputs(this);
  }

  get outputs(): DisengageCall__Outputs {
    return new DisengageCall__Outputs(this);
  }
}

export class DisengageCall__Inputs {
  _call: DisengageCall;

  constructor(call: DisengageCall) {
    this._call = call;
  }
}

export class DisengageCall__Outputs {
  _call: DisengageCall;

  constructor(call: DisengageCall) {
    this._call = call;
  }
}

export class EngageCall extends ethereum.Call {
  get inputs(): EngageCall__Inputs {
    return new EngageCall__Inputs(this);
  }

  get outputs(): EngageCall__Outputs {
    return new EngageCall__Outputs(this);
  }
}

export class EngageCall__Inputs {
  _call: EngageCall;

  constructor(call: EngageCall) {
    this._call = call;
  }
}

export class EngageCall__Outputs {
  _call: EngageCall;

  constructor(call: EngageCall) {
    this._call = call;
  }
}

export class IterateRebalanceCall extends ethereum.Call {
  get inputs(): IterateRebalanceCall__Inputs {
    return new IterateRebalanceCall__Inputs(this);
  }

  get outputs(): IterateRebalanceCall__Outputs {
    return new IterateRebalanceCall__Outputs(this);
  }
}

export class IterateRebalanceCall__Inputs {
  _call: IterateRebalanceCall;

  constructor(call: IterateRebalanceCall) {
    this._call = call;
  }
}

export class IterateRebalanceCall__Outputs {
  _call: IterateRebalanceCall;

  constructor(call: IterateRebalanceCall) {
    this._call = call;
  }
}

export class RebalanceCall extends ethereum.Call {
  get inputs(): RebalanceCall__Inputs {
    return new RebalanceCall__Inputs(this);
  }

  get outputs(): RebalanceCall__Outputs {
    return new RebalanceCall__Outputs(this);
  }
}

export class RebalanceCall__Inputs {
  _call: RebalanceCall;

  constructor(call: RebalanceCall) {
    this._call = call;
  }
}

export class RebalanceCall__Outputs {
  _call: RebalanceCall;

  constructor(call: RebalanceCall) {
    this._call = call;
  }
}

export class RipcordCall extends ethereum.Call {
  get inputs(): RipcordCall__Inputs {
    return new RipcordCall__Inputs(this);
  }

  get outputs(): RipcordCall__Outputs {
    return new RipcordCall__Outputs(this);
  }
}

export class RipcordCall__Inputs {
  _call: RipcordCall;

  constructor(call: RipcordCall) {
    this._call = call;
  }
}

export class RipcordCall__Outputs {
  _call: RipcordCall;

  constructor(call: RipcordCall) {
    this._call = call;
  }
}

export class SetExecutionSettingsCall extends ethereum.Call {
  get inputs(): SetExecutionSettingsCall__Inputs {
    return new SetExecutionSettingsCall__Inputs(this);
  }

  get outputs(): SetExecutionSettingsCall__Outputs {
    return new SetExecutionSettingsCall__Outputs(this);
  }
}

export class SetExecutionSettingsCall__Inputs {
  _call: SetExecutionSettingsCall;

  constructor(call: SetExecutionSettingsCall) {
    this._call = call;
  }

  get _newExecutionSettings(): SetExecutionSettingsCall_newExecutionSettingsStruct {
    return changetype<SetExecutionSettingsCall_newExecutionSettingsStruct>(
      this._call.inputValues[0].value.toTuple()
    );
  }
}

export class SetExecutionSettingsCall__Outputs {
  _call: SetExecutionSettingsCall;

  constructor(call: SetExecutionSettingsCall) {
    this._call = call;
  }
}

export class SetExecutionSettingsCall_newExecutionSettingsStruct extends ethereum.Tuple {
  get unutilizedLeveragePercentage(): BigInt {
    return this[0].toBigInt();
  }

  get twapMaxTradeSize(): BigInt {
    return this[1].toBigInt();
  }

  get twapCooldownPeriod(): BigInt {
    return this[2].toBigInt();
  }

  get slippageTolerance(): BigInt {
    return this[3].toBigInt();
  }

  get exchangeName(): string {
    return this[4].toString();
  }

  get leverExchangeData(): Bytes {
    return this[5].toBytes();
  }

  get deleverExchangeData(): Bytes {
    return this[6].toBytes();
  }
}

export class SetIncentiveSettingsCall extends ethereum.Call {
  get inputs(): SetIncentiveSettingsCall__Inputs {
    return new SetIncentiveSettingsCall__Inputs(this);
  }

  get outputs(): SetIncentiveSettingsCall__Outputs {
    return new SetIncentiveSettingsCall__Outputs(this);
  }
}

export class SetIncentiveSettingsCall__Inputs {
  _call: SetIncentiveSettingsCall;

  constructor(call: SetIncentiveSettingsCall) {
    this._call = call;
  }

  get _newIncentiveSettings(): SetIncentiveSettingsCall_newIncentiveSettingsStruct {
    return changetype<SetIncentiveSettingsCall_newIncentiveSettingsStruct>(
      this._call.inputValues[0].value.toTuple()
    );
  }
}

export class SetIncentiveSettingsCall__Outputs {
  _call: SetIncentiveSettingsCall;

  constructor(call: SetIncentiveSettingsCall) {
    this._call = call;
  }
}

export class SetIncentiveSettingsCall_newIncentiveSettingsStruct extends ethereum.Tuple {
  get etherReward(): BigInt {
    return this[0].toBigInt();
  }

  get incentivizedLeverageRatio(): BigInt {
    return this[1].toBigInt();
  }

  get incentivizedSlippageTolerance(): BigInt {
    return this[2].toBigInt();
  }

  get incentivizedTwapCooldownPeriod(): BigInt {
    return this[3].toBigInt();
  }

  get incentivizedTwapMaxTradeSize(): BigInt {
    return this[4].toBigInt();
  }
}

export class SetMethodologySettingsCall extends ethereum.Call {
  get inputs(): SetMethodologySettingsCall__Inputs {
    return new SetMethodologySettingsCall__Inputs(this);
  }

  get outputs(): SetMethodologySettingsCall__Outputs {
    return new SetMethodologySettingsCall__Outputs(this);
  }
}

export class SetMethodologySettingsCall__Inputs {
  _call: SetMethodologySettingsCall;

  constructor(call: SetMethodologySettingsCall) {
    this._call = call;
  }

  get _newMethodologySettings(): SetMethodologySettingsCall_newMethodologySettingsStruct {
    return changetype<SetMethodologySettingsCall_newMethodologySettingsStruct>(
      this._call.inputValues[0].value.toTuple()
    );
  }
}

export class SetMethodologySettingsCall__Outputs {
  _call: SetMethodologySettingsCall;

  constructor(call: SetMethodologySettingsCall) {
    this._call = call;
  }
}

export class SetMethodologySettingsCall_newMethodologySettingsStruct extends ethereum.Tuple {
  get targetLeverageRatio(): BigInt {
    return this[0].toBigInt();
  }

  get minLeverageRatio(): BigInt {
    return this[1].toBigInt();
  }

  get maxLeverageRatio(): BigInt {
    return this[2].toBigInt();
  }

  get recenteringSpeed(): BigInt {
    return this[3].toBigInt();
  }

  get rebalanceInterval(): BigInt {
    return this[4].toBigInt();
  }
}

export class UpdateAnyoneCallableCall extends ethereum.Call {
  get inputs(): UpdateAnyoneCallableCall__Inputs {
    return new UpdateAnyoneCallableCall__Inputs(this);
  }

  get outputs(): UpdateAnyoneCallableCall__Outputs {
    return new UpdateAnyoneCallableCall__Outputs(this);
  }
}

export class UpdateAnyoneCallableCall__Inputs {
  _call: UpdateAnyoneCallableCall;

  constructor(call: UpdateAnyoneCallableCall) {
    this._call = call;
  }

  get _status(): boolean {
    return this._call.inputValues[0].value.toBoolean();
  }
}

export class UpdateAnyoneCallableCall__Outputs {
  _call: UpdateAnyoneCallableCall;

  constructor(call: UpdateAnyoneCallableCall) {
    this._call = call;
  }
}

export class UpdateCallerStatusCall extends ethereum.Call {
  get inputs(): UpdateCallerStatusCall__Inputs {
    return new UpdateCallerStatusCall__Inputs(this);
  }

  get outputs(): UpdateCallerStatusCall__Outputs {
    return new UpdateCallerStatusCall__Outputs(this);
  }
}

export class UpdateCallerStatusCall__Inputs {
  _call: UpdateCallerStatusCall;

  constructor(call: UpdateCallerStatusCall) {
    this._call = call;
  }

  get _callers(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }

  get _statuses(): Array<boolean> {
    return this._call.inputValues[1].value.toBooleanArray();
  }
}

export class UpdateCallerStatusCall__Outputs {
  _call: UpdateCallerStatusCall;

  constructor(call: UpdateCallerStatusCall) {
    this._call = call;
  }
}

export class WithdrawEtherBalanceCall extends ethereum.Call {
  get inputs(): WithdrawEtherBalanceCall__Inputs {
    return new WithdrawEtherBalanceCall__Inputs(this);
  }

  get outputs(): WithdrawEtherBalanceCall__Outputs {
    return new WithdrawEtherBalanceCall__Outputs(this);
  }
}

export class WithdrawEtherBalanceCall__Inputs {
  _call: WithdrawEtherBalanceCall;

  constructor(call: WithdrawEtherBalanceCall) {
    this._call = call;
  }
}

export class WithdrawEtherBalanceCall__Outputs {
  _call: WithdrawEtherBalanceCall;

  constructor(call: WithdrawEtherBalanceCall) {
    this._call = call;
  }
}