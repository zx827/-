<template>
    <div class="goods" >
        <!--左边的菜单-->
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
              <!-- 当menuCurrIndex和menu-item对应的index相等时，设置current的样式，这样就可以左右联动了-->
              <li class="menu-item" v-for="(good,index)  in goods" :class="{current:menuCurrIndex==index}" >
                <span class="text"  @click="selectMenu(index, $event)">
                  <span class="icon" v-if="good.type>=0"  :class="goodPic[good.type]"></span>
                  {{good.name}}
                </span>
              </li>
            </ul>
        </div>
        <!--右边的商品-->
        <div class="goods-wrapper" ref="goodsWrapper">
          <ul>
            <!--左边的每一个li的内容-->
            <li class="food-list" v-for="good in goods">
              <h2 class="title">{{good.name}}</h2>
              <ul>
                <!--li中的每一样食物-->
                <li class="food-item" v-for="(food,index) in good.foods" @click.stop="selectFood(food)">
                  <div class="icon" >
                    <img :src="food.icon" alt="">
                  </div>
                  <div class="content">
                    <h2 class="name">{{food.name}}</h2>
                    <p class="desc">{{food.description}}</p>
                    <div class="extra">
                      <span class="count">月售{{food.sellCount}}</span>
                      <span>好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                      <span class="now">￥{{food.price}}</span>
                      <span class="old">{{food.oldPrice}}</span>
                    </div>
                    <!--加减的容器-->
                    <div class="cartoop-wrapper">
                      <!--向子组件传递数据，就是上面遍历得到的每一个food-->
                      <cartopp :food="food"></cartopp>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      <!--商品详情组件-->
      <food :food="selectedFood" ref="food"></food>
    </div>
</template>

<script>

  //导入插件better-scroll ,可以让页面滑动的
  import BetterScroll from "better-scroll"

  //导入加减组件
  import Cartopp from '../cartopp/Cartopp.vue'

  //导入商品详情组件
  import Food from '../food/Food.vue'

  export default{
    /*接收Main.vue里router-view里的传值*/
    props:["goods"],
    data(){
      return {
          /*
           goodPic这个数组是保存背景图片的class的名字(特，折……)，用的时候goodPic[传入索引];
           menuScroll,goodsScroll是滑动定义的变量;
           scrollY等于y轴实时滑动的高度
           foodsHeight这个数组存放每一个food-list距离顶部的高度。
           selectedFood:当点击li中的每一个食物的时候调用selectFood方法让selectedFood等于点击的food,然后传给Food组件
          */
          goodPic:["decrease","discount","guarantee","invoice","speciall"],
          menuScroll:null,
          goodsScroll:null,
          scrollY:0,
          foodsHeight:[],
          selectedFood:{}
      }
    },
    components:{
      /*注册导入的组件*/
      Cartopp,
      Food
    },
    created(){
      this.$nextTick(()=>{
        this.menuScroll = new BetterScroll(this.$refs.menuWrapper,{
          click:true //属性用来设置可以进行点击事件。
        });
        this.goodsScroll = new BetterScroll(this.$refs.goodsWrapper,{
          click:true,
          probeType:3 //探针作用，实时检测滚动的位置
        });
        //设置监听滚动位置，是实时滚动的时候把获取到的位置给暴露出来
        this.goodsScroll.on("scroll",(pos)=>{
          /*Math.abs是返回数的绝对值(因为向上滑动是负值)，Math.round是把数四舍五入为最接近的整数*/
          this.scrollY=Math.abs(Math.round(pos.y));
        });
        //调用计算高度的函数
        this.calcHeight();
      });
    },
    /*
      思路：(实现左右联动的效果)
      1.定义一个scrollY等于实时向上滑动的高度，用滚动的监听事件;
      2.写一个函数(calcHeight())计算每一个food-list距离顶部的高度,把得到的每一个food-list距离顶部的高度放进foodsHeight[]里;
      3.写一个方法(menuCurrIndex)在计算属性(当依赖发生改变才改变)里计算左侧对应的i值,
        在这个方法里遍历foodsHeight中的高度和实时滚动scrollY相比较。返回i
      4.给左边的菜单li添加动态class :class{current:menuCurrentIndex==index},
      5.最后实现左侧点击的功能。在左侧的li下绑定一个selectMenu的点击事件，并传入索引值，
        这样就可以知道点击的是哪一个li
    */
    methods:{
      //计算右侧每一个food-list距离顶部的高度
      calcHeight(){
          //找到DOM元素food-list
          let foodsList=this.$refs.goodsWrapper.getElementsByClassName("food-list");
          //初始高度为0
          let height=0;
          //把初始高度放进数组
          this.foodsHeight.push(height);
          //通过循环foodsList(foodsList是一个数组,里面是每一个food-list(li))下的每一个food-list，将每一个food-list的高度依次放入数组中
          for(let i=0;i<foodsList.length;i++){
              let obj=foodsList[i]; //obj是每一个li
              height+=obj.clientHeight; //obj.clientHeight是获取每一个food-list的高度,每一次保存height都加上前面所有的li的高度，
              this.foodsHeight.push(height);
          }
      },
      //点击左侧某一个li,让右边内容到指定的li的位置
      selectMenu(index,event){
        //消除PC端页面自带的点击事件
        if(!event._constructed){
            return;
        }
        //运用BetterScroll接口，滚动到相应位置
        let foodsList=this.$refs.goodsWrapper.getElementsByClassName("food-list");
        //获取对应元素的列表
        let el=foodsList[index];
        //设置滚动时间
        this.goodsScroll.scrollToElement(el,300);
      },
      //保存每一个food
      selectFood(food){
          this.selectedFood=food;
          this.$refs.food.show();//调用子组件中的show方法
      }
    },
    //计算属性
    computed:{
        //用来计算左侧对应的i值，从而让左边侧栏的相对应的位置高亮显示
        menuCurrIndex(){
            for(let i=0;i<this.foodsHeight.length;i++){
                //h1和h2分别是foodsHeight中的前一个和后一个
                let h1=this.foodsHeight[i];
                let h2=this.foodsHeight[i+1];
                //如果实时scrollY的大小大于h1并且小于h2,返回i值，
                if(this.scrollY > h1 && this.scrollY < h2){
                  return i;
                }
            }
            return 0;//初始默认是第一个
        },
    }
  }
