<template>
    <div class="activity">
                <header>
                <div class="title" @click="togleTasksVivsibility">
                    {{activity.title}}
                    <ion-icon :name="`chevron-${showTasks? 'down' : 'up'}-outline`"></ion-icon>
                </div>
            </header>
            <section v-show="showTasks">
                <ul>
                    <li v-for="subTask in activity.subTasks" :key="subTask.id" ><task-item :id="subTask.id" :desc="subTask.desc" :status="subTask.status" /></li>
                </ul>
            </section>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TaskItem from "./TaskItem";
export default {
    props:['title','id','time-stamps'],
    components:{
        TaskItem,
    },
    data(){
        return {
            showTasks: false,
        }
    },
    computed:{
        ...mapGetters('date',['today', 'displayedDate']),
        ...mapGetters('activities',['taskById']),
        activity() {
            return this.taskById(this.id);
        }
    },
    methods:{
        togleTasksVivsibility() {
            this.showTasks = !this.showTasks;
        }
    },
    created(){
        console.log(this.activity);
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/Colors.scss";
    .activity{
        width: 700px;
        max-width: 90vw;
        margin: 10px;
        border-radius: 20px;
        header{
            border-radius: 20px;
            height: 75px;
            background-color: $white;
            color: $teal-dark;
            display: flex;
            justify-content: center;
            align-items: center;
            .title{
                font-size: 20px;
                &:hover{
                    cursor: pointer;
                }
            }
        }
        ul{
            list-style: none;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
    }
</style>