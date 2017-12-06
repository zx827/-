<template>
    <div class="ratings" v-if="ratings!=null">
      <div class="ratings-wrapper" ref="ratingsWrapper">
        <div class="wrapper">
          <!--总的星级-->
          <div class="rating-header">
          <div class="header-left">
            <h2>{{totalSroce}}</h2>
            <p>综合评分</p>
            <p>高于周边商家69.2%</p>
          </div>
          <div class="header-right">
            <ul>
              <li>
                <div class="text">综合评分</div>
                <div class="stars">
                  <star :score="totalSroce" :width="starSize"></star>
                </div>
                <div class="starScore">{{totalSroce}}</div>
              </li>
              <li>
                <div class="text">服务态度</div>
                <div class="stars">
                  <star :score="totalSroce" :width="starSize"></star>
                </div>
                <div class="starScore">{{totalSroce}}</div>
              </li>
              <li>
                <div class="text">送达时间</div>
                <div class="giveTime">{{deliverTime}}分钟</div>
              </li>
            </ul>
          </div>
        </div>
          <!--满意不满意-->
          <div class="rating-content">
              <div class="see-change">
                <p @click="getNum(2)">全部 {{ratings.length}}</p>
                <p @click="getNum(0)">满意 {{satisfy}}</p>
                <p @click="getNum(1)">不满意 {{ratings.length-satisfy}}</p>
              </div>
              <div class="see"  :class="{current:flag}" @click="getFlag()">
                <i class="icon-check_circle"  ></i>
                <span>只看有内容的评价</span>
              </div>
          </div>
          <!--用户评价-->
          <div class="users">
            <ul>
              <li class="user-Item" v-for="(rating , index) in ratings" v-show="isShow(rating.rateType,rating.text )">
                <div class="head-photo">
                  <img alt="" :src="rating.avatar">
                </div>
                <div class="content">
                  <div class="user-name">
                    <p>{{rating.username}}</p>
                    <p>{{rating.rateTime  | myDate}}</p>
                  </div>
                  <div class="user-star">
                    <!--星星组件-->
                    <p><star :score="rating.score" :width="starSize1"></star></p>
                    <p v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</p>
                  </div>
                  <div class="user-rating">{{rating.text}}</div>
                  <div class="user-foods">
                    <div class="icon"  :class="{current:rating.active}" @click="giveThumbUp(rating)">
                      <i :class="icoMap[rating.rateType]"></i>
                    </div>
                    <ul>
                      <li v-for="recom in rating.recommend">
                        {{recom}}
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!--购物车组件-->
      <!--<shopcart ></shopcart>-->

    </div>
</template>

<script>
  //导入axios
  import axios from 'axios'

  import Vue from 'vue'

  //导入星星组件
  import Star from '../star/Star.vue'

  //导入购物车组件
  import Shopcart from '../shopcart/Shopcart.vue'

  //导入插件better-scroll ,可以让页面滑动的
  import BetterScroll from "better-scroll"
  export default{
     data(){
         return {
           starSize:24,
           starSize1:24,
           icoMap:['icon-thumb_up','icon-thumb_down'],
           ratings:null,
           ratingScroll:null,
           active:false,
           isSee:false,
           Content:[],
           ratetype:'',
           flag:false

         }
     },
     components:{
        Star,
       Shopcart
     },
     created(){
         let that=this;
         axios.get("/api/ratings")
           .then((res)=>{
             that.ratings=res.data.data;
             /*that.$nextTick是一个异步函数，为了确保DOM已经被渲染*/
             that.$nextTick(()=>{
               that.ratingScroll = new BetterScroll(that.$refs.ratingsWrapper,{
                 click:true //属性用来设置可以进行点击事件。
               });
             });
           })
           .catch((err)=>{
             console.log(err);
           });
     },
     computed:{
        //综合评分
        totalSroce(){
          let sroce=0;
          let totalSroce=0;
          this.ratings.forEach(user=>{
            sroce+=user.score;
          });
          //toFixed(1)保留小数点后一位
          totalSroce=(sroce/this.ratings.length).toFixed(1);
          return totalSroce ;
        },

        //送达时间
        deliverTime(){
            let Time=0;
            let count=0;
            this.ratings.forEach(t=>{
                if(typeof t.deliveryTime=="number"){
                  Time +=t.deliveryTime;

                  count++;
                }
            });
            return  parseInt(Time/count);
        },

        //满意的数量
        satisfy(){
            let satisfyCount=0;
            this.ratings.forEach(rating=>{
                if(rating.score>=4){
                  satisfyCount++;
                }
            });
            return satisfyCount;
        },


     },
     methods:{
       //点赞
       giveThumbUp(rating){
         this.ratings.forEach((rating)=>{
             if(!rating.active){
               Vue.set(rating,'active',false);
             }
         });
         Vue.set(rating,'active',true);
       },
       isShow(rateType,text){
         if(this.flag && text==''){
           return false;
         }
         if(this.ratetype==2){
           return true
         }else if(this.ratetype==rateType){
           return  true;
         }
         return false;
       },
       getFlag(){
           this.flag=!this.flag;
       },
       getNum(num){
         this.ratetype=num;
         console.log(this.ratetype);
       }
     },
     //过滤器(把秒数转成时间)
     filters:{
         myDate(time){
            // return new Date(time).toLocaleString();
           let date=new Date(time);
           return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()
                    +":"+date.getMinutes()+":"+date.getSeconds();
         }
     }
  }
