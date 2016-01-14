package org.apache.ambari.view.proxy;

import org.apache.ambari.view.proxy.helper.ProxyConnection;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
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

    /**
     * Method for proxying json objects
     *
     * @param url
     * @return
     */
    @GET
    @POST
    @Path("/json")
    @Produces(MediaType.APPLICATION_JSON)
    public JSONObject getJson(@QueryParam("url") String url) {

        ProxyConnection proxy = new ProxyConnection(false);
        proxy.connectWithoutBasicAuth();
        String apiResponse = proxy.getApiResponse(url);

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
}
