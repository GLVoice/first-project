define(['jquery'],()=>{
    class Header{
        constructor(){
            this.load().then(()=>{
                
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
    }
    return new Header()
})