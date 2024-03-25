import { defineStore } from "pinia";
import { setUserKey,getUserKey,removeUserKey } from "@/util/auth/local";

export type Info = {
    username: string,
    password: string
}

export const userstore = defineStore('userstore',{
    state: ()=> {
        return {
            userInfo: getUserKey('USERKEY') || {},
            username: 'zrq'
        }
    },
    actions: {
        login(val: Info) {
            this.userInfo = Object.assign(this.userInfo,val)
            setUserKey('USERKEY',JSON.stringify(val))
        },
        logout() {
            removeUserKey('USERKEY')
        }
    },
    persist: {
        key: 'USER',
    },
})

