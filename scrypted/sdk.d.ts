export interface ZwaveManagerDevice extends ZwaveManager, ScryptedDevice {
}

export interface ScryptedStatic {
    log: Logger,
    scriptSettings: Settings,

    deviceManager: DeviceManager,
    endpointManager: EndpointManager,
    mediaManager: MediaManager,
    systemManager: SystemManager,
    zwaveManager: ZwaveManagerDevice,
}
