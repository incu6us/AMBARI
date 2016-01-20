package org.apache.ambari.view.proxy;

import org.apache.ambari.view.proxy.helper.ProxyConnection;
import org.apache.ambari.view.proxy.helper.ProxyNewAppObject;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

/**
 * Created by vpryimak on 23.11.2015.
 */
public class ProxyService {

    private static final Logger LOG = LoggerFactory.getLogger(ProxyService.class);

    @POST
    @Path("/json")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public JSONObject postJson(@QueryParam("url") String url, ProxyNewAppObject data) {
        return json(url, HttpMethod.POST, data);
    }

    @PUT
    @Path("/json")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public JSONObject putJson(@QueryParam("url") String url, ProxyNewAppObject data) {
        return json(url, HttpMethod.PUT, data);
    }

    @DELETE
    @Path("/json")
    @Produces(MediaType.APPLICATION_JSON)
    public JSONObject deleteJson(@QueryParam("url") String url, @QueryParam("data") String data) {
        return json(url, HttpMethod.DELETE, data);
    }


    @GET
    @Path("/json")
    @Produces(MediaType.APPLICATION_JSON)
    public JSONObject getJson(@QueryParam("url") String url, @QueryParam("data") String data) {
        return json(url, HttpMethod.GET, data);
    }

    /**
     * Method for proxying some content (files)
     *
     * @param url
     * @return
     * @throws IOException
     */
    @GET
    @Path("/object")
    public Response getObject(@QueryParam("url") String url) throws IOException {

        URL urlEndpoint = new URL(url);
        URLConnection connection = urlEndpoint.openConnection();
        InputStream is = connection.getInputStream();

        String filename = url.replaceAll("(.*)/(.*)", "$2");

        Response.ResponseBuilder response = Response.ok(is);
        response.header("Content-Disposition", "attachment; filename=\"" + filename + "\"");
        return response.build();
    }

    /**
     * Method for proxying json objects
     *
     * @param url
     * @return
     */
    private JSONObject json (String url, String httpMethod, Object data){
        ProxyConnection proxy = new ProxyConnection(false);
        proxy.connectWithoutBasicAuth();
        String apiResponse = proxy.getApiResponse(url, httpMethod, data);

        JSONObject json = new JSONObject();
        try {
            json = (JSONObject) new JSONParser().parse(apiResponse);
        } catch (ClassCastException e) {
            try {
                json.put("array", new JSONParser().parse(apiResponse));
            } catch (ParseException e1) {
                LOG.error("JsonArray Parse Error -> " + e1);
            }
        } catch (NullPointerException e) {
            LOG.error("NullPointerException -> " + e);
        } catch (ParseException e) {
            LOG.error("ParseException -> " + e);
        }

        return json;
    }
}
