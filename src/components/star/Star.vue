<template>
    <div class="star" :class="sizeType">
      <span class="starItem" v-for="item in itemClass" :class="item"></span>
    </div>
</template>

<script>
  const LENGTH=5;
  export default{
    /*接受来自父组件的数据*/
    props:['score','width'],
    data() {
        return {
            sizeType: ''
        }
    },
    created(){
       this.sizeType = "star-" + this.width;
    },
    //计算属性
    computed:{
      itemClass(){
          /*定义个空数组，保存class的名字，然后在上面遍历这个数组*/
          let result = [];

          let intege = parseInt(this.score); //对得到的数据取整数

          let decimal =this.score-intege; //让得到的数据减去整数，得到这个小数

          /*for循环，push进去亮的的星星背景的class名字，循环次数是上面的取得整数*/
          for(let i=0;i<intege;i++){
            result.push("on");
          }

          /*让得到的数据减去整数，得到的这个小数 如果大于0.5 就push进去一个半亮的星星*/
          if(decimal>=0.5){
              resule.push("half");
          }

          /*
            走完上面的看result这个数组push就去了几个class名字，
            就是看result这个数组的长度是不是小于一开始定义的const LENGTH=5;
            如果小于LENGTH就继续push，push的是不亮的星星
          */
          while(result.length<LENGTH){
              result.push("off");
          }
          return result;
      }
    }
  }
</script>

<style>
  .star{
    font-size:0;
  }
  .star .starItem{
    display:inline-block;
    margin-top:0.05rem;
    background-repeat:no-repeat;
  }
  /*starItem48*/
  .star-48 .starItem{
    width:0.48rem;
    height:0.48rem;
    margin-right:0.44rem;
    background-size:0.48rem 0.48rem;
  }
  .star-48 .on{
    background-image:url("images/star48_on@2x.png");
  }
  .star-48 .half{
    background-image:url("images/star48_half@2x.png");
  }
  .star-48 .off{
    background-image:url("images/star48_off@2x.png");
  }
  .star-48 .starItem:last-child{
    margin-right:0;
  }

  /*starItem36*/
  .star-36 .starItem{
    width:0.3rem;
    height:0.3rem;
    margin-right:0.17rem;
    background-size:0.3rem 0.3rem;
  }
  .star-36 .on{
    background-image:url("images/star36_on@2x.png");
  }
  .star-36 .half{
    background-image:url("images/star36_half@2x.png");
  }
  .star-36 .off{
    background-image:url("images/star36_off@2x.png");
  }
  .star-36 .starItem:last-child{
    margin-right:0;
  }

  /*starItem24*/
  .star-24 .starItem{
    width:0.2rem;
    height:0.2rem;
    margin-right:0.15rem;
    background-size:0.2rem 0.2rem;
  }
  .star-24 .on{
    background-image:url("images/star24_on@2x.png");
  }
  .star-24 .half{
    background-image:url("images/star24_half@2x.png");
  }
  .star-24 .off{
    background-image:url("images/star24_off@2x.png");
  }
  .star-24 .starItem:last-child{
    margin-right:0;
  }
</style>
