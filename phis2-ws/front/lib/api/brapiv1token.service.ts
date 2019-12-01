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

import { LogoutDTO } from '../model/logoutDTO';
import { TokenDTO } from '../model/tokenDTO';

import { COLLECTION_FORMATS }  from '../variables';



@injectable()
export class Brapiv1tokenService {
    private basePath: string = 'https://localhost';

    constructor(@inject("IApiHttpClient") private httpClient: IHttpClient,
        @inject("IAPIConfiguration") private APIConfiguration: IAPIConfiguration ) {
        if(this.APIConfiguration.basePath)
            this.basePath = this.APIConfiguration.basePath;
    }
    /**
     * Login
     * Returns an access token when the user is known and it issuer too
     * @param body JSON object needed to login
     
     */
    public getToken(body?: TokenDTO, observe?: 'body', headers?: Headers): Observable<any>;
    public getToken(body?: TokenDTO, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public getToken(body?: TokenDTO, observe: any = 'body', headers: Headers = {}): Observable<any> {
        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        const response: Observable<HttpResponse<any>> = this.httpClient.post(`${this.basePath}/brapi/v1/token`, body , headers);
        if (observe == 'body') {
               return response.map(httpResponse => <any>(httpResponse.response));
        }
        return response;
    }
    /**
     * Log out
     * Disconnect a logged user
     * @param body JSON object needed to login
     
     */
    public logOut(body?: LogoutDTO, observe?: 'body', headers?: Headers): Observable<any>;
    public logOut(body?: LogoutDTO, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public logOut(body?: LogoutDTO, observe: any = 'body', headers: Headers = {}): Observable<any> {
        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        const response: Observable<HttpResponse<any>> = this.httpClient.delete(`${this.basePath}/brapi/v1/token`, body , headers);
        if (observe == 'body') {
               return response.map(httpResponse => <any>(httpResponse.response));
        }
        return response;
    }
}