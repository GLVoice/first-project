define(['jquery'],()=>{
    class Header{
        constructor(){
            this.load().then(()=>{
                this.search()
            })
        }
        
        //加载头部
        load(){
            return new Promise(resolve=>{
                $('header').load('/html/modules/header.html',()=>{
                    resolve()
                })
            })
        }

        //搜索框功能
        search(){
            $('#search-input').on('keyup',function(){
                const value = $(this).val()
                $.getJSON(`https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${value}&cb=?`,function(data){
                    console.log(data)
                    var str = ""
                    data.s.forEach(element => {
                        str += `<li>${element}</li>`
                    })
                    $('#search-p').html(str)
                })
            })
        }
    }
    return new Header()
})