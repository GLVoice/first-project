require(['./config'],()=>{
    require(['template','header','footer'],(template)=>{
        class Shoppingcar{
            constructor(){
                this.renderCat()
            }
            //渲染购物车
            renderCat(){
                //从localstorage里面取出数据，渲染页面
                let cart = localStorage.getItem('cart')
                if(cart){
                    cart = JSON.parse(cart)
                    $('#cart-list').html(template('template-cart',{cart}))
                    this.calcTotal()
                    this.checksChange()
                    this.numChange()
                    this.removeChange()
                }else{
                    //显示购物车为空的操作
                    $.get('/libs/json/shoppingcar-love.json',resp=>{
                        let str = template('template-love',{list:resp})
                        $('#cart-love').html(str)
                    })
                }
            }
            
            //点击单选框
            checksChange(){
                //每一次都重新找checks
                let $checks = $('#cart-list .check')
                $checks.on('change',()=>{
                    this.calcTotal()
                })
            }

            //数量改变
            numChange(){
                $('#cart-list').on('click', e =>{
                    if(e.target.className==='reduce-num'){
                        //数量减的逻辑
                        var num,price
                        const id = $(e.target).parents('.cart-list').attr('data-id')
                        let cart = JSON.parse(localStorage.getItem('cart'))
                        cart = cart.map(item=>{
                            if(item.id===id){
                                item.num--
                                num = item.num
                                // if(num<0){
                                //     num = 0
                                // }
                                price = item.num * item.price
                            }
                            return item
                        })
                        localStorage.setItem('cart',JSON.stringify(cart))
                        //修改页面的显示内容
                        $(e.target).parents('.cart-list').find('.cart-num').val(num)
                        $(e.target).parents('.cart-list').find('.product-cost').html(price)
                        this.calcTotal()
                    }else if(e.target.className==='increase-num'){
                        //数量加的逻辑
                        var num,price
                        const id = $(e.target).parents('.cart-list').attr('data-id')
                        let cart = JSON.parse(localStorage.getItem('cart'))
                        cart = cart.map(item=>{
                            if(item.id===id){
                                item.num++
                                num = item.num
                                price = item.num * item.price
                            }
                            return item
                        })
                        localStorage.setItem('cart',JSON.stringify(cart))
                        //修改页面的显示内容
                        $(e.target).parents('.cart-list').find('.cart-num').val(num)
                        $(e.target).parents('.cart-list').find('.product-cost').html(price)
                        this.calcTotal()
                    }
                })
            }

            //删除功能
            removeChange(){
                let _this = this
                $('.remove-goods').on('click', function(){
                    let id = $(this).parents('.cart-list').attr('data-id')
                    let cart = localStorage.getItem('cart')
                    cart = JSON.parse(cart)
                    cart = cart.filter(item=>{
                        return item.id != id
                    })
                    localStorage.setItem('cart',JSON.stringify(cart))
                    $(this).parents('.cart-list').remove()
                    _this.calcTotal()
                })
            }
            //计算总价和总件数
            calcTotal(){
                this.totalPrice = 0
                this.totalNumber = 0
                let $checks = $('#cart-list .check')
                //遍历jquery对象用each方法
                $checks.each((index, check)=>{
                    //通过each方法得到的每一个check是原生对象
                    if($(check).prop('checked')){
                        this.totalPrice += Number($(check).parents('.cart-list').children('.product-cost').html())
                        this.totalNumber += Number($(check).parents('.cart-list').find('.cart-num').val())
                    }
                })
                $('.cart-allPrice').html(this.totalPrice)
                $('.cart-action-right-num').html(this.totalNumber)
            }

        }
        new Shoppingcar()
    })
})