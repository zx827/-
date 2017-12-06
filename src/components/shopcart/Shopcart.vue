<template>
    <div class="shopCart" v-if="seller!=null">
      <div class="content">
        <!--左边 ，到配送费-->
        <div class="content-left"  @click="cartDetailShow=!cartDetailShow">
          <div class="logo-wrapper" >
            <div class="logo" :class="{highlight :totalCount>0}">
              <i class="icon-shopping_cart"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight:totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc" v-if="seller!=null">另需配送费￥{{seller.deliveryPrice}}元</div>
        </div>
        <!--右边，多少元起送-->
        <div class="content-right" :class="{highlight:totalPrice>=20}">
          <div class="play" v-if="totalPrice==0">￥{{seller.minPrice}}元起送</div>
          <div class="play" v-if="totalPrice>0 && totalPrice<20">还差{{seller.minPrice-totalPrice}}元配送</div>
          <div class="play" v-if="totalPrice>=20">去结算</div>
        </div>
      </div>

      <!--购物车详情弹层-->
      <div class="cart-detail"  v-show="cartShow">
        <!--蒙版-->
        <div class="cartMask"></div>
        <!--内容-->
        <div class="cart-detail-wrapper">
          <div class="headMsg">
            <p>购物车</p>
            <p class="empty" @click="empty">清空</p>
          </div>
          <div class="foodsMsg" ref="foodsMsgWrapper">
            <ul>
              <li class="foodMsg" v-for="food in selectFoods">
                <div class="text">{{food.name}}</div>
                <!--加减组件-->
                <div class="cart-detailCartopp">
                  <cartopp :food="food"></cartopp>
                </div>
                <div class="price">￥{{food.price*food.count}}元</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  //导入axios
  import axios from 'axios'

  //导入加减组件
  import Cartopp from '../cartopp/Cartopp.vue'

  //导入插件better-scroll ,可以让页面滑动的
  import BetterScroll from "better-scroll"

  export default{
    props:['selectFoods'],
    data(){
      return {
          /*
            seller:axios得到的数据;
            cartDetailShow:详情弹层,默认不显示
            foodsMsgScroll:是滑动定义的变量
          */
          seller:null,
          cartDetailShow:false,
          foodsMsgScroll:null
      }
    },
    components:{
      Cartopp
    },
    computed:{
        //计算数量
        totalCount(){
            let count =0;
            this.selectFoods.forEach(food=>{
              count += food.count;
            });
            return count;
        },
        //计算价格
        totalPrice(){
           let total=0;
            this.selectFoods.forEach(food=>{
                total+=food.count*food.price;//总价等于数量乘以价格
            });
            return total;
        },

        //购物车详情滑动,因为不是页面一加载就用，不用放在created里，放在计算属性里。
        cartShow() {
            //点击的时候才知道要不要滑动，点击的时候已经取反了cartDetailShow=true;才执行下面这写代码
            if(this.cartDetailShow) {
              if (!this.foodsMsgScroll){
                this.$nextTick(() => {
                  this.foodsMsgScroll = new BetterScroll(this.$refs.foodsMsgWrapper,{
                    click: true //属性用来设置可以进行点击事件。
                  });
                });
              }
            }
            return this.cartDetailShow;
            //(返回值是true或false)详情层显不显示，调用方法的时候是v-show='cartShow'
        }
    },
    created(){
      let that=this;
      axios.get("/api/seller")
        .then((res)=>{
          that.seller=res.data.data;
        })
        .catch((err)=>{
          console.log(err);
        })
    },
    methods:{
      //清空购物车
      empty(){
        this.selectFoods.forEach(food=>{
            food.count=0;
        });
        this.cartDetailShow=false;
      }
    }
  }
</script>

