require(['./config'],()=>{
    require(['template','url','header','footer'],(template,url)=>{
        class Index{
            constructor(){
                this.swiper()
                this.countDown()
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
            //倒计时
            countDown(){
                var date = new Date();
			    var startTime = date.getTime();
                // 把表盘拨到23：59
                date.setHours(23, 59, 20); 
			    var endTime = date.getTime();
			    var time = (endTime - startTime)/1000;
			    var seconds = time % 60;
                // 零散的秒数过滤掉
                time -= seconds; 
			    var minutes = time/60 % 60;
                // 过滤掉分钟数所包含的秒数
                time -= minutes*60; 
                var hour = time/60/60;
                $("#hours").html(hour);
                $("#minutes").html(minutes);
                $("#seconds").html(seconds);
                setInterval(this.countDown, 1000);
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