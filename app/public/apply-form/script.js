let flow = []; // Will be populated dynamically

const state = {
    currentIndex: 0,
    answers: {},
    isTransitioning: false
};

const appEl = document.getElementById('app');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');
const controlsContainer = document.getElementById('controls-container');
const btnUp = document.getElementById('btn-up');
const btnDown = document.getElementById('btn-down');

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    // Show a loading state conceptually
    appEl.innerHTML = '<div class="text-gray-400 text-center flex flex-col items-center justify-center w-full h-full"><div class="animate-pulse flex flex-col items-center"><div class="w-12 h-12 border-4 border-orange-500 border-t-transparent border-solid rounded-full animate-spin mb-4"></div><p>Loading application...</p></div></div>';

    try {
        const res = await fetch('/api/form-config');
        if (res.ok) {
            const config = await res.json();

            // Reconstruct flow with welcome/success wrappers
            flow = [
                {
                    id: 'welcome',
                    type: 'info',
                    title: 'Drive Your Future With Us',
                    subtitle: 'Apply in 2 minutes. No resume needed to start.',
                    buttonText: 'Start Application'
                },
                ...config,
                {
                    id: 'success',
                    type: 'success',
                    title: 'Application Submitted',
                    subtitle: 'Our team will contact you shortly.'
                }
            ];

            // Enhance configs with validation if missing 
            flow.forEach(step => {
                if (step.type === 'email' && !step.validation) {
                    step.validation = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
                } else if (step.type === 'tel' && !step.validation) {
                    step.validation = (val) => val.replace(/\D/g, '').length >= 10;
                }
            });

            renderStep(state.currentIndex);
            setupEventListeners();
        } else {
            appEl.innerHTML = '<p class="text-red-400">Failed to load configuration.</p>';
        }
    } catch (error) {
        console.error("Configuration error", error);
        appEl.innerHTML = '<p class="text-red-400">Error connecting to server. Please try again later.</p>';
    }
});

function setupEventListeners() {
    btnUp.addEventListener('click', () => {
        if (!state.isTransitioning) goPrevious();
    });

    btnDown.addEventListener('click', () => {
        if (!state.isTransitioning) handleNext();
    });

    document.addEventListener('keydown', (e) => {
        if (state.isTransitioning) return;

        const step = flow[state.currentIndex];

        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default form submit or newline

            // If it's a textarea and shift is held, allow newline
            if (e.shiftKey && e.target.tagName.toLowerCase() === 'textarea') return;

            // For option types, Enter selects and goes next if something is focused, 
            // otherwise just try to go next (which will validate)
            if (step.type === 'options') {
                const selected = state.answers[step.id];
                if (selected) {
                    handleNext();
                } else {
                    showError(step.errorMessage);
                }
            } else if (step.type === 'info' || step.type === 'success') {
                if (step.type !== 'success') handleNext();
            } else {
                handleNext();
            }
        } else if (e.key === 'ArrowUp' && document.activeElement.tagName !== 'INPUT') {
            goPrevious();
        } else if (e.key === 'ArrowDown' && document.activeElement.tagName !== 'INPUT') {
            // handleNext(); // Might be confusing for users trying to scroll
        }
    });
}

function updateProgress() {
    if (state.currentIndex === 0 || state.currentIndex === flow.length - 1) {
        progressContainer.style.opacity = '0';
        controlsContainer.style.opacity = '0';
    } else {
        progressContainer.style.opacity = '1';
        controlsContainer.style.opacity = '1';
        const calculableSteps = flow.length - 2; // Exclude info and success
        const progress = ((state.currentIndex) / calculableSteps) * 100;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    }

    btnUp.disabled = state.currentIndex <= 1;
    btnDown.disabled = state.currentIndex === flow.length - 1;
}

function handleNext() {
    const step = flow[state.currentIndex];

    if (step.type === 'info') {
        goNext();
        return;
    }

    if (step.type === 'success') return; // Can't go next from success

    // Validate
    let value = state.answers[step.id];

    // Auto-capture input value if not captured yet (especially for text/number that didn't fire 'change')
    if (step.type !== 'options') {
        const inputEl = document.getElementById(`input-${step.id}`);
        if (inputEl) {
            value = inputEl.value.trim();
            state.answers[step.id] = value;
        }
    }

    if (step.required && (!value || value === '')) {
        showError(step.errorMessage);
        return;
    }

    if (step.validation && !step.validation(value)) {
        showError(step.errorMessage);
        return;
    }

    // Hide error if any
    hideError();

    goNext();
}

