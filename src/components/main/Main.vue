<template>
    <div v-if="goods!=null">
      <!--头部信息-->
      <my-header :seller="seller"></my-header>

      <!--选项卡，商家。。。。-->
      <div class="tabs">
        <div class="tab-item">
          <router-link to="/main/goods">
            商品
          </router-link>
        </div>
        <div class="tab-item">
          <router-link to="/main/ratings">
            评价
          </router-link>
        </div>
        <div class="tab-item">
          <router-link to="/main/seller">
            商家
          </router-link>
        </div>
      </div>
      <!--通过router-view传值，接受的时候和父传子一样的-->
      <router-view :goods="goods"></router-view>
      <!--购物车-->
      <shopcart :selectFoods="selectFoods"></shopcart>
    </div>
</template>

<script>
  //导入axios
  import axios from 'axios'

  //导入header组件
  import Header from '../header/Header.vue'

  //导入购物车组件
  import Shopcart from '../shopcart/Shopcart.vue'
  export default {
    name: 'app',
    data(){
      return {
        seller:null,
        goods:null

      }
    },
    components: {
      myHeader:Header,
      Shopcart
    },
    created(){
      let that=this;
      axios.get("/api/seller")
        .then((res)=>{
          that.seller=res.data.data;
        })
        .catch((err)=>{
          console.log(err)
        });
      axios.get("/api/goods")
        .then((goods)=>{
          that.goods=goods.data.data;
        })
        .catch((err)=>{
          console.log(err);
        })
    },
    computed:{
      /*
       当点击当前加减组件的时候给当前food添加了count属性(详细看Cartopp组件的方法)，
       在这个函数里判断food有没有count属性，有就保存在foods[]里，把这个方法传给购物车组件。

       用forEach遍历goods,good就是goods里的每一个item(元素), 然后在遍历每一个元素的item.foods数组，
       food是foods里的每一个item(元素);如果每一个(item元素)food的count属性有值，就把这个food放进foods[]数组里
       */
      selectFoods(){
        let foods=[];
        this.goods.forEach(good=>{
          good.foods.forEach(food=>{
            if(food.count){
              foods.push(food);
            }
          });
        });
        return foods;
      }
    }
  }
</script>

<style>
  .tabs{
    width:100%;
    height:0.8rem;
    line-height: 0.8rem;
    border-bottom:1px solid rgba(7,17,27,0.1);
    display: flex;
  }
  .tabs .router-link-active{
    color:red;
  }
  .tabs .tab-item{
    flex: 1;
    text-align: center;
    font-size:0.28rem;
    color:rgb(77,85,93);
  }
</style>
