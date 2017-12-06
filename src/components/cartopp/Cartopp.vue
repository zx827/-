<template>
    <div class="cartopp">
        <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop="cartoopMou"></div>
        <div class="cart-count" v-show="food.count>0" >{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop="cartoopAdd()"></div>
                                     <!--@click.stop是阻止点击的时候出现商品的详情弹层-->
    </div>
</template>

<script>
  import Vue from 'vue'
  export default{
    //接受来自父组件goods的数据
    props:['food'],
    methods:{
        //点击加号的函数
        cartoopAdd(){
            //给每一个food添加属性count
            if(!this.food.count){
                Vue.set(this.food,'count',1);
            }else{
                this.food.count++;
                //console.log(this.food.count)
            }
        },
        //点击减号的函数
        cartoopMou(){
            this.food.count--
        }
    }
  }
</script>

<style>
  .cartopp{
    display:flex;
    font-size:0.48rem;
    height:0.48rem;
    line-height:0.48rem;
  }
  .cart-decrease{
    flex:1;
    color:rgb(0,160,220);
  }
  .cart-count{
    flex:1;
    font-size:0.2rem;
    width:0.48rem;
    text-align: center;
    color:rgb(147,153,159);
  }
  .cart-add{
    flex:1;
    color:rgb(0,160,220);
  }
</style>
