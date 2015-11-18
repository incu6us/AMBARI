package org.apache.ambari.view.configurator;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.apache.commons.io.IOUtils;
import org.apache.http.client.utils.URIBuilder;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Type;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Andrii Sabitov on 11/4/15.
 */

public class MesosService {

    @GET
    @Path("/metrics/{nodeName}/{portName}")
    @Produces({"text/plain", "application/json"})
    public Response getMetrics(@Context HttpHeaders headers, @Context UriInfo ui, @PathParam("nodeName") String nodeName, @PathParam("portName") int portName) {
        return getResponse(nodeName, portName, "/metrics/snapshot");
    }


    @GET
    @Path("/state/{nodeName}/{portName}")
    @Produces({"text/plain", "application/json"})
    public Response getState(@Context HttpHeaders headers, @Context UriInfo ui, @PathParam("nodeName") String nodeName, @PathParam("portName") int portName) {
        return getResponse(nodeName, portName, "/state.json");
    }

    private Response getResponse(String nodeName, int portName, String uri) {
        MesosNodeResource mesosResource = new MesosNodeResource();
        try {
            mesosResource.setId(nodeName);
            mesosResource.setMetrics(getJsonObject(nodeName, portName, uri));
            mesosResource.setEnabled(true);
        } catch (Exception e) {
            e.printStackTrace();
        }
        String response = new Gson().toJson(mesosResource);
        return Response.ok(response).build();
    }

    private Map<String, Object> getJsonObject(String nodeName, int port, String uri) throws IOException {
        URIBuilder uriBuilder = new URIBuilder();
        uriBuilder.setScheme("http");
        uriBuilder.setHost(nodeName);
        uriBuilder.setPort(port);
        uriBuilder.setPath(uri);
        String url = uriBuilder.toString();

        InputStream in = readFrom(url);
        try {
            Type mapType = new TypeToken<Map<String, Object>>() {
            }.getType();
            return new Gson().fromJson(IOUtils.toString(in, "UTF-8"), mapType);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            in.close();
        }
        return new HashMap<String, Object>();
    }

    private static InputStream readFrom(String spec) throws IOException {
        URLConnection connection = new URL(spec).openConnection();
        connection.setConnectTimeout(5000);
        connection.setDoOutput(true);
        return connection.getInputStream();
    }




}
