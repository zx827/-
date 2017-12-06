<template>
  <transition name="move">
    <div class="good" ref="goodWrapper" v-if="food!=null" v-show="flag" >
      <div class="good-Wrapper" >
        <div class="good-head">
          <div class="goodPic" >
            <img :src="food.image" alt="">
            <div class="return" @click="hide()"><i class="icon-arrow_lift"></i></div>
          </div>
          <div class="goodName">
            <p>{{food.name}}</p>
            <p>月售{{food.sellCount}}份  好评率100%</p>
            <p>￥{{food.price}}<del v-show="food.oldPrice">￥{{food.oldPrice}}</del></p>
          </div>
          <div class="cartcontrol-wrapper" v-show="food.count">
            <Cartopp :food="food"></Cartopp>
          </div>
          <div class="joinCart" @click.stop="addCart()" v-show="!food.count || food.count===0">加入购物车</div>
        </div>
        <div class="good-content">
          <!--商品介绍-->
          <div class="good-introduce">
            <h2>商品介绍</h2>
            <p>{{food.info}}</p>
          </div>
          <!--商品评价-->
          <div class="good-evaluate">
            <div class="evaluate">商品评价</div>
            <div class="see-change">
              <p @click="getNum(2)">全部 </p>
              <p @click="getNum(0)">满意 </p>
              <p @click="getNum(1)">不满意 </p>
            </div>
            <div class="see" :class="{current:isSee}" @click="isSee=!isSee">
              <i class="icon-check_circle"></i>
              <span>只看有内容的评价</span>
            </div>
            <div class="users">
              <ul>
                <li class="user" v-for="rate in food.ratings" v-show="isShow(rate.rateType,rate.text)">
                  <div class="username">
                    <span class="time">{{rate.rateTime |  myDate}}</span>
                    <span class="photo"><img :src="rate.avatar"></span>
                    <span class="name">{{rate.username}}</span>
                  </div>
                  <div class="userRating">
                    <p><i :class="icoMap[rate.rateType]"></i></p>
                    <p>{{rate.text}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Vue from 'vue';
  import BetterScroll from 'better-scroll'
  //导入加减组件
  import Cartopp from '../cartopp/Cartopp.vue'
  export default{
     props:{
       food:{type:Object}
     },
      components:{
        Cartopp
      },
     data(){
         return {
           goodScroll:null,
           icoMap:['icon-thumb_up','icon-thumb_down'],
           flag:false,
           isSee:false,
           ratetype:''
         }
     },
    methods:{
      //组件显示和滚动
      show(){
          this.flag=true;
          this.$nextTick(()=>{
            if(!this.goodScroll){
              this.goodScroll = new BetterScroll(this.$refs.goodWrapper,{
                click:true //属性用来设置可以进行点击事件.
              });
            }else{
                this.goodScroll.refresh();
            }
        });
      },
      //隐藏
      hide(){
         this.flag=false;
      },
      //获取点击时的数字
      getNum(num){
          //点击时传进来的数字是几(2全部，0满意，1不满意)，ratetype就是几
          this.ratetype=num;
          console.log( this.ratetype);
      },
      //为了显示评价的li
      isShow(rateType,text){
          if(this.isSee && text==''){
            return false;
          }
          if(this.ratetype==2){
            return true;
          }else if(this.ratetype==rateType){
            return true;
          }
          return false;
      },
      //添加进购物车
      addCart(){
         Vue.set(this.food,'count',1);
      },
    },
    //过滤器
    filters:{
       myDate(time){
           return new Date(time).toLocaleString();
       }
    }
  }
</script>
<style>
  .good{
    position:fixed;
    left:0;
    top:0;
    width:100%;
    bottom:0.92rem;
    background:#f3f5f7;
    overflow:hidden;
  }
  /*--------------------------动画-----------------------------*/
  .good.move-enter-active,.move-leave-active{
    transition:all 0.5s linear;
    transform:translate3d(0,0,0);
  }
  .good.move-enter,.move-leave-to{
    transform:translate3d(100%,0,0);
  }
  /*-------------------------------------------------------------*/
  .good .good-head{
    width:100%;
    background: #fff;
    border-bottom:1px solid rgba(7,17,27,0.1);
    position:relative;
  }
  /*--------------新写法-----------------*/
  .good-head .goodPic{
    position:relative;
    padding-top:100%;
    width:100%;
    height:0;
  }
  .good-head .goodPic img{
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
  }
  /*-------------------------------*/
  .good-head .goodPic .return{
    position:absolute;
    top:0.3rem;
    left:0.26rem;
    font-size:0.5rem;
  }

  .good-head .goodName{
    padding:0.26rem;
  }
  .good-head .goodName p{
    font-size:0.28rem;
    font-weight:700;
    color:rgb(7,17,27);
    line-height:0.28rem;
  }
  .good-head .goodName p:nth-child(2){
    font-size:0.2rem;
    color:rgb(147,153,159);
    line-height:0.2rem;
    margin-top:0.16rem;
    margin-bottom:0.26rem;
  }
  .good-head .goodName p:last-child{
    font-size:0.24rem;
    font-weight:700;
    color:rgb(240,20,20);
    line-height:0.48rem;
  }
  .good-head .goodName p:last-child del{
    font-size:0.2rem;
    font-weight:700;
    color:rgb(147,153,159);
  }
  .good-head .cartcontrol-wrapper{
    position:absolute;
    right:0.36rem;
    bottom:0.36rem;
  }
  .good-head .joinCart{
    position:absolute;
    bottom:0.36rem;
    right:0.36rem;
    width:1.48rem;
    height:0.48rem;
    line-height:0.48rem;
    text-align:center;
    color:#fff;
    font-size:0.2rem;
    border-radius:20px;
    background:rgb(0,160,220);
  }
  .good .good-content{
    width:100%;
    margin-top:0.32rem;
  }
  .good-content .good-introduce{
    background:#fff;
    border-top:1px solid rgba(7,17,27,0.1);
    border-bottom:1px solid rgba(7,17,27,0.1);
    padding:0.36rem;
  }
  .good-content .good-introduce h2{
    font-size:0.28rem;
    color:rgb(7,17,27);
    line-height:0.28rem;
    margin-bottom:0.24rem;
  }
  .good-content .good-introduce p{
    font-size:0.24rem;
    color:rgb(77,85,93);
    line-height:0.48rem;
    padding:0 0.16rem;
  }
  /*商品评价*/
  .good-content .good-evaluate{
    width:100%;
    border-bottom:1px solid rgba(7,17,27,0.1);
    border-top:1px solid rgba(7,17,27,0.1);
    margin-top:0.4rem;
    background:#fff;
  }
  .good-content .good-evaluate .evaluate{
    font-size:0.28rem;
    color:rgb(7,17,27);
    line-height:0.28rem;
    padding:0.36rem;
  }
  .good-evaluate .see-change{
    height:0.7rem;
    margin:0 0.48rem 0.36rem 0.48rem;
    padding-bottom:0.36rem;
    border-bottom:1px solid rgba(7,17,27,0.1);
  }
  .good-evaluate .see-change p{
    float:left;
    margin-right:0.15rem;
    padding:0.2rem;
    font-size:0.24rem;
  }
  .good-evaluate .see-change p:first-child{
    background:#00a0dc;
    color:#fff;
  }
  .good-evaluate .see-change p:nth-child(2){
    background:#ccecf8;
  }
  .good-evaluate .see-change p:last-child{
    background:#E9ebec;
  }
  .good-evaluate .see{
    margin:0.3rem 0.48rem;
    font-size:0.4rem;
    color:#b7bbbf;
  }
  .good-evaluate .see.current{
    color:rgb(7,17,27);
  }
  .good-evaluate .users{
    border-top:1px solid rgba(7,17,27,0.1) ;
    width:100%;
  }
  .good-evaluate .users .user{
    border-bottom:1px solid rgba(7,17,27,0.1) ;
    padding:0.32rem;
  }
  .good-evaluate .users .user .username{
    height:0.24rem;
  }
  .good-evaluate .users .user .username span{
    display:block;
    font-size:0.2rem;
    color:rgb(147,153,159);
    line-height:0.24rem;
  }
  .good-evaluate .users .user .username .time{
    float:left;
  }
  .good-evaluate .users .user .username .name{
    float:right;
    margin-right:0.12rem;
  }
  .good-evaluate .users .user .username .photo{
    float:right;
    width:0.24rem;
    height:0.24rem;
    border-radius:50%;

  }
  .good-evaluate .users .user .username .photo img{
    width:0.24rem;
    height:0.24rem;
    border-radius:50%;
    border:1px solid gray;
  }
  .good-evaluate .users .user .userRating{
    height:0.32rem;
    margin-top:0.12rem;
  }
  .good-evaluate .users .user .userRating p{
    float:left;
    margin-left:0.08rem;
    font-size:0.24rem;
    line-height:0.32rem;
  }
  .good-evaluate .users .user .userRating p i{
    color:rgb(183,187,191);
  }
  .good-evaluate .users .user .userRating p i.current{
    color:#00a0dc;
  }
</style>
