// 多语言配置文件
// 支持中文、英文、日文三种语言

const I18N_CONFIG = {
    en: {
        // 页面标题和元信息
        pageTitle: 'Family Game Share',
        pageDescription: 'Shared family game details',
        ogDescription: 'Check out this interesting family game',
        
        // 游戏信息标签
        gameDescription: 'Game Description',
        gameInfo: 'Game Information',
        ageRecommendation: 'Age Range',
        participants: 'Participants',
        gamePlace: 'Location',
        gameCategory: 'Category',
        materials: 'Materials Needed',
        abilities: 'Skills Developed',
        gameImages: 'Game Images',
        
        // 地点和分类映射
        placeMap: {
            'indoor': 'Indoor',
            'outdoor': 'Outdoor',
            'both': 'Indoor/Outdoor'
        },
        categoryMap: {
            'education': 'Educational',
            'physical': 'Physical',
            'social': 'Social',
            'creative': 'Creative',
            'sport': 'Sports',
            'none': 'Uncategorized'
        },
        
        // 状态信息
        loading: 'Loading game information...',
        loadFailed: 'Load Failed',
        reload: 'Reload',
        sharedBy: 'Shared by',
        sharedByJopar: 'Jopar',
        sharedByText: '',
        
        // 年龄和人数格式
        ageFormat: ' years old',
        participantsFormat: ' people',
        
        // 默认游戏图标
        defaultGameIcon: '🎮',
        
        // Record in Jopar 按钮
        recordInJopar: 'Record in Jopar',
        
        // 错误信息
        missingGameId: 'Missing game ID parameter',
        databaseError: 'Database query failed',
        gameNotFound: 'Game not found or has been deleted',
        
        // 开发模式
        devMode: 'Development Mode',
        devModeDebug: 'Development Mode Debug Info',
        gameId: 'Game ID',
        supabaseUrl: 'Supabase URL',
        currentTime: 'Current Time',
        successGetData: 'Successfully retrieved game data',
        supabaseError: 'Supabase Error Details'
    },
    zh: {
        // 页面标题和元信息
        pageTitle: '亲子游戏分享',
        pageDescription: '分享的亲子游戏详情',
        ogDescription: '查看这个有趣的亲子游戏',
        
        // 游戏信息标签
        gameDescription: '游戏描述',
        gameInfo: '游戏信息',
        ageRecommendation: '适合年龄',
        participants: '参与人数',
        gamePlace: '游戏地点',
        gameCategory: '游戏分类',
        materials: '所需材料',
        abilities: '能力培养',
        gameImages: '游戏图片',
        
        // 地点和分类映射
        placeMap: {
            'indoor': '室内',
            'outdoor': '户外',
            'both': '室内外均可'
        },
        categoryMap: {
            'education': '教育类',
            'physical': '体能类',
            'social': '社交类',
            'creative': '创意类',
            'sport': '运动类',
            'none': '未分类'
        },
        
        // 状态信息
        loading: '正在加载游戏信息...',
        loadFailed: '加载失败',
        reload: '重新加载',
        sharedBy: '由',
        sharedByJopar: 'Jopar',
        sharedByText: '分享',
        
        // 年龄和人数格式
        ageFormat: '岁',
        participantsFormat: '人',
        
        // 默认游戏图标
        defaultGameIcon: '🎮',
        
        // Record in Jopar 按钮
        recordInJopar: '在Jopar中记录',
        
        // 错误信息
        missingGameId: '缺少游戏ID参数',
        databaseError: '数据库查询失败',
        gameNotFound: '游戏不存在或已被删除',
        
        // 开发模式
        devMode: '开发环境',
        devModeDebug: '开发模式调试信息',
        gameId: '游戏ID',
        supabaseUrl: 'Supabase URL',
        currentTime: '当前时间',
        successGetData: '成功获取游戏数据',
        supabaseError: 'Supabase 错误详情'
    },
    ja: {
        // 页面标题和元信息
        pageTitle: 'ファミリーゲーム共有',
        pageDescription: '共有されたファミリーゲームの詳細',
        ogDescription: 'この面白いファミリーゲームをチェックしてください',
        
        // 游戏信息标签
        gameDescription: 'ゲーム説明',
        gameInfo: 'ゲーム情報',
        ageRecommendation: '対象年齢',
        participants: '参加人数',
        gamePlace: '場所',
        gameCategory: 'カテゴリー',
        materials: '必要な材料',
        abilities: '育成能力',
        gameImages: 'ゲーム画像',
        
        // 地点和分类映射
        placeMap: {
            'indoor': '屋内',
            'outdoor': '屋外',
            'both': '屋内・屋外両方'
        },
        categoryMap: {
            'education': '教育系',
            'physical': '体力系',
            'social': '社交系',
            'creative': '創造系',
            'sport': 'スポーツ系',
            'none': '未分類'
        },
        
        // 状态信息
        loading: 'ゲーム情報を読み込み中...',
        loadFailed: '読み込み失敗',
        reload: '再読み込み',
        sharedBy: '共有者：',
        sharedByJopar: 'Jopar',
        sharedByText: '',
        
        // 年龄和人数格式
        ageFormat: '歳',
        participantsFormat: '人',
        
        // 默认游戏图标
        defaultGameIcon: '🎮',
        
        // Record in Jopar 按钮
        recordInJopar: 'Joparで記録',
        
        // 错误信息
        missingGameId: 'ゲームIDパラメータが不足しています',
        databaseError: 'データベースクエリが失敗しました',
        gameNotFound: 'ゲームが見つからないか、削除されています',
        
        // 开发模式
        devMode: '開発モード',
        devModeDebug: '開発モードデバッグ情報',
        gameId: 'ゲームID',
        supabaseUrl: 'Supabase URL',
        currentTime: '現在時刻',
        successGetData: 'ゲームデータの取得成功',
        supabaseError: 'Supabase エラー詳細'
    }
};

// 导出配置（如果在模块环境中）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = I18N_CONFIG;
}