<style>
.shopCart{
  position:fixed;
  bottom:0;
  left:0;
  z-index:100;
  width:100%;
  height:0.92rem;
  background:#141d27;
}
.shopCart .content{
  display:flex;
  height:100%;
  color:rgba(255,255,255,0.4);
}
.shopCart .content .content-left{
  flex:1;
  background:rgba(0,0,0,0.2);
  position:relative;
}
.shopCart .content .content-left .logo-wrapper{
  display:inline-block;
  width:0.8rem;
  height:0.8rem;
  border-radius:50%;
  background: #141d27;
  border:0.12rem solid #141d27;
  position:absolute;
  left:0.1rem;
  top:-0.24rem;
}
.shopCart .content .content-left .logo-wrapper .logo{
  width:100%;
  height:100%;
  border-radius: 50%;
  background:#2b343c;
  text-align: center;
}
.shopCart .content .content-left .logo-wrapper .logo.highlight{
  background:rgb(0,160,220)
}
.shopCart .content .content-left .logo-wrapper .logo.highlight i{
  color:#fff;
}
.shopCart .content .content-left .logo-wrapper .logo i{
  font-size: 0.48rem;
  display: block;
  height:0.8rem;
  line-height:0.8rem;

}
.shopCart .content .content-left .logo-wrapper .num{
  position:absolute;
  top:0;
  right:0;
  width:0.48rem;
  height:0.32rem;
  line-height:0.32rem;
  text-align:center;
  background: rgb(240, 20, 20);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
  font-size: 0.1rem;
  border-radius:0.32rem;
  font-weight:700;
  color:#fff;
}
.shopCart .content .content-left .price{
  float:left;
  margin-left:1.1rem;
  font-size:0.32rem;
  font-weight:700;
  line-height:0.92rem;
  height:0.92rem;
}
.shopCart .content .content-left .price.highlight{
  color:#fff;
}
.shopCart .content .content-left .desc{
  float:left;
  font-size:0.24rem;
  font-weight:700;
  width:2rem;
  height:0.6rem;
  line-height:0.6rem;
  padding-left:0.1rem;
  margin-top:0.15rem;
  margin-left:0.1rem;
  border-left:1px solid rgba(255,255,255,0.1);
}
.shopCart .content .content-right{
  flex:0 0 2.1rem;
  width:2.1rem;
}
.shopCart .content .content-right .play{
  font-size:0.24rem;
  font-weight:700;
  line-height:0.92rem;
  text-align: center;
}
.shopCart .content .content-right.highlight{
  background:#4cd964;
  color:#fff;
}

  /*购物车详情弹层*/
.cart-detail{
  position:fixed;
  bottom:0.92rem;
  left:0;
  width:100%;
  height:100%;
  z-index:-1;
}
.cart-detail .cartMask{
  background:rgba(7,17,27,0.6);
  width:100%;
  height:100%;
}
.cart-detail .cart-detail-wrapper{
  position:absolute;
  bottom:0;
  width:100%;
  max-height:5.19rem;
  background:#fff;
  overflow:hidden;
}
.cart-detail-wrapper .headMsg {
  height:0.8rem;
  background:#f3f5f7;
  border-bottom:1px solid rgba(7,17,17,0.1);
  padding:0 0.36rem;
  position: relative;
  z-index:22;
}
.cart-detail-wrapper .headMsg p{
  float:left;
  font-size:0.28rem;
  color:rgb(7,17,27);
  line-height:0.8rem;
}
.cart-detail-wrapper .headMsg .empty{
  float:right;
  font-size:0.24rem;
  color:rgb(0,160,220);
  line-height:0.8rem;
}
.cart-detail-wrapper .foodsMsg{
  position: relative;
  z-index:10;
  max-height:4.39rem;

}
.cart-detail-wrapper .foodsMsg .foodMsg{
  height:0.96rem;
  margin: 0 0.36rem;
  border-bottom:1px solid rgba(7,17,27,0.1);
  /*background:#fff;*/
}
.cart-detail-wrapper .foodsMsg .foodMsg .text{
  float:left;
  font-size:0.28rem;
  color:rgb(7,17,27);
  line-height:0.96rem;
}
.cart-detail-wrapper .foodsMsg .foodMsg .price{
  float:right;
  margin-right:0.24rem;
  font-size:0.2rem;
  font-weight:700;
  color:rgb(240,20,20);
  line-height:0.96rem;
}
.cart-detail-wrapper .foodsMsg .foodMsg .cart-detailCartopp{
  float:right;
  margin-top:0.26rem;
}
</style>
