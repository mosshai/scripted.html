---
title: Scrypted API Reference

language_tabs: # must be one of https://git.io/vQNgJ
  - javascript
  - typescript

search: true
---
# Types


# ColorSettingRgb




## getRgb
ColorRgb getRgb()





## setRgb
void setRgb([object Object], [object Object], [object Object])


Parameter | Type
--------- | ----
r | <a href='#int'>int</a>
g | <a href='#int'>int</a>
b | <a href='#int'>int</a>









# ColorRgb




## toString
String toString()







Name      | Type
--------- | ----
b | int
g | int
r | int




# HumiditySensor




## getHumidityAmbient
double getHumidityAmbient()









# MediaPlayer




## load
void load([object Object], [object Object])


Parameter | Type
--------- | ----
media | <a href='#mediaobject'>MediaObject</a>
options | <a href='#mediaplayeroptions'>MediaPlayerOptions</a>





## load
void load([object Object], [object Object])


Parameter | Type
--------- | ----
mediaUrl | <a href='#string'>String</a>
options | <a href='#mediaplayeroptions'>MediaPlayerOptions</a>





## pause
void pause()





## play
void play()





## stop
void stop()









# MediaObject




## getMimeType
String getMimeType()







Name      | Type
--------- | ----
CANCELLED | Cancellable
COMPLETED | Cancellable




# Cancellable




## cancel
boolean cancel()





## isCancelled
boolean isCancelled()





## isDone
boolean isDone()









# MediaPlayerOptions





Name      | Type
--------- | ----
autoplay | boolean
mimeType | String




# FaceDetector







# EventListener




## onEvent
void onEvent([object Object], [object Object], [object Object])


Parameter | Type
--------- | ----
eventSource | <a href='#scryptedinterface'>ScryptedInterface</a>
eventInterface | <a href='#class'>Class</a>
eventData | <a href='#object'>Object</a>



This device type can be registered to listen for events. The event source, event type (interface), and event data are all passed to the listener as arguments.





# Lock




## isLocked
boolean isLocked()





## lock
void lock()





## unlock
void unlock()









# IntrusionSensor




## isIntrusionDetected
boolean isIntrusionDetected()









# Notifier




## sendNotification
void sendNotification([object Object], [object Object])


Parameter | Type
--------- | ----
title | <a href='#string'>String</a>
body | <a href='#string'>String</a>





## sendNotification
void sendNotification([object Object], [object Object], [object Object], [object Object])


Parameter | Type
--------- | ----
title | <a href='#string'>String</a>
body | <a href='#string'>String</a>
media | <a href='#mediaobject'>MediaObject</a>
mimeType | <a href='#string'>String</a>



If a the media parameter is supplied, the mime type denotes how to send the media within notification. For example, specify &#39;image/*&#39; to send a video MediaObject as an image.
Passing null uses the native type of the MediaObject. If that is not supported by the notifier, the media will be converted to a compatible type.





# BinarySensor




## getBinaryState
boolean getBinaryState()









# OauthClient
The OauthClient can be implemented to perform the browser based Oauth process from within a plugin.



## getOauthUrl
String getOauthUrl()



Get the Oauth URL to navigate to in the browser. The redirect_uri parameter is not needed and will be automatically set by Scrypted.

## onOauthCallback
void onOauthCallback([object Object])


Parameter | Type
--------- | ----
callbackUrl | <a href='#string'>String</a>



When an oauth request by a plugin completes, the callback url, with the code/token, will be passed to this method.





# Thermometer




## getTemperatureAmbient
double getTemperatureAmbient()



Get the ambient temperature in Celsius.

## getTemperatureUnit
TemperatureUnit getTemperatureUnit()



Get the user facing unit of measurement for this thermometer. This may be Fahrenheit, but getTemperatureAmbient will return results in Celsius.





# TemperatureUnit







# PasswordControl
PasswordControl represents devices that authorize users via a passcode or pin code.



## addPassword
void addPassword([object Object])


Parameter | Type
--------- | ----
password | <a href='#string'>String</a>





