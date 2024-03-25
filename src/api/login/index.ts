import Http from "@/util/request"   // 注意文件位置
import type { Result } from "@/util/request";


export function getDictList(id: number) {
    return Http.get<Result>(`/admin/dict/details/${id}`)
}