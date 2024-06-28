import { createApp, defineComponent } from 'vue';

interface Route {
    from: string;
    to: string;
    connections: any[];
}

interface RoutePlayList {
    name: string;
    id: number;
    routen: any[];
    checked: boolean;
}

interface SelectedRouteList {
    name: string;
    id: number;
    routen: any[];
    checked: boolean;
}

const App = defineComponent({
    data() {
        return {
            routes: [] as Route[],
            from: '' as string,
            to: '' as string,
            routeList: [] as any[],
            routePlayList: [] as RoutePlayList[],
            counter: 0 as number,
            routePlayListName: '' as string,
            button: '' as string,
            showOverlay: false as boolean,
            selectedRouteList: {} as SelectedRouteList | {},
            isChecklistVisible: false as boolean,
            routenId: 0 as number,
            checked: false as boolean,
        };
    },
    mounted() {
        const storedRoutes = localStorage.getItem('routePlayList');
        if (storedRoutes) {
            this.routePlayList = JSON.parse(storedRoutes) as RoutePlayList[];
        }
    },
    methods: {
        async searchRoutes() {
            const response = await fetch(`http://transport.opendata.ch/v1/connections?from=${this.from}&to=${this.to}`);
            const data = await response.json();
            this.routeList = data.connections;
        },

        formatTime(dateTime: string): string {
            const date = new Date(dateTime);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        },
        calculateDuration(departure: string, arrival: string): string {
            const dep = new Date(departure);
            const arr = new Date(arrival);
            const diff = (arr.getTime() - dep.getTime()) / 60000; // difference in minutes
            return `${diff} min`;
        },

        createList() {
            let nameExists = this.routePlayList.some((playlist) => playlist.name === this.routePlayListName);

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

        deleteRouteList(index: number) {
            this.routePlayList.splice(index, 1);
            this.saveList();
        },
        saveList() {
            localStorage.setItem('routePlayList', JSON.stringify(this.routePlayList));
        },
        setName(event: Event) {
            const target = event.target as HTMLInputElement;
            this.routePlayListName = target.value;
        },

        viewRouteList(idxList: number) {
            const selectedRouteList = this.routePlayList[idxList];
            localStorage.setItem('selectedRouteList', JSON.stringify(selectedRouteList));
            window.location.href = 'routePlayListView.html';
        },

        showChecklist(routenId: number) {
            this.isChecklistVisible = true;
            this.routenId = routenId;
        },
        hideChecklist() {
            this.isChecklistVisible = false;
        },
        addToFavorites(index: number) {
            const checkedItems = this.routePlayList.filter(item => item.checked);
            if (checkedItems.length > 0) {
                this.routePlayList[index].routen.push(this.routeList[this.routenId]);
                this.routePlayList[index].checked = false;
                this.hideChecklist();
            } else {
                alert('Bitte wählen Sie ein Element aus.');
            }
        },

        deleteFromPlayList(index: number) {
            this.routePlayList.splice(index, 1);
        }
    },
    watch: {
        routePlayList: {
            handler() {
                this.saveList();
            },
            deep: true
        }
    }
});


createApp(App).mount('#app');
