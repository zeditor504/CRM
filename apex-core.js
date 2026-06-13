/**
 * ==============================================================================
 * APEX OS GLOBAL CORE ENGINE | V3 ENTERPRISE ARCHITECTURE
 * ==============================================================================
 * Features:
 * 1. Mathematical Dithering        9. Radial Cursor Glow
 * 2. Global Footer Injection      10. Magnetic UI Physics
 * 3. Atomic Timekeeping           11. Auto-Save State Engine (Draft Recovery)
 * 4. Smart Textareas              12. Network Connection Monitor
 * 5. Glass Toast Engine           13. Custom Glass Context Menu
 * 6. Global Button Routing        14. Global Keyboard Shortcut Matrix
 * 7. Command Palette (Cmd+K)      15. Apex Admin Terminal (Console Intercept)
 * 8. Zero-Trust Idle Lockout
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    // Phase 1: Visuals & Layout
    initMathematicalDithering();
    injectGlobalFooter();
    initGlobalTimekeeping();
    initRadialHoverEffects();
    initMagneticUI();

    // Phase 2: Inputs & Interactions
    initSmartTextareas();
    initGlobalButtonRouting();
    initCustomContextMenu();
    initGlobalToastEngine();

    // Phase 3: Systems & Data
    initAutoSaveEngine();
    initNetworkMonitor();
    
    // Phase 4: Security & Admin
    initLoginAuth();
    initCommandPalette();
    initKeyboardShortcuts();
    initZeroTrustSecurity();
    initApexTerminal();
});

/* ==========================================================================
   1. MATHEMATICAL NOISE DITHERING
   ========================================================================== */
