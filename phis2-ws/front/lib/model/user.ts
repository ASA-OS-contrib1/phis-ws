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
import { Group } from './group';


export interface User { 
    email?: string;
    familyName?: string;
    phone?: string;
    affiliation?: string;
    uri?: string;
    orcid?: string;
    groups?: Array<Group>;
}