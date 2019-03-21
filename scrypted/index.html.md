---
title: Scrypted API Reference

language_tabs: # must be one of https://git.io/vQNgJ
  - javascript
  - typescript

search: true
---
<%= partial "includes/GettingStarted.md.erb" %>

<%= partial "includes/Concepts.md.erb" %>



# Core Reference


## ScryptedDevice

<%= partial "includes/scrypted/ScryptedDevice.md.erb" %>


> Definition

```javascript
interface ScryptedDevice  {
  events(): string[];
  id(): string;
  interfaces(): string[];
  name(): string;
  on(event: string, callback: (eventSource: ScryptedDevice, eventInterface: string, eventData: object) => void): EventListenerRegister;
  type(): ScryptedThingType;
  watch(event: string, callback: (eventSource: ScryptedDevice, eventInterface: string, eventData: object) => void): EventListenerRegister;
}
```





<aside class="notice">
All devices in Scrypted implement ScryptedDevice, which contains the id, name, and type. Add listeners to subscribe to events from that device.
</aside>





### events
string[] events()



### id
string id()



### interfaces
string[] interfaces()



### name
string name()



### on
<a href='#eventlistenerregister'>EventListenerRegister</a> on(event: string, EventListener: function)

Subscribe to events from a specific interface on a device, such as 'OnOff' or 'Brightness'.
The callback function has the signature function(eventSource, eventData).
The eventSource is the interface from where the event originated, and eventData will contain data specific
to that type of interface. OnOff would be boolean, while Brightness would be an integer between 0 and 100.

### type
ScryptedThingType type()



### watch
<a href='#eventlistenerregister'>EventListenerRegister</a> watch(event: string, EventListener: function)

Similar to 'on', but will passively watch for events, and not initiate polling.









## ScryptedDeviceType

<%= partial "includes/scrypted/ScryptedDeviceType.md.erb" %>


```javascript
enum ScryptedDeviceType {
  Builtin = "Builtin",
  Camera = "Camera",
  Fan = "Fan",
  Light = "Light",
  Switch = "Switch",
  Outlet = "Outlet",
  Sensor = "Sensor",
  Scene = "Scene",
  Program = "Program",
  Automation = "Automation",
  Vacuum = "Vacuum",
  Notifier = "Notifier",
  Thermostat = "Thermostat",
  Lock = "Lock",
  PasswordControl = "PasswordControl",
  Display = "Display",
  Speaker = "Speaker",
  Event = "Event",
  Entry = "Entry",
  DeviceProvider = "DeviceProvider",
  DataSource = "DataSource",
  API = "API",
  Unknown = "Unknown",
}
```











Enum |
----
"Builtin" |
"Camera" |
"Fan" |
"Light" |
"Switch" |
"Outlet" |
"Sensor" |
"Scene" |
"Program" |
"Automation" |
"Vacuum" |
"Notifier" |
"Thermostat" |
"Lock" |
"PasswordControl" |
"Display" |
"Speaker" |
"Event" |
"Entry" |
"DeviceProvider" |
"DataSource" |
"API" |
"Unknown" |







# Event Reference


## EventListener

<%= partial "includes/scrypted/EventListener.md.erb" %>


> Definition

```javascript
interface EventListener  {
  onEvent(eventSource: ScryptedDevice, eventInterface: string, eventData: object): void;
}
```









### onEvent
void onEvent(eventSource: ScryptedDevice, eventInterface: string, eventData: object)

This device type can be hooked by Automation actions to handle events. The event source, event type (interface), and event data are all passed to the listener as arguments.









## EventListenerRegister

<%= partial "includes/scrypted/EventListenerRegister.md.erb" %>


> Definition

```javascript
interface EventListenerRegister  {
  getListener(): EventListener;
  removeListener(): void;
}
```





<aside class="notice">
Returned when an event listener is attached to an EventEmitter. Call removeListener to unregister from events.
</aside>





