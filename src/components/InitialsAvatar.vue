<template>
  <v-avatar
    v-if="item !== null"
    :size="size"
    :style="{ 'background-color': backgroundColor }"
  >
    <strong
      class="initials"
      :style="{ color: fontColor, 'font-size': fontSize }"
    >
      {{ getInitialsFromName(item) || "?" }}
    </strong>
  </v-avatar>
</template>

<script>
import randomColor from "randomcolor";
export default {
  name: "item-initials",
  props: {
    item: {
      type: Object,
      required: true,
    },
    size: {
      type: Number,
      default: 40,
    },
    color: {
      type: String,
      default: null,
    },
    initialsOnly: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    fontSize() {
      return (this.size / 40.0) * 17 + "px";
    },
    fontColor() {
      if (this.initialsOnly) {
        return this.color || this.itemToColour(this.item);
      }
      return "white";
    },
    backgroundColor() {
      if (this.initialsOnly) {
        return "transparent";
      }
      return this.color || this.itemToColour(this.item);
    },
  },
  methods: {
    stringToColour(str) {
      return randomColor({
        luminosity: 'dark',
        alpha: 1,
        seed: str,
      });
    },
    itemToColour(item) {
      if (item.id && item.first_name && item.last_name ) {
        return this.stringToColour( item.first_name + item.last_name + (item.id*Math.random()*100));
      }
        return this.stringToColour(item.id*Math.random()*100 + "");
    },
    getInitialsFromName(item) {
      if (item.first_name != null && item.last_name!= null) {
        let initials = item.first_name.charAt(0) + item.last_name.charAt(0);
        return initials.toUpperCase();
      }
      else{
        return "?";
      }
    },
  },
};
</script>

<style scoped>
.initials {
  text-transform: uppercase;
}
</style>
