require.config({
    baseUrl: '/',
    paths: {
        'jquery': 'libs/jquery/jquery-3.4.1.min',
        'header': 'js/modules/header',
        'footer': 'js/modules/footer',
        'template': 'libs/art-template/template-web', //它是遵循AMD规范的，所以不需要垫片
        'url': 'js/modules/url',
        'zoom':'/libs/jquery-plugins/jquery.elevateZoom-3.0.8.min',
        'fly': '/libs/jquery-plugins/jquery.fly.min'
    },
    //垫片
    //不满足AMD规范，但是又依赖其他模块
    shim:{
        zoom: {
            deps: ['jquery']
        },
        fly: {
            deps: ['jquery']
        }
    }
})