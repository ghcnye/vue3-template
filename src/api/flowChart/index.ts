import Http from "@/util/request"   // 注意文件位置
import type { Result } from "@/util/request";


export function getNodeEdgeData() {
    return Http.get<Result>('/getNodeEdge')
}