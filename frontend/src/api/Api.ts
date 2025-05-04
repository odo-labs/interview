/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface IssuingOrg {
  /** Id */
  id: number;
  /**
   * Name
   * @minLength 1
   */
  name: string;
  /**
   * State location
   * @minLength 1
   */
  state_location: string;
  /**
   * Kind
   * @minLength 1
   */
  kind: string;
}

export interface RFP {
  /** Id */
  id?: number;
  /**
   * Title
   * @minLength 1
   * @maxLength 1024
   */
  title: string;
  /**
   * Description
   * @minLength 1
   */
  description: string;
  /**
   * Created at
   * @format date-time
   */
  created_at?: string;
  /**
   * Due date
   * @format date
   */
  due_date: string;
  /** Issuing org */
  issuing_org: number;
  issuing_org_detail?: IssuingOrg;
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "/api" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title RFPs API
 * @version v1
 * @baseUrl /api
 *
 * API for the RFPs web app
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags rfps
   * @name RfpsList
   * @request GET:/rfps/
   * @secure
   */
  rfpsList = (
    query?: {
      /** A page number within the paginated result set. */
      page?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        count: number;
        /** @format uri */
        next?: string | null;
        /** @format uri */
        previous?: string | null;
        results: RFP[];
      },
      any
    >({
      path: `/rfps/`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags rfps
   * @name RfpsCreate
   * @request POST:/rfps/
   * @secure
   */
  rfpsCreate = (data: RFP, params: RequestParams = {}) =>
    this.request<RFP, any>({
      path: `/rfps/`,
      method: "POST",
      body: data,
      secure: true,
      format: "json",
      ...params,
    });

  id = {
    /**
     * No description
     *
     * @tags rfps
     * @name RfpsRead
     * @request GET:/rfps/{id}/
     * @secure
     */
    rfpsRead: (id: number, params: RequestParams = {}) =>
      this.request<RFP, any>({
        path: `/rfps/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags rfps
     * @name RfpsUpdate
     * @request PUT:/rfps/{id}/
     * @secure
     */
    rfpsUpdate: (id: number, data: RFP, params: RequestParams = {}) =>
      this.request<RFP, any>({
        path: `/rfps/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags rfps
     * @name RfpsPartialUpdate
     * @request PATCH:/rfps/{id}/
     * @secure
     */
    rfpsPartialUpdate: (id: number, data: RFP, params: RequestParams = {}) =>
      this.request<RFP, any>({
        path: `/rfps/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags rfps
     * @name RfpsDelete
     * @request DELETE:/rfps/{id}/
     * @secure
     */
    rfpsDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/rfps/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
