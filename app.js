document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeInteractivity();
    initializeCounters();
    initializeLiveData();
});

// Initialize smooth animations
function initializeAnimations() {
    // Stagger panel animations on load
    const panels = document.querySelectorAll('.panel');
    panels.forEach((panel, index) => {
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(20px)';
        setTimeout(() => {
            panel.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            panel.style.opacity = '1';
            panel.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Smooth scroll reveal for mobile
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    panels.forEach(panel => observer.observe(panel));
}

// Initialize interactive elements
function initializeInteractivity() {
    // Panel hover effects with depth
    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => {
        panel.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.15)';
        });

        panel.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        });
    });

    // Interactive buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Button press animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // Show feedback
            showNotification('Action executed successfully!', 'success');
        });

        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 10px 25px -5px rgba(59, 130, 246, 0.4)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Interactive metric cards
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('click', function() {
            // Pulse effect
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'cardPulse 0.6s ease-out';
            }, 10);
        });
    });
}

// Initialize animated counters
function initializeCounters() {
    const counterElements = [
        { element: document.querySelector('.metric-value'), target: 97.5, suffix: '%', duration: 2000 },
    ];

    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.metric-value').forEach(el => {
        counterObserver.observe(el);
    });
}

function animateCounter(element) {
    const targetText = element.textContent;
    const targetNumber = parseFloat(targetText);
    const suffix = targetText.replace(/[\d.-]/g, '');
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentNumber = targetNumber * easedProgress;
        
        element.textContent = currentNumber.toFixed(1) + suffix;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = targetText;
        }
    }

    requestAnimationFrame(updateCounter);
}

// Initialize live data simulation
function initializeLiveData() {
    // Simulate real-time train movement
    setInterval(() => {
        updateTrainPositions();
    }, 100);

    // Simulate metric updates
    setInterval(() => {
        updateMetrics();
    }, 5000);

    // Update audit log
    setInterval(() => {
        updateAuditLog();
    }, 15000);

    // Pulse central hub
    const centralHub = document.querySelector('.central-node');
    if (centralHub) {
        setInterval(() => {
            centralHub.style.boxShadow = '0 0 50px rgba(16, 185, 129, 0.8)';
            setTimeout(() => {
                centralHub.style.boxShadow = '0 0 30px rgba(16, 185, 129, 0.4)';
            }, 300);
        }, 3000);
    }
}

function updateTrainPositions() {
    const trains = document.querySelectorAll('.moving-train');
    trains.forEach(train => {
        // Add random speed variations
        const currentLeft = parseInt(train.style.left) || 0;
        if (currentLeft > 180) {
            train.style.left = '-10px';
            
            // Random color changes
            const colors = ['#f59e0b', '#ef4444', '#10b981', '#3b82f6'];
            train.style.background = colors[Math.floor(Math.random() * colors.length)];
            train.style.boxShadow = `0 0 6px ${train.style.background}`;
        }
    });
}

function updateMetrics() {
    // Simulate slight metric variations
    const metricValues = document.querySelectorAll('.metric-value');
    metricValues.forEach((metric, index) => {
        const currentValue = parseFloat(metric.textContent);
        let variation;
        
        switch(index) {
            case 0: // Punctuality
                variation = (Math.random() - 0.5) * 0.2;
                metric.textContent = Math.max(95, Math.min(100, currentValue + variation)).toFixed(1) + '%';
                break;
            case 1: // Delay
                variation = (Math.random() - 0.5) * 1;
                metric.textContent = Math.max(-10, Math.min(0, currentValue + variation)).toFixed(0) + ' min';
                break;
            case 2: // Throughput
                variation = (Math.random() - 0.5) * 3;
                metric.textContent = Math.max(100, Math.min(150, currentValue + variation)).toFixed(0) + '%';
                break;
            case 3: // Utilization
                variation = (Math.random() - 0.5) * 2;
                metric.textContent = Math.max(70, Math.min(95, currentValue + variation)).toFixed(1) + '%';
                break;
        }
        
        // Flash update indicator
        metric.style.background = 'rgba(34, 197, 94, 0.1)';
        setTimeout(() => {
            metric.style.background = 'transparent';
        }, 500);
    });
}

function updateAuditLog() {
    const logContainer = document.querySelector('.audit-section');
    if (!logContainer) return;

    const actions = [
        'Route optimization applied',
        'Delay prediction updated',
        'Traffic priority adjusted',
        'System health check completed',
        'Performance threshold met'
    ];

    const types = ['AI', 'AI', 'MANUAL', 'AI', 'AI'];
    
    const newTime = new Date().toLocaleTimeString('en-US', { hour12: false });
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    const randomType = types[Math.floor(Math.random() * types.length)];
    
    // Create new log entry
    const newLogItem = document.createElement('div');
    newLogItem.className = 'log-item';
    newLogItem.innerHTML = `
        <div class="log-time">${newTime}</div>
        <div class="log-action">${randomAction}</div>
        <div class="log-type ${randomType.toLowerCase()}">${randomType}</div>
    `;
    
    // Add with animation
    newLogItem.style.opacity = '0';
    newLogItem.style.transform = 'translateX(-20px)';
    
    const existingLogs = logContainer.querySelectorAll('.log-item');
    if (existingLogs.length > 0) {
        logContainer.insertBefore(newLogItem, existingLogs[0]);
    }
    
    // Remove oldest entry if more than 4
    if (existingLogs.length >= 4) {
        existingLogs[existingLogs.length - 1].remove();
    }
    
    // Animate in
    setTimeout(() => {
        newLogItem.style.transition = 'all 0.3s ease';
        newLogItem.style.opacity = '1';
        newLogItem.style.transform = 'translateX(0)';
    }, 100);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 1000;
        transform: translateX(300px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        font-weight: 600;
        font-size: 14px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Slide out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(300px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add dynamic CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes cardPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }

    .metric-card:hover .metric-value {
        transform: scale(1.1);
        transition: transform 0.2s ease;
    }

    .scenario-path {
        background-image: linear-gradient(90deg, 
            currentColor 0%, 
            currentColor 50%, 
            transparent 50%, 
            transparent 100%);
        background-size: 20px 100%;
        animation: pathFlow 2s linear infinite;
    }

    @keyframes pathFlow {
        0% { background-position: 0 0; }
        100% { background-position: 20px 0; }
    }

    .system-node:hover {
        transform: scale(1.1);
        transition: transform 0.2s ease;
        z-index: 10;
    }

    .rail-path::after {
        content: '';
        position: absolute;
        width: 8px;
        height: 8px;
        background: inherit;
        border-radius: 50%;
        top: -2px;
        right: -4px;
        animation: signalPulse 1.5s ease-in-out infinite;
    }

    @keyframes signalPulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.5); }
    }

    .recommendation-text:hover {
        background: rgba(59, 130, 246, 0.05);
        padding: 8px;
        border-radius: 6px;
        transition: all 0.2s ease;
    }
`;
document.head.appendChild(style);

// Enhanced responsiveness
window.addEventListener('resize', () => {
    // Adjust animations for mobile
    const isMobile = window.innerWidth < 768;
    const panels = document.querySelectorAll('.panel');
    
    panels.forEach(panel => {
        if (isMobile) {
            panel.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-4px) scale(1.01)';
            });
            
            panel.addEventListener('touchend', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        }
    });
});