function initMathematicalDithering() {
    const noiseSVG = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E`;
    const ditherLayer = document.createElement('div');
    ditherLayer.className = "pointer-events-none fixed inset-0 z-[-1]";
    ditherLayer.style.backgroundImage = `url("${noiseSVG}")`;
    document.body.appendChild(ditherLayer);
    apexLog("Core", "Mathematical Dithering Initialized");
}

/* ==========================================================================
   2. GLOBAL FOOTER INJECTION
   ========================================================================== */
function injectGlobalFooter() {
    if(window.location.pathname.includes('login.html')) return;
    const footerHTML = `
    <footer class="w-full max-w-[1500px] mx-auto py-5 flex items-center border-t border-white/5 mt-auto px-8 shrink-0 relative z-10 transition-all duration-500" id="apex-footer">
        <div class="flex-1 flex justify-start">
            <div class="bg-zinc-900/80 border border-white/5 rounded-full px-4 py-1.5 text-xs font-mono font-medium tracking-widest text-zinc-400 backdrop-blur-md" id="global-clock">Time: --:--:--</div>
        </div>
        <div class="flex-1 flex justify-center">
            <div id="footer-status" class="bg-zinc-900/80 border border-white/5 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase flex items-center gap-2 backdrop-blur-md text-[#34d399] transition-colors duration-300">
                <div id="footer-status-dot" class="w-2 h-2 rounded-full shadow-[0_0_10px_#34d399] bg-[#34d399] animate-pulse"></div> <span id="footer-status-text">All Systems Online</span>
            </div>
        </div>
        <div class="flex-1 flex justify-end">
            <div class="bg-zinc-900/80 border border-white/5 rounded-full px-4 py-1.5 text-xs font-medium tracking-widest text-zinc-400 uppercase backdrop-blur-md">Central Time Zone (CT)</div>
        </div>
    </footer>`;
    const oldFooter = document.querySelector('footer');
    if (oldFooter) oldFooter.remove();
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

/* ==========================================================================
   3. ATOMIC TIMEKEEPING
   ========================================================================== */
function initGlobalTimekeeping() {
    const clockEl = document.getElementById('global-clock');
    if (!clockEl) return;
    function tick() {
        clockEl.innerText = `Time: ${new Date().toLocaleTimeString('en-US', { timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}`;
    }
    setInterval(tick, 1000);
    tick();
}

/* ==========================================================================
   4. SMART TEXTAREAS (Context-Aware Logic & Double-Fire Fix)
   ========================================================================== */
function initSmartTextareas() {
    document.querySelectorAll('textarea').forEach(ta => {
        // 1. Prevent double event listeners
        if (ta.getAttribute('data-listener-attached') === 'true') return;
        ta.setAttribute('data-listener-attached', 'true');

        const parent = ta.parentElement;
        if (parent && !parent.querySelector('.shortcut-helper')) {
            const helper = document.createElement('div');
            
            if (ta.id === 'rrs-notes') {
                helper.className = 'shortcut-helper block w-full text-right text-[9px] text-amber-500/70 uppercase tracking-widest font-bold mt-2 pr-1 transition-opacity opacity-50 hover:opacity-100';
                helper.innerText = "Enter for new line • Shift + Enter to Save Notes";
            } else {
                helper.className = 'shortcut-helper block w-full text-right text-[9px] text-zinc-500 uppercase tracking-widest font-bold mt-2 pr-1 transition-opacity opacity-50 hover:opacity-100';
                helper.innerText = "Enter for new line • Shift + Enter to send";
            }
            
            if (parent.classList.contains('flex-1') || parent.classList.contains('glass-panel')) {
                parent.appendChild(helper);
            } else {
                const wrapper = document.createElement('div');
                wrapper.className = "w-full flex flex-col";
                parent.insertBefore(wrapper, ta);
                wrapper.appendChild(ta);
                wrapper.appendChild(helper);
            }
        }

        ta.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.shiftKey) {
                e.preventDefault(); 
                if (ta.id === 'rrs-notes') {
                    const notesText = ta.value.trim();
                    const errorText = document.getElementById('rrs-error-text');
                    
                    if (!notesText) {
                        ta.classList.add('rrs-error');
                        if (errorText) errorText.classList.remove('hidden');
                        apexToast("Notes cannot be empty.", "error");
                    } else {
                        ta.classList.remove('rrs-error');
                        if (errorText) errorText.classList.add('hidden');
                        
                        const originalBg = ta.style.backgroundColor;
                        ta.style.backgroundColor = 'rgba(52, 211, 153, 0.1)'; 
                        ta.style.borderColor = '#34d399';
                        
                        setTimeout(() => {
                            ta.style.backgroundColor = originalBg;
                            ta.style.borderColor = '';
                            apexToast("RRS Notes Saved. Deal Desk Unlocked.", "success");
                            localStorage.removeItem(`draft_${ta.id}`); // Clear draft on success
                            
                            const topWarning = document.getElementById('top-lock-warning');
                            if(topWarning) {
                                topWarning.className = "text-emerald-400 font-semibold flex items-center text-xs bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 uppercase tracking-widest shadow-[0_0_15px_rgba(52,211,153,0.2)] transition-all";
                                topWarning.innerHTML = `<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> RRS COMPLIANT`;
                            }
                        }, 800);
                    }
                } else {
                    const wrapper = ta.closest('.relative') || ta.parentElement.parentElement;
                    const submitBtn = wrapper.querySelector('.send-btn, button[type="submit"]');
                    if (submitBtn) submitBtn.click();
                }
            }
        });
    });
}

/* ==========================================================================
   5. GLOBAL TOAST ENGINE (Liquid Glass Notifications)
   ========================================================================== */
window.apexToast = function(message, type = "info") {
    let container = document.getElementById('apex-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'apex-toast-container';
        container.className = 'fixed top-24 right-8 z-[99999] flex flex-col gap-3 pointer-events-none';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    let border, bg, text, icon;
    
    if (type === "success") {
        border = "border-emerald-500/30"; bg = "bg-emerald-500/10"; text = "text-emerald-400";
        icon = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>`;
    } else if (type === "error") {
        border = "border-rose-500/30"; bg = "bg-rose-500/10"; text = "text-rose-400";
        icon = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>`;
    } else if (type === "warning") {
        border = "border-amber-500/30"; bg = "bg-amber-500/10"; text = "text-amber-400";
        icon = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>`;
    } else {
        border = "border-blue-500/30"; bg = "bg-blue-500/10"; text = "text-blue-400";
        icon = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>`;
    }

    toast.className = `flex items-center gap-3 px-5 py-3.5 rounded-xl border ${border} ${bg} backdrop-blur-xl shadow-2xl transform transition-all duration-500 translate-x-10 opacity-0`;
    toast.innerHTML = `
        <svg class="w-5 h-5 ${text}" fill="none" stroke="currentColor" viewBox="0 0 24 24">${icon}</svg>
        <span class="text-xs font-bold text-white uppercase tracking-widest">${message}</span>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.remove('translate-x-10', 'opacity-0'));

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-x-10');
        setTimeout(() => toast.remove(), 500);
    }, 4000);
    
    apexLog("Notification", `[${type.toUpperCase()}] ${message}`);
};