## getPasswords
Set getPasswords()





## removePassword
void removePassword([object Object])


Parameter | Type
--------- | ----
password | <a href='#string'>String</a>









# TemperatureSetting
TemperatureSetting represents a thermostat device.



## getAvailableThermostatModes
ThermostatMode[] getAvailableThermostatModes()





## getTemperatureSetpoint
double getTemperatureSetpoint()





## getTemperatureSetpointHigh
double getTemperatureSetpointHigh()





## getTemperatureSetpointLow
double getTemperatureSetpointLow()





## getThermostatMode
ThermostatMode getThermostatMode()





## setTemperatureSetRange
void setTemperatureSetRange([object Object], [object Object])


Parameter | Type
--------- | ----
low | <a href='#double'>double</a>
high | <a href='#double'>double</a>





## setTemperatureSetpoint
void setTemperatureSetpoint([object Object])


Parameter | Type
--------- | ----
degrees | <a href='#double'>double</a>





## setThermostatMode
void setThermostatMode([object Object])


Parameter | Type
--------- | ----
mode | <a href='#thermostatmode'>ThermostatMode</a>









# ThermostatMode







# Brightness
Brightness is a lighting device that can be dimmed/lit between 0 to 100.



## getLevel
int getLevel()





## setLevel
void setLevel([object Object])


Parameter | Type
--------- | ----
brightness | <a href='#int'>int</a>









# ColorSettingTemperature




## getTemperature
int getTemperature()





## getTemperatureMaxK
int getTemperatureMaxK()





## getTemperatureMinK
int getTemperatureMinK()





## setTemperature
void setTemperature([object Object])


Parameter | Type
--------- | ----
kelvin | <a href='#int'>int</a>









