import { useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

/**
 * Hook to get device fingerprint for fraud prevention
 * Uses FingerprintJS to generate unique browser/device identifier
 *
 * @returns {Object} - fingerprint (string) and isLoading (boolean)
 */
export const useDeviceFingerprint = () => {
  const [fingerprint, setFingerprint] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getFingerprint = async () => {
      try {
        // Load FingerprintJS
        const fp = await FingerprintJS.load();

        // Get visitor ID (fingerprint)
        const result = await fp.get();

        console.log('🔐 Device Fingerprint:', result.visitorId);
        console.log('📊 Components:', result.components);

        setFingerprint(result.visitorId);
      } catch (error) {
        console.error('❌ Failed to get device fingerprint:', error);
        // Fallback: Generate simple fingerprint from user agent and screen
        const fallbackFingerprint = btoa(
          `${navigator.userAgent}-${screen.width}x${screen.height}-${navigator.language}`
        ).substring(0, 32);
        setFingerprint(fallbackFingerprint);
      } finally {
        setIsLoading(false);
      }
    };

    getFingerprint();
  }, []);

  return { fingerprint, isLoading };
};