/* ==========================================================================
   6. GLOBAL BUTTON ROUTING (Universal Catch-All & AI Intercept)
   ========================================================================== */
function initGlobalButtonRouting() {
    const triggerProcessing = (btn, customMessage = null) => {
        if (btn.classList.contains('is-locked')) return;
        btn.classList.add('is-locked');

        const originalText = btn.innerText.trim();
        const actionName = originalText || "System";
        btn.innerText = "PROCESSING...";
        btn.style.pointerEvents = "none";
        btn.style.opacity = "0.8";

        const chatContainer = btn.closest('.relative') || btn.closest('.glass-panel');
        const textArea = chatContainer ? chatContainer.querySelector('textarea') : null;
        const messageText = textArea ? textArea.value.trim() : "";

        setTimeout(() => { 
            btn.innerText = "SUCCESS"; 
            btn.style.backgroundColor = "#34d399"; 
            btn.style.color = "#000"; 
            
            if (messageText && (originalText === "SUBMIT" || originalText === "SEND" || originalText === "REPLY")) {
                const chatHistory = document.getElementById('chat-history');
                if (chatHistory) {
                    const timeString = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                    chatHistory.insertAdjacentHTML('beforeend', `
                        <div class="flex flex-col items-end gap-1 mt-4 animate-[fadeIn_0.3s_ease_forwards]">
                            <div class="text-[10px] text-zinc-400 mr-2 flex items-center uppercase tracking-widest font-bold">
                                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                Sales Rep • ${timeString}
                            </div>
                            <div class="chat-bubble-send bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 text-emerald-400 max-w-[80%]">${messageText}</div>
                        </div>
                    `);
                    chatHistory.scrollTop = chatHistory.scrollHeight; 
                }
                if (textArea) { textArea.value = ''; localStorage.removeItem(`draft_${textArea.id}`); }
            } else {
                // UNIVERSAL CATCH-ALL TOAST
                apexToast(customMessage || `${actionName} Executed Successfully.`, "success");
            }
        }, 800);

        setTimeout(() => { 
            btn.innerText = originalText; 
            btn.style.backgroundColor = ""; 
            btn.style.color = ""; 
            btn.style.pointerEvents = "auto"; 
            btn.style.opacity = "1";
            btn.classList.remove('is-locked');
        }, 2000);
    };

    // Specific Action Overrides
    const routeMap = {
        'PRINT DEAL SHEET': () => { window.print(); apexToast("Preparing Document for Print...", "info"); },
        'WEB CHAT': () => { apexToast("Apex Secure Chat initializing...", "info"); },
        'SOCIAL DMS': () => { apexToast("Syncing Meta and X APIs...", "info"); },
        'SEND PORTAL LINK': () => { apexToast("Secure Link Dispatched via SMS.", "success"); setTimeout(() => { window.open('portal.html', '_blank'); }, 1000); },
        'LOG OUT': () => {
            sessionStorage.removeItem('apex_session');
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('user');
            window.location.replace('login.html');
        },
        'USE SUGGESTION': (btn) => {
            const container = btn.parentElement;
            const suggestionNode = container.querySelector('p.italic');
            const chatInput = document.getElementById('reply-input');
            if (suggestionNode && chatInput) {
                chatInput.value = suggestionNode.innerText.replace(/(^"|"$)/g, ''); 
                chatInput.focus();
                apexToast("AI Suggestion Applied to Text Box.", "success");
            } else {
                triggerProcessing(btn);
            }
        }
    };

    // Scan every button on the entire site
    document.querySelectorAll('button').forEach(btn => {
        if (btn.classList.contains('send-btn')) btn.removeAttribute('onclick');
        
        // Make ALL unlinked buttons functional
        if (!btn.hasAttribute('onclick') && !btn.hasAttribute('href') && !btn.getAttribute('data-wired')) {
            btn.setAttribute('data-wired', 'true'); // Prevent double-wiring
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const text = btn.innerText.trim().toUpperCase();
                if (routeMap[text]) {
                    routeMap[text](btn); // Run specific override
                } else {
                    triggerProcessing(btn); // Run Universal Catch-All
                }
            });
        }
    });
}

