<template>
    <div class="param-info" v-if="Object(itemParams).length !== 0">
        <div v-for="(tables,index) in itemParams.rule.tables" :key="index">
            <table class="info-size"
                   v-for="(table,index) in itemParams.rule.tables[0]" :key="index">
                <tr v-for="(tr,indey) in table" :key="indey">
                    <td v-for="(td,indez) in tr" :key="indez">
                        {{td}}
                    </td>
                </tr>
            </table>
        </div>
        <table class="info-param">
            <tr v-for="(info,index) in itemParams.infos.set" :key="index">
                <td class="info-param-key">{{info.key}}</td>
                <td class="param-value">{{info.value}}</td>
            </tr>
        </table>
        <div class="info-img" v-if="itemParams.info.image">
            <img :src="itemParams.info.images[0]" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: "DetailItemParams",
        props: {
            itemParams : {
                type:Object,
                default() {
                    return {}
                }
            }
        }
    }
</script>

<style scoped>

</style>