"use strict";
import { defineComponent, createApp } from "https://unpkg.com/vue@3.2.37/dist/vue.esm-browser.js";

var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var App = (0, defineComponent)({
  data: function () {
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
  mounted: function () {
    var storedRoutes = localStorage.getItem("routePlayList");
    if (storedRoutes) {
      this.routePlayList = JSON.parse(storedRoutes);
    }
  },
  methods: {
    searchRoutes: function () {
      return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                fetch(
                  "http://transport.opendata.ch/v1/connections?from="
                    .concat(this.from, "&to=")
                    .concat(this.to)
                ),
              ];
            case 1:
              response = _a.sent();
              return [4 /*yield*/, response.json()];
            case 2:
              data = _a.sent();
              this.routeList = data.connections;
              return [2 /*return*/];
          }
        });
      });
    },
    formatTime: function (dateTime) {
      var date = new Date(dateTime);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    calculateDuration: function (departure, arrival) {
      var dep = new Date(departure);
      var arr = new Date(arrival);
      var diff = (arr.getTime() - dep.getTime()) / 60000; // difference in minutes
      return "".concat(diff, " min");
    },
    createList: function () {
      var _this = this;
      var nameExists = this.routePlayList.some(function (playlist) {
        return playlist.name === _this.routePlayListName;
      });
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
    deleteRouteList: function (index) {
      this.routePlayList.splice(index, 1);
      this.saveList();
    },
    saveList: function () {
      localStorage.setItem("routePlayList", JSON.stringify(this.routePlayList));
    },
    setName: function (event) {
      var target = event.target;
      this.routePlayListName = target.value;
    },
    viewRouteList: function (idxList) {
      var selectedRouteList = this.routePlayList[idxList];
      localStorage.setItem(
        "selectedRouteList",
        JSON.stringify(selectedRouteList)
      );
      window.location.href = "routePlayListView.html";
    },
    showChecklist: function (routenId) {
      this.isChecklistVisible = true;
      this.routenId = routenId;
    },
    hideChecklist: function () {
      this.isChecklistVisible = false;
    },
    addToFavorites: function (index) {
      var checkedItems = this.routePlayList.filter(function (item) {
        return item.checked;
      });
      if (checkedItems.length > 0) {
        this.routePlayList[index].routen.push(this.routeList[this.routenId]);
        this.routePlayList[index].checked = false;
        this.hideChecklist();
      } else {
        alert("Bitte wählen Sie ein Element aus.");
      }
    },
    deleteFromPlayList: function (index) {
      this.routePlayList.splice(index, 1);
    },
  },
  watch: {
    routePlayList: {
      handler: function () {
        this.saveList();
      },
      deep: true,
    },
  },
});
(0, createApp)(App).mount("#app");
