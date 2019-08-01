require(['./config'],()=>{
    require(['template','url','header','footer'],(template,url)=>{
        class Index{
            constructor(){
                this.swiper()
                this. getLimitBuy()
            }
            //轮播图
            swiper(){
                var mySwiper = new Swiper ('.swiper-container', {
                    loop: true,
                    autoplay:true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                      },
                })
            }
            // 限时抢购
            getLimitBuy(){
                $.get('/libs/json/index-limit-buy.json',resp=>{
                    //json假数据
                    console.log(resp)
                    //渲染页面
                    //template有两个参数，第一个参数是模板的id（不要写#），第二个参数是模板需要的数据
                    //{}模板里面需要list字段，值就是请求到的resp数组
                    let str = template('limit-buy-template',{list:resp})
                    $('#main-goods').html(str)
                    
                    //rap2假数据 `${url.rap}/super-single-product`
                    // console.log(resp)
                    // if(resp.code===200){
                    //     const {list} = resp.body
                    //     let str = template('limit-buy-template',{list})
                    //     $('#main-goods').html(str)
                    // }
                })
            }
        }
        new Index()
    })
})