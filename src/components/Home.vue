<template>
  <div class="home">
    <h1>
      Please select a section
      <a class="github" href="https://github.com/andypike7/interactive-desktop">
        View source on Github.
      </a>
    </h1>
    <router-link
      v-for="section in sections"
      :to="section.to"
      :key="section.name"
      class="link"
    >
      {{ section.name }}
    </router-link>
    <div class="about">
      <button @click="isAboutBlock = true" v-if="!isAboutBlock">
        Do you wanna know what it's for?
      </button>
      <div v-else>
        <h5>The task:</h5>
        Create SPA, dashboard using <i>vue-router</i>.<br />
        User can add, remove and drag blocks in every section.<br />
        Sections should be independent and hold their state against
        <i>Refresh</i>.<br />
        <hr />
        Solution: I've used <i>vue-draggable-resizable</i>.<br />
        State stored thru <i>Vuex</i> into <i>localStorage</i>.<br />
        Click on the element should move it up over others.<br />
        User can restore deleted blocks at any time.<br />
        Restored blocks should be placed at the center and have 300px width,
        100px height.
      </div>
    </div>
    <div class="slots">
      Just playing with slots:
      <SlotsComponent href="https://google.ru">
        [Google Link (default slot)]
        <template slot="named-1">[Named slot 1]</template>
        <template slot="named-2"></template>
      </SlotsComponent>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Section } from '@/interfaces';
import { getNavMenu } from '@/utils';
import SlotsComponent from '@/components/SlotsComponent.vue';

@Component({
  components: { SlotsComponent },
})
export default class Home extends Vue {
  isAboutBlock = false;

  get sections(): Section[] {
    return getNavMenu();
  }
}
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
.link {
  font-size: 16px;
  display: block;
  border: 1px solid black;
  padding: 10px;
  width: 200px;
  margin: 10px auto;
  text-align: center;
  color: black;
  text-decoration: none;
  &:hover {
    background: #eee;
  }
}
.github {
  font-size: 12px;
  color: blue;
  display: block;
  font-weight: normal;
}
.about {
  text-align: left;
  margin: 20px auto 0;
  button {
    display: block;
    margin: auto;
  }
}
.slots {
  margin-top: 20px;
  i {
    color: darkblue;
  }
}
</style>
