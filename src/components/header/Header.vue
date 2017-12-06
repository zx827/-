<template>
    <div class="header" v-if="seller">
        <!-- 头部-->
        <div class="bg">
            <!--背景-->
            <img :src="seller.avatar" class="bgf">
            <!--头部背景的蒙版层-->
            <div class="mask">
                <!--content  内容-->
                <div class="content">
                    <div class="logo"><img :src="seller.avatar"></div>
                    <div class="name">
                        <ul>
                          <li>
                              <img src="./images/brand@2x.png">
                              <p>{{seller.name}}</p>
                          </li>
                          <li>
                              <p>{{seller.description}} / {{seller.deliveryTime}}分钟送达</p>
                          </li>
                          <!--显示的优惠信息-->
                          <li class="support" >
                              <span class="icon" :class="picMap[seller.supports[0].type]"></span>
                              <p class="text">{{seller.supports[0].description}}</p>
                          </li>
                        </ul>
                    </div>
                    <div class="msg" @click="detailShow=true">
                        <p>{{seller.supports.length}}个<i class="icon-keyboard_arrow_right"></i></p>
                    </div>
                </div>
                <!--content  内容 end-->

                <!--公告  notice-->
                <div class="notice" @click="detailShow=true">
                    <img src="./images/bulletin@2x.png">
                    <p>{{seller.bulletin}}</p>
                    <i class="icon-keyboard_arrow_right" ></i>
                </div>
                <!--公告  notice  end-->
            </div>
            <!--头部背景的蒙版层  end-->
        </div>

        <!--详情弹层-->
      <transition name="fade">
        <div class="detail" v-show="detailShow">
          <div class="detail-wrapper clearfix">
            <div class="detail-main">
              <!--商家名称-->
              <div class="bName">{{seller.name}}</div>

              <!--星级-->
              <div class="detail-star">
                <!--向子组件星星传递数据 通过动态的属性-->
                <star :score="seller.score" :width="starSize"></star>
              </div>

              <!--优惠信息-->
              <div class="speciall">
                <h2>优惠信息</h2>
                <ul>
                  <li v-for="support in seller.supports">
                    <span class="icon" :class="picMap[support.type]"></span>
                    <span class="text">{{support.description}}</span>
                  </li>
                </ul>
              </div>

              <!--商家公告-->
              <div class="business">
                <h2>商家公告</h2>
                <p>{{seller.bulletin}}</p>
                <p>{{seller.bulletin}}</p>
                <p>{{seller.bulletin}}</p>
              </div>
            </div>
          </div>
          <!--关闭按钮-->
          <div class="detail-close" @click="detailShow=false">
              <i class="icon-close"></i>
            </div>
          </div>
      </transition>
    </div>

</template>

<script>
  //导入星星组件
  import Star from '../star/Star.vue'
  export default{
      props:['seller'],
      data(){
          return {
            picMap:[],
            starSize:48,
            detailShow:false
          }
      },
      created(){
          this.picMap=["derease","discount","guarantee","invoice","special"];
      },
      components:{
          Star
      }


  }
</script>

