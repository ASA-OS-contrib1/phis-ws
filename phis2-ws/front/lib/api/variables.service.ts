/**
 * 
 * 
 *
 * 
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import IHttpClient from "../IHttpClient";
import { inject, injectable } from "inversify";
import { IAPIConfiguration } from "../IAPIConfiguration";
import { Headers } from "../Headers";
import HttpResponse from "../HttpResponse";

import { ResponseFormPOST } from '../model/responseFormPOST';
import { Variable } from '../model/variable';
import { VariableDTO } from '../model/variableDTO';

import { COLLECTION_FORMATS }  from '../variables';



@injectable()
export class VariablesService {
    private basePath: string = 'https://localhost';

    constructor(@inject("IApiHttpClient") private httpClient: IHttpClient,
        @inject("IAPIConfiguration") private APIConfiguration: IAPIConfiguration ) {
        if(this.APIConfiguration.basePath)
            this.basePath = this.APIConfiguration.basePath;
    }
    /**
     * Get a variable
     * Retrieve a variable. Need URL encoded variable URI (Unique resource identifier).
     * @param variable A variable URI (Unique Resource Identifier)
     * @param Authorization Access token given
     * @param pageSize Number of elements per page (limited to 150000)
     * @param page Current page number
     
     */
    public getVariableDetail(variable: string, Authorization: string, pageSize?: number, page?: number, observe?: 'body', headers?: Headers): Observable<Array<Variable>>;
    public getVariableDetail(variable: string, Authorization: string, pageSize?: number, page?: number, observe?: 'response', headers?: Headers): Observable<HttpResponse<Array<Variable>>>;
    public getVariableDetail(variable: string, Authorization: string, pageSize?: number, page?: number, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (!variable){
            throw new Error('Required parameter variable was null or undefined when calling getVariableDetail.');
        }

        if (!Authorization){
            throw new Error('Required parameter Authorization was null or undefined when calling getVariableDetail.');
        }

        let queryParameters: string[] = [];
        if (pageSize !== undefined) {
            queryParameters.push("pageSize="+encodeURIComponent(String(pageSize)));
        }
        if (page !== undefined) {
            queryParameters.push("page="+encodeURIComponent(String(page)));
        }

        if (Authorization) {
            headers['Authorization'] = String(Authorization);
        }

        headers['Accept'] = 'application/json';

        const response: Observable<HttpResponse<Array<Variable>>> = this.httpClient.get(`${this.basePath}/variables/${encodeURIComponent(String(variable))}?${queryParameters.join('&')}`, headers);
        if (observe == 'body') {
               return response.map(httpResponse => <Array<Variable>>(httpResponse.response));
        }
        return response;
    }
    /**
     * Get all variables corresponding to the searched params given
     * Retrieve all variables authorized for the user corresponding to the user corresponding to the searched params given
     * @param Authorization Access token given
     * @param pageSize Number of elements per page (limited to 150000)
     * @param page Current page number
     * @param uri Search by URI
     * @param label Search by label
     * @param trait Search by trait
     * @param traitSKosReference Search by skos trait reference
     * @param method Search by method
     * @param unit Search by unit
     
     */
    public getVariablesBySearch(Authorization: string, pageSize?: number, page?: number, uri?: string, label?: string, trait?: string, traitSKosReference?: string, method?: string, unit?: string, observe?: 'body', headers?: Headers): Observable<Array<Variable>>;
    public getVariablesBySearch(Authorization: string, pageSize?: number, page?: number, uri?: string, label?: string, trait?: string, traitSKosReference?: string, method?: string, unit?: string, observe?: 'response', headers?: Headers): Observable<HttpResponse<Array<Variable>>>;
    public getVariablesBySearch(Authorization: string, pageSize?: number, page?: number, uri?: string, label?: string, trait?: string, traitSKosReference?: string, method?: string, unit?: string, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (!Authorization){
            throw new Error('Required parameter Authorization was null or undefined when calling getVariablesBySearch.');
        }

        let queryParameters: string[] = [];
        if (pageSize !== undefined) {
            queryParameters.push("pageSize="+encodeURIComponent(String(pageSize)));
        }
        if (page !== undefined) {
            queryParameters.push("page="+encodeURIComponent(String(page)));
        }
        if (uri !== undefined) {
            queryParameters.push("uri="+encodeURIComponent(String(uri)));
        }
        if (label !== undefined) {
            queryParameters.push("label="+encodeURIComponent(String(label)));
        }
        if (trait !== undefined) {
            queryParameters.push("trait="+encodeURIComponent(String(trait)));
        }
        if (traitSKosReference !== undefined) {
            queryParameters.push("traitSKosReference="+encodeURIComponent(String(traitSKosReference)));
        }
        if (method !== undefined) {
            queryParameters.push("method="+encodeURIComponent(String(method)));
        }
        if (unit !== undefined) {
            queryParameters.push("unit="+encodeURIComponent(String(unit)));
        }

        if (Authorization) {
            headers['Authorization'] = String(Authorization);
        }

        headers['Accept'] = 'application/json';

        const response: Observable<HttpResponse<Array<Variable>>> = this.httpClient.get(`${this.basePath}/variables?${queryParameters.join('&')}`, headers);
        if (observe == 'body') {
               return response.map(httpResponse => <Array<Variable>>(httpResponse.response));
        }
        return response;
    }
    /**
     * Get all variables details corresponding to the searched params given
     * Retrieve all variables with details authorized for the user corresponding to the user corresponding to the searched params given
     * @param Authorization Access token given
     * @param pageSize Number of elements per page (limited to 150000)
     * @param page Current page number
     * @param uri Search by URI
     * @param label Search by label
     * @param trait Search by trait
     * @param traitSKosReference Search by skos trait reference
     * @param method Search by method
     * @param unit Search by unit
     
     */
    public getVariablesDetailsBySearch(Authorization: string, pageSize?: number, page?: number, uri?: string, label?: string, trait?: string, traitSKosReference?: string, method?: string, unit?: string, observe?: 'body', headers?: Headers): Observable<Array<Variable>>;
    public getVariablesDetailsBySearch(Authorization: string, pageSize?: number, page?: number, uri?: string, label?: string, trait?: string, traitSKosReference?: string, method?: string, unit?: string, observe?: 'response', headers?: Headers): Observable<HttpResponse<Array<Variable>>>;
    public getVariablesDetailsBySearch(Authorization: string, pageSize?: number, page?: number, uri?: string, label?: string, trait?: string, traitSKosReference?: string, method?: string, unit?: string, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (!Authorization){
            throw new Error('Required parameter Authorization was null or undefined when calling getVariablesDetailsBySearch.');
        }

        let queryParameters: string[] = [];
        if (pageSize !== undefined) {
            queryParameters.push("pageSize="+encodeURIComponent(String(pageSize)));
        }
        if (page !== undefined) {
            queryParameters.push("page="+encodeURIComponent(String(page)));
        }
        if (uri !== undefined) {
            queryParameters.push("uri="+encodeURIComponent(String(uri)));
        }
        if (label !== undefined) {
            queryParameters.push("label="+encodeURIComponent(String(label)));
        }
        if (trait !== undefined) {
            queryParameters.push("trait="+encodeURIComponent(String(trait)));
        }
        if (traitSKosReference !== undefined) {
            queryParameters.push("traitSKosReference="+encodeURIComponent(String(traitSKosReference)));
        }
        if (method !== undefined) {
            queryParameters.push("method="+encodeURIComponent(String(method)));
        }
        if (unit !== undefined) {
            queryParameters.push("unit="+encodeURIComponent(String(unit)));
        }

        if (Authorization) {
            headers['Authorization'] = String(Authorization);
        }

        headers['Accept'] = 'application/json';

        const response: Observable<HttpResponse<Array<Variable>>> = this.httpClient.get(`${this.basePath}/variables/details?${queryParameters.join('&')}`, headers);
        if (observe == 'body') {
               return response.map(httpResponse => <Array<Variable>>(httpResponse.response));
        }
        return response;
    }
    /**
     * Post variable(s)
     * Register new variable(s) in the data base
     * @param Authorization Access token given
     * @param body JSON format of variable data
     
     */
    public postVariable(Authorization: string, body?: Array<VariableDTO>, observe?: 'body', headers?: Headers): Observable<ResponseFormPOST>;
    public postVariable(Authorization: string, body?: Array<VariableDTO>, observe?: 'response', headers?: Headers): Observable<HttpResponse<ResponseFormPOST>>;
    public postVariable(Authorization: string, body?: Array<VariableDTO>, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (!Authorization){
            throw new Error('Required parameter Authorization was null or undefined when calling postVariable.');
        }

        if (Authorization) {
            headers['Authorization'] = String(Authorization);
        }

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        const response: Observable<HttpResponse<ResponseFormPOST>> = this.httpClient.post(`${this.basePath}/variables`, body , headers);
        if (observe == 'body') {
               return response.map(httpResponse => <ResponseFormPOST>(httpResponse.response));
        }
        return response;
    }
    /**
     * Update variable
     * 
     * @param Authorization Access token given
     * @param body JSON format of variable data
     
     */
    public putVariable(Authorization: string, body?: Array<VariableDTO>, observe?: 'body', headers?: Headers): Observable<ResponseFormPOST>;
    public putVariable(Authorization: string, body?: Array<VariableDTO>, observe?: 'response', headers?: Headers): Observable<HttpResponse<ResponseFormPOST>>;
    public putVariable(Authorization: string, body?: Array<VariableDTO>, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (!Authorization){
            throw new Error('Required parameter Authorization was null or undefined when calling putVariable.');
        }

        if (Authorization) {
            headers['Authorization'] = String(Authorization);
        }

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        const response: Observable<HttpResponse<ResponseFormPOST>> = this.httpClient.put(`${this.basePath}/variables`, body , headers);
        if (observe == 'body') {
               return response.map(httpResponse => <ResponseFormPOST>(httpResponse.response));
        }
        return response;
    }
}