// 宫崎骏风格官网交互效果

// 多语言支持类
class I18nManager {
    constructor() {
        this.currentLanguage = 'en'; // 默认英文
        this.init();
    }
    
    init() {
        // 检测浏览器语言
        const browserLang = navigator.language.split('-')[0];
        if (I18N_CONFIG[browserLang]) {
            this.currentLanguage = browserLang;
        }
        
        // 从URL参数获取语言设置
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        if (langParam && I18N_CONFIG[langParam]) {
            this.currentLanguage = langParam;
        }
        
        // 从localStorage获取保存的语言设置
        const savedLang = localStorage.getItem('jopar-language');
        if (savedLang && I18N_CONFIG[savedLang]) {
            this.currentLanguage = savedLang;
        }
        
        this.applyLanguage();
        this.initLanguageSwitcher();
    }
    
    // 翻译方法
    t(key) {
        const keys = key.split('.');
        let value = I18N_CONFIG[this.currentLanguage];
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                // 如果当前语言没有该键，回退到中文
                value = I18N_CONFIG['zh'];
                for (const fallbackKey of keys) {
                    if (value && typeof value === 'object' && fallbackKey in value) {
                        value = value[fallbackKey];
                    } else {
                        return key; // 如果连中文都没有，返回键名
                    }
                }
                break;
            }
        }
        
        return typeof value === 'string' ? value : key;
    }
    
    // 应用语言设置
    applyLanguage() {
        // 更新页面标题
        document.title = this.t('pageTitle');
        
        // 更新 meta 标签
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = this.t('pageDescription');
        }
        
        // 更新页面语言属性
        document.documentElement.lang = this.currentLanguage;
        
        // 刷新页面翻译
        this.refreshTranslations();
        
        // 更新语言切换器状态
        this.updateLanguageSwitcher();
    }
    
    // 刷新页面翻译
    refreshTranslations() {
        // 查找所有包含 data-translate 属性的元素并更新文本
        const elementsWithTranslations = document.querySelectorAll('[data-translate]');
        elementsWithTranslations.forEach(element => {
            const translationKey = element.getAttribute('data-translate');
            const translatedText = this.t(translationKey);
            
            // 处理 placeholder 属性
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translatedText;
            } else {
                element.textContent = translatedText;
            }
        });
    }
    
    // 初始化语言切换器
    initLanguageSwitcher() {
        const langTrigger = document.getElementById('languageTrigger');
        const langMenu = document.getElementById('languageMenu');
        const langDropdown = document.querySelector('.lang-dropdown');
        
        if (langTrigger && langMenu) {
            // 点击触发器显示/隐藏菜单
            langTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                langDropdown.classList.toggle('active');
            });
            
            // 点击语言选项
            const langOptions = document.querySelectorAll('.lang-option');
            langOptions.forEach(option => {
                option.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const lang = option.getAttribute('data-lang');
                    this.setLanguage(lang);
                    langDropdown.classList.remove('active');
                });
            });
            
            // 点击页面其他地方关闭菜单
            document.addEventListener('click', () => {
                langDropdown.classList.remove('active');
            });
        }
    }
    
    // 设置语言
    setLanguage(lang) {
        if (I18N_CONFIG[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('jopar-language', lang);
            this.applyLanguage();
        }
    }
    
    // 更新语言切换器状态
    updateLanguageSwitcher() {
        const langText = document.querySelector('.lang-text');
        const langOptions = document.querySelectorAll('.lang-option');
        
        if (langText) {
            // 更新触发器显示的文字
            langText.textContent = this.currentLanguage === 'en' ? 'English' : '中文';
        }
        
        // 更新选项的激活状态
        langOptions.forEach(option => {
            const lang = option.getAttribute('data-lang');
            if (lang === this.currentLanguage) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }
}

// 全局多语言管理器实例
let i18nManager;

// 翻译函数（全局使用）
function t(key) {
    return i18nManager ? i18nManager.t(key) : key;
}

document.addEventListener('DOMContentLoaded', function() {
    // 初始化多语言管理器
    i18nManager = new I18nManager();
    
    // 平滑滚动导航
    initSmoothScrolling();
    
    // 导航栏滚动效果
    initNavbarScrollEffect();
    
    // 页面元素动画
    initScrollAnimations();
    
    // 表单处理（已移除）
    // initContactForm();
    
    // 游戏卡片交互
    initGameCardInteractions();
    
    // 添加更多浮动元素
    initFloatingElements();
});

// 平滑滚动导航
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // 考虑导航栏高度
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 导航栏滚动效果
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        
        // 隐藏/显示导航栏
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// 页面元素动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // 为功能卡片添加延迟动画
                if (entry.target.classList.contains('feature-card')) {
                    const cards = document.querySelectorAll('.feature-card');
                    const index = Array.from(cards).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.feature-card, .game-category, .about-text, .contact-form');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 联系表单处理（已移除）
// function initContactForm() {
//     // 表单处理代码已移除
// }

// 游戏卡片交互
function initGameCardInteractions() {
    const gameItems = document.querySelectorAll('.game-item');
    
    gameItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
            this.style.boxShadow = '0 8px 25px rgba(231, 76, 60, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = 'none';
        });
        
        item.addEventListener('click', function() {
            // 添加点击效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05) rotate(2deg)';
            }, 150);
            
            // 显示游戏详情（模拟）
            showGameDetail(this.textContent);
        });
    });
}