<style>
  .header{
    height:2.68rem;
  }
  .bg{
    width:100%;
    height:2.68rem;
    overflow:hidden;
    position:relative;
  }
  .bg .bgf{
    width:120%;
    height:5rem;
    -webkit-filter: blur(0.1rem);
    filter: blur(0.1rem);
  }
  .mask{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(7,17,27,0.5);
  }
  .mask .content{
    width:100%;
    height:2.12rem;
    overflow: hidden;
  }
  .mask .content .logo{
    width:1.28rem;
    height:1.28rem;
    border-radius:0.04rem;
    overflow: hidden;
    margin-top:0.48rem;
    margin-left:0.48rem;
    float:left;
  }
  .mask .content .logo img{
    width:1.28rem;
    height:1.28rem;
  }
  .mask .content .name{
      width:3.8rem;
      float:left;
      margin-left:0.32rem;
      margin-top:0.52rem;
  }
  .mask .content .name li:first-child p{
    font-size: 0.32rem;
    color:rgb(255,255,255);
    font-weight:bold;
    margin-left:0.72rem;
    height:0.36rem;
    line-height: 0.36rem;
  }
  .mask .content .name li:first-child img{
    display: block;
    float:left;
    width:0.60rem;
    height:0.36rem;
  }

  .mask .content .name li:nth-child(2){
    margin-top:0.16rem;
    margin-bottom: 0.2rem;
  }
  .mask .content .name li:nth-child(2) p{
    font-size: 0.24rem;
    color:rgb(255,255,255);
    font-weight:200;
  }
  .mask .content .support .icon{
    display:inline-block;
    width:0.24rem;
    height:0.24rem;
    background-size:0.24rem 0.24rem;
    vertical-align:top;
    float:left;
  }
  .mask .content .support .icon.derease{
    background-image:url("./images/decrease_1@2x.png");
  }
  .mask .content .support .icon.discount{
    background-image:url("./images/discount_1@2x.png");
  }
  .mask .content .support .icon.guarantee{
    background-image:url("./images/guarantee_1@2x.png");
  }
  .mask .content .support .icon.invoice{
    background-image:url("./images/invoice_1@2x.png");
  }
  .mask .content .support .icon.special{
    background-image:url("./images/special_1@2x.png");
  }
  .mask .content .support .text{
    font-size: 0.2rem;
    color:#fff;
    float:left;
    margin-left:0.08rem;
  }
  .notice{
    width:100%;
    height:0.56rem;
    background: rgba(0,0,0,0.6);
   /* padding-right:0.24rem;
    padding-left:0.24rem;*/
    overflow: hidden;
    position:relative;
  }
  .notice img{
    display: block;
    width:0.44rem;
    height:0.24rem;
    margin-left:0.24rem;
    margin-top:0.16rem;
    float: left;
  }
  .notice p{
    position:absolute;
    top:0.16rem;
    left:0.76rem;
    width:5rem;
    padding:0 0.08rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    font-size: 0.2rem;
    color:#fff;
    font-weight:200;
  }
  .notice i{
    position:absolute;
    right:0.24rem;
    top:0.18rem;
    font-size:0.3rem;
    color:#fff;
  }
  .msg{
    float:right;
    width:0.88rem;
    height:0.48rem;
    border-radius:0.35rem;
    background: rgba(0,0,0,0.2);
    text-align: center;
    line-height: 0.48rem;
    margin-right:0.26rem;
    margin-top:1rem;
  }
  .msg p{
    font-size: 0.2rem;
    color:#fff;
    font-weight:200;
  }
  /*详情弹出层*/
  .detail{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(7,17,27,0.8);
    color:#fff;
    z-index:1000;
    overflow:auto;
  }
  .detail.fade-enter-active,.fade-leave-active{
    transition:all 1s ease;
    left:0;
  }
  .detail.fade-enter,.fade-leave-to{
    left:100%;
  }
  /*css sticker footers*/
  .detail .detail-wrapper{
    min-height:100%;
    width:100%;
  }
  .detail-wrapper .detail-main{
    margin-top: 0.64rem;
    margin-bottom:0.64rem;
  }
  .detail .clearfix{
    display:inline-block;
  }
  .detail .clearfix:after{
    display:block;
    content:"";
    height:0;
    line-height:0;
    clear:both;
  }
  .detail .detail-close{
    position:relative;
    width:0.64rem;
    height:0.64rem;
    font-size:0.64rem;
    margin:-1rem auto 0 auto;
    clear:both;
  }
  /*css sticker footers    end*/
  .bName{
    font-size:0.32rem;
    font-weight:700;
    line-height: 32px;
    text-align: center;
    margin-top: 1.28rem ;
  }
  /*星级*/
  .detail-star{
    height:0.48rem;
    text-align: center;
    margin-top:0.3rem;
    margin-bottom: 0.56rem;
  }
  /*优惠信息*/
  .speciall h2{
    width:1.59rem;
    height:0.3rem;
    margin:0 auto;
    font-size:0.28rem;
    text-align: center;
    position:relative;
  }
  .speciall h2::before{
    content:'';
    width:2.24rem;
    height:0.02rem;
    background:rgba(255,255,255,0.2);
    display: block;
    position: absolute;
    top:0.13rem;
    right:1.59rem;
  }
  .speciall h2::after{
    content:'';
    width:2.24rem;
    height:0.02rem;
    background:rgba(255,255,255,0.2);
    display: block;
    position: absolute;
    top:0.13rem;
    left:1.59rem;
  }
  .speciall ul{
    margin-top: 0.48rem;
    margin-bottom: 0.56rem;
    margin-left:0.96rem;
  }
  .speciall ul li{
    height:0.32rem;
    margin-bottom: 0.24rem;
  }
  .speciall ul li .icon{
    display:inline-block;
    width:0.32rem;
    height:0.32rem;
    background-size:0.32rem;
    vertical-align:top;
    float: left;
  }
  .speciall ul li .icon.derease{
    background-image:url("./images/decrease_2@2x.png");
  }
  .speciall ul li .icon.discount{
    background-image:url("./images/discount_2@2x.png");
  }
  .speciall ul li .icon.guarantee{
    background-image:url("./images/guarantee_2@2x.png");
  }
  .speciall ul li .icon.invoice{
    background-image:url("./images/invoice_2@2x.png");
  }
  .speciall ul li .icon.special{
    background-image:url("./images/special_2@2x.png");
  }
  .speciall ul li .text{
    font-size:0.24rem;
    font-weight:200;
    float:left;
    margin-left:0.12rem;
  }
  /*商家公告*/
  .business h2{
    width:1.59rem;
    height:0.3rem;
    margin:0 auto;
    font-size:0.28rem;
    text-align: center;
    position:relative;
  }
  .business h2::before{
    content:'';
    width:2.24rem;
    height:0.02rem;
    background:rgba(255,255,255,0.2);
    display: block;
    position: absolute;
    top:0.13rem;
    right:1.59rem;
  }
  .business h2::after{
    content:'';
    width:2.24rem;
    height:0.02rem;
    background:rgba(255,255,255,0.2);
    display: block;
    position: absolute;
    top:0.13rem;
    left:1.59rem;
  }
  .business p{
    margin-top:0.48rem;
    padding:0 0.96rem ;
    font-size:0.24rem;
    font-weight:200;
    line-height:0.48rem;
  }
  .business p:last-child{
    margin-bottom: 1rem;
  }
</style>
