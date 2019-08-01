require.config({
    baseUrl: '/',
    paths: {
        'jquery': 'libs/jquery/jquery-3.4.1.min',
        'header': 'js/modules/header',
        'footer': 'js/modules/footer',
        'template': 'libs/art-template/template-web' //它是遵循AMD规范的，所以不需要垫片
    }
})