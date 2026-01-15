import { commandBus } from './CommandBus';

export interface DeviceProfile {
    id: string;
    name: string;
    type: 'desktop' | 'tablet' | 'mobile' | 'holo';
    themeId: string;
    color: string;
    lastActive: number;
}

const DEFAULT_DEVICES: DeviceProfile[] = [
    { id: 'dev-main', name: 'Main Station', type: 'desktop', themeId: 'nexus-dark', color: '#3b82f6', lastActive: Date.now() },
    { id: 'dev-slate', name: 'Datapad', type: 'tablet', themeId: 'nexus-glass', color: '#10b981', lastActive: 0 },
    { id: 'dev-lens', name: 'HoloLens', type: 'holo', themeId: 'nexus-neon', color: '#f59e0b', lastActive: 0 }
];

export class PresenceManager {
    private static instance: PresenceManager;
    private currentDevice: DeviceProfile;
    private devices: DeviceProfile[];
    private sessionLog: { deviceId: string; timestamp: number; action: string }[] = [];

    private constructor() {
        this.devices = this.loadDevices();
        this.currentDevice = this.loadCurrentDevice();
        this.logSession('init', 'Session Started');
    }

    public static getInstance(): PresenceManager {
        if (!PresenceManager.instance) {
            PresenceManager.instance = new PresenceManager();
        }
        return PresenceManager.instance;
    }

    private loadDevices(): DeviceProfile[] {
        const stored = localStorage.getItem('nexus_devices');
        return stored ? JSON.parse(stored) : DEFAULT_DEVICES;
    }

    private loadCurrentDevice(): DeviceProfile {
        const storedId = localStorage.getItem('nexus_current_device_id');
        const device = this.devices.find(d => d.id === storedId);
        return device || this.devices[0];
    }

    private saveState() {
        localStorage.setItem('nexus_devices', JSON.stringify(this.devices));
        localStorage.setItem('nexus_current_device_id', this.currentDevice.id);
        localStorage.setItem('nexus_session_log', JSON.stringify(this.sessionLog));
    }

    public getDevices(): DeviceProfile[] {
        return this.devices;
    }

    public getCurrentDevice(): DeviceProfile {
        return this.currentDevice;
    }

    public switchDevice(deviceId: string) {
        const target = this.devices.find(d => d.id === deviceId);
        if (target && target.id !== this.currentDevice.id) {
            // Save state of current device
            this.updateDeviceState(this.currentDevice.id, { lastActive: Date.now() });

            // Switch
            this.currentDevice = target;
            this.saveState();

            this.logSession(target.id, 'Device Switched');
            
            // Emit event for UI to react (handoff animation)
            commandBus.emit('presence:handoff', target);
            
            // Restore theme for this device
            // Note: The UI listening to this event should handle the actual theme application
        }
    }

    public updateDeviceState(deviceId: string, updates: Partial<DeviceProfile>) {
        this.devices = this.devices.map(d => {
            if (d.id === deviceId) {
                return { ...d, ...updates };
            }
            return d;
        });
        if (this.currentDevice.id === deviceId) {
            this.currentDevice = { ...this.currentDevice, ...updates };
        }
        this.saveState();
    }

    public logSession(deviceId: string, action: string) {
        this.sessionLog.unshift({ deviceId, timestamp: Date.now(), action });
        if (this.sessionLog.length > 50) this.sessionLog.pop();
        this.saveState();
    }

    public getSessionLog() {
        return this.sessionLog;
    }
}

export const presenceManager = PresenceManager.getInstance();
