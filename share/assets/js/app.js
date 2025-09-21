// 游戏分享应用主逻辑
class GameShareApp {
    constructor() {
        this.supabase = null;
        this.gameId = null;
        this.isDevMode = false;
        this.init();
    }
    
    async init() {
        // 获取URL参数
        const urlParams = new URLSearchParams(window.location.search);
        this.gameId = urlParams.get('id');
        this.isDevMode = urlParams.get('dev') === '1';
        
        // 显示环境信息
        this.showEnvironmentInfo();
        
        if (!this.gameId) {
            this.showError('缺少游戏ID参数');
            return;
        }
        
        // 初始化Supabase
        this.supabase = supabase.createClient(
            SUPABASE_URL,
            SUPABASE_ANON_KEY
        );
        
        // 加载游戏数据
        await this.loadGameData();
    }
    
    showEnvironmentInfo() {
        // 在开发模式下显示环境信息
        if (this.isDevMode) {
            const envInfo = document.createElement('div');
            envInfo.className = 'fixed top-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded-lg text-sm font-medium z-50';
            envInfo.innerHTML = `
                <div class="flex items-center">
                    <span class="mr-2">🔧</span>
                    <span>开发环境</span>
                    <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-yellow-600 hover:text-yellow-800">×</button>
                </div>
            `;
            document.body.appendChild(envInfo);
            
            // 5秒后自动隐藏
            setTimeout(() => {
                if (envInfo.parentElement) {
                    envInfo.remove();
                }
            }, 5000);
        }
    }
    
    async loadGameData() {
        try {
            this.showLoading();
            
            // 在开发模式下显示调试信息
            if (this.isDevMode) {
                console.log('🔧 开发模式调试信息:');
                console.log('- 游戏ID:', this.gameId);
                console.log('- Supabase URL:', SUPABASE_URL);
                console.log('- 当前时间:', new Date().toISOString());
            }
            
            const { data, error } = await this.supabase
                .from('temp_game_shares')
                .select('game_data')
                .eq('id', this.gameId)
                .single();
            
            if (error) {
                if (this.isDevMode) {
                    console.error('❌ Supabase 错误详情:', error);
                }
                throw new Error(`数据库查询失败: ${error.message}`);
            }
            
            if (!data) {
                throw new Error('游戏不存在或已被删除');
            }
            
            // 在开发模式下显示数据信息
            if (this.isDevMode) {
                console.log('✅ 成功获取游戏数据:', data);
            }
            
            // 更新访问计数
            await this.updateAccessCount();
            
            // 显示游戏数据
            this.displayGame(data.game_data);
            
        } catch (error) {
            console.error('加载游戏数据失败:', error);
            
            // 在开发模式下显示更详细的错误信息
            if (this.isDevMode) {
                this.showError(`${error.message}\n\n调试信息:\n- 游戏ID: ${this.gameId}\n- 环境: ${this.isDevMode ? '开发' : '生产'}\n- 时间: ${new Date().toISOString()}`);
            } else {
                this.showError(error.message);
            }
        }
    }
    
