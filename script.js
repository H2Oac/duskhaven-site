// 主题切换逻辑
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themePath = document.getElementById('theme-path');
const body = document.body;

const sunIcon = "M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z";
const moonIcon = "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z";

function setTheme(theme) {
    if (theme === 'light') {
        body.setAttribute('data-theme', 'light');
        themePath.setAttribute('d', sunIcon);
        localStorage.setItem('theme', 'light');
    } else {
        body.removeAttribute('data-theme');
        themePath.setAttribute('d', moonIcon);
        localStorage.setItem('theme', 'dark');
    }
}

themeToggle.addEventListener('click', () => {
    setTheme(body.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
});

// 页面加载时应用保存的主题
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
});

// IP 选择菜单功能
function toggleIPMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('ip-menu');
    menu.classList.toggle('hidden');
}

// 点击页面其他地方关闭菜单
document.addEventListener('click', (event) => {
    const ipMenu = document.getElementById('ip-menu');
    const copyButton = document.querySelector('button[onclick="toggleIPMenu(event)"]');
    if (ipMenu && !ipMenu.contains(event.target) && !copyButton.contains(event.target)) {
        ipMenu.classList.add('hidden');
    }
});

function copySpecificIP(ip, type) {
    navigator.clipboard.writeText(ip).then(() => {
        const menu = document.getElementById('ip-menu');
        const originalContent = menu.innerHTML;
        
        menu.innerHTML = `
            <div class="flex flex-col items-center justify-center py-6 space-y-4" id="success-content">
                <div class="w-14 h-14 bg-gradient-to-br from-green-500/30 to-emerald-500/30 text-green-400 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div class="text-center space-y-1">
                    <div class="text-base font-bold text-white dark:text-white light:text-gray-900">${type} 地址已复制</div>
                    <div class="text-xs text-adaptive-muted">快去游戏中粘贴吧！</div>
                </div>
            </div>
        `;

        // 2 秒后淡出消失
        setTimeout(() => {
            const successContent = document.getElementById('success-content');
            if (successContent) {
                successContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                successContent.style.opacity = '0';
                successContent.style.transform = 'scale(0.95)';
            }
            
            // 等待淡出动画完成后关闭菜单
            setTimeout(() => {
                menu.classList.add('hidden');
                setTimeout(() => {
                    menu.innerHTML = originalContent;
                }, 300);
            }, 600);
        }, 2000);
    }).catch(err => {
        console.error('复制失败:', err);
    });
}

// 代码切换功能
function switchCode(lang) {
    const tabGame = document.getElementById('tab-game');
    const tabQQ = document.getElementById('tab-qq');
    const codeContent = document.getElementById('code-content');

    if (lang === 'game') {
        tabGame.classList.add('active');
        tabQQ.classList.remove('active');
        codeContent.innerHTML = `
<span class="text-gray-500">// LiteEco 汉化展示</span>
<span class="text-rose-400">[经济系统]</span> 成功向 <span class="text-blue-400">BE_Player_66</span> 转账 <span class="text-yellow-400">200.00</span>
<span class="text-rose-400">[经济系统]</span> 当前余额: <span class="text-yellow-400">5,820.00</span>

<span class="text-gray-500">// ViaVersion 状态适配</span>
<span class="text-green-400">[系统]</span> 检测到您正使用 <span class="text-white">1.8.9</span> 版本进入
<span class="text-green-400">[系统]</span> 协议已通过 ViaBackwards 自动完成适配。
        `;
    } else {
        tabQQ.classList.add('active');
        tabGame.classList.remove('active');
        codeContent.innerHTML = `
<span class="text-gray-500">// QQ 群内消息示例</span>
<span class="text-rose-400">[系统]</span> 玩家 <span class="text-blue-400">Java_User_233</span> 已上线，当前在线: 16/64
<span class="text-rose-400">[系统]</span> 服务器 TPS: 20.00 | 延迟: 12ms

<span class="text-gray-500">// 管理员操作记录</span>
<span class="text-green-400">[管理]</span> 玩家 <span class="text-blue-400">Bedrock_Player_66</span> 已获得白名单
<span class="text-green-400">[管理]</span> 服务器已重启，所有玩家已重新连接。
        `;
    }
}

// 页面加载完成后更新状态
async function updateStatus() {
    const statusEl = document.getElementById('player-status');
    statusEl.innerText = "DUSKHAVEN: EPYC 7791 动力驱动中";
}

window.onload = updateStatus;