</script>

<style>
  .goods{
    position:absolute;
    width:100%;
    /*hearder的部分加上商品的那一部分高度是348px*/
    top:3.48rem;
    bottom:0.92rem;
    display:flex;
    overflow:hidden;
    z-index:1;
  }
  .goods .menu-wrapper{
    /*
      flex:flex-grow  flex-shrink  flex-basis
      flex-grow:一个数字，规定项目将相对于其他灵活的项目进行扩展的量
      flex-shrink：一个数字，规定项目将相对于其他灵活的项目进行收缩的量
      flex-basis:项目的长度
    */
    flex:0 0 1.6rem;

    background:#f3f5f7;
  }
  .menu-wrapper .menu-item{
    /*此元素会作为块级表格来显示（类似 <table>），表格前后带有换行符*/
    display: table;
    height:1.08rem;
    width:1.12rem;
    line-height: 0.28rem;
    text-align: center;
    padding:0 0.24rem;
  }
  .menu-wrapper .menu-item.current{
    background:#fff;
    z-index:10;
  }
  .menu-wrapper .menu-item.current .text{
    border-bottom:none;
    font-weight:600;
  }
  .menu-wrapper .menu-item .icon{
    display:inline-block;
    width:0.32rem;
    height:0.32rem;
    margin-left:0.12rem;
    background-size:0.32rem;
    vertical-align:top;
  }
  .menu-wrapper .menu-item .icon.decrease{
    background-image:url("images/decrease_3@2x.png");
  }
  .menu-wrapper .menu-item .icon.discount{
    background-image:url("images/discount_3@2x.png");
  }
  .menu-wrapper .menu-item .icon.guarantee{
    background-image:url("images/guarantee_3@2x.png");
  }
  .menu-wrapper .menu-item .icon.invoice{
    background-image:url("images/invoice_3@2x.png");
  }
  .menu-wrapper .menu-item .icon.speciall{
    background-image:url("images/special_3@2x.png");
  }
  .menu-wrapper .menu-item .text{
    display:table-cell;
    width:1.12rem;
    vertical-align:middle;
    font-size:0.24rem;
    position:relative;
  }
  .menu-wrapper .menu-item .text:after{
    display:block;
    position:absolute;
    left:0;
    bottom:0;
    width:100%;
    border-top:1px solid rgba(7,17,27,.1);
    content:'';
  }
  .goods .goods-wrapper{
    flex:1;
  }
  .goods-wrapper .title{
    padding-left:0.28rem;
    color:rgb(147,153,159);
    font-size:0.24rem;
    height:0.52rem;
    line-height:0.52rem;
    background:#f3f5f7;
    border-left:2px solid #d9dde1;
  }
  .goods-wrapper .food-item{
     display:flex;
     /*没有用padding 是因为下面的底边线，用padding下面的地边线的长度就是撑满的*/
     margin:0.36rem;
     padding-bottom: 0.36rem;
     border-bottom:1px solid rgba(7,17,27,0.1);
  }
  .goods-wrapper .food-item:last-child{
    border-bottom:none;
  }
  .goods-wrapper .food-item .icon{
    flex:0 0 1.14rem;
    margin-right:0.2rem;
  }
  .goods-wrapper .food-item .icon img{
    width:1.14rem;
    height:1.14rem;
  }
  .goods-wrapper .food-item .content{
    flex:1;
    position:relative;
  }
  .goods-wrapper .food-item .content .name{
    margin:0.04rem 0 0.16rem 0;
    color:rgb(7,17,17);
    font-size:0.28rem;
    line-height:0.28rem;
    height:0.28rem;
  }
  .goods-wrapper .food-item .content .desc, .extra{
    font-size:0.2rem;
    line-height:0.2rem;
    color:rgb(147,153,159);
  }
  .goods-wrapper .food-item .content .desc{
    margin-bottom:0.16rem;
    line-height:0.24rem;
  }
  .goods-wrapper .food-item .content .extra .count{
    margin-right:0.24rem;
  }
  .goods-wrapper .food-item .content .price{
    font-weight:700;
    line-height:0.24rem;
  }
  .goods-wrapper .food-item .content .price .now{
    margin-left:0.16rem;
    font-size:0.28rem;
    color:rgb(240,20,20);
  }
  .goods-wrapper .food-item .content .price .old{
    text-decoration:line-through;
    color:rgb(147,153,159);
    font-size:0.2rem;
  }
  .goods-wrapper .food-item .content .cartoop-wrapper{
    position:absolute;
    bottom:-0.2rem;
    right:0;
  }

</style>
