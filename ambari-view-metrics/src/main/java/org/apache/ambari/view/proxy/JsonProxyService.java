package org.apache.ambari.view.proxy;

import org.apache.ambari.view.proxy.helper.ProxyConnection;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

/**
 * Created by vpryimak on 23.11.2015.
 */
public class JsonProxyService {

    private static final Logger LOG = LoggerFactory.getLogger(JsonProxyService.class);

    @GET
    @Path("/proxy/{url}")
    @Produces("application/json")
    public String getJson(@PathParam("url") String url) {
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

        return json.toJSONString();
    }
}
