

const userKey =  'USERKEY'

export const setUserKey = (key:string, val: string) => {
    localStorage.setItem(key,val)
} 

export const getUserKey = (key: string) => {
    return localStorage.getItem(key) || ''
}

export const removeUserKey = (key: string) => {
    localStorage.removeItem(key)
}