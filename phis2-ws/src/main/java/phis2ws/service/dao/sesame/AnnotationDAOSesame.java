//******************************************************************************
//                                       AnnotationDAOSesame.java
//
// Author(s): Arnaud Charleroy <arnaud.charleroy@inra.fr>
// PHIS-SILEX version 1.0
// Copyright © - INRA - 2018
// Creation date: 14 juin 2018
// Contact: arnaud.charleroy@inra.fr, anne.tireau@inra.fr, pascal.neveu@inra.fr
// Last modification date:  21 juin 2018
// Subject: This class manages operation on annotations in database
//******************************************************************************
package phis2ws.service.dao.sesame;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import org.eclipse.rdf4j.query.BindingSet;
import org.eclipse.rdf4j.query.MalformedQueryException;
import org.eclipse.rdf4j.query.QueryEvaluationException;
import org.eclipse.rdf4j.query.QueryLanguage;
import org.eclipse.rdf4j.query.TupleQuery;
import org.eclipse.rdf4j.query.TupleQueryResult;
import org.eclipse.rdf4j.query.Update;
import org.eclipse.rdf4j.repository.RepositoryException;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import phis2ws.service.configuration.DateFormats;
import phis2ws.service.configuration.URINamespaces;
import phis2ws.service.dao.manager.DAOSesame;
import phis2ws.service.dao.phis.UserDaoPhisBrapi;
import phis2ws.service.documentation.StatusCodeMsg;
import phis2ws.service.utils.sparql.SPARQLQueryBuilder;
import phis2ws.service.resources.dto.AnnotationDTO;
import phis2ws.service.resources.dto.manager.AbstractVerifiedClass;
import phis2ws.service.utils.JsonConverter;
import phis2ws.service.utils.POSTResultsReturn;
import phis2ws.service.utils.UriGenerator;
import phis2ws.service.utils.dates.Dates;
import phis2ws.service.utils.sparql.SPARQLUpdateBuilder;
import phis2ws.service.view.brapi.Status;
import phis2ws.service.view.model.phis.Annotation;

/**
 * This class is a DAO for annotation
 *
 * @author Arnaud Charleroy <arnaud.charleroy@inra.fr>
 */
public class AnnotationDAOSesame extends DAOSesame<Annotation> {

    final static Logger LOGGER = LoggerFactory.getLogger(AnnotationDAOSesame.class);

    private final static URINamespaces NAMESPACES = new URINamespaces();

    final static String TRIPLESTORE_CONTEXT_ANNOTATION = NAMESPACES.getContextsProperty("annotations");

    final static String TRIPLESTORE_RELATION_TYPE = NAMESPACES.getRelationsProperty("type");
    final static String TRIPLESTORE_RELATION_BODYVALUE = NAMESPACES.getRelationsProperty("rBodyValue");
    final static String TRIPLESTORE_RELATION_CREATOR = NAMESPACES.getRelationsProperty("rCreator");
    final static String TRIPLESTORE_RELATION_CREATED = NAMESPACES.getRelationsProperty("rCreated");
    final static String TRIPLESTORE_RELATION_TARGET = NAMESPACES.getRelationsProperty("rTarget");
    final static String TRIPLESTORE_RELATION_MOTIVATED_BY = NAMESPACES.getRelationsProperty("rMotivatedBy");
    final static String TRIPLESTORE_CONCEPT_ANNOTATION = NAMESPACES.getObjectsProperty("cAnnotation");
    final static String TRIPLESTORE_CONCEPT_MOTIVATION = NAMESPACES.getObjectsProperty("cMotivation");
    // Search parameters
    // uri of an annotation eg.  http://www.phenome-fppn.fr/platform/id/annotation/8247af37-769c-495b-8e7e-78b1141176c2
    public String uri;
    public static final String URI = "uri";
    /**
     * Creation date of an annotation. e.g. 2018-08-01 09:34:50.235Z
     * @link https://www.w3.org/TR/annotation-vocab/#dcterms-created
     * SILEX:todo
     * 2018-08-01 09:34:50.235Z format must be change to xsd:DateTime 2018-08-01T09:34:50.235Z
     * \SILEX:todo
     */
    public String creationDate;
    public static final String CREATED = "created";
    /**
     * Comment that describe the annotation. e.g. Ustilago maydis infection
     * @link https://www.w3.org/TR/annotation-model/#string-body
     * Represents the comment aka body value of an annotation
     * */
    public String bodyValue;
    public static final String BODY_VALUE = "bodyValue";
    public static final String BODY_VALUES = "bodyValues";
    // creator of annotations eg. http://www.phenome-fppn.fr/diaphen/id/agent/arnaud_charleroy
    public String creator;
    public static final String CREATOR = "creator";
    // uri that are annoted by one or multiple annotations  eg. http://www.phenome-fppn.fr/diaphen/2017/o1032481
    public String target;
    public static final String TARGET = "target";
    public static final String TARGETS = "targets";
    // motivation instance uri that describe the purpose of the annotation  eg. http://www.w3.org/ns/oa#commenting
    public String motivatedBy;
    public static final String MOTIVATED_BY = "motivatedBy";