### getListener
<a href='#eventlistener'>EventListener</a> getListener()



### removeListener
void removeListener()














# Device Reference


## DeviceManager

<%= partial "includes/scrypted/DeviceManager.md.erb" %>


> Definition

```javascript
interface DeviceManager  {
  getDeviceById(id: string): ScryptedDevice;
  getDeviceByName(name: string): ScryptedDevice;
  onDeviceDiscovered(device: Device): void;
  onDeviceEvent(eventInterface: string, eventData: object): void;
  onDeviceEvent(id: string, eventInterface: string, eventData: object): void;
  onDevicesChanged(devices: DeviceManifest): void;
}
```





<aside class="notice">
DeviceManager is the interface which plugins use to report devices and device events to Scrypted. It is also used to query Scrypted for other devices.
</aside>





### getDeviceById
ScryptedDevice getDeviceById(id: string)

Find a Scrypted device by id.

### getDeviceByName
ScryptedDevice getDeviceByName(name: string)

Find a Scrypted device by name.

### onDeviceDiscovered
void onDeviceDiscovered(device: <a href='#device'>Device</a>)

onDeviceDiscovered is used to report new devices that are trickle discovered, one by one, such as via a network broadcast.

### onDeviceEvent
void onDeviceEvent(eventInterface: string, eventData: object)

Fire an event for this plugin's device.

### onDeviceEvent
void onDeviceEvent(id: string, eventInterface: string, eventData: object)

Fire an event for a device provided by this plugin.

### onDevicesChanged
void onDevicesChanged(devices: <a href='#devicemanifest'>DeviceManifest</a>)

onDevicesChanged is used to sync Scrypted with devices that are attached to a hub, such as Hue or SmartThings. All the devices should be reported at once.









## DeviceProvider

<%= partial "includes/scrypted/DeviceProvider.md.erb" %>


> Definition

```javascript
interface DeviceProvider  {
  discoverDevices(duration: number): void;
  getDevice(id: string): object;
}
```





<aside class="notice">
DeviceProvider acts as a controller/hub and exposes multiple devices to Scrypted Device Manager.
</aside>





### discoverDevices
void discoverDevices(duration: number)

Initiate device discovery for the specified duration.

### getDevice
object getDevice(id: string)

Get an instance of a previously discovered device that was reported to the device manager.









## DeviceManifest

<%= partial "includes/scrypted/DeviceManifest.md.erb" %>




> Definition

```javascript
interface DeviceManifest {
  devices: Device[];
}
```



<aside class="notice">
DeviceManifest is passed to DeviceManager.onDevicesChanged to sync a full list of devices from the controller/hub (Hue, SmartThings, etc)
</aside>





### Properties
Name      | Type
--------- | ----
devices | <a href='#device'>Device</a>[]






## Device

<%= partial "includes/scrypted/Device.md.erb" %>




> Definition

```javascript
interface Device {
  events: string[];
  id: string;
  interfaces: string[];
  model: string;
  name: string;
  room: string;
  type: ScryptedThingType;
}
```



<aside class="notice">
Device objects are created by DeviceProviders when new devices are discover and synced to Scrypted via the DeviceManager.
</aside>





### Properties
Name      | Type
--------- | ----
events | string[]
id | string
interfaces | string[]
model | string
name | string
room | string
type | ScryptedThingType









# Interface Reference


## OnOff

<%= partial "includes/scrypted/OnOff.md.erb" %>


> Definition

```javascript
interface OnOff  {
  isOn(): boolean;
  turnOff(): void;
  turnOn(): void;
}
```





<aside class="notice">
OnOff is a basic binary switch.
</aside>





### isOn
boolean isOn()



### turnOff
void turnOff()



### turnOn
void turnOn()











## Brightness

<%= partial "includes/scrypted/Brightness.md.erb" %>


> Definition

```javascript
interface Brightness  {
  getLevel(): number;
  setLevel(brightness: number): void;
}
```





