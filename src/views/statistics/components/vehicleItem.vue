<template>
    <div class="vehicle-item">
        <div class="item" >
            <div class="vehicle-plate">
                川A88099
            </div>
            <div class="vehicle-model" >
                宝马325
            </div>
        </div>
        <div class="item center-item">
            <div class="item-info" >
                <span class="tag income-tag">支</span> 21,000
            </div>
            <div class="item-info">
                <span class="tag outcome-tag" >收</span> 24,093
            </div>
        </div>
        <div class="item center-item" >
            <div style="width: calc(100% - 20px); float: left">
                <div class="title item-info" style="color: red;">
                    12,000
                </div>
                <div class="title item-info" style="color: green">
                    -10.34%
                </div>
            </div>
            <div class="expand-button">
                <i class="fa fa-caret-down"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "vehicleItem"
}
</script>

<style scoped>

.vehicle-item {
    color: #475056;
    font-weight: 400;
    font-size: 1rem;
    border-bottom: 1px solid #f1f2f3;
    height: 60px;
    width: 100%;
    display: flex;
}

.item {
    width: 33%;
    padding: 10px;
}

.vehicle-plate {
    font-size: 1.1rem;
    line-height: 24px;
    font-weight: 430;
    color: #0062cc;
}

.vehicle-model {
    font-size: 0.9rem;
    ine-height: 16px;
}

.center-item {
    text-align: center;
}

.item-info {
    line-height: 20px;
}

.tag {
    padding: 0px 2px;
    border-radius: 4px;
    color: #f1f3f4;
    font-size: 14px;
    line-height: 20px;
}

.income-tag{
    background-color: #ffbbb1;
}
.outcome-tag {
    background-color: #afccff;
}

.expand-button {
    float: right;
    width: 20px;
    line-height: 40px;
    text-align: center;
    color: #999999;
}
</style>