    /**
     * Query generated by the searched parameters above (uri, creator,
     * motivatedBy, bodyValue). .e.g. SELECT DISTINCT ?uri WHERE { 
     * ?uri <http://purl.org/dc/terms/creationDate> ?creationDate . 
     * ?uri <http://purl.org/dc/terms/creator> ?creator .
     * ?uri <http://www.w3.org/ns/oa#motivatedBy> ?motivatedBy . 
     * ?uri <http://www.w3.org/ns/oa#bodyValue> ?bodyValue . } 
     * LIMIT 20
     *
     * @return query generated with the searched parameter above
     */
    @Override
    protected SPARQLQueryBuilder prepareSearchQuery() {
        SPARQLQueryBuilder query = new SPARQLQueryBuilder();

        String annotationUri;
        if (uri != null) {
            annotationUri = "<" + uri + ">";
        } else {
            annotationUri = "?" + URI;
            query.appendSelect(annotationUri);
            query.appendGroupBy(annotationUri);
        }

        query.appendSelect("?" + CREATED);
        query.appendGroupBy("?" + CREATED);
        query.appendTriplet(annotationUri, TRIPLESTORE_RELATION_CREATED, "?" + CREATED, null);

        if (creator != null) {
            query.appendTriplet(annotationUri, TRIPLESTORE_RELATION_CREATOR, creator, null);
        } else {
            query.appendSelect("?" + CREATOR);
            query.appendGroupBy("?" + CREATOR);
            query.appendTriplet(annotationUri, TRIPLESTORE_RELATION_CREATOR, "?" + CREATOR, null);
        }

        if (motivatedBy != null) {
            query.appendTriplet(annotationUri, TRIPLESTORE_RELATION_MOTIVATED_BY, motivatedBy, null);
        } else {
            query.appendSelect("?" + MOTIVATED_BY);
            query.appendGroupBy("?" + MOTIVATED_BY);
            query.appendTriplet(annotationUri, TRIPLESTORE_RELATION_MOTIVATED_BY, "?" + MOTIVATED_BY, null);
        }

        query.appendSelectConcat("?" + TARGET, SPARQLQueryBuilder.GROUP_CONCAT_SEPARATOR, "?" + TARGETS);
        query.appendTriplet(annotationUri, TRIPLESTORE_RELATION_TARGET, "?" + TARGET, null);
        if (target != null) {
            query.appendTriplet(annotationUri, TRIPLESTORE_RELATION_TARGET, target, null);
        }

        query.appendSelectConcat("?" + BODY_VALUE, SPARQLQueryBuilder.GROUP_CONCAT_SEPARATOR, "?" + BODY_VALUES);
        query.appendTriplet(annotationUri, TRIPLESTORE_RELATION_BODYVALUE, "?" + BODY_VALUE, null);
        if (bodyValue != null) {
            query.appendFilter("regex(STR(?" + BODY_VALUE + "), '" + bodyValue + "', 'i')");
        }
        LOGGER.debug(SPARQL_SELECT_QUERY + query.toString());
        return query;
    }

    /**
     *
     * @return number of total annotation returned with the search field
     * @inheritdoc
     */
    @Override
    public Integer count() throws RepositoryException, MalformedQueryException, QueryEvaluationException {
        SPARQLQueryBuilder prepareCount = prepareCount();
        TupleQuery tupleQuery = getConnection().prepareTupleQuery(QueryLanguage.SPARQL, prepareCount.toString());
        Integer count = 0;
        try (TupleQueryResult result = tupleQuery.evaluate()) {
            if (result.hasNext()) {
                BindingSet bindingSet = result.next();
                count = Integer.parseInt(bindingSet.getValue(COUNT_ELEMENT_QUERY).stringValue());
            }
        }
        return count;
    }