<aside class="notice">
Brightness is a lighting device that can be dimmed/lit between 0 to 100.
</aside>





### getLevel
number getLevel()



### setLevel
void setLevel(brightness: number)











## ColorSettingTemperature

<%= partial "includes/scrypted/ColorSettingTemperature.md.erb" %>


> Definition

```javascript
interface ColorSettingTemperature  {
  getTemperature(): number;
  getTemperatureMaxK(): number;
  getTemperatureMinK(): number;
  setTemperature(kelvin: number): void;
}
```





<aside class="notice">
ColorSettingTemperature sets the color temperature of a light in Kelvin.
</aside>





### getTemperature
number getTemperature()



### getTemperatureMaxK
number getTemperatureMaxK()



### getTemperatureMinK
number getTemperatureMinK()



### setTemperature
void setTemperature(kelvin: number)











## ColorSettingRgb

<%= partial "includes/scrypted/ColorSettingRgb.md.erb" %>


> Definition

```javascript
interface ColorSettingRgb  {
  getRgb(): ColorRgb;
  setRgb(r: number, g: number, b: number): void;
}
```





<aside class="notice">
ColorSettingRgb sets the color of a colored light using the RGB representation.
</aside>





### getRgb
<a href='#colorrgb'>ColorRgb</a> getRgb()



### setRgb
void setRgb(r: number, g: number, b: number)











## ColorRgb

<%= partial "includes/scrypted/ColorRgb.md.erb" %>


> Definition

```javascript
interface ColorRgb  {
  toString(): string;
}
```



> Definition

```javascript
interface ColorRgb {
  b: number;
  g: number;
  r: number;
}
```



<aside class="notice">
Represents an RGB color value component values between 0 and 255.
</aside>





### toString
string toString()







### Properties
Name      | Type
--------- | ----
b | number
g | number
r | number






## ColorSettingHsv

<%= partial "includes/scrypted/ColorSettingHsv.md.erb" %>


> Definition

```javascript
interface ColorSettingHsv  {
  getHsv(): ColorHsv;
  setHsv(hue: number, saturation: number, value: number): void;
}
```





<aside class="notice">
ColorSettingHsv sets the color of a colored light using the HSV representation.
</aside>





### getHsv
<a href='#colorhsv'>ColorHsv</a> getHsv()



### setHsv
void setHsv(hue: number, saturation: number, value: number)











## ColorHsv

<%= partial "includes/scrypted/ColorHsv.md.erb" %>


> Definition

```javascript
interface ColorHsv  {
  toString(): string;
}
```



> Definition

```javascript
interface ColorHsv {
  h: number;
  s: number;
  v: number;
}
```



<aside class="notice">
Represents an HSV color value component values between 0 and 1.
</aside>





### toString
string toString()







### Properties
Name      | Type
--------- | ----
h | number
s | number
v | number






## BinarySensor

<%= partial "includes/scrypted/BinarySensor.md.erb" %>


> Definition

```javascript
interface BinarySensor  {
  getBinaryState(): boolean;
}
```









### getBinaryState
boolean getBinaryState()











## EntrySensor

<%= partial "includes/scrypted/EntrySensor.md.erb" %>


> Definition

```javascript
interface EntrySensor  {
  isEntryOpen(): boolean;
}
```









### isEntryOpen
boolean isEntryOpen()











## EntryHandleSensor

<%= partial "includes/scrypted/EntryHandleSensor.md.erb" %>


> Definition

```javascript
interface EntryHandleSensor  {
  isDoorOpen(): boolean;
}
```









### isDoorOpen
boolean isDoorOpen()











## IntrusionSensor

<%= partial "includes/scrypted/IntrusionSensor.md.erb" %>


> Definition

```javascript
interface IntrusionSensor  {
  isIntrusionDetected(): boolean;
}
```









### isIntrusionDetected
boolean isIntrusionDetected()