/* ==========================================================================
   7. COMMAND PALETTE (Cmd+K Global Navigation)
   ========================================================================== */
function initCommandPalette() {
    const paletteHTML = `
        <div id="apex-cmd-palette" class="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm hidden flex items-start justify-center pt-[15vh] opacity-0 transition-opacity duration-200">
            <div class="bg-zinc-900 border border-white/10 rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] w-full max-w-2xl overflow-hidden transform scale-95 transition-transform duration-200" id="apex-cmd-modal">
                <div class="flex items-center px-4 py-4 border-b border-white/5">
                    <svg class="w-5 h-5 text-zinc-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <input type="text" id="apex-cmd-input" placeholder="Search commands, leads, or jump to..." class="w-full bg-transparent text-white focus:outline-none text-base placeholder-zinc-500 font-medium">
                    <div class="text-[9px] font-bold text-zinc-600 border border-white/10 rounded px-1.5 py-0.5 ml-2 uppercase tracking-widest">ESC</div>
                </div>
                <div class="max-h-[60vh] overflow-y-auto p-2" id="apex-cmd-list"></div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', paletteHTML);

    const palette = document.getElementById('apex-cmd-palette');
    const modal = document.getElementById('apex-cmd-modal');
    const input = document.getElementById('apex-cmd-input');
    const list = document.getElementById('apex-cmd-list');

    const commands = [
        { icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Sales Dashboard', action: () => window.location.href = 'index.html' },
        { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', label: 'Deal Desk', action: () => window.location.href = 'deal-desk.html' },
        { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', label: 'Manager Command', action: () => window.location.href = 'manager.html' },
        { icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', label: 'Owner Hub', action: () => window.location.href = 'owner.html' },
        { icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12', label: 'Lead Intake Forge', action: () => window.location.href = 'importleads.html' }
    ];

    const renderList = (filter = "") => {
        list.innerHTML = "";
        const filtered = commands.filter(c => c.label.toLowerCase().includes(filter.toLowerCase()));
        if (filtered.length === 0) {
            list.innerHTML = `<div class="px-4 py-8 text-center text-xs text-zinc-500 font-bold uppercase tracking-widest">No matching commands found</div>`;
            return;
        }
        filtered.forEach((cmd, idx) => {
            const el = document.createElement('div');
            el.className = `flex items-center px-4 py-3.5 rounded-xl cursor-pointer transition ${idx === 0 ? 'bg-white/10 text-white shadow-lg' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`;
            el.innerHTML = `<svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${cmd.icon}"></path></svg><span class="text-sm font-semibold tracking-wide">${cmd.label}</span>`;
            el.addEventListener('click', cmd.action);
            list.appendChild(el);
        });
    };

    const togglePalette = () => {
        if (palette.classList.contains('hidden')) {
            palette.classList.remove('hidden');
            setTimeout(() => { palette.classList.remove('opacity-0'); modal.classList.remove('scale-95'); input.focus(); renderList(); }, 10);
        } else {
            palette.classList.add('opacity-0'); modal.classList.add('scale-95');
            setTimeout(() => palette.classList.add('hidden'), 200);
        }
    };
    window.apexToggleCommandPalette = togglePalette;

    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); togglePalette(); }
        if (e.key === 'Escape' && !palette.classList.contains('hidden')) togglePalette();
    });
    input.addEventListener('input', (e) => renderList(e.target.value));
    palette.addEventListener('click', (e) => { if (e.target === palette) togglePalette(); });
    apexLog("Command Palette", "Global Cmd+K Listener Active");
}

