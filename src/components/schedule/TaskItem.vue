<template>
  <div class="task-container">
    <header>
      <span>{{ `${task.timeStamps[0]}-${task.timeStamps[1]} ` }}</span
      ><span> {{ task.from }}</span>
    </header>
    <section>
        <label :for="`task${task.id}}`"><h3>{{currentTask}}</h3></label> <input type="checkbox" :id="`task${task.id}}`">
    </section>
  </div>
</template>

<script>
export default {
    props:['task'],
    computed:{
        currentTask(){
           return this.task.tasks.find(task => task =! task.isFinished).title;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/Colors.scss";
.task-container{
    width: 400px;
    height: 150px;
    background-color: $teal;
    margin: 25px;
    color: $white;
    border-radius:20px;
    overflow: hidden;
    header{
        background-color: $teal-dark;
        height: 50px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
}
</style>