    /**
     * Count query generated by the searched parameters above (uri, creator,
     * motivatedBy, bodyValue). Must be done to find the total of instances
     * found in the triplestore using this search parameters because the query
     * is paginated (reduce the amount of data retrieved and the time to process
     * data before to send it to the client) SELECT (count(distinct ?uri) as
     * ?count) WHERE { 
     * ?uri <http://purl.org/dc/terms/creationDate> ?creationDate . 
     * ?uri <http://purl.org/dc/terms/creator>
     * <http://www.phenome-fppn.fr/diaphen/id/agent/arnaud_charleroy> . 
     * ?uri <http://www.w3.org/ns/oa#motivatedBy> <http://www.w3.org/ns/oa#commenting> . 
     * ?uri <http://www.w3.org/ns/oa#bodyValue> ?bodyValue . 
     * FILTER (regex(STR(?bodyValue), 'Ustilago maydis infection', 'i') ) 
     * }
     *
     * @return query generated with the searched parameters
     */
    private SPARQLQueryBuilder prepareCount() {
        SPARQLQueryBuilder query = this.prepareSearchQuery();
        query.clearSelect();
        query.clearLimit();
        query.clearOffset();
        query.clearGroupBy();
        query.appendSelect("(count(distinct ?" + URI + ") as ?" + COUNT_ELEMENT_QUERY + ")");
        LOGGER.debug(SPARQL_SELECT_QUERY + " " + query.toString());
        return query;
    }

    /**
     * check and insert the given annotations in the triplestore
     *
     * @param annotations
     * @return the insertion resultAnnotationUri. Message error if errors
     * founded in data the list of the generated uri of the annotations if the
     * insertion has been done
     */
    public POSTResultsReturn checkAndInsert(List<AnnotationDTO> annotations) {
        POSTResultsReturn checkResult = check(annotations);
        if (checkResult.getDataState()) {
            return insert(annotations);
        } else { //errors founded in data
            return checkResult;
        }
    }

    /**
     * insert the given annotations in the triplestore
     *
     * @param annotationsDTO
     * @return the insertion resultAnnotationUri, with the errors list or the
     * uri of the inserted annotations
     */
    public POSTResultsReturn insert(List<AnnotationDTO> annotationsDTO) {
        List<Status> insertStatus = new ArrayList<>();
        List<String> createdResourcesUri = new ArrayList<>();

        POSTResultsReturn results;
        boolean resultState = false;
        boolean annotationInsert = true;

        UriGenerator uriGenerator = new UriGenerator();

        //SILEX:test
        //Triplestore connection has to be checked (this is kind of an hot fix)
        this.getConnection().begin();
        //\SILEX:test

        for (AnnotationDTO annotationDTO : annotationsDTO) {
            Annotation annotation = annotationDTO.createObjectFromDTO();
            annotation.setUri(uriGenerator.generateNewInstanceUri(TRIPLESTORE_CONCEPT_ANNOTATION, null, null));

            SPARQLUpdateBuilder query = prepareInsertQuery(annotation);
            Update prepareUpdate = this.getConnection().prepareUpdate(QueryLanguage.SPARQL, query.toString());
            prepareUpdate.execute();

            createdResourcesUri.add(annotation.getUri());
        }

        if (annotationInsert) {
            resultState = true;
            getConnection().commit();
        } else {
            getConnection().rollback();
        }

        results = new POSTResultsReturn(resultState, annotationInsert, true);
        results.statusList = insertStatus;
        results.setCreatedResources(createdResourcesUri);
        if (resultState && !createdResourcesUri.isEmpty()) {
            results.createdResources = createdResourcesUri;
            results.statusList.add(new Status(StatusCodeMsg.RESOURCES_CREATED, StatusCodeMsg.INFO, createdResourcesUri.size() + " new resource(s) created"));
        }
        if (getConnection() != null) {
            getConnection().close();
        }
        return results;
    }

