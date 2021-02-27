import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import BaseContainer from "./components/ui/BaseContainer.vue";
import BaseInput from "./components/ui/BaseInput.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import BaseDialog from "./components/ui/BaseDialog.vue";
import BaseTask from "./components/ui/BaseTask.vue";
import BaseTaskList from "./components/ui/BaseTaskList.vue";
import BaseCheckbox from "./components/ui/BaseCheckbox.vue";
import BaseTimePicker from './components/ui/BaseTimePicker.vue';

const app = createApp(App);
app.config.isCustomElement = tag => tag == 'ion-icon';
app.use(store).use(router);

app.component('base-container', BaseContainer);
app.component('base-input', BaseInput);
app.component('base-button', BaseButton);
app.component('base-dialog', BaseDialog);
app.component('base-task', BaseTask);
app.component('base-task-list', BaseTaskList);
app.component('base-checkbox', BaseCheckbox);
app.component('base-time-picker', BaseTimePicker);


app.mount('#app')


