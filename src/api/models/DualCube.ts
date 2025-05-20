/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type DualCube = {
    /**
     * 唯一标识符(UUID)
     */
    id?: string;
    /**
     * 客户端提供的标识符
     */
    ident?: string;
    /**
     * 主机名
     */
    hostname?: string;
    /**
     * 操作系统信息
     */
    os?: string;
    /**
     * CPU型号信息
     */
    cpu?: string;
    /**
     * 单线程测试的秒数
     */
    singleSec?: number;
    /**
     * 单线程测试的纳秒数
     */
    singleNanosec?: number;
    /**
     * 多线程测试的秒数
     */
    multiSec?: number;
    /**
     * 多线程测试的纳秒数
     */
    multiNanosec?: number;
    /**
     * 客户端版本号
     */
    version?: string;
    /**
     * 记录创建时间
     */
    createdAt?: string;
};

