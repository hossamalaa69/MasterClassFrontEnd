<template>
  <div class="syllabus-container">
    <div class="week-div">
      <p>{{ lecture.activity_name }}</p>
    </div>
    <div class="content-lecture-div">
      <p id="week-topic-p">{{ lecture.activity_description }}</p>
      <div class="horizontal-content-div">
        <div class="circle-div1">
          <v-icon class="icon-white">mdi-clock</v-icon>
        </div>
        <p>{{ links.length }} Videos</p>
      </div>
      <div class="content-grid-div">
        <iframe
          v-for="link in links"
          :key="link"
          :src="link"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        >
        </iframe>
      </div>
      <div class="horizontal-content-div">
        <div class="circle-div2">
          <v-icon class="icon-white">mdi-book-open-variant</v-icon>
        </div>
        <p>{{ pdfs.length }} Reading Materials</p>
      </div>
      <v-row class="chips" no-gutters>
        <v-col :key="index" v-for="(pdf, index) in pdfs">
          <v-chip-group active-class="primary--text" column :multiple="false">
            <v-chip class="chip" :href="pdf" target="_blank" download>
              <v-icon left>mdi-file-pdf-box</v-icon>
              <span>{{ pdf.split('/').slice(-1)[0] }}</span>
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "SyllabusItem",
  components: {},
  data() {
    return {
      links: [],
      pdfs: [],
    };
  },
  props: {
    lecture: Object,
  },
  mounted() {
    console.log("This lecture is:");
    console.log(this.lecture);
    this.links = this.lecture.links;
    this.pdfs = this.lecture.pdfs;
    for (const [i, pdf] of this.pdfs.entries())
      this.pdfs[i] = "http://localhost:3000" + pdf;
  },
};
</script>

<style scoped lang="scss">
.chips {
    padding-left: 3%;
}
.chip {
  width: 40vw;
}
.chip span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (min-width: 768px) {
  .chip {
    width: 20vw;
  }
}
.syllabus-container {
  margin-top: 15px;
  //background-color: #EEE;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 5%;
  padding-left: 5%;

  width: 100%;
  border-bottom: 1px solid #eee;
  display: grid;
  grid-template-columns: 12% 88%;
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    justify-content: center;
    align-items: center;
  }

  .week-div {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    p {
      letter-spacing: 4px;
      color: #000;
      font-size: 1.5rem;
      line-height: 1.5rem;
      font-weight: 400;
      font-family: OpenSans, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, "Helvetica Neue", Arial, sans-serif;
    }
    span {
      color: #000;
      font-size: 2.5rem;
      font-weight: 300;
    }
  }
  .content-lecture-div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    .content-grid-div {
      padding-left: 3%;
      display: grid;
      width: 100%;
      grid-template-columns: repeat(5, 1fr);
      column-gap: 1%;
      row-gap: 30px;
      margin-bottom: 40px;
      @media (max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 800px) {
        grid-template-columns: repeat(1, 1fr);
        justify-content: center;
        align-items: center;
      }
    }

    #week-topic-p {
      color: #000;
      font-size: 20px;
      line-height: 24px;
      font-weight: 300;
    }
    .horizontal-content-div {
      text-align: center;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      .circle-div1 {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-image: linear-gradient(
          90deg,
          rgb(252, 110, 81),
          rgb(246, 187, 66)
        );
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-white {
          color: #eee;
        }
      }
      .circle-div2 {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-image: linear-gradient(
          90deg,
          rgb(72, 207, 173),
          rgb(59, 175, 218)
        );
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-white {
          color: #eee;
        }
      }
      p {
        color: #666;
        margin-left: 15px;
        font-weight: 500;
      }
    }
  }
}
</style>