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
import { ContactBrapi } from './contactBrapi';


export interface StudyDetails { 
    studyDbId?: string;
    studyName?: string;
    studyTypeDbId?: string;
    studyTypeName?: string;
    studyDescription?: string;
    seasons?: Array<string>;
    commonCropName?: string;
    trialDbId?: string;
    trialName?: string;
    startDate?: string;
    endDate?: string;
    active?: boolean;
    license?: string;
    location?: string;
    contacts?: Array<ContactBrapi>;
    dataLinks?: Array<string>;
    lastUpdate?: Array<string>;
    additionalInfo?: { [key: string]: string; };
    documentationURL?: string;
    studyType?: string;
}