    /**
     * generates an insert query for annotations. e.g. INSERT DATA {
     * <http://www.phenome-fppn.fr/platform/id/annotation/a2f9674f-3e49-4a02-8770-e5a43a327b37> rdf:type  <http://www.w3.org/ns/oa#Annotation> .
     * <http://www.phenome-fppn.fr/platform/id/annotation/a2f9674f-3e49-4a02-8770-e5a43a327b37> <http://purl.org/dc/terms/creationDate> "2018-06-22 15:18:13+0200"^^xsd:dateTime .
     * <http://www.phenome-fppn.fr/platform/id/annotation/a2f9674f-3e49-4a02-8770-e5a43a327b37> <http://purl.org/dc/terms/creator> http://www.phenome-fppn.fr/diaphen/id/agent/arnaud_charleroy> .
     * <http://www.phenome-fppn.fr/platform/id/annotation/a2f9674f-3e49-4a02-8770-e5a43a327b37> <http://www.w3.org/ns/oa#bodyValue> "Ustilago maydis infection" .
     * <http://www.phenome-fppn.fr/platform/id/annotation/a2f9674f-3e49-4a02-8770-e5a43a327b37> <http://www.w3.org/ns/oa#hasTarget> <http://www.phenome-fppn.fr/diaphen/id/agent/arnaud_charleroy> . 
     * 
     * @param annotation
     * @return the query
     */
    private SPARQLUpdateBuilder prepareInsertQuery(Annotation annotation) {
        SPARQLUpdateBuilder query = new SPARQLUpdateBuilder();

        query.appendGraphURI(TRIPLESTORE_CONTEXT_ANNOTATION);
        query.appendTriplet(annotation.getUri(), TRIPLESTORE_RELATION_TYPE, NAMESPACES.getObjectsProperty("cAnnotation"), null);
        DateTimeFormatter formatter = DateTimeFormat.forPattern(DateFormats.YMDTHMSZ_FORMAT);
        query.appendTriplet(annotation.getUri(), TRIPLESTORE_RELATION_CREATED, "\"" + annotation.getCreated().toString(formatter) + "\"^^xsd:dateTime", null);
        query.appendTriplet(annotation.getUri(), TRIPLESTORE_RELATION_CREATOR, annotation.getCreator(), null);

        query.appendTriplet(annotation.getUri(), TRIPLESTORE_RELATION_MOTIVATED_BY, annotation.getMotivatedBy(), null);

        /**
         * @link https://www.w3.org/TR/annotation-model/#bodies-and-targets
         */
        if (annotation.getBodiesValue() != null && !annotation.getBodiesValue().isEmpty()) {
            for (String annotbodyValue : annotation.getBodiesValue()) {
                query.appendTriplet(annotation.getUri(), TRIPLESTORE_RELATION_BODYVALUE, "\"" + annotbodyValue + "\"", null);
            }
        }
        /**
         * @link https://www.w3.org/TR/annotation-model/#bodies-and-targets
         */
        if (annotation.getTargets() != null && !annotation.getTargets().isEmpty()) {
            for (String targetUri : annotation.getTargets()) {
                query.appendTriplet(annotation.getUri(), TRIPLESTORE_RELATION_TARGET, targetUri, null);
            }
        }
        LOGGER.debug(getTraceabilityLogs() + " query : " + query.toString());
        return query;
    }

    /**
     * check the given annotations's metadata
     *
     * @param annotations
     * @return the resultAnnotationUri with the list of the errors founded
     * (empty if no error founded)
     */
    public POSTResultsReturn check(List<AnnotationDTO> annotations) {
        POSTResultsReturn check = null;
        //list of the returned results
        List<Status> checkStatus = new ArrayList<>();
        boolean dataOk = true;

        UriDaoSesame uriDao = new UriDaoSesame();
        UserDaoPhisBrapi userDao = new UserDaoPhisBrapi();

        //1. check data
        for (AnnotationDTO annotation : annotations) {
            //1.1 check required fields
            if ((boolean) annotation.isOk().get(AbstractVerifiedClass.STATE)) {
                try {
                    //1.2 check motivation
                    if (annotation.getMotivatedBy() == null || !uriDao.existObject(annotation.getMotivatedBy()) || !uriDao.isInstanceOf(annotation.getMotivatedBy(), TRIPLESTORE_CONCEPT_MOTIVATION)) {
                        dataOk = false;
                        checkStatus.add(new Status(StatusCodeMsg.DATA_ERROR, StatusCodeMsg.ERR, StatusCodeMsg.WRONG_VALUE + " for the motivatedBy field"));
                    }

                    //1.3 check if person exist // PostgresQL
                    if (!userDao.existUserUri(annotation.getCreator())) {
                        dataOk = false;
                        checkStatus.add(new Status(StatusCodeMsg.UNKNOWN_URI, StatusCodeMsg.ERR, StatusCodeMsg.WRONG_VALUE + " for person uri"));
                    }

                    //1.4 check if target exist
                    for (String target : annotation.getTargets()) {
                        if (target.isEmpty()) {
                            dataOk = false;
                            checkStatus.add(new Status(StatusCodeMsg.UNKNOWN_URI, StatusCodeMsg.ERR, "Unknown target uri"));
                        }
                    }

                } catch (Exception ex) {
                    LOGGER.error("Data check error", ex);
                }
            } else { //Missing required fields
                dataOk = false;
                Map<String, Object> fieldsNotValid = annotation.isOk();
                fieldsNotValid.remove(AbstractVerifiedClass.STATE);
                checkStatus.add(new Status(StatusCodeMsg.BAD_DATA_FORMAT, StatusCodeMsg.ERR, new StringBuilder().append(StatusCodeMsg.MISSING_FIELDS_LIST).append(fieldsNotValid).toString()));
            }
        }

        check = new POSTResultsReturn(dataOk, null, dataOk);
        check.statusList = checkStatus;
        return check;
    }

