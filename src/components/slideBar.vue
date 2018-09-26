<template>
    <div class="slidebar-container">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name:'sildebar'
}
</script>
<style>
.slidebar-container{
    width:60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top:62px;
    right:0;
    /* background: pink; */
    z-index:11;
}
</style>


