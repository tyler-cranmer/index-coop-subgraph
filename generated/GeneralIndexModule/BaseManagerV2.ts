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

export class EmergencyRemovedProtectedModule extends ethereum.Event {
  get params(): EmergencyRemovedProtectedModule__Params {
    return new EmergencyRemovedProtectedModule__Params(this);
  }
}

export class EmergencyRemovedProtectedModule__Params {
  _event: EmergencyRemovedProtectedModule;

  constructor(event: EmergencyRemovedProtectedModule) {
    this._event = event;
  }

  get _module(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class EmergencyReplacedProtectedModule extends ethereum.Event {
  get params(): EmergencyReplacedProtectedModule__Params {
    return new EmergencyReplacedProtectedModule__Params(this);
  }
}

export class EmergencyReplacedProtectedModule__Params {
  _event: EmergencyReplacedProtectedModule;

  constructor(event: EmergencyReplacedProtectedModule) {
    this._event = event;
  }

  get _module(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _extensions(): Array<Address> {
    return this._event.parameters[1].value.toAddressArray();
  }
}

export class EmergencyResolved extends ethereum.Event {
  get params(): EmergencyResolved__Params {
    return new EmergencyResolved__Params(this);
  }
}

export class EmergencyResolved__Params {
  _event: EmergencyResolved;

  constructor(event: EmergencyResolved) {
    this._event = event;
  }
}

export class ExtensionAdded extends ethereum.Event {
  get params(): ExtensionAdded__Params {
    return new ExtensionAdded__Params(this);
  }
}

export class ExtensionAdded__Params {
  _event: ExtensionAdded;

  constructor(event: ExtensionAdded) {
    this._event = event;
  }

  get _extension(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class ExtensionAuthorizationRevoked extends ethereum.Event {
  get params(): ExtensionAuthorizationRevoked__Params {
    return new ExtensionAuthorizationRevoked__Params(this);
  }
}

export class ExtensionAuthorizationRevoked__Params {
  _event: ExtensionAuthorizationRevoked;

  constructor(event: ExtensionAuthorizationRevoked) {
    this._event = event;
  }

  get _module(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _extension(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class ExtensionAuthorized extends ethereum.Event {
  get params(): ExtensionAuthorized__Params {
    return new ExtensionAuthorized__Params(this);
  }
}

export class ExtensionAuthorized__Params {
  _event: ExtensionAuthorized;

  constructor(event: ExtensionAuthorized) {
    this._event = event;
  }

  get _module(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _extension(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class ExtensionRemoved extends ethereum.Event {
  get params(): ExtensionRemoved__Params {
    return new ExtensionRemoved__Params(this);
  }
}

export class ExtensionRemoved__Params {
  _event: ExtensionRemoved;

  constructor(event: ExtensionRemoved) {
    this._event = event;
  }

  get _extension(): Address {
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

export class ModuleProtected extends ethereum.Event {
  get params(): ModuleProtected__Params {
    return new ModuleProtected__Params(this);
  }
}

export class ModuleProtected__Params {
  _event: ModuleProtected;

  constructor(event: ModuleProtected) {
    this._event = event;
  }

  get _module(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _extensions(): Array<Address> {
    return this._event.parameters[1].value.toAddressArray();
  }
}

export class ModuleUnprotected extends ethereum.Event {
  get params(): ModuleUnprotected__Params {
    return new ModuleUnprotected__Params(this);
  }
}

export class ModuleUnprotected__Params {
  _event: ModuleUnprotected;

  constructor(event: ModuleUnprotected) {
    this._event = event;
  }

  get _module(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class MutualUpgradeRegistered extends ethereum.Event {
  get params(): MutualUpgradeRegistered__Params {
    return new MutualUpgradeRegistered__Params(this);
  }
}

export class MutualUpgradeRegistered__Params {
  _event: MutualUpgradeRegistered;

  constructor(event: MutualUpgradeRegistered) {
    this._event = event;
  }

  get _upgradeHash(): Bytes {
    return this._event.parameters[0].value.toBytes();
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

export class ReplacedProtectedModule extends ethereum.Event {
  get params(): ReplacedProtectedModule__Params {
    return new ReplacedProtectedModule__Params(this);
  }
}

export class ReplacedProtectedModule__Params {
  _event: ReplacedProtectedModule;

  constructor(event: ReplacedProtectedModule) {
    this._event = event;
  }

  get _oldModule(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _newModule(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _newExtensions(): Array<Address> {
    return this._event.parameters[2].value.toAddressArray();
  }
}

export class BaseManagerV2 extends ethereum.SmartContract {
  static bind(address: Address): BaseManagerV2 {
    return new BaseManagerV2("BaseManagerV2", address);
  }

  emergencies(): BigInt {
    let result = super.call("emergencies", "emergencies():(uint256)", []);

    return result[0].toBigInt();
  }

  try_emergencies(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("emergencies", "emergencies():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getAuthorizedExtensions(_module: Address): Array<Address> {
    let result = super.call(
      "getAuthorizedExtensions",
      "getAuthorizedExtensions(address):(address[])",
      [ethereum.Value.fromAddress(_module)]
    );

    return result[0].toAddressArray();
  }

  try_getAuthorizedExtensions(
    _module: Address
  ): ethereum.CallResult<Array<Address>> {
    let result = super.tryCall(
      "getAuthorizedExtensions",
      "getAuthorizedExtensions(address):(address[])",
      [ethereum.Value.fromAddress(_module)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddressArray());
  }

  getExtensions(): Array<Address> {
    let result = super.call("getExtensions", "getExtensions():(address[])", []);

    return result[0].toAddressArray();
  }

  try_getExtensions(): ethereum.CallResult<Array<Address>> {
    let result = super.tryCall(
      "getExtensions",
      "getExtensions():(address[])",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddressArray());
  }

  getProtectedModules(): Array<Address> {
    let result = super.call(
      "getProtectedModules",
      "getProtectedModules():(address[])",
      []
    );

    return result[0].toAddressArray();
  }

  try_getProtectedModules(): ethereum.CallResult<Array<Address>> {
    let result = super.tryCall(
      "getProtectedModules",
      "getProtectedModules():(address[])",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddressArray());
  }

  initialized(): boolean {
    let result = super.call("initialized", "initialized():(bool)", []);

    return result[0].toBoolean();
  }

  try_initialized(): ethereum.CallResult<boolean> {
    let result = super.tryCall("initialized", "initialized():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isAuthorizedExtension(_module: Address, _extension: Address): boolean {
    let result = super.call(
      "isAuthorizedExtension",
      "isAuthorizedExtension(address,address):(bool)",
      [
        ethereum.Value.fromAddress(_module),
        ethereum.Value.fromAddress(_extension)
      ]
    );

    return result[0].toBoolean();
  }

  try_isAuthorizedExtension(
    _module: Address,
    _extension: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isAuthorizedExtension",
      "isAuthorizedExtension(address,address):(bool)",
      [
        ethereum.Value.fromAddress(_module),
        ethereum.Value.fromAddress(_extension)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isExtension(param0: Address): boolean {
    let result = super.call("isExtension", "isExtension(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBoolean();
  }

  try_isExtension(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("isExtension", "isExtension(address):(bool)", [
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

  mutualUpgrades(param0: Bytes): boolean {
    let result = super.call(
      "mutualUpgrades",
      "mutualUpgrades(bytes32):(bool)",
      [ethereum.Value.fromFixedBytes(param0)]
    );

    return result[0].toBoolean();
  }

  try_mutualUpgrades(param0: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "mutualUpgrades",
      "mutualUpgrades(bytes32):(bool)",
      [ethereum.Value.fromFixedBytes(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
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

  protectedModules(param0: Address): boolean {
    let result = super.call(
      "protectedModules",
      "protectedModules(address):(bool)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBoolean();
  }

  try_protectedModules(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "protectedModules",
      "protectedModules(address):(bool)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  protectedModulesList(param0: BigInt): Address {
    let result = super.call(
      "protectedModulesList",
      "protectedModulesList(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return result[0].toAddress();
  }

  try_protectedModulesList(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "protectedModulesList",
      "protectedModulesList(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
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

export class AddExtensionCall extends ethereum.Call {
  get inputs(): AddExtensionCall__Inputs {
    return new AddExtensionCall__Inputs(this);
  }

  get outputs(): AddExtensionCall__Outputs {
    return new AddExtensionCall__Outputs(this);
  }
}

export class AddExtensionCall__Inputs {
  _call: AddExtensionCall;

  constructor(call: AddExtensionCall) {
    this._call = call;
  }

  get _extension(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class AddExtensionCall__Outputs {
  _call: AddExtensionCall;

  constructor(call: AddExtensionCall) {
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

export class AuthorizeExtensionCall extends ethereum.Call {
  get inputs(): AuthorizeExtensionCall__Inputs {
    return new AuthorizeExtensionCall__Inputs(this);
  }

  get outputs(): AuthorizeExtensionCall__Outputs {
    return new AuthorizeExtensionCall__Outputs(this);
  }
}

export class AuthorizeExtensionCall__Inputs {
  _call: AuthorizeExtensionCall;

  constructor(call: AuthorizeExtensionCall) {
    this._call = call;
  }

  get _module(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _extension(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class AuthorizeExtensionCall__Outputs {
  _call: AuthorizeExtensionCall;

  constructor(call: AuthorizeExtensionCall) {
    this._call = call;
  }
}

export class AuthorizeInitializationCall extends ethereum.Call {
  get inputs(): AuthorizeInitializationCall__Inputs {
    return new AuthorizeInitializationCall__Inputs(this);
  }

  get outputs(): AuthorizeInitializationCall__Outputs {
    return new AuthorizeInitializationCall__Outputs(this);
  }
}

export class AuthorizeInitializationCall__Inputs {
  _call: AuthorizeInitializationCall;

  constructor(call: AuthorizeInitializationCall) {
    this._call = call;
  }
}

export class AuthorizeInitializationCall__Outputs {
  _call: AuthorizeInitializationCall;

  constructor(call: AuthorizeInitializationCall) {
    this._call = call;
  }
}

export class EmergencyRemoveProtectedModuleCall extends ethereum.Call {
  get inputs(): EmergencyRemoveProtectedModuleCall__Inputs {
    return new EmergencyRemoveProtectedModuleCall__Inputs(this);
  }

  get outputs(): EmergencyRemoveProtectedModuleCall__Outputs {
    return new EmergencyRemoveProtectedModuleCall__Outputs(this);
  }
}

export class EmergencyRemoveProtectedModuleCall__Inputs {
  _call: EmergencyRemoveProtectedModuleCall;

  constructor(call: EmergencyRemoveProtectedModuleCall) {
    this._call = call;
  }

  get _module(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class EmergencyRemoveProtectedModuleCall__Outputs {
  _call: EmergencyRemoveProtectedModuleCall;

  constructor(call: EmergencyRemoveProtectedModuleCall) {
    this._call = call;
  }
}

export class EmergencyReplaceProtectedModuleCall extends ethereum.Call {
  get inputs(): EmergencyReplaceProtectedModuleCall__Inputs {
    return new EmergencyReplaceProtectedModuleCall__Inputs(this);
  }

  get outputs(): EmergencyReplaceProtectedModuleCall__Outputs {
    return new EmergencyReplaceProtectedModuleCall__Outputs(this);
  }
}

export class EmergencyReplaceProtectedModuleCall__Inputs {
  _call: EmergencyReplaceProtectedModuleCall;

  constructor(call: EmergencyReplaceProtectedModuleCall) {
    this._call = call;
  }

  get _module(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _extensions(): Array<Address> {
    return this._call.inputValues[1].value.toAddressArray();
  }
}

export class EmergencyReplaceProtectedModuleCall__Outputs {
  _call: EmergencyReplaceProtectedModuleCall;

  constructor(call: EmergencyReplaceProtectedModuleCall) {
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

export class ProtectModuleCall extends ethereum.Call {
  get inputs(): ProtectModuleCall__Inputs {
    return new ProtectModuleCall__Inputs(this);
  }

  get outputs(): ProtectModuleCall__Outputs {
    return new ProtectModuleCall__Outputs(this);
  }
}

export class ProtectModuleCall__Inputs {
  _call: ProtectModuleCall;

  constructor(call: ProtectModuleCall) {
    this._call = call;
  }

  get _module(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _extensions(): Array<Address> {
    return this._call.inputValues[1].value.toAddressArray();
  }
}

export class ProtectModuleCall__Outputs {
  _call: ProtectModuleCall;

  constructor(call: ProtectModuleCall) {
    this._call = call;
  }
}

export class RemoveExtensionCall extends ethereum.Call {
  get inputs(): RemoveExtensionCall__Inputs {
    return new RemoveExtensionCall__Inputs(this);
  }

  get outputs(): RemoveExtensionCall__Outputs {
    return new RemoveExtensionCall__Outputs(this);
  }
}

export class RemoveExtensionCall__Inputs {
  _call: RemoveExtensionCall;

  constructor(call: RemoveExtensionCall) {
    this._call = call;
  }

  get _extension(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RemoveExtensionCall__Outputs {
  _call: RemoveExtensionCall;

  constructor(call: RemoveExtensionCall) {
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

export class ReplaceProtectedModuleCall extends ethereum.Call {
  get inputs(): ReplaceProtectedModuleCall__Inputs {
    return new ReplaceProtectedModuleCall__Inputs(this);
  }

  get outputs(): ReplaceProtectedModuleCall__Outputs {
    return new ReplaceProtectedModuleCall__Outputs(this);
  }
}

export class ReplaceProtectedModuleCall__Inputs {
  _call: ReplaceProtectedModuleCall;

  constructor(call: ReplaceProtectedModuleCall) {
    this._call = call;
  }

  get _oldModule(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _newModule(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _newExtensions(): Array<Address> {
    return this._call.inputValues[2].value.toAddressArray();
  }
}

export class ReplaceProtectedModuleCall__Outputs {
  _call: ReplaceProtectedModuleCall;

  constructor(call: ReplaceProtectedModuleCall) {
    this._call = call;
  }
}

export class ResolveEmergencyCall extends ethereum.Call {
  get inputs(): ResolveEmergencyCall__Inputs {
    return new ResolveEmergencyCall__Inputs(this);
  }

  get outputs(): ResolveEmergencyCall__Outputs {
    return new ResolveEmergencyCall__Outputs(this);
  }
}

export class ResolveEmergencyCall__Inputs {
  _call: ResolveEmergencyCall;

  constructor(call: ResolveEmergencyCall) {
    this._call = call;
  }
}

export class ResolveEmergencyCall__Outputs {
  _call: ResolveEmergencyCall;

  constructor(call: ResolveEmergencyCall) {
    this._call = call;
  }
}

export class RevokeExtensionAuthorizationCall extends ethereum.Call {
  get inputs(): RevokeExtensionAuthorizationCall__Inputs {
    return new RevokeExtensionAuthorizationCall__Inputs(this);
  }

  get outputs(): RevokeExtensionAuthorizationCall__Outputs {
    return new RevokeExtensionAuthorizationCall__Outputs(this);
  }
}

export class RevokeExtensionAuthorizationCall__Inputs {
  _call: RevokeExtensionAuthorizationCall;

  constructor(call: RevokeExtensionAuthorizationCall) {
    this._call = call;
  }

  get _module(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _extension(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RevokeExtensionAuthorizationCall__Outputs {
  _call: RevokeExtensionAuthorizationCall;

  constructor(call: RevokeExtensionAuthorizationCall) {
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

export class TransferTokensCall extends ethereum.Call {
  get inputs(): TransferTokensCall__Inputs {
    return new TransferTokensCall__Inputs(this);
  }

  get outputs(): TransferTokensCall__Outputs {
    return new TransferTokensCall__Outputs(this);
  }
}

export class TransferTokensCall__Inputs {
  _call: TransferTokensCall;

  constructor(call: TransferTokensCall) {
    this._call = call;
  }

  get _token(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _destination(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferTokensCall__Outputs {
  _call: TransferTokensCall;

  constructor(call: TransferTokensCall) {
    this._call = call;
  }
}

export class UnProtectModuleCall extends ethereum.Call {
  get inputs(): UnProtectModuleCall__Inputs {
    return new UnProtectModuleCall__Inputs(this);
  }

  get outputs(): UnProtectModuleCall__Outputs {
    return new UnProtectModuleCall__Outputs(this);
  }
}

export class UnProtectModuleCall__Inputs {
  _call: UnProtectModuleCall;

  constructor(call: UnProtectModuleCall) {
    this._call = call;
  }

  get _module(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UnProtectModuleCall__Outputs {
  _call: UnProtectModuleCall;

  constructor(call: UnProtectModuleCall) {
    this._call = call;
  }
}
