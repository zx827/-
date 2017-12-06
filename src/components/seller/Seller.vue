<template>
    <div class="seller" v-if="seller!=null">
      <div class="seller-Wrapper" ref="sellerWrapper">
        <div class="wrapper">
          <div class="seller-header">
            <div class="head">
              <div class="name">
                <h2>{{seller.name}}</h2>
                <div class="star">
                  <p><star :score="seller.score" :width="starSize"></star></p>
                  <p>(661)</p>
                  <p>月售{{seller.sellCount}}</p>
                </div>
              </div>
              <div class="collection">
                <i class="icon-favorite" :class="{current:iShow}" @click="iShow=!iShow"></i>
                <p v-if="!iShow">收藏</p>
                <p v-if="iShow">已收藏</p>
              </div>
            </div>
            <ul>
              <li>
                <p>起送价</p>
                <p><span>{{seller.minPrice}}</span>元</p>
              </li>
              <li>
                <p>商家配送</p>
                <p><span>{{seller.deliveryPrice}}</span>元</p>
              </li>
              <li>
                <p>平均配送时间</p>
                <p><span>{{seller.deliveryTime}}</span>分钟</p>
              </li>
            </ul>
          </div>
          <div class="seller-content">
            <div class="noticeAnd">
              <div class="noticeText">
                <p>公告与活动</p>
                <p>{{seller.bulletin}}</p>
              </div>
              <ul>
                <li class="item" v-for="support in seller.supports">
                  <span class="icon" :class="picMap[support.type]"></span>
                  <span class="text">{{support.description}}</span>
                </li>
              </ul>
            </div>
            <div class="Shop">
              <p>商家实景</p>
              <div class="shopImg" ref="shopWrapper">
                <ul>
                  <li v-for="pic in seller.pics">
                    <img :src="pic">
                  </li>
                </ul>
              </div>

            </div>
            <div class="sellermsg">
              <p>商家信息</p>
              <ul>
                <li v-for="info in seller.infos">{{info}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  //导入axios
  import axios from 'axios'

  //导入星星组件
  import Star from '../star/Star.vue'

  //导入插件better-scroll ,可以让页面滑动的
  import BetterScroll from "better-scroll"

  export default{
    data(){
        return {
            seller:null,
            sellerScroll:null,
            shopScroll:null,
            starSize:24,
            iShow:false,
            picMap:['decrease','discount','special','invoice','guarantee']
        }
    },
    components:{
      Star
    },
    created(){
        let that=this;
        axios.get("/api/seller")
          .then((res)=>{
            that.seller=res.data.data;
            /*that.$nextTick是一个异步函数，为了确保DOM已经被渲染*/
            that.$nextTick(()=>{
              that.sellerScroll = new BetterScroll(that.$refs.sellerWrapper,{
                click:true //属性用来设置可以进行点击事件。
              });
              that.shopScroll=new BetterScroll(that.$refs.shopWrapper,{
                  scrollX:true
              });
            });
          })
          .catch((err)=>{
            console.log(err);
          })
    }
  }
</script>

<style>
  .seller{
    position:absolute;
    width:100%;
    top:3.48rem;
    bottom:0.92rem;
    overflow:hidden;
    background:#f3f5f7;
  }
  .seller .seller-Wrapper{
    width:100%;
    height:100%;
  }
  .seller .seller-Wrapper .seller-header{
    border-top:1px solid rgba(7,17,27,0.1);
    border-bottom:1px solid rgba(7,17,27,0.1);
    background:#fff;
  }
  .seller-header .head{
    margin:0.36rem;
    padding-bottom:0.3rem;
    border-bottom:1px solid rgba(7,17,27,0.1);
    display:flex;
  }
  .seller-header .head .name{
    flex:1;
  }
  .seller-header .head .name h2{
    font-size:0.28rem;
    color:rgb(7,17,27);
    line-height:0.28rem;
    margin-bottom:0.16rem;
  }
  .seller-header .head .name .star{
    font-size:0.2rem;
    color:rgb(77,85,93);
    height:0.36rem;
    line-height:0.36rem;
  }
  .seller-header .head .name .star p{
    float:left;
    margin-right:0.2rem;
  }
  .seller-header .head .collection{
    flex:0 0 0.75rem;
  }
  .seller-header .head .collection i{
    display:block;
    color:#d4d6d9;
    font-size:0.48rem;
    line-height:0.48rem;
    margin-bottom:0.08rem;
    margin-left:0.15rem;
  }
  .seller-header .head .collection i.current{
    color:red;
  }
  .seller-header .head .collection p{
    font-size:0.2rem;
    color:rgb(77,85,93);
    line-height:0.2rem;
    text-align: center;
  }
  .seller-header ul{
    display:flex;
    margin:0.36rem;
  }
  .seller-header ul li{
    flex:1;
    font-size:0.2rem;
    color:rgb(147,153,159);
    text-align:center;
  }
  .seller-header ul li+li{
    border-left:1px solid rgba(7,17,27,0.1);
  }
  .seller-header ul li p:last-child{
    margin-top:0.08rem;
    color:rgb(7,17,27);
  }
  .seller-header ul li p:last-child span{
    font-size:0.4rem;
  }
  .seller .seller-Wrapper .seller-content{

  }
  .seller-content .noticeAnd{
    margin-top:0.32rem;
    background:#fff;
    border-top:1px solid rgba(7,17,27,0.1);
    border-bottom:1px solid rgba(7,17,27,0.1);

  }
  .seller-content .noticeAnd .noticeText{
    margin:0.36rem;
  }
  .seller-content .noticeAnd .noticeText p:first-child{
    font-size:0.28rem;
    line-height:0.28rem;
    color:rgb(7,17,27);
  }
  .seller-content .noticeAnd .noticeText p:last-child{
    font-size:0.24rem;
    color:rgb(240,20,20);
    line-height:0.48rem;
    padding:0.16rem 0.24rem;
  }
  .seller-content ul{
    margin:0 0.36rem;
  }
  .seller-content ul .item{
    width:100%;
    padding:0.32rem 0;
    margin-bottom: 0.32rem;
    border-top:1px solid rgba(7,17,27,0.1);
  }
  .seller-content ul .item .icon{
    display:block;
    width:0.32rem;
    height:0.32rem;
    /*background-image:url('./images/discount_4@2x.png');*/
    background-size:0.32rem;
    float:left;
    margin-left:0.24rem;
  }
  .seller-content ul .item .icon.decrease{
    background-image:url('./images/decrease_4@2x.png');
  }
  .seller-content ul .item .icon.discount{
    background-image:url('./images/discount_4@2x.png');
  }
  .seller-content ul .item .icon.special{
    background-image:url('./images/special_4@2x.png');
  }
  .seller-content ul .item .icon.invoice{
    background-image:url('./images/invoice_4@2x.png');
  }
  .seller-content ul .item .icon.guarantee{
    background-image:url('./images/guarantee_4@2x.png');
  }
  .seller-content ul .item .text{
    display:block;
    float:left;
    font-size:0.24rem;
    color:rgb(7,17,27);
    margin-left:0.12rem;
  }
  .seller-content .Shop{
    background:#fff;
    margin-top:0.32rem;
    padding:0.36rem;
    border-bottom:1px solid rgba(7,17,27,0.1);
    border-top:1px solid rgba(7,17,27,0.1);
  }
  .seller-content .Shop p{
    font-size:0.28rem;
    color:rgb(7,17,27);
    line-height:0.28rem;
    margin-bottom:0.24rem;
  }
  .seller-content .Shop .shopImg{
    height:2rem;
    width:100%;
    overflow:hidden;
  }
  .seller-content .Shop .shopImg ul{
    display:flex;
    margin:0;
    width:180%
  }
  .seller-content .Shop .shopImg ul li{
    flex:0 0 0.24rem;
    margin-right:0.12rem;
    width:2.4rem;
    height:1.8rem;
  }
  .seller-content .Shop .shopImg img{
    display:block;
    /*float:left;*/
    width:2.4rem;
    height:1.8rem;

  }
  .seller-content .sellermsg{
    background:#fff;
    margin-top:0.32rem;
    padding:0.36rem;
    border-bottom:1px solid rgba(7,17,27,0.1);
    border-top:1px solid rgba(7,17,27,0.1);
  }
  .seller-content .sellermsg p{
    font-size:0.28rem;
    color:rgb(7,17,27);
    line-height:0.28rem;
    margin-bottom:0.24rem;
  }
  .seller-content .sellermsg ul li{
    width:100%;
    padding:0.32rem 0;
    border-top:1px solid rgba(7,17,27,0.1);
    font-size:0.24rem;
    line-height:0.32rem;
  }
</style>