## FloodSensor

<%= partial "includes/scrypted/FloodSensor.md.erb" %>


> Definition

```javascript
interface FloodSensor  {
  isFlooded(): boolean;
}
```









### isFlooded
boolean isFlooded()











## Notifier

<%= partial "includes/scrypted/Notifier.md.erb" %>


> Definition

```javascript
interface Notifier  {
  sendNotification(title: string, body: string): void;
  sendNotification(title: string, body: string, media: MediaObject, mimeType: string): void;
}
```





<aside class="notice">
Notifier can be any endpoint that can receive messages, such as speakers, phone numbers, messaging clients, etc. The messages may optionally contain media.
</aside>





### sendNotification
void sendNotification(title: string, body: string)



### sendNotification
void sendNotification(title: string, body: string, media: <a href='#mediaobject'>MediaObject</a>, mimeType: string)

If a the media parameter is supplied, the mime type denotes how to send the media within notification. For example, specify 'image/*' to send a video MediaObject as an image.
Passing null uses the native type of the MediaObject. If that is not supported by the notifier, the media will be converted to a compatible type.









## MediaObject

<%= partial "includes/scrypted/MediaObject.md.erb" %>


> Definition

```javascript
interface MediaObject  {
  getMimeType(): string;
}
```





<aside class="notice">
MediaObject is an intermediate object within Scrypted to represent all media objects. Plugins should use the MediaConverter to convert the Scrypted MediaObject into a desired type, whether it is a externally accessible URL, a Buffer, etc.
</aside>





### getMimeType
string getMimeType()











## StartStop

<%= partial "includes/scrypted/StartStop.md.erb" %>


> Definition

```javascript
interface StartStop  {
  isPausable(): boolean;
  isPaused(): boolean;
  isRunning(): boolean;
  pause(): void;
  resume(): void;
  start(): void;
  stop(): void;
}
```





<aside class="notice">
StartStop represents a device that can be started, stopped, and possibly paused and resumed. Typically vacuum cleaners or washers.
</aside>





### isPausable
boolean isPausable()



### isPaused
boolean isPaused()



### isRunning
boolean isRunning()



### pause
void pause()



### resume
void resume()



### start
void start()



### stop
void stop()











## Dock

<%= partial "includes/scrypted/Dock.md.erb" %>


> Definition

```javascript
interface Dock  {
  dock(): void;
  isDocked(): boolean;
}
```





<aside class="notice">
Dock instructs devices that have a base station or charger, to return to their home.
</aside>





### dock
void dock()



### isDocked
boolean isDocked()











## Program

<%= partial "includes/scrypted/Program.md.erb" %>


> Definition

```javascript
interface Program  {
  run(args: object[]): object;
  runAsync(args: object[]): object;
}
```









### run
object run(args: object[])

Synchronously run a script given the provided arguments.

### runAsync
object runAsync(args: object[])

Asynchronously run a script given the provided arguments.









## TemperatureSetting

<%= partial "includes/scrypted/TemperatureSetting.md.erb" %>


> Definition

```javascript
interface TemperatureSetting implements Thermometer, HumiditySensor {
  getAvailableThermostatModes(): ThermostatMode[];
  getTemperatureSetpoint(): number;
  getTemperatureSetpointHigh(): number;
  getTemperatureSetpointLow(): number;
  getThermostatMode(): ThermostatMode;
  setTemperatureSetRange(low: number, high: number): void;
  setTemperatureSetpoint(degrees: number): void;
  setThermostatMode(mode: ThermostatMode): void;
}
```





<aside class="notice">
TemperatureSetting represents a thermostat device.
</aside>





### getAvailableThermostatModes
<a href='#thermostatmode'>ThermostatMode</a>[] getAvailableThermostatModes()



### getTemperatureSetpoint
number getTemperatureSetpoint()



### getTemperatureSetpointHigh
number getTemperatureSetpointHigh()



