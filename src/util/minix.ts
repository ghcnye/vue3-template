
// 根据时间戳获取当前 年月日 时分秒
export const getDate = (date: number): string => {
    let hms: Date = new Date(date)
    let y = hms.getFullYear()
    let m = (hms.getMonth()+1) > 9 ? (hms.getMonth()+1) : '0' + (hms.getMonth()+1)
    let d = hms.getDate() > 9 ? hms.getDate() : '0' + hms.getDate()
    let h = hms.getHours() > 9 ? hms.getHours() : '0' + hms.getHours()
    let min = hms.getMinutes() > 9 ? hms.getMinutes() : '0' + hms.getMinutes()
    let s = hms.getSeconds() > 9 ? hms.getSeconds() : '0' + hms.getSeconds()
    let day = hms.getDay()
    let xq:string
    switch (day) {
        case 0:
            xq = '周日'
            break;
        case 1:
            xq = '周一'
            break;
        case 2:
            xq = '周二'
            break;
        case 3:
            xq = '周三'
            break;
        case 4:
            xq = '周四'
            break;
        case 5:
            xq = '周五'
            break;
        default:
            xq = '周六'
            break;
    }
    const str:string = y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s + ' ' + xq
    return str
}

// 根据 二进制流的 下载方法
export const DownloadFn = (blob: Blob,fileName: string): void => {
    const href = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = href
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(href)
}

// 数组去重
export const uniqueArray = (arr:Array<any>):Array<any> => {
    const set = new Set(arr)
    return Array.from(set)
}

// 