// 添加更多浮动元素
function initFloatingElements() {
    const heroSection = document.querySelector('.hero');
    
    // 添加更多星星
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.textContent = ['⭐', '✨', '🌟', '💫', '⭐'][i];
        star.style.position = 'absolute';
        star.style.fontSize = '1.5rem';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animation = `twinkle ${2 + Math.random() * 2}s ease-in-out infinite`;
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.zIndex = '-1';
        
        heroSection.querySelector('.floating-elements').appendChild(star);
    }
    
    // 添加飘落的花瓣
    createFallingPetals();
}

// 创建飘落花瓣效果
function createFallingPetals() {
    const heroSection = document.querySelector('.hero');
    const petals = ['🌸', '🌺', '🌻', '🌷', '🌹'];
    
    setInterval(() => {
        const petal = document.createElement('div');
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.position = 'absolute';
        petal.style.fontSize = '1.2rem';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.top = '-50px';
        petal.style.zIndex = '-1';
        petal.style.animation = 'fallDown 8s linear forwards';
        
        heroSection.appendChild(petal);
        
        // 8秒后移除花瓣
        setTimeout(() => {
            if (petal.parentNode) {
                petal.parentNode.removeChild(petal);
            }
        }, 8000);
    }, 3000);
}

// 显示游戏详情
function showGameDetail(gameName) {
    const modal = document.createElement('div');
    modal.className = 'game-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${gameName}</h3>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <p>${t('gameModalDescription')}</p>
                <div class="game-info">
                    <div class="info-item">
                        <span class="label">${t('gameModalAge')}</span>
                        <span class="value">${t('gameModalAgeValue')}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">${t('gameModalParticipants')}</span>
                        <span class="value">${t('gameModalParticipantsValue')}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">${t('gameModalDuration')}</span>
                        <span class="value">${t('gameModalDurationValue')}</span>
                    </div>
                </div>
                <button class="btn btn-primary">${t('gameModalStart')}</button>
            </div>
        </div>
    `;
    
    // 添加模态框样式
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 20px;
        max-width: 500px;
        width: 90%;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // 显示动画
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // 关闭模态框
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    // 点击背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBtn.click();
        }
    });
}

// 显示通知
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
    }
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // 3秒后自动关闭
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 邮箱验证
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 添加飘落动画CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fallDown {
        to {
            transform: translateY(calc(100vh + 50px)) rotate(360deg);
        }
    }
    
    .game-modal .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #ecf0f1;
    }
    
    .game-modal .close-btn {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #7f8c8d;
        transition: color 0.3s ease;
    }
    
    .game-modal .close-btn:hover {
        color: #e74c3c;
    }
    
    .game-modal .game-info {
        margin: 1.5rem 0;
    }
    
    .game-modal .info-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        padding: 0.5rem 0;
        border-bottom: 1px solid #ecf0f1;
    }
    
    .game-modal .label {
        font-weight: 500;
        color: #2c3e50;
    }
    
    .game-modal .value {
        color: #7f8c8d;
    }
`;
document.head.appendChild(style);