### getTemperatureSetpointLow
number getTemperatureSetpointLow()



### getThermostatMode
<a href='#thermostatmode'>ThermostatMode</a> getThermostatMode()



### setTemperatureSetRange
void setTemperatureSetRange(low: number, high: number)



### setTemperatureSetpoint
void setTemperatureSetpoint(degrees: number)



### setThermostatMode
void setThermostatMode(mode: <a href='#thermostatmode'>ThermostatMode</a>)











## Thermometer

<%= partial "includes/scrypted/Thermometer.md.erb" %>


> Definition

```javascript
interface Thermometer  {
  getTemperatureAmbient(): number;
  getTemperatureUnit(): TemperatureUnit;
}
```









### getTemperatureAmbient
number getTemperatureAmbient()

Get the ambient temperature in Celsius.

### getTemperatureUnit
<a href='#temperatureunit'>TemperatureUnit</a> getTemperatureUnit()

Get the user facing unit of measurement for this thermometer. This may be Fahrenheit, but getTemperatureAmbient will return results in Celsius.









## TemperatureUnit

<%= partial "includes/scrypted/TemperatureUnit.md.erb" %>


```javascript
enum TemperatureUnit {
  C = "C",
  F = "F",
}
```











Enum |
----
"C" |
"F" |




## HumiditySensor

<%= partial "includes/scrypted/HumiditySensor.md.erb" %>


> Definition

```javascript
interface HumiditySensor  {
  getHumidityAmbient(): number;
}
```









### getHumidityAmbient
number getHumidityAmbient()











## ThermostatMode

<%= partial "includes/scrypted/ThermostatMode.md.erb" %>


```javascript
enum ThermostatMode {
  Off = "Off",
  Cool = "Cool",
  Heat = "Heat",
  HeatCool = "HeatCool",
  Auto = "Auto",
  FanOnly = "FanOnly",
  Purifier = "Purifier",
  Eco = "Eco",
  Dry = "Dry",
  On = "On",
}
```











Enum |
----
"Off" |
"Cool" |
"Heat" |
"HeatCool" |
"Auto" |
"FanOnly" |
"Purifier" |
"Eco" |
"Dry" |
"On" |




## Lock

<%= partial "includes/scrypted/Lock.md.erb" %>


> Definition

```javascript
interface Lock  {
  isLocked(): boolean;
  lock(): void;
  unlock(): void;
}
```





<aside class="notice">
Lock controls devices that can lock or unlock entries. Often works in tandem with PasswordControl.
</aside>





### isLocked
boolean isLocked()



### lock
void lock()



### unlock
void unlock()











## PasswordControl

<%= partial "includes/scrypted/PasswordControl.md.erb" %>


> Definition

```javascript
interface PasswordControl  {
  addPassword(password: string): void;
  getPasswords(): string[];
  removePassword(password: string): void;
}
```





<aside class="notice">
PasswordControl represents devices that authorize users via a passcode or pin code.
</aside>





### addPassword
void addPassword(password: string)



### getPasswords
string[] getPasswords()



### removePassword
void removePassword(password: string)











## Camera

<%= partial "includes/scrypted/Camera.md.erb" %>


> Definition

```javascript
interface Camera  {
  takePicture(): MediaObject;
}
```





<aside class="notice">
Camera devices can take still photos.
</aside>





### takePicture
<a href='#mediaobject'>MediaObject</a> takePicture()











## CameraStream

<%= partial "includes/scrypted/CameraStream.md.erb" %>


> Definition

```javascript
interface CameraStream  {
  createVideoCapturer(): MediaObject;
}
```





<aside class="notice">
CameraStream devices can capture video streams.
</aside>





### createVideoCapturer
<a href='#mediaobject'>MediaObject</a> createVideoCapturer()











## UltravioletSensor

<%= partial "includes/scrypted/UltravioletSensor.md.erb" %>


> Definition