function goNext() {
    if (state.currentIndex < flow.length - 1) {
        transitionTo(state.currentIndex + 1, 'up');
    }
}

function goPrevious() {
    if (state.currentIndex > 0 && flow[state.currentIndex].type !== 'success') {
        transitionTo(state.currentIndex - 1, 'down');
    }
}

function transitionTo(nextIndex, direction = 'up') {
    state.isTransitioning = true;

    const currentEl = document.querySelector('.step-container');
    const nextStep = flow[nextIndex];
    const nextEl = createStepElement(nextStep);

    appEl.appendChild(nextEl);

    // Prepare for animation
    if (currentEl) {
        // Exit animation
        requestAnimationFrame(() => {
            currentEl.style.transition = 'opacity 400ms ease, transform 400ms ease';
            currentEl.style.opacity = '0';
            currentEl.style.transform = direction === 'up' ? 'translateY(-40px)' : 'translateY(40px)';
        });
    }

    // Enter animation for next
    nextEl.style.opacity = '0';
    nextEl.style.transform = direction === 'up' ? 'translateY(40px)' : 'translateY(-40px)';
    nextEl.style.transition = 'opacity 400ms ease, transform 400ms ease';

    // Force reflow
    void nextEl.offsetWidth;

    requestAnimationFrame(() => {
        nextEl.style.opacity = '1';
        nextEl.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
        if (currentEl) currentEl.remove();
        state.currentIndex = nextIndex;
        updateProgress();
        state.isTransitioning = false;

        // Focus new input if exists
        const newInput = nextEl.querySelector('input, button');
        if (newInput && nextStep.type !== 'info' && nextStep.type !== 'success') {
            newInput.focus();
        }

        // If it's the success screen, call submit Application
        if (nextStep.type === 'success') {
            submitApplication(state.answers);
        }

    }, 400); // match transition duration
}

function renderStep(index) {
    appEl.innerHTML = '';
    const step = flow[index];
    const el = createStepElement(step);
    appEl.appendChild(el);
    updateProgress();

    // Force reflow and apply basic active state
    void el.offsetWidth;
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
}

function createStepElement(step) {
    const container = document.createElement('div');
    container.className = 'step-container w-full h-full flex flex-col justify-center max-w-2xl mx-auto px-4';

    let innerHTML = '';

    if (step.type === 'info') {
        innerHTML = `
            <div class="text-left">
                <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white leading-tight">
                    ${step.title.split(' ').map(word =>
            word === 'Us' ? `<span class="text-orange-500">${word}</span>` : word
        ).join(' ')}
                </h1>
                <p class="text-xl md:text-2xl text-gray-400 mb-12 font-medium">${step.subtitle}</p>
                <button id="btn-start" class="btn-accent text-lg px-8 py-4 w-auto rounded-full shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:shadow-[0_0_30px_rgba(234,88,12,0.6)] group">
                    ${step.buttonText}
                    <svg class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>
        `;
    } else if (step.type === 'success') {
        innerHTML = `
            <div class="text-center flex flex-col items-center justify-center">
                <div class="w-24 h-24 mb-8 text-green-400">
                    <svg class="w-full h-full drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 class="text-4xl md:text-5xl font-bold mb-4">${step.title}</h2>
                <p class="text-xl text-gray-400 mb-10">${step.subtitle}</p>
                <a href="/" class="btn-primary text-lg px-8 py-3 w-auto rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                    Return to Home
                </a>
            </div>
        `;
    } else {
        innerHTML = `
            <div class="w-full">
                <div class="mb-2 text-orange-500 font-semibold text-sm flex items-center gap-2">
                    <span class="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500/20 text-xs">${state.currentIndex}</span>
                </div>
                <h2 class="text-3xl md:text-5xl font-bold mb-8 text-white leading-tight">${step.title}</h2>
                
                <div class="input-wrapper mb-6 w-full">
                    ${getInputHTML(step)}
                </div>
                
                <div id="error-msg" class="text-red-400 text-sm h-6 opacity-0 transition-opacity"></div>
            </div>
        `;
    }

    container.innerHTML = innerHTML;

    // Bind specific events
    if (step.type === 'info') {
        const btn = container.querySelector('#btn-start');
        btn.addEventListener('click', handleNext);
    } else if (step.type !== 'success') {
        const wrapper = container.querySelector('.input-wrapper');

        if (step.type === 'options') {
            const btns = wrapper.querySelectorAll('.option-btn');
            btns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    // Remove selected from all
                    btns.forEach(b => b.classList.remove('selected'));
                    // Add to clicked
                    const target = e.currentTarget;
                    target.classList.add('selected');
                    // Save and advance automatically after small delay
                    state.answers[step.id] = target.dataset.value;
                    hideError();
                    setTimeout(handleNext, 300);
                });
            });
        } else {
            const input = wrapper.querySelector('input');
            input.addEventListener('input', (e) => {
                state.answers[step.id] = e.target.value;
                hideError(); // Clear error on typing
            });
            // Auto format phone
            if (step.type === 'tel') {
                input.addEventListener('input', function (e) {
                    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
                });
            }
        }
    }

    return container;
}

