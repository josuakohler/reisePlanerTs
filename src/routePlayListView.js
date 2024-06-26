"use strict";
import { defineComponent, createApp } from "https://unpkg.com/vue@3.2.37/dist/vue.esm-browser.js";
var App = (0, defineComponent)({
    data: function () {
        return {
            selectedRouteList: {},
        };
    },
    mounted: function () {
        var storedSelectedRouteList = localStorage.getItem('selectedRouteList');
        if (storedSelectedRouteList) {
            this.selectedRouteList = JSON.parse(storedSelectedRouteList);
        }
    },
    methods: {
        formatTime: function (dateTime) {
            var date = new Date(dateTime);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        },
        calculateDuration: function (departure, arrival) {
            var dep = new Date(departure);
            var arr = new Date(arrival);
            var diff = (arr.getTime() - dep.getTime()) / 60000; // difference in minutes
            return "".concat(diff, " min");
        },
        goBack: function () {
            window.location.href = 'index.html';
        }
    }
});
(0, createApp)(App).mount('#app');
