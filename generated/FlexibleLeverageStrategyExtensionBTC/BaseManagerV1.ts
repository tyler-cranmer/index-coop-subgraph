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

export class AdapterAdded extends ethereum.Event {
  get params(): AdapterAdded__Params {
    return new AdapterAdded__Params(this);
  }
}

export class AdapterAdded__Params {
  _event: AdapterAdded;

  constructor(event: AdapterAdded) {
    this._event = event;
  }

  get _adapter(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class AdapterRemoved extends ethereum.Event {
  get params(): AdapterRemoved__Params {
    return new AdapterRemoved__Params(this);
  }
}

export class AdapterRemoved__Params {
  _event: AdapterRemoved;

  constructor(event: AdapterRemoved) {
    this._event = event;
  }

  get _adapter(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class MethodologistChanged extends ethereum.Event {
  get params(): MethodologistChanged__Params {
    return new MethodologistChanged__Params(this);
  }
}

export class MethodologistChanged__Params {
  _event: MethodologistChanged;

  constructor(event: MethodologistChanged) {
    this._event = event;
  }

  get _oldMethodologist(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _newMethodologist(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class OperatorChanged extends ethereum.Event {
  get params(): OperatorChanged__Params {
    return new OperatorChanged__Params(this);
  }
}

export class OperatorChanged__Params {
  _event: OperatorChanged;

  constructor(event: OperatorChanged) {
    this._event = event;
  }

  get _oldOperator(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _newOperator(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class BaseManagerV1 extends ethereum.SmartContract {
  static bind(address: Address): BaseManagerV1 {
    return new BaseManagerV1("BaseManagerV1", address);
  }

  getAdapters(): Array<Address> {
    let result = super.call("getAdapters", "getAdapters():(address[])", []);

    return result[0].toAddressArray();
  }

  try_getAdapters(): ethereum.CallResult<Array<Address>> {
    let result = super.tryCall("getAdapters", "getAdapters():(address[])", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddressArray());
  }

  isAdapter(param0: Address): boolean {
    let result = super.call("isAdapter", "isAdapter(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBoolean();
  }

  try_isAdapter(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("isAdapter", "isAdapter(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  methodologist(): Address {
    let result = super.call("methodologist", "methodologist():(address)", []);

    return result[0].toAddress();
  }

  try_methodologist(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "methodologist",
      "methodologist():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  operator(): Address {
    let result = super.call("operator", "operator():(address)", []);

    return result[0].toAddress();
  }

  try_operator(): ethereum.CallResult<Address> {
    let result = super.tryCall("operator", "operator():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  setToken(): Address {
    let result = super.call("setToken", "setToken():(address)", []);

    return result[0].toAddress();
  }

  try_setToken(): ethereum.CallResult<Address> {
    let result = super.tryCall("setToken", "setToken():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
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

  get _setToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _operator(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _methodologist(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AddAdapterCall extends ethereum.Call {
  get inputs(): AddAdapterCall__Inputs {
    return new AddAdapterCall__Inputs(this);
  }

  get outputs(): AddAdapterCall__Outputs {
    return new AddAdapterCall__Outputs(this);
  }
}

export class AddAdapterCall__Inputs {
  _call: AddAdapterCall;

  constructor(call: AddAdapterCall) {
    this._call = call;
  }

  get _adapter(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class AddAdapterCall__Outputs {
  _call: AddAdapterCall;

  constructor(call: AddAdapterCall) {
    this._call = call;
  }
}

export class AddModuleCall extends ethereum.Call {
  get inputs(): AddModuleCall__Inputs {
    return new AddModuleCall__Inputs(this);
  }

  get outputs(): AddModuleCall__Outputs {
    return new AddModuleCall__Outputs(this);
  }
}

export class AddModuleCall__Inputs {
  _call: AddModuleCall;

  constructor(call: AddModuleCall) {
    this._call = call;
  }

  get _module(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class AddModuleCall__Outputs {
  _call: AddModuleCall;

  constructor(call: AddModuleCall) {
    this._call = call;
  }
}

export class InteractManagerCall extends ethereum.Call {
  get inputs(): InteractManagerCall__Inputs {
    return new InteractManagerCall__Inputs(this);
  }

  get outputs(): InteractManagerCall__Outputs {
    return new InteractManagerCall__Outputs(this);
  }
}

export class InteractManagerCall__Inputs {
  _call: InteractManagerCall;

  constructor(call: InteractManagerCall) {
    this._call = call;
  }

  get _module(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _data(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class InteractManagerCall__Outputs {
  _call: InteractManagerCall;

  constructor(call: InteractManagerCall) {
    this._call = call;
  }
}

export class RemoveAdapterCall extends ethereum.Call {
  get inputs(): RemoveAdapterCall__Inputs {
    return new RemoveAdapterCall__Inputs(this);
  }

  get outputs(): RemoveAdapterCall__Outputs {
    return new RemoveAdapterCall__Outputs(this);
  }
}

export class RemoveAdapterCall__Inputs {
  _call: RemoveAdapterCall;

  constructor(call: RemoveAdapterCall) {
    this._call = call;
  }

  get _adapter(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RemoveAdapterCall__Outputs {
  _call: RemoveAdapterCall;

  constructor(call: RemoveAdapterCall) {
    this._call = call;
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

  get _module(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RemoveModuleCall__Outputs {
  _call: RemoveModuleCall;

  constructor(call: RemoveModuleCall) {
    this._call = call;
  }
}

export class SetManagerCall extends ethereum.Call {
  get inputs(): SetManagerCall__Inputs {
    return new SetManagerCall__Inputs(this);
  }

  get outputs(): SetManagerCall__Outputs {
    return new SetManagerCall__Outputs(this);
  }
}

export class SetManagerCall__Inputs {
  _call: SetManagerCall;

  constructor(call: SetManagerCall) {
    this._call = call;
  }

  get _newManager(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetManagerCall__Outputs {
  _call: SetManagerCall;

  constructor(call: SetManagerCall) {
    this._call = call;
  }
}

export class SetMethodologistCall extends ethereum.Call {
  get inputs(): SetMethodologistCall__Inputs {
    return new SetMethodologistCall__Inputs(this);
  }

  get outputs(): SetMethodologistCall__Outputs {
    return new SetMethodologistCall__Outputs(this);
  }
}

export class SetMethodologistCall__Inputs {
  _call: SetMethodologistCall;

  constructor(call: SetMethodologistCall) {
    this._call = call;
  }

  get _newMethodologist(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetMethodologistCall__Outputs {
  _call: SetMethodologistCall;

  constructor(call: SetMethodologistCall) {
    this._call = call;
  }
}

export class SetOperatorCall extends ethereum.Call {
  get inputs(): SetOperatorCall__Inputs {
    return new SetOperatorCall__Inputs(this);
  }

  get outputs(): SetOperatorCall__Outputs {
    return new SetOperatorCall__Outputs(this);
  }
}

export class SetOperatorCall__Inputs {
  _call: SetOperatorCall;

  constructor(call: SetOperatorCall) {
    this._call = call;
  }

  get _newOperator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetOperatorCall__Outputs {
  _call: SetOperatorCall;

  constructor(call: SetOperatorCall) {
    this._call = call;
  }
}