```javascript
interface UltravioletSensor  {
  getUltraviolet(): number;
}
```









### getUltraviolet
number getUltraviolet()











## LuminanceSensor

<%= partial "includes/scrypted/LuminanceSensor.md.erb" %>


> Definition

```javascript
interface LuminanceSensor  {
  getLuminance(): number;
}
```









### getLuminance
number getLuminance()











## Scene

<%= partial "includes/scrypted/Scene.md.erb" %>


> Definition

```javascript
interface Scene  {
  activate(): void;
  deactivate(): void;
  isReversible(): boolean;
}
```





<aside class="notice">
Scenes control multiple different devices into a given state.
</aside>





### activate
void activate()



### deactivate
void deactivate()



### isReversible
boolean isReversible()

If a scene can be reversed, isReversible should return true. Otherwise deactivate will not be called.









## Entry

<%= partial "includes/scrypted/Entry.md.erb" %>


> Definition

```javascript
interface Entry  {
  closeEntry(): void;
  isEntryOpen(): boolean;
  openEntry(): void;
}
```





<aside class="notice">
Entry represents devices that can open and close barriers, such as garage doors.
</aside>





### closeEntry
void closeEntry()



### isEntryOpen
boolean isEntryOpen()



### openEntry
void openEntry()











## Alarm

<%= partial "includes/scrypted/Alarm.md.erb" %>


> Definition

```javascript
interface Alarm  {
  getClockType(): ClockType;
  getHour(): number;
  getMinute(): number;
  isEnabled(day: number): boolean;
}
```





<aside class="notice">
Event data from the Scheduler component.
</aside>





### getClockType
<a href='#clocktype'>ClockType</a> getClockType()



### getHour
number getHour()



### getMinute
number getMinute()



### isEnabled
boolean isEnabled(day: number)











## ClockType

<%= partial "includes/scrypted/ClockType.md.erb" %>


```javascript
enum ClockType {
  _AM = "_AM",
  _PM = "_PM",
  _24HourClock = "_24HourClock",
  _BeforeSunrise = "_BeforeSunrise",
  _AfterSunrise = "_AfterSunrise",
  _BeforeSunset = "_BeforeSunset",
  _AfterSunset = "_AfterSunset",
}
```











Enum |
----
"_AM" |
"_PM" |
"_24HourClock" |
"_BeforeSunrise" |
"_AfterSunrise" |
"_BeforeSunset" |
"_AfterSunset" |




## Battery

<%= partial "includes/scrypted/Battery.md.erb" %>


> Definition

```javascript
interface Battery  {
  getBatteryLevel(): number;
}
```





<aside class="notice">
Battery retrieves the battery level of battery powered devices.
</aside>





### getBatteryLevel
number getBatteryLevel()











## Refresh

<%= partial "includes/scrypted/Refresh.md.erb" %>


> Definition

```javascript
interface Refresh  {
  getRefreshFrequency(): number;
  refresh(refreshInterface: string, userInitiated: boolean): void;
}
```





<aside class="notice">
Refresh indicates that this device has properties that are not automatically updated, and must be periodically refreshed.
</aside>





### getRefreshFrequency
number getRefreshFrequency()

Get the recommended refresh/poll frequency in seconds for this device.

### refresh
void refresh(refreshInterface: string, userInitiated: boolean)

This method is called by Scrypted when the properties of the device need to be refreshed. When the device has completed the refresh, the appropriate events should be emitted. The parameters provide the specific interface that needs to be refreshed and whether it was user initiated (via UI or voice).









## MediaPlayer

<%= partial "includes/scrypted/MediaPlayer.md.erb" %>


> Definition

```javascript
interface MediaPlayer  {
  load(media: MediaObject, options: MediaPlayerOptions): void;
  load(mediaUrl: string, options: MediaPlayerOptions): void;
  pause(): void;
  play(): void;
  stop(): void;
}
```





