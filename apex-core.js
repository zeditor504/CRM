/**
 * APEX OS GLOBAL CORE ENGINE
 * Handles Dithering, Timekeeping, Global Routing, and Input Logic
 */

document.addEventListener("DOMContentLoaded", () => {
    initMathematicalDithering();
    injectGlobalFooter();
    initGlobalTimekeeping();
    initSmartTextareas();
    initGlobalButtonRouting();
});

// 1. MATHEMATICAL NOISE DITHERING (Fixes the Leopard Print)
function initMathematicalDithering() {
    // baseFrequency increased to 2.5 for microscopic film grain, opacity reduced to 0.02
    const noiseSVG = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E`;
    
    const ditherLayer = document.createElement('div');
    ditherLayer.style.position = 'fixed';
    ditherLayer.style.inset = '0';
    ditherLayer.style.zIndex = '-1'; 
    ditherLayer.style.pointerEvents = 'none';
    ditherLayer.style.backgroundImage = `url("${noiseSVG}")`;
    document.body.appendChild(ditherLayer);
}

// 2. GLOBAL FOOTER INJECTION (Fixes the System Status Color)
function injectGlobalFooter() {
    if(window.location.pathname.includes('login.html')) return;
    
    // Status is now strictly hardcoded to Apex Emerald Green universally
    const footerHTML = `
    <footer class="w-full max-w-[1500px] mx-auto py-5 flex items-center border-t border-white/5 mt-auto px-8 shrink-0 relative z-10">
        <div class="flex-1 flex justify-start">
            <div class="bg-zinc-900/80 border border-white/5 rounded-full px-4 py-1.5 text-xs font-mono font-medium tracking-widest text-zinc-400 backdrop-blur-md" id="global-clock">
                Time: --:--:--
            </div>
        </div>
        <div class="flex-1 flex justify-center">
            <div class="bg-zinc-900/80 border border-white/5 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase flex items-center gap-2 backdrop-blur-md text-[#34d399]">
                <div class="w-2 h-2 rounded-full shadow-[0_0_10px_#34d399] bg-[#34d399]"></div> 
                All Systems Online
            </div>
        </div>
        <div class="flex-1 flex justify-end">
            <div class="bg-zinc-900/80 border border-white/5 rounded-full px-4 py-1.5 text-xs font-medium tracking-widest text-zinc-400 uppercase backdrop-blur-md">
                Central Time Zone (CT)
            </div>
        </div>
    </footer>`;
    
    const oldFooter = document.querySelector('footer');
    if (oldFooter) oldFooter.remove();
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// 3. GLOBAL TIMEKEEPING
function initGlobalTimekeeping() {
    const clockEl = document.getElementById('global-clock');
    if (!clockEl) return;
    
    function tick() {
        clockEl.innerText = `Time: ${new Date().toLocaleTimeString('en-US', { timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}`;
    }
    setInterval(tick, 1000);
    tick();
}

// 4. SMART TEXTAREAS (Fixes Shift+Enter Logic & Squeezed Layout)
function initSmartTextareas() {
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(ta => {
        // Wrap the textarea to safely isolate it from parent flexboxes
        const parent = ta.parentElement;
        if (parent && !parent.querySelector('.shortcut-helper')) {
            const wrapper = document.createElement('div');
            wrapper.className = "w-full flex flex-col";
            parent.insertBefore(wrapper, ta);
            wrapper.appendChild(ta);

            const helper = document.createElement('div');
            // Forces full width, block display, pushed to the right
            helper.className = 'shortcut-helper block w-full text-right text-[9px] text-zinc-500 uppercase tracking-widest font-bold mt-2';
            helper.innerText = "Enter for new line • Shift + Enter to send";
            wrapper.appendChild(helper);
        }

        ta.addEventListener('keydown', function(e) {
            // Flipped Logic: Shift + Enter now triggers the send
            if (e.key === 'Enter' && e.shiftKey) {
                e.preventDefault(); 
                const container = ta.closest('form') || ta.closest('.glass-panel') || document.body;
                const submitBtn = container.querySelector('button[type="submit"], .send-btn, button.bg-emerald-500');
                if (submitBtn) {
                    submitBtn.click();
                    ta.value = ''; 
                }
            }
        });
    });
}

// 5. GLOBAL BUTTON ROUTING & ALERTS
function initGlobalButtonRouting() {
    const routeMap = {
        'PRINT DEAL SHEET': () => { window.print(); },
        'WEB CHAT': () => { alert("Apex Secure Chat initializing... Connecting to Web Queue."); },
        'SOCIAL DMS': () => { alert("Opening Social Matrix. Syncing Meta and X APIs..."); },
        'SUBMIT': (btn) => { 
            const originalText = btn.innerText;
            btn.innerText = "PROCESSING...";
            setTimeout(() => { btn.innerText = "SUCCESS"; btn.style.backgroundColor = "#34d399"; btn.style.color = "#000"; }, 800);
            setTimeout(() => { btn.innerText = originalText; btn.style.backgroundColor = ""; btn.style.color = ""; }, 3000);
        },
        'SEND PORTAL LINK': () => {
            alert("Secure Portal Link generated. SMS dispatched to customer.");
            window.open('portal.html', '_blank'); 
        }
    };

    document.querySelectorAll('button').forEach(btn => {
        const text = btn.innerText.trim().toUpperCase();
        if (routeMap[text] && !btn.hasAttribute('onclick')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                routeMap[text](btn);
            });
        }
    });
}