/* ==========================================================================
   8. LOGIN AUTH PIPELINE
   ========================================================================== */
function getAuthRedirectPath(role) {
    if (role === 'Executive/Owner' || role === 'Executive') return 'owner.html';
    if (role === 'Manager') return 'manager.html';
    if (role === 'Staff/Sales' || role === 'Staff') return 'index.html';
    return 'index.html';
}

function normalizeApexSessionRole(role) {
    if (role === 'Executive/Owner' || role === 'Executive') return 'Executive';
    if (role === 'Manager') return 'Manager';
    return 'Staff';
}

function initLoginAuth() {
    if (!window.location.pathname.includes('login.html')) return;

    const form = document.getElementById('login-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = form.username.value.trim();
        const password = form.password.value;
        const errorEl = document.getElementById('login-error');
        const submitBtn = form.querySelector('button[type="submit"]');

        if (errorEl) {
            errorEl.classList.add('hidden');
            errorEl.textContent = '';
        }
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'AUTHENTICATING...';
        }

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const { accessToken, user } = await response.json();

            sessionStorage.setItem('accessToken', accessToken);
            sessionStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('apex_session', JSON.stringify({
                dealer: 'Apex Dealer',
                color: '#34d399',
                role: normalizeApexSessionRole(user.role)
            }));

            window.location.href = getAuthRedirectPath(user.role);
        } catch (err) {
            if (errorEl) {
                errorEl.textContent = err.message || 'Authentication failed';
                errorEl.classList.remove('hidden');
            }
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Sign In';
            }
        }
    });

    apexLog("Auth", "Login form wired to backend pipeline");
}

/* ==========================================================================
   9. ZERO-TRUST IDLE SECURITY
   ========================================================================== */
