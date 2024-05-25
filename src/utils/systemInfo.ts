import UAParser, {IDevice} from 'ua-parser-js';

type DeviceType = IDevice['type'];

//= ==================================================================
// User agent parsing

const deviceTypeMobile: DeviceType = 'mobile';
const deviceTypeTablet: DeviceType = 'tablet';

const parsedUserAgent = new UAParser();

export const device = parsedUserAgent.getDevice();
export const operationSystem = parsedUserAgent.getOS();
export const browser = parsedUserAgent.getBrowser();

export const isHuawei =
  device.vendor === 'Huawei' || operationSystem.name === 'HarmonyOS';

export const isIOS =
  (device.type === deviceTypeMobile || device.type === deviceTypeTablet) &&
  device.vendor === 'Apple';

export const isAndroid = /android/i.exec(operationSystem.name || '') != null;
export const isMacOS = operationSystem.name === 'Mac OS';
export const isWindows = operationSystem.name === 'Windows';

// User agent parsing
//= ==================================================================

export const isTouchDevice = (): boolean =>
  'ontouchstart' in window ||
  navigator.maxTouchPoints > 0 ||
  // Need to check Microsoft specific prop
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  navigator.msMaxTouchPoints > 0;

// For desktop "device.type" returns "undefined"
export const getDeviceType = (): DeviceType => device.type || 'desktop';

export const isMobileOrTablet = (): boolean => {
  const deviceType = getDeviceType();

  return deviceType === deviceTypeMobile || deviceType === deviceTypeTablet;
};
