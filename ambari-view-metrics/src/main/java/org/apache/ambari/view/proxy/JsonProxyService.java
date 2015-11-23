package org.apache.ambari.view.proxy;

import org.apache.ambari.view.proxy.helper.ProxyConnection;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.*;

/**
 * Created by vpryimak on 23.11.2015.
 */
public class JsonProxyService {

    private static final Logger LOG = LoggerFactory.getLogger(JsonProxyService.class);

    @GET
    @Path("/json")
    @Produces("application/json")
    public JSONObject getJson(@QueryParam("url") String url) {
        ProxyConnection proxy = new ProxyConnection(true);

        proxy.connectWithoutBasicAuth();
        String apiResponse = proxy.getApiResponse(url);

        JSONObject json = null;
        try {
            json = (JSONObject) new JSONParser().parse(apiResponse);
        } catch (NullPointerException e) {
            LOG.error("NullPointerException -> " + e);
        } catch (ParseException e) {
            LOG.error("ParseException -> " + e);
        }

        return json;
    }
}
