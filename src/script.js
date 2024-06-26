"use strict";

import { defineComponent, createApp } from "https://unpkg.com/vue@3.2.37/dist/vue.esm-browser.js";

const App = defineComponent({
  data() {
    return {
      routes: [],
      from: "",
      to: "",
      routeList: [],
      routePlayList: [],
      counter: 0,
      routePlayListName: "",
      button: "",
      showOverlay: false,
      selectedRouteList: {},
      isChecklistVisible: false,
      routenId: 0,
      checked: false,
    };
  },
  mounted() {
    const storedRoutes = localStorage.getItem("routePlayList");
    if (storedRoutes) {
      this.routePlayList = JSON.parse(storedRoutes);
    }
  },
  methods: {
    async searchRoutes() {
      const response = await fetch(
        `http://transport.opendata.ch/v1/connections?from=${this.from}&to=${this.to}`
      );
      const data = await response.json();
      this.routeList = data.connections;
    },
    formatTime(dateTime) {
      const date = new Date(dateTime);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    calculateDuration(departure, arrival) {
      const dep = new Date(departure);
      const arr = new Date(arrival);
      const diff = (arr.getTime() - dep.getTime()) / 60000; // difference in minutes
      return `${diff} min`;
    },
    createList() {
      const nameExists = this.routePlayList.some(
        (playlist) => playlist.name === this.routePlayListName
      );
      if (nameExists) {
        alert("Diese routelist existiert bereits");
      } else {
        this.routePlayList.push({
          name: this.routePlayListName,
          id: this.counter,
          routen: [],
          checked: this.checked,
        });
        this.counter++;
      }
      console.log(this.routePlayList[this.counter - 1]);
    },
    deleteRouteList(index) {
      this.routePlayList.splice(index, 1);
      this.saveList();
    },
    saveList() {
      localStorage.setItem("routePlayList", JSON.stringify(this.routePlayList));
    },
    setName(event) {
      const target = event.target;
      this.routePlayListName = target.value;
    },
    viewRouteList(idxList) {
      const selectedRouteList = this.routePlayList[idxList];
      localStorage.setItem(
        "selectedRouteList",
        JSON.stringify(selectedRouteList)
      );
      window.location.href = "routePlayListView.html";
    },
    showChecklist(routenId) {
      this.isChecklistVisible = true;
      this.routenId = routenId;
    },
    hideChecklist() {
      this.isChecklistVisible = false;
    },
    addToFavorites(index) {
      const checkedItems = this.routePlayList.filter((item) => item.checked);
      if (checkedItems.length > 0) {
        this.routePlayList[index].routen.push(this.routeList[this.routenId]);
        this.routePlayList[index].checked = false;
        this.hideChecklist();
      } else {
        alert("Bitte wählen Sie ein Element aus.");
      }
    },
    deleteFromPlayList(index) {
      this.routePlayList.splice(index, 1);
    },
  },
  watch: {
    routePlayList: {
      handler() {
        this.saveList();
      },
      deep: true,
    },
  },
});

createApp(App).mount("#app");