</script>

<style>
  .ratings{
    position:absolute;
    width:100%;
    top:3.48rem;
    bottom:0.92rem;
    overflow:hidden;
    background:#f3f5f7;
  }
  .ratings .ratings-wrapper{
    width:100%;
    height:100%;
  }
  .ratings .ratings-wrapper .rating-header{
    width:100%;
    border-bottom:1px solid rgba(7,17,27,0.1);
    border-top:1px solid rgba(7,17,27,0.1);
    background:#fff;
    display:flex;
  }
  .rating-header .header-left{
    flex:0 0 2.75rem;
    width:2.75rem;
    margin:0.25rem 0;
    border-right:1px solid rgba(7,17,27,0.1);
  }
  .rating-header .header-left h2{
    font-size:0.48rem;
    color:rgb(255,153,0);
    text-align:center;
  }
  .rating-header .header-left p{
    font-size:0.24rem;
    color:rgb(7,17,27);
    text-align: center;
    margin:0.2rem 0;
  }
  .rating-header .header-left p:last-child{
    font-size:0.2rem;
    color:rgb(147,153,159);
    text-align: center;
  }
  .rating-header .header-right{
    flex:1;
    padding:0.36rem 0.3rem;
  }
  .rating-header .header-right li{
    height:0.36rem;
    line-height:0.36rem;
    display: flex;
    margin-top:0.16rem;
  }
  .rating-header .header-right li:first-child{
    margin-top:0.06rem;
  }
  .rating-header .header-right li .text{
    flex:0 0 1rem;
    font-size:0.24rem;
    color:rgb(7,17,27);
  }
  .rating-header .header-right li .stars{
    flex:1;
  }
  .rating-header .header-right li .starScore{
    flex:0 0 0.4rem;
    font-size:0.24rem;
    color:rgb(255,153,0);
  }
  .rating-header .header-right li .giveTime{
    flex:1;
    font-size:0.24rem;
    text-align: center;
    color:rgb(147,153,159);
  }
  /*满意不满意*/
  .ratings .ratings-wrapper .rating-content{
    width:100%;
    border-bottom:1px solid rgba(7,17,27,0.1);
    border-top:1px solid rgba(7,17,27,0.1);
    margin-top:0.4rem;
    background:#fff;
  }
  .rating-content .see-change{
    height:0.7rem;
    margin:0.36rem 0.48rem;
    padding-bottom:0.36rem;
    border-bottom:1px solid rgba(7,17,27,0.1);
  }
  .rating-content .see-change p{
    float:left;
    margin-right:0.15rem;
    padding:0.2rem;
    font-size:0.24rem;
  }
  .rating-content .see-change p:first-child{
    background:#00a0dc;
    color:#fff;
  }
  .rating-content .see-change p:nth-child(2){
    background:#ccecf8;
  }
  .rating-content .see-change p:last-child{
    background:#E9ebec;
  }
  .rating-content .see{
    margin:0.3rem 0.48rem;
    font-size:0.4rem;
    color:#b7bbbf;
  }
  .rating-content .see.current{
    color:rgb(7,17,27);
  }
  /*用户评价*/
  .ratings .ratings-wrapper .users{
    width:100%;
    background:#fff;
  }
  .users .user-Item{
    margin:0 0.36rem;
    padding-bottom:0.36rem;
    padding-top:0.36rem;
    border-bottom:1px solid rgba(7,17,27,0.1);
    display:flex;
  }
  .users .user-Item .head-photo{
    flex:0 0 0.56rem;
    width:0.56rem;
  }
  .users .user-Item .head-photo img{
    width:0.56rem;
    height:0.56rem;
    border-radius:50%;
  }
  .users .user-Item .content{
    flex:1;
    margin-left:0.24rem;
  }
  .users .user-Item .content .user-name{
    font-size:0.2rem;
    color:rgb(7,17,27);
    height:0.24rem;
    line-height: 0.24rem;
  }
  .users .user-Item .content .user-name p:first-child{
    float:left;
  }
  .users .user-Item .content .user-name p:last-child{
    float:right;
    color:rgb(147,153,159);
  }
  .users .user-Item .content .user-star{
    font-size:0.2rem;
    color:rgb(147,153,159);
    height:0.3rem;
    line-height:0.3rem;
    margin-top:0.08rem;
    margin-bottom:0.12rem;
  }
  .users .user-Item .content .user-star p{
    float:left;
    margin-right:0.12rem;
  }
  .users .user-Item .content .user-rating{
    font-size:0.24rem;
    color:rgb(7,17,27);
    line-height:0.36rem;
    margin-bottom:0.16rem;
  }
  .users .user-Item .content .user-foods{
    height:0.32rem;
    line-height:0.32rem;
    display: flex;
  }
  .users .user-Item .content .user-foods .icon{
    font-size:0.24rem;
    color:rgb(183,187,191);
    flex:0 0 0.24rem;
  }
  .users .user-Item .content .user-foods .icon.current{
    color:#00a0dc;
  }
  .users .user-Item .content .user-foods ul{
    flex:1;
    height:0.35rem;
    overflow:hidden;
  }
  .users .user-Item .content .user-foods ul li{
    border:1px solid rgba(7,17,27,0.1);
    float:left;
    margin-left:0.16rem;
    padding:0 0.12rem;
    font-size:0.18rem;
    color:rgb(147,153,159);
    height:0.32rem;
    line-height:0.32rem;

  }



</style>
