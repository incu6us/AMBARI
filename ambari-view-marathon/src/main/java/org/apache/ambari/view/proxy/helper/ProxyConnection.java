package org.apache.ambari.view.proxy.helper;

import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.GenericType;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.client.filter.HTTPBasicAuthFilter;
import com.sun.jersey.api.client.filter.LoggingFilter;

/**
 * Created by vpryimak on 23.11.2015.
 */
public class ProxyConnection {
    private Client client;
    private boolean debug = false;
    private ClientResponse response = null;
    private static final Logger LOG = LoggerFactory.getLogger(ProxyConnection.class);

    /**
     * Init new instance
     */
    public ProxyConnection() {
    }

    /**
     * Init new instance with/without debug
     *
     * @param debug
     */
    public ProxyConnection(boolean debug) {
        this.debug = debug;
    }

    /**
     * Get connection
     */
    public Client connectWithoutBasicAuth() {
        client = ClientHelper.createClient();
        if (debug)
            client.addFilter(new LoggingFilter());

        return client;
    }

    /**
     * Get connection with username and password (Basic Authentication)
     *
     * @param username
     * @param password
     */
    public Client connectWithBasicAuth(String username, String password) {
        client = ClientHelper.createClient();
        if (debug)
            client.addFilter(new LoggingFilter());
        client.addFilter(new HTTPBasicAuthFilter(username, password));

        return client;
    }

    /**
     * Use https-connection gets its api object with server address
     */
    public String getApiResponse(String url, String type, Object data) {
//        WebResource webResource = client.resource(server).path(path);
        WebResource webResource = client.resource(url);

        if (type.equals("GET")) {
            response = webResource.header(HttpHeaders.USER_AGENT, "json-proxy").header("Content-type", "application/json").accept(MediaType.APPLICATION_JSON_TYPE).get(ClientResponse.class);
        } else if (type.equals("POST")) {
            response = webResource.header(HttpHeaders.USER_AGENT, "json-proxy").header("Content-type", "application/json").accept(MediaType.APPLICATION_JSON_TYPE).post(ClientResponse.class, data);
        } else if (type.equals("PUT")) {
            response = webResource.header(HttpHeaders.USER_AGENT, "json-proxy").header("Content-type", "application/json").accept(MediaType.APPLICATION_JSON_TYPE).put(ClientResponse.class, data);
        } else if (type.equals("DELETE")) {
            response = webResource.header(HttpHeaders.USER_AGENT, "json-proxy").header("Content-type", "application/json").accept(MediaType.APPLICATION_JSON_TYPE).delete(ClientResponse.class);
        }

        String json_response = response.getEntity(new GenericType<String>() {});
        JSONObject json = new JSONObject();
        try {
            json = (JSONObject) new JSONParser().parse(json_response);
        } catch (ClassCastException e) {
            try {
                json.put("array", new JSONParser().parse(json_response));
            } catch (ParseException e1) {
                LOG.error("JsonArray Parse Error -> " + e1);
            }
        } catch (NullPointerException e) {
            LOG.error("NullPointerException -> " + e);
        } catch (ParseException e) {
            LOG.error("ParseException -> " + e);
        }
        json.put("httpStatusCode", response.getStatus());

        String response_with_status = json.toString();;

        return response_with_status;
    }
}