<aside class="notice">
MediaPlayer allows media playback on screen or speaker devices, such as Chromecasts or TVs.
</aside>





### load
void load(media: <a href='#mediaobject'>MediaObject</a>, options: <a href='#mediaplayeroptions'>MediaPlayerOptions</a>)



### load
void load(mediaUrl: string, options: <a href='#mediaplayeroptions'>MediaPlayerOptions</a>)



### pause
void pause()



### play
void play()



### stop
void stop()











## MediaPlayerOptions

<%= partial "includes/scrypted/MediaPlayerOptions.md.erb" %>




> Definition

```javascript
interface MediaPlayerOptions {
  autoplay: boolean;
  mimeType: string;
}
```







### Properties
Name      | Type
--------- | ----
autoplay | boolean
mimeType | string






## FaceDetector

<%= partial "includes/scrypted/FaceDetector.md.erb" %>














## AudioSensor

<%= partial "includes/scrypted/AudioSensor.md.erb" %>














## MotionSensor

<%= partial "includes/scrypted/MotionSensor.md.erb" %>














## OccupancySensor

<%= partial "includes/scrypted/OccupancySensor.md.erb" %>














## Online

<%= partial "includes/scrypted/Online.md.erb" %>


> Definition

```javascript
interface Online  {
  isOnline(): boolean;
}
```





<aside class="notice">
Online denotes whether the device is online or unresponsive. It may be unresponsive due to being unplugged, network error, etc.
</aside>





### isOnline
boolean isOnline()











## SoftwareUpdate

<%= partial "includes/scrypted/SoftwareUpdate.md.erb" %>


> Definition

```javascript
interface SoftwareUpdate  {
  checkForUpdate(): void;
  installUpdate(): void;
  isUpdateAvailable(): boolean;
}
```





<aside class="notice">
SoftwareUpdate provides a way to check for updates and install them. This may be a Scrypted Plugin or device firmware.
</aside>





### checkForUpdate
void checkForUpdate()



### installUpdate
void installUpdate()



### isUpdateAvailable
boolean isUpdateAvailable()











## Logger

<%= partial "includes/scrypted/Logger.md.erb" %>


> Definition

```javascript
interface Logger  {
  a(msg: string): void;
  clear(): void;
  clearAlert(msg: string): void;
  clearAlerts(): void;
  d(msg: string): void;
  e(msg: string): void;
  i(msg: string): void;
  v(msg: string): void;
  w(msg: string): void;
}
```





<aside class="notice">
Logger is exposed via log.* to allow writing to the Scrypted log.
</aside>





### a
void a(msg: string)

Alert. Alert level logs will be displayed as a notification in the management console.

### clear
void clear()

Clear the log

### clearAlert
void clearAlert(msg: string)

Clear a specific alert

### clearAlerts
void clearAlerts()

Clear all alerts

### d
void d(msg: string)

Debug

### e
void e(msg: string)

Error

### i
void i(msg: string)

Info

### v
void v(msg: string)

Verbose

### w
void w(msg: string)

Warn









## MediaSource

<%= partial "includes/scrypted/MediaSource.md.erb" %>


> Definition

```javascript
interface MediaSource  {
  getMedia(): MediaObject;
}
```









### getMedia
<a href='#mediaobject'>MediaObject</a> getMedia()

Get a MediaObject that will be automatically converted for playback on other devices.









## MessagingEndpoint

<%= partial "includes/scrypted/MessagingEndpoint.md.erb" %>














## Settings

<%= partial "includes/scrypted/Settings.md.erb" %>


> Definition

```javascript
interface Settings  {
  getBoolean(key: string): boolean;
  getBoolean(key: string, defaultValue: boolean): boolean;
  getConfigurationValueList(key: string): string[];
  getDouble(key: string): number;
  getFloat(key: string): number;
  getInt(key: string): number;
  getKeyDescription(key: string): string;
  getKeys(): string[];
  getString(key: string): string;
  putBoolean(key: string, value: boolean): void;
  putDouble(key: string, value: number): void;
  putFloat(key: string, value: number): void;
  putInt(key: string, value: number): void;
  putString(key: string, value: string): void;
}
```