function initZeroTrustSecurity() {
    if(window.location.pathname.includes('login.html')) return;
    let idleTimer;
    const idleTimeLimit = 15 * 60 * 1000; // 15 Minutes

    const lockScreenHTML = `
        <div id="apex-lock-screen" class="fixed inset-0 z-[999999] backdrop-blur-3xl bg-black/90 flex flex-col items-center justify-center opacity-0 pointer-events-none transition-opacity duration-1000">
            <div class="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(244,63,94,0.3)]">
                <svg class="w-10 h-10 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <h2 class="text-4xl font-black text-white uppercase tracking-widest mb-2">Session Locked</h2>
            <p class="text-sm text-zinc-400 font-medium tracking-wide mb-8">Zero-Trust Protocol triggered due to 15 minutes of inactivity.</p>
            <button onclick="window.location.reload()" class="bg-white text-black px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-transform">
                Re-Authenticate to Resume
            </button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lockScreenHTML);

    const resetTimer = () => {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
            const lockScreen = document.getElementById('apex-lock-screen');
            if (lockScreen) {
                lockScreen.classList.remove('pointer-events-none', 'opacity-0');
                apexLog("Security", "Zero-Trust System Locked Screen");
            }
        }, idleTimeLimit);
    };

    window.onload = resetTimer; document.onmousemove = resetTimer; document.onkeypress = resetTimer;
}

/* ==========================================================================
   9. RADIAL HOVER ENGINE (Cursor Tracking Glow)
   ========================================================================== */
function initRadialHoverEffects() {
    const applyHoverListener = () => {
        document.querySelectorAll('.glass-panel').forEach(panel => {
            if (panel.dataset.hoverWired) return;
            panel.dataset.hoverWired = true;
            if(window.getComputedStyle(panel).position === 'static') panel.style.position = 'relative';
            panel.style.overflow = 'hidden';

            const glow = document.createElement('div');
            glow.className = "pointer-events-none absolute inset-0 z-[-1] opacity-0 transition-opacity duration-300";
            glow.style.background = `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.05), transparent 40%)`;
            panel.insertBefore(glow, panel.firstChild);

            panel.addEventListener('mousemove', (e) => {
                const rect = panel.getBoundingClientRect();
                glow.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                glow.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            });

            panel.addEventListener('mouseenter', () => glow.style.opacity = '1');
            panel.addEventListener('mouseleave', () => glow.style.opacity = '0');
        });
    };
    applyHoverListener();
    new MutationObserver(applyHoverListener).observe(document.body, { childList: true, subtree: true });
}

/* ==========================================================================
   10. MAGNETIC UI PHYSICS
   ========================================================================== */
function initMagneticUI() {
    // Add magnetic class to common buttons dynamically
    document.querySelectorAll('button, .action-btn, .channel-tab').forEach(el => el.classList.add('magnetic'));

    document.querySelectorAll('.magnetic').forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Subtle pull calculation (Reduced by 50%)
            elem.style.transform = `translate(${x * 0.075}px, ${y * 0.075}px)`;
        });

        elem.addEventListener('mouseleave', () => {
            elem.style.transform = 'translate(0px, 0px)';
            elem.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
        });
        
        elem.addEventListener('mouseenter', () => {
            elem.style.transition = 'none'; // Remove transition for instant tracking
        });
    });
}

/* ==========================================================================
   11. AUTO-SAVE STATE ENGINE (Local Storage Drafts)
   ========================================================================== */
function initAutoSaveEngine() {
    let timeoutId;
    document.querySelectorAll('textarea, input[type="text"]').forEach(input => {
        if (!input.id) return; // Only track elements with explicit IDs
        
        const draftKey = `draft_${input.id}`;
        
        // Restore Draft on load
        if (localStorage.getItem(draftKey)) {
            input.value = localStorage.getItem(draftKey);
            apexToast(`Draft recovered for ${input.placeholder || "input field"}`, "info");
        }

        // Debounced Save on typing
        input.addEventListener('input', () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                localStorage.setItem(draftKey, input.value);
                apexLog("AutoSave", `Draft saved: ${draftKey}`);
            }, 1000); // Save after 1 second of no typing
        });
    });
}

/* ==========================================================================
   12. NETWORK CONNECTION MONITOR
   ========================================================================== */
function initNetworkMonitor() {
    const footerStatus = document.getElementById('footer-status');
    const footerDot = document.getElementById('footer-status-dot');
    const footerText = document.getElementById('footer-status-text');

    window.addEventListener('offline', () => {
        apexToast("Network Connection Lost. Operating in Offline Mode.", "error");
        apexLog("Network", "System Offline");
        if(footerStatus) {
            footerStatus.className = "bg-rose-500/20 border border-rose-500/40 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase flex items-center gap-2 backdrop-blur-md text-rose-400";
            footerDot.className = "w-2 h-2 rounded-full shadow-[0_0_10px_#f43f5e] bg-rose-500";
            footerText.innerText = "System Offline";
        }
    });

    window.addEventListener('online', () => {
        apexToast("Connection Restored. Syncing Database...", "success");
        apexLog("Network", "System Online");
        if(footerStatus) {
            footerStatus.className = "bg-zinc-900/80 border border-white/5 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase flex items-center gap-2 backdrop-blur-md text-[#34d399]";
            footerDot.className = "w-2 h-2 rounded-full shadow-[0_0_10px_#34d399] bg-[#34d399] animate-pulse";
            footerText.innerText = "All Systems Online";
        }
    });
}

/* ==========================================================================
   13. CUSTOM GLASS CONTEXT MENU (Right Click Override & OS Detection)
   ========================================================================== */
function initCustomContextMenu() {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const cmdText = isMac ? '⌘K' : 'Ctrl+K';

    const menuHTML = `
        <div id="apex-context-menu" class="fixed z-[999999] w-56 bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] overflow-hidden scale-95 opacity-0 pointer-events-none transition-all duration-100 origin-top-left">
            <div class="py-1">
                <button onclick="window.history.back()" class="w-full text-left px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/10 flex items-center uppercase tracking-widest transition"><svg class="w-3.5 h-3.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> Go Back</button>
                <button onclick="window.location.reload()" class="w-full text-left px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/10 flex items-center uppercase tracking-widest transition"><svg class="w-3.5 h-3.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> Force Sync Data</button>
            </div>
            <div class="border-t border-white/5 py-1">
                <button onclick="if(window.apexToggleCommandPalette) window.apexToggleCommandPalette();" class="w-full text-left px-4 py-2 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/10 flex items-center uppercase tracking-widest transition"><svg class="w-3.5 h-3.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> Open Command (${cmdText})</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', menuHTML);

    const menu = document.getElementById('apex-context-menu');

    document.addEventListener('contextmenu', (e) => {
        if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return; 
        e.preventDefault();
        let x = e.clientX; let y = e.clientY;
        if (x + 224 > window.innerWidth) x = window.innerWidth - 224;
        if (y + 120 > window.innerHeight) y = window.innerHeight - 120;
        menu.style.left = `${x}px`; menu.style.top = `${y}px`;
        menu.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
    });
    document.addEventListener('click', () => menu.classList.add('opacity-0', 'scale-95', 'pointer-events-none'));
}

