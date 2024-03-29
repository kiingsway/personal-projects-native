import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

type TDeviceTypes = 'mobile' | 'tablet' | 'desktop';

const useDeviceType = () => {

  const [deviceType, setDeviceType] = useState<TDeviceTypes>('mobile');

  useEffect(() => {
    const updateDeviceType = () => {

      const { width } = Dimensions.get('window');
      const mobileBreakpoint = 768;
      const tabletBreakpoint = 992;

      const is = {
        mobile: width <= mobileBreakpoint,
        tablet: width <= tabletBreakpoint,
        desktop: width > tabletBreakpoint,
      }

      setDeviceType(is.mobile ? 'mobile' : (is.tablet ? 'tablet' : 'desktop'));

    };
    updateDeviceType();
    Dimensions.addEventListener('change', updateDeviceType);
  }, []);

  return deviceType;
};

export default useDeviceType;
