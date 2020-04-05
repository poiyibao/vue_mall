module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-px-to-viewport" : {
            viewportWidth: 375,    // 视窗大小，对应设计稿的宽度
            viewportHeight: 667,   //视窗大小，对应设计稿的高度
            unitPrecision: 5,      //指定转换为视窗单位的精度
            viewportUnit: 'vw',    //转换为视窗的单位
            selectorBlackList: ['tab-bar','tab-bar-item'],     //
            minPixelValue: 1,       //最小值（最小值以下值不进行转换、）
            mediaQuery: false       //允许媒体查询转换为px
        },
    }
}