// Supabase 环境配置
// 支持测试环境和正式环境

const ENVIRONMENTS = {
    production: {
        url: 'https://otwqjpmgpsbtbxfjeszc.supabase.co',
        anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90d3FqcG1ncHNidGJ4Zmplc3pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwOTUwNjksImV4cCI6MjA2OTY3MTA2OX0.FKIr3IuP_KGEyA4Ygt4rzqm3PZUoNcBodtf4f180nkA'
    },
    development: {
        url: 'http://192.168.50.143:54321', 
        anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
    }
};

// 根据URL参数确定环境
function getEnvironment() {
    const urlParams = new URLSearchParams(window.location.search);
    const isDev = urlParams.get('dev') === '1';
    return isDev ? ENVIRONMENTS.development : ENVIRONMENTS.production;
}

// 获取当前环境配置
const currentEnv = getEnvironment();

// 导出配置
const SUPABASE_URL = currentEnv.url;
const SUPABASE_ANON_KEY = currentEnv.anonKey;

// 调试信息（仅在开发环境显示）
if (currentEnv === ENVIRONMENTS.development) {
    console.log('🔧 开发环境模式');
    console.log('Supabase URL:', SUPABASE_URL);
} else {
    console.log('🚀 生产环境模式');
}