# HttpRequestHandler
The HttpRequestHandler allows handling of web requests under the endpoint path: /endpoint/&lt;endpoint&gt;/*.



## getEndpoint
String getEndpoint()



Get the preferred endpoint of this HttpRequestHandler. Local/development scripts can set this to any value. This is ignored if the plugin is installed via npm: the endpoint will always be the npm package name.

## onRequest
void onRequest([object Object], [object Object])


Parameter | Type
--------- | ----
request | <a href='#httprequest'>HttpRequest</a>
response | <a href='#httpresponse'>HttpResponse</a>



Callback to handle an incoming request.





# HttpRequest





Name      | Type
--------- | ----
body | String
headers | Map
method | String
rootPath | String
url | String




# HttpResponse
Response object provided by the HttpRequestHandler.



## send
void send([object Object], [object Object])


Parameter | Type
--------- | ----
options | <a href='#httpresponseoptions'>HttpResponseOptions</a>
body | <a href='#string'>String</a>





## send
void send([object Object], [object Object])


Parameter | Type
--------- | ----
options | <a href='#httpresponseoptions'>HttpResponseOptions</a>
body | <a href='#bytebuffer'>ByteBuffer</a>





## send
void send([object Object])


Parameter | Type
--------- | ----
body | <a href='#string'>String</a>





## send
void send([object Object])


Parameter | Type
--------- | ----
body | <a href='#bytebuffer'>ByteBuffer</a>









# HttpResponseOptions





Name      | Type
--------- | ----
asContent | boolean
code | int
headers | Map




# Online
Online denotes whether the device is online or unresponsive. It may be unresponsive due to being unplugged, network error, etc.



## isOnline
boolean isOnline()









# Scene
Scenes control multiple different devices into a given state.



## activate
void activate()





## deactivate
void deactivate()





## isReversible
boolean isReversible()



If a scene can be reversed, isReversible should return true. Otherwise deactivate will not be called.





# LuminanceSensor




## getLuminance
double getLuminance()









# MediaSource




## getMedia
MediaObject getMedia()



Get a MediaObject that will be automatically converted for playback on other devices.





# EventEmitter




## on
EventListenerRegister on([object Object], [object Object])


Parameter | Type
--------- | ----
event | <a href='#string'>String</a>
callback | <a href='#javascriptobject'>JavaScriptObject</a>



Subscribe to events from a specific interface on a device, such as &#39;OnOff&#39; or &#39;Brightness&#39;.
The callback function has the signature function(eventSource, eventData).
The eventSource is the interface from where the event originated, and eventData will contain data specific
to that type of interface. OnOff would be boolean, while Brightness would be an integer between 0 and 100.

## watch
EventListenerRegister watch([object Object], [object Object])


Parameter | Type
--------- | ----
event | <a href='#string'>String</a>
callback | <a href='#javascriptobject'>JavaScriptObject</a>



Similar to &#39;on&#39;, but will passively watch for events, and not initiate polling.





# EventListenerRegister




## getListener
EventListener getListener()





## removeListener
void removeListener()









# CameraStream




## createVideoCapturer
Future createVideoCapturer()









# UltravioletSensor




## getUltraviolet
double getUltraviolet()









# DeviceManager




## getDeviceById
ScryptedInterface getDeviceById([object Object])


Parameter | Type
--------- | ----
id | <a href='#long'>long</a>





## getDeviceByName
ScryptedInterface getDeviceByName([object Object])


Parameter | Type
--------- | ----
name | <a href='#string'>String</a>





## onDeviceDiscovered
void onDeviceDiscovered([object Object])


Parameter | Type
--------- | ----
device | <a href='#javascriptobject'>JavaScriptObject</a>





## onDeviceEvent
void onDeviceEvent([object Object], [object Object])


Parameter | Type
--------- | ----
eventInterface | <a href='#class'>Class</a>
eventData | <a href='#object'>Object</a>





## onDeviceEvent
void onDeviceEvent([object Object], [object Object], [object Object])


Parameter | Type
--------- | ----
id | <a href='#string'>String</a>
eventInterface | <a href='#class'>Class</a>
eventData | <a href='#object'>Object</a>





## onDevicesChanged
void onDevicesChanged([object Object])


Parameter | Type
--------- | ----
devices | <a href='#javascriptobject'>JavaScriptObject</a>









# Alarm
Event data from the Scheduler component.



## getClockType
ClockType getClockType()





## getHour
int getHour()





## getMinute
int getMinute()





## isEnabled
boolean isEnabled([object Object])


Parameter | Type
--------- | ----
day | <a href='#int'>int</a>









# ClockType







# FloodSensor




## isFlooded
boolean isFlooded()









# Program




## run
Object run([object Object])


Parameter | Type
--------- | ----
args | <a href='#object[]'>Object[]</a>



Synchronously run a script given the provided arguments.

## runAsync
Object runAsync([object Object])


Parameter | Type
--------- | ----
args | <a href='#object[]'>Object[]</a>



Asynchronously run a script given the provided arguments.





# Dock




## dock
void dock()





## isDocked
boolean isDocked()









# EntryHandleSensor




## isDoorOpen
boolean isDoorOpen()









# Battery




## getBatteryLevel
int getBatteryLevel()









# ColorSettingHsv




## getHsv
ColorHsv getHsv()





## setHsv
void setHsv([object Object], [object Object], [object Object])


Parameter | Type
--------- | ----
hue | <a href='#double'>double</a>
saturation | <a href='#double'>double</a>
value | <a href='#double'>double</a>









# ColorHsv




## toString
String toString()







Name      | Type
--------- | ----
h | double
s | double
v | double




# DeviceProvider
DeviceProvider acts as a controller/hub and exposes multiple devices to Scrypted Device Manager.



## discoverDevices
void discoverDevices([object Object])


Parameter | Type
--------- | ----
duration | <a href='#long'>long</a>



Initiate device discovery for the specified duration.

## getDevice
Object getDevice([object Object])


Parameter | Type
--------- | ----
id | <a href='#string'>String</a>



Get an instance of a previously discovered device that was reported to the device manager.





# StartStop




## isPausable
boolean isPausable()





## isPaused
boolean isPaused()





## isRunning
boolean isRunning()





## pause
void pause()





## resume
void resume()





## start
void start()





## stop
void stop()









# MessagingEndpoint







# Settings
Settings viewing and editing of device configurations that describe or modify behavior.



## getBoolean
Boolean getBoolean([object Object])


Parameter | Type
--------- | ----
key | <a href='#string'>String</a>





## getBoolean
Boolean getBoolean([object Object], [object Object])


Parameter | Type
--------- | ----
key | <a href='#string'>String</a>
defaultValue | <a href='#boolean'>Boolean</a>





## getConfigurationValueList
List getConfigurationValueList([object Object])


Parameter | Type
--------- | ----
key | <a href='#string'>String</a>





## getDouble
Double getDouble([object Object])


Parameter | Type
--------- | ----
key | <a href='#string'>String</a>





## getFloat
Float getFloat([object Object])


Parameter | Type
--------- | ----
key | <a href='#string'>String</a>





## getInt
Integer getInt([object Object])


Parameter | Type
--------- | ----
key | <a href='#string'>String</a>





## getKeyDescription
String getKeyDescription([object Object])


Parameter | Type
--------- | ----
key | <a href='#string'>String</a>





## getKeys
List getKeys()





## getString
String getString([object Object])


Parameter | Type
--------- | ----
key | <a href='#string'>String</a>





## putBoolean
void putBoolean([object Object], [object Object])


Parameter | Type
--------- | ----
key | <a href='#string'>String</a>
value | <a href='#boolean'>boolean</a>





## putDouble
void putDouble([object Object], [object Object])


Parameter | Type
--------- | ----
key | <a href='#string'>String</a>
value | <a href='#double'>double</a>





## putFloat
void putFloat([object Object], [object Object])


Parameter | Type
--------- | ----
key | <a href='#string'>String</a>
value | <a href='#float'>float</a>





## putInt
void putInt([object Object], [object Object])


Parameter | Type
--------- | ----
key | <a href='#string'>String</a>
value | <a href='#int'>int</a>





## putString
void putString([object Object], [object Object])


Parameter | Type
--------- | ----
key | <a href='#string'>String</a>
value | <a href='#string'>String</a>









# Logger




## a
void a([object Object])


Parameter | Type
--------- | ----
msg | <a href='#string'>String</a>



Alert. Alert level logs will be displayed as a notification in the management console.

## clear
void clear()



Clear the log

## clearAlert
void clearAlert([object Object])


Parameter | Type
--------- | ----
msg | <a href='#string'>String</a>



Clear a specific alert

## clearAlerts
void clearAlerts()



Clear all alerts

## d
void d([object Object])


Parameter | Type
--------- | ----
msg | <a href='#string'>String</a>



Debug

## e
void e([object Object])


Parameter | Type
--------- | ----
msg | <a href='#string'>String</a>



Error

## i
void i([object Object])


Parameter | Type
--------- | ----
msg | <a href='#string'>String</a>



Info

## v
void v([object Object])


Parameter | Type
--------- | ----
msg | <a href='#string'>String</a>



Verbose

## w
void w([object Object])


Parameter | Type
--------- | ----
msg | <a href='#string'>String</a>



Warn





# OnOff
OnOff is a basic binary switch.



## isOn
boolean isOn()





## turnOff
void turnOff()





## turnOn
void turnOn()









# Entry




## closeEntry
void closeEntry()





## isEntryOpen
boolean isEntryOpen()





## openEntry
void openEntry()









# Refresh
Refresh indicates that this device has properties that are not automatically updated, and must be periodically refreshed.



## getRefreshFrequency
int getRefreshFrequency()



Get the recommended refresh/poll frequency in seconds for this device.

## refresh
void refresh([object Object], [object Object])


Parameter | Type
--------- | ----
refreshInterface | <a href='#class'>Class</a>
userInitiated | <a href='#boolean'>boolean</a>



This method is called by Scrypted when the properties of the device need to be refreshed. When the device has completed the refresh, the appropriate events should be emitted. The parameters provide the specific interface that needs to be refreshed and whether it was user initiated (via UI or voice).





# EntrySensor




## isEntryOpen
boolean isEntryOpen()









