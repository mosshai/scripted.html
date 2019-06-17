export interface ZwaveManagerDevice extends ZwaveManager, ScryptedDevice {
}

export interface ScryptedStatic {
    scriptSettings: Settings,
    log: Logger,
    systemManager: SystemManager,
    deviceManager: DeviceManager,
    mediaManager: MediaManager,
    zwaveManager: ZwaveManagerDevice,
}
