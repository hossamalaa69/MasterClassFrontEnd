<template>
    <div class="syllabus-container">
        <div class="week-div">
            <p>{{week.activity_name}}</p>
        </div>
        <div class="brief-div">
            <p id="week-topic-p">{{week.activity_description}}</p>
            
            <div class="horizontal-content-div">
                <div class="circle-div1">
                    <v-icon class="icon-white">mdi-clock</v-icon>
                </div>                
                <p>{{week.links.length}} Videos</p>
            </div>    

            <div class="horizontal-content-div">
                <div class="circle-div2"> 
                    <v-icon class="icon-white">mdi-book-open-variant</v-icon>
                </div>
                <p>{{week.pdfs.length}} Readings</p>
            </div>
        </div>        
    </div>    
</template>

<script>

export default {
  name: 'SyllabusItem',
  components: {
  },
  data () {
        return{
        }
  },
   props: {
       week: Object
    },
    mounted (){
        console.log("current syllabus");
        console.log(this.week);
    }
};
</script>

<style scoped lang="scss">

.syllabus-container{
    margin-top: 15px;
    //background-color: #EEE;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 100%;
    border-bottom: 1px solid #EEE;
    display: grid;
    grid-template-columns: 20% 80%;
    .week-div{
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        p{
            letter-spacing: 4px;
            color: #000;
            font-size: 1.2rem;
            line-height: 1.5rem;
            font-weight: normal;
            font-family: OpenSans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        span{
            color: #000;
            font-size: 2.5rem;
            font-weight: 300;
        }
    }
    .brief-div{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        #week-topic-p{
            color: #000;
            font-size: 20px;
            line-height: 24px;
            font-weight: 300;
        }
        .horizontal-content-div{
            text-align: center;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            .circle-div1{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-image: linear-gradient(90deg, rgb(252, 110, 81), rgb(246, 187, 66));
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                .icon-white{
                    color: #EEE;
                }
            }
            .circle-div2{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-image: linear-gradient(90deg, rgb(72, 207, 173), rgb(59, 175, 218));    
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                .icon-white{
                    color: #EEE;
                }
            }
            p{
                color: #666;
                margin-left: 15px;
                font-weight: 500;
            }
        }
    }
}
</style>