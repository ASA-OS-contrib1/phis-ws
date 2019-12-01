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
import { ScientificObjectDTO } from '../model/scientificObjectDTO';
import { ScientificObjectPostDTO } from '../model/scientificObjectPostDTO';
import { ScientificObjectPutDTO } from '../model/scientificObjectPutDTO';

import { COLLECTION_FORMATS }  from '../variables';



@injectable()
export class ScientificObjectsService {
    private basePath: string = 'https://localhost';

    constructor(@inject("IApiHttpClient") private httpClient: IHttpClient,
        @inject("IAPIConfiguration") private APIConfiguration: IAPIConfiguration ) {
        if(this.APIConfiguration.basePath)
            this.basePath = this.APIConfiguration.basePath;
    }
    /**
     * Get all scientific objects corresponding to the searched params given
     * Retrieve all scientific objects authorized for the user corresponding to the user corresponding to the searched params given
     * @param Authorization Access token given
     * @param pageSize Number of elements per page (limited to 150000)
     * @param page Current page number
     * @param uri Search by URI
     * @param experiment Search by experiment URI
     * @param alias Search by alias
     * @param rdfType Search by rdfType
     
     */
    public getScientificObjectsBySearch(Authorization: string, pageSize?: number, page?: number, uri?: string, experiment?: string, alias?: string, rdfType?: string, observe?: 'body', headers?: Headers): Observable<Array<ScientificObjectDTO>>;
    public getScientificObjectsBySearch(Authorization: string, pageSize?: number, page?: number, uri?: string, experiment?: string, alias?: string, rdfType?: string, observe?: 'response', headers?: Headers): Observable<HttpResponse<Array<ScientificObjectDTO>>>;
    public getScientificObjectsBySearch(Authorization: string, pageSize?: number, page?: number, uri?: string, experiment?: string, alias?: string, rdfType?: string, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (!Authorization){
            throw new Error('Required parameter Authorization was null or undefined when calling getScientificObjectsBySearch.');
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
        if (experiment !== undefined) {
            queryParameters.push("experiment="+encodeURIComponent(String(experiment)));
        }
        if (alias !== undefined) {
            queryParameters.push("alias="+encodeURIComponent(String(alias)));
        }
        if (rdfType !== undefined) {
            queryParameters.push("rdfType="+encodeURIComponent(String(rdfType)));
        }

        if (Authorization) {
            headers['Authorization'] = String(Authorization);
        }

        headers['Accept'] = 'application/json';

        const response: Observable<HttpResponse<Array<ScientificObjectDTO>>> = this.httpClient.get(`${this.basePath}/scientificObjects?${queryParameters.join('&')}`, headers);
        if (observe == 'body') {
               return response.map(httpResponse => <Array<ScientificObjectDTO>>(httpResponse.response));
        }
        return response;
    }
    /**
     * Post scientific object(s)
     * Register new scientific object(s) in the database.
     * @param body JSON format of scientific object data
     * @param Authorization Access token given
     
     */
    public postScientificObject(body: Array<ScientificObjectPostDTO>, Authorization: string, observe?: 'body', headers?: Headers): Observable<ResponseFormPOST>;
    public postScientificObject(body: Array<ScientificObjectPostDTO>, Authorization: string, observe?: 'response', headers?: Headers): Observable<HttpResponse<ResponseFormPOST>>;
    public postScientificObject(body: Array<ScientificObjectPostDTO>, Authorization: string, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (!body){
            throw new Error('Required parameter body was null or undefined when calling postScientificObject.');
        }

        if (!Authorization){
            throw new Error('Required parameter Authorization was null or undefined when calling postScientificObject.');
        }

        if (Authorization) {
            headers['Authorization'] = String(Authorization);
        }

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        const response: Observable<HttpResponse<ResponseFormPOST>> = this.httpClient.post(`${this.basePath}/scientificObjects`, body , headers);
        if (observe == 'body') {
               return response.map(httpResponse => <ResponseFormPOST>(httpResponse.response));
        }
        return response;
    }
    /**
     * Put scientific object(s) in the given experiment
     * Update scientific object(s) in the database.
     * @param uri Scientific object URI (Unique Resource Identifier)
     * @param experiment An experiment URI (Unique Resource Identifier)
     * @param body JSON format of scientific object data
     * @param Authorization Access token given
     
     */
    public put5(uri: string, experiment: string, body: ScientificObjectPutDTO, Authorization: string, observe?: 'body', headers?: Headers): Observable<ResponseFormPOST>;
    public put5(uri: string, experiment: string, body: ScientificObjectPutDTO, Authorization: string, observe?: 'response', headers?: Headers): Observable<HttpResponse<ResponseFormPOST>>;
    public put5(uri: string, experiment: string, body: ScientificObjectPutDTO, Authorization: string, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (!uri){
            throw new Error('Required parameter uri was null or undefined when calling put5.');
        }

        if (!experiment){
            throw new Error('Required parameter experiment was null or undefined when calling put5.');
        }

        if (!body){
            throw new Error('Required parameter body was null or undefined when calling put5.');
        }

        if (!Authorization){
            throw new Error('Required parameter Authorization was null or undefined when calling put5.');
        }

        if (Authorization) {
            headers['Authorization'] = String(Authorization);
        }

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        const response: Observable<HttpResponse<ResponseFormPOST>> = this.httpClient.put(`${this.basePath}/scientificObjects/${encodeURIComponent(String(uri))}/${encodeURIComponent(String(experiment))}`, body , headers);
        if (observe == 'body') {
               return response.map(httpResponse => <ResponseFormPOST>(httpResponse.response));
        }
        return response;
    }
}