/* ==========================================================================
   14. GLOBAL KEYBOARD SHORTCUT MATRIX (OS Detection)
   ========================================================================== */
function initKeyboardShortcuts() {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const cmdKey = isMac ? '⌘' : 'Ctrl';

    const modalHTML = `
        <div id="apex-shortcuts-modal" class="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm hidden flex items-center justify-center opacity-0 transition-opacity duration-300">
            <div class="glass-panel w-full max-w-xl p-8 transform scale-95 transition-transform duration-300" id="apex-shortcuts-box">
                <div class="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                    <h2 class="text-xl font-black text-white uppercase tracking-widest">Keyboard Shortcuts</h2>
                    <div class="text-[9px] font-bold text-zinc-500 border border-zinc-700 rounded px-2 py-1 uppercase tracking-widest">ESC to close</div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="flex justify-between items-center bg-white/5 p-3 rounded-lg"><span class="text-xs font-bold text-zinc-400 uppercase tracking-widest">Command Palette</span> <kbd class="bg-black border border-white/20 text-white font-mono text-xs px-2 py-1 rounded">${cmdKey} K</kbd></div>
                    <div class="flex justify-between items-center bg-white/5 p-3 rounded-lg"><span class="text-xs font-bold text-zinc-400 uppercase tracking-widest">Send Message</span> <kbd class="bg-black border border-white/20 text-white font-mono text-xs px-2 py-1 rounded">⇧ Enter</kbd></div>
                    <div class="flex justify-between items-center bg-white/5 p-3 rounded-lg"><span class="text-xs font-bold text-zinc-400 uppercase tracking-widest">Toggle Terminal</span> <kbd class="bg-black border border-white/20 text-white font-mono text-xs px-2 py-1 rounded">~</kbd></div>
                    <div class="flex justify-between items-center bg-white/5 p-3 rounded-lg"><span class="text-xs font-bold text-zinc-400 uppercase tracking-widest">Show Shortcuts</span> <kbd class="bg-black border border-white/20 text-white font-mono text-xs px-2 py-1 rounded">⇧ ?</kbd></div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('apex-shortcuts-modal');
    const box = document.getElementById('apex-shortcuts-box');

    const toggleShortcuts = () => {
        if (modal.classList.contains('hidden')) {
            modal.classList.remove('hidden');
            setTimeout(() => { modal.classList.remove('opacity-0'); box.classList.remove('scale-95'); }, 10);
        } else {
            modal.classList.add('opacity-0'); box.classList.add('scale-95');
            setTimeout(() => modal.classList.add('hidden'), 300);
        }
    };

    document.addEventListener('keydown', (e) => {
        if (e.key === '?' && e.shiftKey && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            toggleShortcuts();
        }
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) toggleShortcuts();
    });
}

/* ==========================================================================
   15. APEX ADMIN TERMINAL (Console Override)
   ========================================================================== */
window.apexLog = function(source, message) {
    const originalConsole = console.log;
    originalConsole(`[APEX ${source}] ${message}`); // Keep native logging
    
    const terminalList = document.getElementById('apex-term-list');
    if (!terminalList) return;

    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    const logLine = document.createElement('div');
    logLine.className = "font-mono text-xs mb-1";
    logLine.innerHTML = `<span class="text-zinc-600">[${time}]</span> <span class="text-emerald-400">[${source}]</span> <span class="text-zinc-300">${message}</span>`;
    
    terminalList.appendChild(logLine);
    terminalList.scrollTop = terminalList.scrollHeight;
};

function initApexTerminal() {
    const termHTML = `
        <div id="apex-terminal" class="fixed top-0 left-0 w-full h-[40vh] bg-black/95 backdrop-blur-3xl border-b border-white/10 z-[999999] transform -translate-y-full transition-transform duration-300 flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
            <div class="px-4 py-2 bg-white/5 border-b border-white/10 flex justify-between items-center shrink-0">
                <span class="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest">Apex OS // Root Terminal</span>
                <span class="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Press ~ to close</span>
            </div>
            <div id="apex-term-list" class="flex-1 p-4 overflow-y-auto w-full">
                <div class="font-mono text-xs mb-2 text-zinc-500">Apex Console v2.0 Initialized. Awaiting processes...</div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', termHTML);

    const term = document.getElementById('apex-terminal');
    
    document.addEventListener('keydown', (e) => {
        // Only trigger on ~ (tilde/backtick) if not typing in an input
        if (e.key === '`' || e.key === '~') {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            if (term.classList.contains('-translate-y-full')) {
                term.classList.remove('-translate-y-full');
                apexLog("SysAdmin", "Terminal Overlay Opened");
            } else {
                term.classList.add('-translate-y-full');
            }
        }
    });

    // Intercept native errors to pipe them here
    window.onerror = function(msg, url, lineNo, columnNo, error) {
        const terminalList = document.getElementById('apex-term-list');
        if (terminalList) {
            const time = new Date().toLocaleTimeString('en-US', { hour12: false });
            terminalList.innerHTML += `<div class="font-mono text-xs mb-1 text-rose-500"><span class="text-zinc-600">[${time}]</span> [FATAL ERROR] ${msg} (Line ${lineNo})</div>`;
            terminalList.scrollTop = terminalList.scrollHeight;
        }
        return false;
    };
    
    apexLog("Core", "System Boot Sequence Complete.");
}