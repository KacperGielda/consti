<template>
  <ul>
    <li>
      <form class="add-sub-task" @submit.prevent="addNewSubTask">
        <base-input
          label=""
          id="tresc"
          :show-validation="false"
          :full-width="true"
          v-model:value="newTaskDesc"
        />
        <base-button>+ Dodaj zadanie</base-button>
      </form>
    </li>
    <li v-for="subTask in subTasks" :key="subTask.id">
      <base-task
        :id="subTask.id"
        :desc="subTask.desc"
        :status="subTask.status"
        :parent-id="activityId"
        @change-status="changeStatus(subTask.id)"
      />
    </li>
  </ul>
</template>

<script>
export default {
    props:['sub-tasks', 'activity-id'],
    data(){
        return{
            newTaskDesc: '',
        }
    },
    methods:{
        addNewSubTask(){
           this.$store.dispatch('activities/addNewSubTask', {id: this.activityId, desc: this.newTaskDesc});
       },
       changeStatus(subTaskId){
           this.$store.dispatch('activities/changeSubTaskStatus', {subTaskId, activityId: this.activityId});
       }
    },
    // mounted() {
    //     console.log(this.subTasks);
    // },

}
</script>

<style lang="scss" scoped>
@import "../../assets/Colors.scss";
ul {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .add-sub-task {
    width: 680px;
    max-width: 85vw;
    height: 50px;
    margin-top: 10px;
    background-color: $white;
    border-radius: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
    color: white;
    padding-left: 20px;
    button{
        margin: 0;
        height: 100%;
        margin-left: 20px;
        width: 200px;
        padding: 0;
    }
  }
</style>