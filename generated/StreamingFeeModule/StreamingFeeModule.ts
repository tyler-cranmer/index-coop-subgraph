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

export class FeeActualized extends ethereum.Event {
  get params(): FeeActualized__Params {
    return new FeeActualized__Params(this);
  }
}

export class FeeActualized__Params {
  _event: FeeActualized;

  constructor(event: FeeActualized) {
    this._event = event;
  }

  get _setToken(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _managerFee(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get _protocolFee(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class FeeRecipientUpdated extends ethereum.Event {
  get params(): FeeRecipientUpdated__Params {
    return new FeeRecipientUpdated__Params(this);
  }
}

export class FeeRecipientUpdated__Params {
  _event: FeeRecipientUpdated;

  constructor(event: FeeRecipientUpdated) {
    this._event = event;
  }

  get _setToken(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _newFeeRecipient(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class StreamingFeeUpdated extends ethereum.Event {
  get params(): StreamingFeeUpdated__Params {
    return new StreamingFeeUpdated__Params(this);
  }
}

export class StreamingFeeUpdated__Params {
  _event: StreamingFeeUpdated;

  constructor(event: StreamingFeeUpdated) {
    this._event = event;
  }

  get _setToken(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _newStreamingFee(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class StreamingFeeModule__feeStatesResult {
  value0: Address;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;

  constructor(value0: Address, value1: BigInt, value2: BigInt, value3: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    return map;
  }
}

export class StreamingFeeModule extends ethereum.SmartContract {
  static bind(address: Address): StreamingFeeModule {
    return new StreamingFeeModule("StreamingFeeModule", address);
  }

  controller(): Address {
    let result = super.call("controller", "controller():(address)", []);

    return result[0].toAddress();
  }

  try_controller(): ethereum.CallResult<Address> {
    let result = super.tryCall("controller", "controller():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  feeStates(param0: Address): StreamingFeeModule__feeStatesResult {
    let result = super.call(
      "feeStates",
      "feeStates(address):(address,uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return new StreamingFeeModule__feeStatesResult(
      result[0].toAddress(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt()
    );
  }

  try_feeStates(
    param0: Address
  ): ethereum.CallResult<StreamingFeeModule__feeStatesResult> {
    let result = super.tryCall(
      "feeStates",
      "feeStates(address):(address,uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new StreamingFeeModule__feeStatesResult(
        value[0].toAddress(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt()
      )
    );
  }

  getFee(_setToken: Address): BigInt {
    let result = super.call("getFee", "getFee(address):(uint256)", [
      ethereum.Value.fromAddress(_setToken)
    ]);

    return result[0].toBigInt();
  }

  try_getFee(_setToken: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("getFee", "getFee(address):(uint256)", [
      ethereum.Value.fromAddress(_setToken)
    ]);
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

  get _controller(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AccrueFeeCall extends ethereum.Call {
  get inputs(): AccrueFeeCall__Inputs {
    return new AccrueFeeCall__Inputs(this);
  }

  get outputs(): AccrueFeeCall__Outputs {
    return new AccrueFeeCall__Outputs(this);
  }
}

export class AccrueFeeCall__Inputs {
  _call: AccrueFeeCall;

  constructor(call: AccrueFeeCall) {
    this._call = call;
  }

  get _setToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class AccrueFeeCall__Outputs {
  _call: AccrueFeeCall;

  constructor(call: AccrueFeeCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get _setToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _settings(): InitializeCall_settingsStruct {
    return changetype<InitializeCall_settingsStruct>(
      this._call.inputValues[1].value.toTuple()
    );
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class InitializeCall_settingsStruct extends ethereum.Tuple {
  get feeRecipient(): Address {
    return this[0].toAddress();
  }

  get maxStreamingFeePercentage(): BigInt {
    return this[1].toBigInt();
  }

  get streamingFeePercentage(): BigInt {
    return this[2].toBigInt();
  }

  get lastStreamingFeeTimestamp(): BigInt {
    return this[3].toBigInt();
  }
}

export class RemoveModuleCall extends ethereum.Call {
  get inputs(): RemoveModuleCall__Inputs {
    return new RemoveModuleCall__Inputs(this);
  }

  get outputs(): RemoveModuleCall__Outputs {
    return new RemoveModuleCall__Outputs(this);
  }
}

export class RemoveModuleCall__Inputs {
  _call: RemoveModuleCall;

  constructor(call: RemoveModuleCall) {
    this._call = call;
  }
}

export class RemoveModuleCall__Outputs {
  _call: RemoveModuleCall;

  constructor(call: RemoveModuleCall) {
    this._call = call;
  }
}

export class UpdateFeeRecipientCall extends ethereum.Call {
  get inputs(): UpdateFeeRecipientCall__Inputs {
    return new UpdateFeeRecipientCall__Inputs(this);
  }

  get outputs(): UpdateFeeRecipientCall__Outputs {
    return new UpdateFeeRecipientCall__Outputs(this);
  }
}

export class UpdateFeeRecipientCall__Inputs {
  _call: UpdateFeeRecipientCall;

  constructor(call: UpdateFeeRecipientCall) {
    this._call = call;
  }

  get _setToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _newFeeRecipient(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class UpdateFeeRecipientCall__Outputs {
  _call: UpdateFeeRecipientCall;

  constructor(call: UpdateFeeRecipientCall) {
    this._call = call;
  }
}

export class UpdateStreamingFeeCall extends ethereum.Call {
  get inputs(): UpdateStreamingFeeCall__Inputs {
    return new UpdateStreamingFeeCall__Inputs(this);
  }

  get outputs(): UpdateStreamingFeeCall__Outputs {
    return new UpdateStreamingFeeCall__Outputs(this);
  }
}

export class UpdateStreamingFeeCall__Inputs {
  _call: UpdateStreamingFeeCall;

  constructor(call: UpdateStreamingFeeCall) {
    this._call = call;
  }

  get _setToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _newFee(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class UpdateStreamingFeeCall__Outputs {
  _call: UpdateStreamingFeeCall;

  constructor(call: UpdateStreamingFeeCall) {
    this._call = call;
  }
}
