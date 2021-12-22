<template>
    <div class="syllabus-container">
        <div class="week-div">
            <p>LECTURE</p>
            <span>1</span>
        </div>
        <div class="content-lecture-div">
            <p id="week-topic-p">Sentiment Analysis with Logistic Regression </p>
            <div class="horizontal-content-div">
                <div class="circle-div1">
                    <v-icon class="icon-white">mdi-clock</v-icon>
                </div>                
                <p>5 Videos</p>
            </div>    
            <div class="content-grid-div"> 
                <iframe v-for="index in 5" :key="index" 
                    src="https://www.youtube.com/embed/1ksjdlA4i9A" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>                
            </div>
            <div class="horizontal-content-div">
                <div class="circle-div2"> 
                    <v-icon class="icon-white">mdi-book-open-variant</v-icon>
                </div>
                <p>4 Reading Materials</p>
            </div>
            <div class="content-grid-div"> 
                <a href="https://arxiv.org/pdf/1704.04368.pdf" target="_blank" download v-for="index in 4" :key="index">Part {{index}}</a>    
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
  }
};
</script>

<style scoped lang="scss">

.syllabus-container{
    margin-top: 15px;
    //background-color: #EEE;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 5%;
    padding-left: 5%;
    
    width: 100%;
    border-bottom: 1px solid #EEE;
    display: grid;
    grid-template-columns: 12% 88%;
    @media (max-width: 1100px) {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        justify-content: center;
        align-items: center;
    }

    .week-div{
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
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
    .content-lecture-div{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        
        .content-grid-div{
            padding-left: 3%;
            display: grid;
            width: 100%;
            grid-template-columns: repeat(3, 1fr);
            column-gap: 1%;
            row-gap: 30px;
            margin-bottom: 40px;
            @media (max-width: 1200px) {
                grid-template-columns: repeat(2, 1fr);
            }
            @media (max-width: 800px) {
                grid-template-columns: repeat(1, 1fr);
                justify-content: center;
                align-items: center
            }
            
        }

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