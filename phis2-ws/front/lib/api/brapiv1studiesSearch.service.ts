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
import { StudyDTO } from '../model/studyDTO';
import { StudySearchDTO } from '../model/studySearchDTO';

import { COLLECTION_FORMATS }  from '../variables';



@injectable()
export class Brapiv1studiesSearchService {
    private basePath: string = 'https://localhost';

    constructor(@inject("IApiHttpClient") private httpClient: IHttpClient,
        @inject("IAPIConfiguration") private APIConfiguration: IAPIConfiguration ) {
        if(this.APIConfiguration.basePath)
            this.basePath = this.APIConfiguration.basePath;
    }
    /**
     * Retrieve studies information
     * Retrieve studies information
     * @param Authorization Access token given
     * @param studyDbId Search by studyDbId
     * @param commonCropName Search by commonCropName
     * @param seasonDbId Search by seasonDbId
     * @param active Filter active status true/false
     * @param sortBy Name of the field to sort by: studyDbId, commonCropName or seasonDbId
     * @param sortOrder Sort order direction - ASC or DESC
     * @param pageSize Number of elements per page (limited to 150000)
     * @param page Current page number
     
     */
    public getStudiesSearch(Authorization: string, studyDbId?: string, commonCropName?: string, seasonDbId?: string, active?: string, sortBy?: string, sortOrder?: string, pageSize?: number, page?: number, observe?: 'body', headers?: Headers): Observable<Array<StudyDTO>>;
    public getStudiesSearch(Authorization: string, studyDbId?: string, commonCropName?: string, seasonDbId?: string, active?: string, sortBy?: string, sortOrder?: string, pageSize?: number, page?: number, observe?: 'response', headers?: Headers): Observable<HttpResponse<Array<StudyDTO>>>;
    public getStudiesSearch(Authorization: string, studyDbId?: string, commonCropName?: string, seasonDbId?: string, active?: string, sortBy?: string, sortOrder?: string, pageSize?: number, page?: number, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (!Authorization){
            throw new Error('Required parameter Authorization was null or undefined when calling getStudiesSearch.');
        }

        let queryParameters: string[] = [];
        if (studyDbId !== undefined) {
            queryParameters.push("studyDbId="+encodeURIComponent(String(studyDbId)));
        }
        if (commonCropName !== undefined) {
            queryParameters.push("commonCropName="+encodeURIComponent(String(commonCropName)));
        }
        if (seasonDbId !== undefined) {
            queryParameters.push("seasonDbId="+encodeURIComponent(String(seasonDbId)));
        }
        if (active !== undefined) {
            queryParameters.push("active="+encodeURIComponent(String(active)));
        }
        if (sortBy !== undefined) {
            queryParameters.push("sortBy="+encodeURIComponent(String(sortBy)));
        }
        if (sortOrder !== undefined) {
            queryParameters.push("sortOrder="+encodeURIComponent(String(sortOrder)));
        }
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

        const response: Observable<HttpResponse<Array<StudyDTO>>> = this.httpClient.get(`${this.basePath}/brapi/v1/studies-search?${queryParameters.join('&')}`, headers);
        if (observe == 'body') {
               return response.map(httpResponse => <Array<StudyDTO>>(httpResponse.response));
        }
        return response;
    }
    /**
     * search studies
     * search studies
     * @param Authorization Access token given
     * @param body JSON format of experiment data
     
     */
    public postStudiesSearch(Authorization: string, body?: StudySearchDTO, observe?: 'body', headers?: Headers): Observable<ResponseFormPOST>;
    public postStudiesSearch(Authorization: string, body?: StudySearchDTO, observe?: 'response', headers?: Headers): Observable<HttpResponse<ResponseFormPOST>>;
    public postStudiesSearch(Authorization: string, body?: StudySearchDTO, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (!Authorization){
            throw new Error('Required parameter Authorization was null or undefined when calling postStudiesSearch.');
        }

        if (Authorization) {
            headers['Authorization'] = String(Authorization);
        }

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        const response: Observable<HttpResponse<ResponseFormPOST>> = this.httpClient.post(`${this.basePath}/brapi/v1/studies-search`, body , headers);
        if (observe == 'body') {
               return response.map(httpResponse => <ResponseFormPOST>(httpResponse.response));
        }
        return response;
    }
}