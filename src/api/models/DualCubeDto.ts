/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Info } from './Info';
import type { Timespec } from './Timespec';
export type DualCubeDto = {
    /**
     * 客户端提供的唯一标识符
     */
    uuid: string;
    info: Info;
    /**
     * 单线程测试时间信息
     */
    timespec: Timespec;
    /**
     * 多线程测试时间信息
     */
    multiTimespec?: Timespec;
    /**
     * 客户端版本号
     */
    version?: string;
};