<aside class="notice">
Settings viewing and editing of device configurations that describe or modify behavior.
</aside>





### getBoolean
boolean getBoolean(key: string)



### getBoolean
boolean getBoolean(key: string, defaultValue: boolean)



### getConfigurationValueList
string[] getConfigurationValueList(key: string)



### getDouble
number getDouble(key: string)



### getFloat
number getFloat(key: string)



### getInt
number getInt(key: string)



### getKeyDescription
string getKeyDescription(key: string)



### getKeys
string[] getKeys()



### getString
string getString(key: string)



### putBoolean
void putBoolean(key: string, value: boolean)



### putDouble
void putDouble(key: string, value: number)



### putFloat
void putFloat(key: string, value: number)



### putInt
void putInt(key: string, value: number)



### putString
void putString(key: string, value: string)











## OauthClient

<%= partial "includes/scrypted/OauthClient.md.erb" %>


> Definition

```javascript
interface OauthClient  {
  getOauthUrl(): string;
  onOauthCallback(callbackUrl: string): void;
}
```





<aside class="notice">
The OauthClient can be implemented to perform the browser based Oauth process from within a plugin.
</aside>





### getOauthUrl
string getOauthUrl()

Get the Oauth URL to navigate to in the browser. The redirect_uri parameter is not needed and will be automatically set by Scrypted.

### onOauthCallback
void onOauthCallback(callbackUrl: string)

When an oauth request by a plugin completes, the callback url, with the code/token, will be passed to this method.









## HttpRequestHandler

<%= partial "includes/scrypted/HttpRequestHandler.md.erb" %>


> Definition

```javascript
interface HttpRequestHandler  {
  getEndpoint(): string;
  onRequest(request: HttpRequest, response: HttpResponse): void;
}
```





<aside class="notice">
The HttpRequestHandler allows handling of web requests under the endpoint path: /endpoint/<endpoint>/*.
</aside>





### getEndpoint
string getEndpoint()

Get the preferred endpoint of this HttpRequestHandler. Local/development scripts can set this to any value. This is ignored if the plugin is installed via npm: the endpoint will always be the npm package name.

### onRequest
void onRequest(request: <a href='#httprequest'>HttpRequest</a>, response: <a href='#httpresponse'>HttpResponse</a>)

Callback to handle an incoming request.









## HttpRequest

<%= partial "includes/scrypted/HttpRequest.md.erb" %>




> Definition

```javascript
interface HttpRequest {
  body: string;
  headers: object;
  method: string;
  rootPath: string;
  url: string;
}
```







### Properties
Name      | Type
--------- | ----
body | string
headers | object
method | string
rootPath | string
url | string






## HttpResponse

<%= partial "includes/scrypted/HttpResponse.md.erb" %>


> Definition

```javascript
interface HttpResponse  {
  send(options: HttpResponseOptions, body: string): void;
  send(options: HttpResponseOptions, body: Buffer): void;
  send(body: string): void;
  send(body: Buffer): void;
}
```





<aside class="notice">
Response object provided by the HttpRequestHandler.
</aside>





### send
void send(options: <a href='#httpresponseoptions'>HttpResponseOptions</a>, body: string)



### send
void send(options: <a href='#httpresponseoptions'>HttpResponseOptions</a>, body: Buffer)



### send
void send(body: string)



### send
void send(body: Buffer)











## HttpResponseOptions

<%= partial "includes/scrypted/HttpResponseOptions.md.erb" %>




> Definition

```javascript
interface HttpResponseOptions {
  asContent: boolean;
  code: number;
  headers: object;
}
```







### Properties
Name      | Type
--------- | ----
asContent | boolean
code | number
headers | object






