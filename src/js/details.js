require(['./config'],()=>{
    require(['url', 'template','header','footer','zoom','fly'],(url,template)=>{
        class Details{
            constructor(){
                //addFly方法在这里调用的话，需要事件委托；在then方法里调用的话，就不用了，直接找购物车按钮
                this.addToCart()
                this.getData().then(() => {
                    this.zoomImg()
                  })
            }
            //先获取rap2数据渲染详情页
            getData () {
                // 获取地址栏id
                const id = location.search.slice(4)
                return new Promise(resolve => {
                  $.get(url.rap + '/detail-product', { id }, resp => {
                    if (resp.code === 200) {
                      let detail = resp.body
                      //储存在this身上，这样的话，别的方法里（比如抛物线效果）就能直接获取当前商品的信息
                      //this.detail = detail

                      // 由于rap2没有返回id，所以需要手动加上id，真实开发不需要这一步
                      this.detail = { ...detail, id }
                      $('#detail-box').html(template('detail-template', { detail }))
                      // 这里代表数据拿到并且渲染完成
                      resolve()
                    }
                  })
                })
            }
            //再利用放大镜插件
            zoomImg(){
                //$里面是找到 中图片
                $('.zoom-img').elevateZoom({
                    //ul父级盒子的id
                    gallery: 'gal1',
                    cursor: 'pointer',
                    borderSize: '1',
                    galleryActiveClass: 'active',
                    borderColor: '#f2f2f2'
                })
            }
            //加入购物车
            addToCart(){
                //备份this
                let _this = this
                //点击购物车按钮，绑定事件（事件委托）
                $('#detail-box').on('click','#addCart',function(){
                    //先完成,飞入购物车的抛物线效果
                    const src = _this.detail.imgs[0]
                    $(`<img src=${src} style="width:50px;height:50px;border-radius:50%">`).fly({
                        start:{
                            left: $(this).offset().left,
                            top: $(this).offset().top,
                          },
                          end:{
                            left: $('#cart-number').offset().left,
                            top: $('#cart-number').offset().top,
                            width: 0, //结束时高度
                            height: 0, //结束时高度
                          },
                          //越大越快，默认1.2
                          speed: 0.8, 
                          //结束回调
                          onEnd: function(){
                            //移除多余的图片
                            this.destroy()
                            //动画完成，购物车数量+1
                            let num = Number($("#cart-number").html())
                            $("#cart-number").html(++num)
                          }
                    })
                    //再完成,商品加入购物车
                    
                    //需要先把localStorage里的购物车信息取出来，再新增当前这一条信息，再重新储存进去覆盖掉原来的
                    let cart = localStorage.getItem('cart')
                    //判断cart是否有数据，如果没有数据，代表是第一次加购物车
                    if(cart){
                        //把cart解析成json格式
                        cart = JSON.parse(cart)
                        //判断当前数据是否已经加过购物车
                        const isExist = cart.some(item=>{
                            return item.id===_this.detail.id
                        })
                        if(isExist){
                            //isExist为true，代表商品已经存在，所以把这条商品的 num 加一
                            cart = cart.map(item=>{
                                if(item.id===_this.detail.id) item.num++
                                return item
                            })
                        }else{
                            //isExist为false，代表商品不存在，所以就把这条商品push进去
                            cart.push({..._this.detail, num:1})
                        }
                        console.log(cart)
                        localStorage.setItem('cart',JSON.stringify(cart))
                    }else{
                        //储存localStorage是满足json格式的字符串
                        //第一次储存localStorage购物车信息，为了避免后期修改复杂，所以储存只有当前这一个元素的数组
                        // var arr = []
                        // arr.push({..._this.detail, num:1})
                        // localStorage.setItem('cart',JSON.stringify(arr))
                        localStorage.setItem('cart',JSON.stringify([{..._this.detail, num:1}]))
                    }
                    
                })
            }

        }
        new Details()
    })
})