    /**
     * search all the annotations corresponding to the search params given by
     * the user (uri, creator, motivatedBy, bodyValue)
     *
     * @return the list of the annotations which match the given search params
     * (uri, creator, motivatedBy, bodyValue).
     */
    public ArrayList<Annotation> allPaginate() {
        // retreve uri list
        SPARQLQueryBuilder query = prepareSearchQuery();
        TupleQuery tupleQuery = getConnection().prepareTupleQuery(QueryLanguage.SPARQL, query.toString());
        ArrayList<Annotation> annotations = new ArrayList<>();

        // Retreive all informations
        // for each uri
        try (TupleQueryResult resultAnnotationUri = tupleQuery.evaluate()) {
            annotations = getAnnotationsFromResult(resultAnnotationUri);
        }

        LOGGER.debug(JsonConverter.ConvertToJson(annotations));
        return annotations;
    }

    /**
     * get a annotation result from a given resultAnnotationUri. Assume that the
     * following attributes exist : uri, creator, creationDate, bodyValue,
     * target
     *
     * @param result a list of annotation from a search query
     * @return a list of annotations with data extracted from the given
     * bindingSets
     */
    private ArrayList<Annotation> getAnnotationsFromResult(TupleQueryResult result) {
        ArrayList<Annotation> annotations = new ArrayList<>();

        while (result.hasNext()) {
            Annotation annotation = new Annotation();
            BindingSet bindingSet = result.next();
       
            if (this.uri != null) {
                annotation.setUri(this.uri);
            } else {
                if(bindingSet.getValue(URI) != null){
                    annotation.setUri(bindingSet.getValue(URI).stringValue());
                }
            }
            //SILEX:info
            // This test is made because group concat function in the query can create empty row
            // e.g.
            // Uri Created Creator MotivatedBy Targets	BodyValues
            //                                 ""       ""
            //\SILEX:info
            if (annotation.getUri() != null) {
                // creationDate date
                String creationDate = bindingSet.getValue(CREATED).stringValue();
                DateTime stringToDateTime = Dates.stringToDateTimeWithGivenPattern(creationDate, DateFormats.YMDTHMSZ_FORMAT);
                annotation.setCreated(stringToDateTime);

                if (creator != null) {
                    annotation.setCreator(creator);
                } else {
                    annotation.setCreator(bindingSet.getValue(CREATOR).stringValue());
                }

                if (bindingSet.getValue(BODY_VALUES) != null) {
                    //SILEX:info
                    // concat query return a list with comma separated value in one column
                    //\SILEX:info
                    ArrayList<String> bodies = new ArrayList<>(Arrays.asList(bindingSet.getValue(BODY_VALUES).stringValue().split(SPARQLQueryBuilder.GROUP_CONCAT_SEPARATOR)));
                    if (annotation.getBodiesValue() != null
                            && !annotation.getBodiesValue().isEmpty()) {
                        annotation.setBodiesValue(bodies);
                    } else {
                        annotation.setBodiesValue(bodies);
                    }
                }

                if (motivatedBy != null) {
                    annotation.setMotivatedBy(motivatedBy);
                } else {
                    annotation.setMotivatedBy(bindingSet.getValue(MOTIVATED_BY).stringValue());
                }

                //SILEX:info
                // concat query return a list with comma separated value in one column.
                // An annotation has a least one target.
                //\SILEX:info
                ArrayList<String> targets = new ArrayList<>(Arrays.asList(bindingSet.getValue(TARGETS).stringValue().split(SPARQLQueryBuilder.GROUP_CONCAT_SEPARATOR)));
                if (annotation.getTargets() != null
                        && !annotation.getTargets().isEmpty()) {
                    annotation.setTargets(targets);
                } else {
                    annotation.setTargets(targets);
                }
                annotations.add(annotation);
            }
        }
        return annotations;
    }
}
