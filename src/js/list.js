require(['./config'],()=>{
    require(['template','url','header','footer'],(template,url)=>{
        class List{
            constructor(){
                this.getList()
            }
            getList(){
                $.get(`${url.rap}/list-product`,(resp)=>{
                    console.log(resp)
                    if(resp.code===200){
                        const {list} = resp.body
                        //let str = template('list-template',{list})
                        $('#list-products').html(template('list-template',{list}))
                    }
                })
            }
        }
        new List()
    })
})