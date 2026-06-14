/**
 * Vercel Speed Insights Integration
 * Automatically tracks web vitals and performance metrics
 */

(function() {
    'use strict';
    
    // Initialize Speed Insights queue
    if (!window.si) {
        window.si = function(...params) {
            window.siq = window.siq || [];
            window.siq.push(params);
        };
    }
    
    // Detect environment
    function isDevelopment() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' ||
               window.location.hostname === '';
    }
    
    // Inject the Speed Insights script
    function injectSpeedInsights() {
        if (typeof window === 'undefined') return;
        
        // Don't track in development mode
        if (isDevelopment()) {
            console.log('[Speed Insights] Development mode detected - tracking disabled');
            return;
        }
        
        const script = document.createElement('script');
        script.defer = true;
        script.src = 'https://va.vercel-scripts.com/v1/speed-insights/script.js';
        script.onerror = function() {
            console.warn('[Speed Insights] Failed to load analytics script');
        };
        
        document.head.appendChild(script);
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectSpeedInsights);
    } else {
        injectSpeedInsights();
    }
})();
