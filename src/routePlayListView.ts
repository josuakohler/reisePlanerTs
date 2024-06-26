import { createApp, defineComponent } from 'vue';

interface Route {
    from: string;
    to: string;
    departure: string;
    arrival: string;
}

interface RouteList {
    name: string;
    id: number;
    routen: Route[];
    checked: boolean;
}

const App = defineComponent({
    data() {
        return {
            selectedRouteList: {} as RouteList,
        };
    },
    mounted() {
        const storedSelectedRouteList = localStorage.getItem('selectedRouteList');
        if (storedSelectedRouteList) {
            this.selectedRouteList = JSON.parse(storedSelectedRouteList) as RouteList;
        }
    },
    methods: {
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
        goBack() {
            window.location.href = 'index.html';
        }
    }
});

createApp(App).mount('#app');
