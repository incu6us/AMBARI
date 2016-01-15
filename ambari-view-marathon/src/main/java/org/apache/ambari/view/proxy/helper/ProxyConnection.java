package org.apache.ambari.view.proxy.helper;

import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;

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
    public String getApiResponse(String url, String type, String data) {
//        WebResource webResource = client.resource(server).path(path);
        WebResource webResource = client.resource(url);
        if (type == "GET") {
            ClientResponse response = webResource.header(HttpHeaders.USER_AGENT, "json-proxy").accept(MediaType.APPLICATION_JSON_TYPE).get(ClientResponse.class);
        } else if (type == "POST") {
            ClientResponse response = webResource.header(HttpHeaders.USER_AGENT, "json-proxy").accept(MediaType.APPLICATION_JSON_TYPE).post(ClientResponse.class, data);
        } else if (type == "PUT") {
            ClientResponse response = webResource.header(HttpHeaders.USER_AGENT, "json-proxy").accept(MediaType.APPLICATION_JSON_TYPE).put(ClientResponse.class, data);
        } else if (type == "DELETE") {
            ClientResponse response = webResource.header(HttpHeaders.USER_AGENT, "json-proxy").accept(MediaType.APPLICATION_JSON_TYPE).delete(ClientResponse.class);
        };

        return response.getEntity(new GenericType<String>() {
        });
    }
}
