export interface ZwaveManagerDevice extends ZwaveManager, ScryptedDevice {
}

/**
 * Android Intent.
 * See: https://developer.android.com/reference/android/content/Intent
 */
interface Intent {
}

declare const ScryptedInterfaceDescriptors: any;
export {
    ScryptedInterfaceDescriptors
}

export interface ScryptedStatic {
    log?: Logger,
    scriptSettings?: Settings,

    android?: Android,
    deviceManager?: DeviceManager,
    endpointManager?: EndpointManager,
    mediaManager?: MediaManager,
    systemManager: SystemManager,
    zwaveManager?: ZwaveManagerDevice,
}