    displayGame(gameData) {
        // 更新页面标题
        document.title = `${gameData.name} - 亲子游戏分享`;
        
        // 更新Open Graph标签
        this.updateMetaTags(gameData);
        
        // 显示游戏信息
        document.getElementById('gameIcon').textContent = gameData.emojiIcon || '🎮';
        document.getElementById('gameTitle').textContent = gameData.name;
        
        if (gameData.subTitle) {
            document.getElementById('gameSubTitle').textContent = gameData.subTitle;
        }
        
        document.getElementById('gameDescription').textContent = gameData.description;
        document.getElementById('ageRecommendation').textContent = `${gameData.ageRecommendation}岁`;
        document.getElementById('participants').textContent = `${gameData.participants}人`;
        document.getElementById('gamePlace').textContent = this.getPlaceText(gameData.place);
        document.getElementById('gameCategory').textContent = this.getCategoryText(gameData.category);
        
        // 显示材料列表
        if (gameData.materials && gameData.materials.length > 0) {
            const materialsList = document.getElementById('materialsList');
            gameData.materials.forEach(material => {
                const li = document.createElement('li');
                li.className = 'flex items-center p-3 bg-gray-50 rounded-lg';
                li.innerHTML = `
                    <div class="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span class="text-gray-700">${material.name || material}</span>
                `;
                materialsList.appendChild(li);
            });
            document.getElementById('materialsSection').style.display = 'block';
        }
        
        // 显示能力培养（使用标签样式）
        if (gameData.abilities && gameData.abilities.length > 0) {
            const abilitiesList = document.getElementById('abilitiesList');
            gameData.abilities.forEach(ability => {
                const span = document.createElement('span');
                span.className = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800';
                span.textContent = ability.name || ability;
                abilitiesList.appendChild(span);
            });
            document.getElementById('abilitiesSection').style.display = 'block';
        }
        
        // 显示图片（如果有的话）
        if (gameData.images && gameData.images.length > 0) {
            const imageGallery = document.getElementById('imageGallery');
            gameData.images.forEach(imageUrl => {
                const div = document.createElement('div');
                div.className = 'relative group cursor-pointer';
                div.innerHTML = `
                    <img src="${imageUrl}" 
                         alt="${gameData.name}" 
                         class="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200"
                         loading="lazy">
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                        <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                        </svg>
                    </div>
                `;
                
                // 添加点击放大功能
                div.addEventListener('click', () => {
                    this.showImageModal(imageUrl, gameData.name);
                });
                
                imageGallery.appendChild(div);
            });
            document.getElementById('imagesSection').style.display = 'block';
        }
        
        this.hideLoading();
    }
    
    showImageModal(imageUrl, imageAlt) {
        // 创建模态框
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="relative max-w-4xl max-h-full">
                <img src="${imageUrl}" alt="${imageAlt}" class="max-w-full max-h-full rounded-lg">
                <button class="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;
        
        // 添加关闭功能
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.tagName === 'BUTTON') {
                document.body.removeChild(modal);
            }
        });
        
        document.body.appendChild(modal);
    }
    
    async updateAccessCount() {
        try {
            // 先获取当前的访问计数
            const { data: currentData, error: fetchError } = await this.supabase
                .from('temp_game_shares')
                .select('access_count')
                .eq('id', this.gameId)
                .single();
            
            if (fetchError) {
                console.warn('获取当前访问计数失败:', fetchError);
                return;
            }
            
            // 更新访问计数（递增1）
            const { error } = await this.supabase
                .from('temp_game_shares')
                .update({ access_count: (currentData.access_count || 0) + 1 })
                .eq('id', this.gameId);
            
            if (error) {
                console.warn('更新访问计数失败:', error);
            }
        } catch (error) {
            console.warn('更新访问计数失败:', error);
        }
    }
    
    updateMetaTags(gameData) {
        document.querySelector('meta[property="og:title"]').content = gameData.name;
        document.querySelector('meta[property="og:description"]').content = gameData.description;
        document.querySelector('meta[property="og:url"]').content = window.location.href;
        
        if (gameData.images && gameData.images.length > 0) {
            document.querySelector('meta[property="og:image"]').content = gameData.images[0];
        }
    }
    
    getPlaceText(place) {
        const placeMap = {
            'indoor': '室内',
            'outdoor': '户外',
            'both': '室内外均可'
        };
        return placeMap[place] || place;
    }
    
    getCategoryText(category) {
        const categoryMap = {
            'education': '教育类',
            'physical': '体能类',
            'social': '社交类',
            'creative': '创意类',
            'sport': '运动类',
            'none': '未分类'
        };
        return categoryMap[category] || category;
    }
    
    showLoading() {
        document.getElementById('loading').style.display = 'block';
        document.getElementById('gameContent').style.display = 'none';
        document.getElementById('error').style.display = 'none';
    }
    
    hideLoading() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('gameContent').style.display = 'block';
    }
    
    showError(message) {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('gameContent').style.display = 'none';
        document.getElementById('error').style.display = 'block';
        
        // 支持多行错误信息
        const errorElement = document.getElementById('errorMessage');
        if (message.includes('\n')) {
            errorElement.innerHTML = message.split('\n').map(line => 
                line.trim() ? `<div>${line}</div>` : '<div><br></div>'
            ).join('');
        } else {
            errorElement.textContent = message;
        }
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new GameShareApp();
});
