/**
 * Detects if the current device is mobile or tablet
 */
export function isMobileOrTablet(): boolean {
  if (typeof window === 'undefined') return false
  
  const userAgent = navigator.userAgent.toLowerCase()
  
  // Mobile patterns
  const mobilePatterns = [
    /android/i,
    /webos/i,
    /iphone/i,
    /ipad/i,
    /ipod/i,
    /blackberry/i,
    /windows phone/i,
    /mobile/i,
  ]
  
  // Check user agent
  const isMobile = mobilePatterns.some(pattern => pattern.test(userAgent))
  
  // Check screen size as fallback
  const isSmallScreen = window.innerWidth <= 1024
  
  return isMobile || isSmallScreen
}

/**
 * Get the appropriate product detail route based on device type
 */
export function getProductDetailView(productId: number): string {
  const isMobile = isMobileOrTablet()
  return isMobile ? `/mobile-product/${productId}` : `/product/${productId}`
}

/**
 * Get the appropriate route name based on device type
 */
export function getProductDetailRouteName(): string {
  const isMobile = isMobileOrTablet()
  return isMobile ? 'mobileProductDetail' : 'productDetail'
}