function getInputHTML(step) {
    const value = state.answers[step.id] || '';

    if (step.type === 'options') {
        return `
            <div class="flex flex-col gap-4 max-w-md">
                ${step.options.map(opt => `
                    <button class="option-btn text-xl md:text-2xl py-4 hover:translate-x-2 ${value === opt ? 'selected' : ''}" data-value="${opt}">
                        <span class="inline-block w-8 text-gray-500 text-base font-normal mr-2">${step.options.indexOf(opt) + 1}</span>
                        ${opt}
                    </button>
                `).join('')}
            </div>
            <div class="key-hint mt-6">
                Press enter to confirm or click
            </div>
        `;
    }

    let inputType = step.type === 'number' ? 'number' : step.type === 'tel' ? 'tel' : step.type === 'email' ? 'email' : 'text';

    return `
        <input 
            type="${inputType}" 
            id="input-${step.id}"
            class="input-field max-w-2xl bg-transparent font-medium border-b-2 border-gray-700 outline-none text-3xl md:text-5xl py-4 text-orange-400 placeholder:text-gray-700 w-full hover:border-gray-500 focus:border-orange-500 transition-colors"
            placeholder="${step.placeholder || 'Type your answer here...'}"
            value="${value}"
            ${step.type === 'number' ? 'min="0"' : ''}
            autocomplete="off"
        >
        <div class="key-hint mt-6 hidden md:flex">
            Press <kbd>Enter ↵</kbd>
        </div>
    `;
}

function showError(msg) {
    const errorEl = document.querySelector('.step-container #error-msg');
    if (errorEl) {
        errorEl.textContent = msg;
        errorEl.style.opacity = '1';

        // Shake effect on input or options
        const activeContainer = document.querySelector('.step-container .input-wrapper');
        if (activeContainer) {
            activeContainer.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(0)' }
            ], { duration: 400, easing: 'ease-in-out' });
        }
    }
}

function hideError() {
    const errorEl = document.querySelector('.step-container #error-msg');
    if (errorEl) {
        errorEl.style.opacity = '0';
    }
}

// ==========================================
// Integrations
// ==========================================

/**
 * Backend Team: Connect your API / Supabase here.
 * This function is called seamlessly at the end of the flow.
 */
function submitApplication(data) {
    console.log("=== SUBMITTING APPLICATION DATA TO SQLITE ===");

    // Add loading text to the success screen
    const subtitleEl = document.querySelector('.step-container p');
    if (subtitleEl) {
        subtitleEl.textContent = 'Saving your application...';
        subtitleEl.classList.add('animate-pulse');
    }

    fetch('/api/submit-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => {
            if (subtitleEl) {
                subtitleEl.classList.remove('animate-pulse');
                if (res.success) {
                    subtitleEl.textContent = 'Our team will contact you shortly.';
                } else {
                    subtitleEl.textContent = 'There was an issue saving your application, but you can return to home.';
                    subtitleEl.classList.add('text-red-400');
                }
            }
        })
        .catch(err => {
            console.error('Submission failed:', err);
            if (subtitleEl) {
                subtitleEl.classList.remove('animate-pulse');
                subtitleEl.textContent = 'Network error saving your application.';
                subtitleEl.classList.add('text-red-400');
            }
        });
}
