require(['./config'],()=>{
    require(['template','header','footer'],(template)=>{
        class Shoppingcar{
            constructor(){
                this.renderCat()
            }
            renderCat(){
                //从localstorage里面取出数据，渲染页面
                let cart = localStorage.getItem('cart')
                if(cart){
                    cart = JSON.parse(cart)
                    $('#cart-list').html(template('template-cart',{cart}))
                }else{
                    //显示购物车为空的操作
                    $.get('/libs/json/shoppingcar-love.json',resp=>{
                        let str = template('template-love',{list:resp})
                        $('#cart-love').html(str)
                    })
                }
            }

        }
        new Shoppingcar()
    })
})