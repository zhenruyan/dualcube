/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DualCube } from '../models/DualCube';
import type { DualCubeDto } from '../models/DualCubeDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * 获取API服务器状态
     * @returns string 服务器状态
     * @throws ApiError
     */
    public static getGameStatus(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/status',
        });
    }
    /**
     * 新增DualCube
     * @param requestBody
     * @returns string 新增DualCube的ID
     * @throws ApiError
     */
    public static addDualCube(
        requestBody: DualCubeDto,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dual-cube',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 根据ID获取DualCube
     * @param id DualCube的UUID
     * @returns DualCube DualCube对象
     * @throws ApiError
     */
    public static getDualCubeById(
        id: string,
    ): CancelablePromise<DualCube> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/dual-cube/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `未找到指定ID的DualCube`,
            },
        });
    }
    /**
     * 分页获取DualCube列表
     * @param page 页码(从0开始)
     * @param size 每页记录数
     * @returns DualCube DualCube列表
     * @throws ApiError
     */
    public static getDualCubeList(
        page?: number,
        size?: number,
    ): CancelablePromise<Array<DualCube>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/list/dual',
            query: {
                'page': page,
                'size': size,
            },
        });
    }
    /**
     * 按singleSec倒序分页获取DualCube列表
     * @param page 页码(从0开始)，如果小于0则默认为0
     * @param size 每页记录数，取值范围[1,100]，默认为10
     * @returns DualCube 按singleSec倒序排序的DualCube列表
     * @throws ApiError
     */
    public static getDualCubeListSortSingle(
        page?: number,
        size: number = 10,
    ): CancelablePromise<Array<DualCube>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/list/dual/sort/single',
            query: {
                'page': page,
                'size': size,
            },
        });
    }
}
