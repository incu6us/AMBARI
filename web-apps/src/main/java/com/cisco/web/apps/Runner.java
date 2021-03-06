package com.cisco.web.apps;

import com.cisco.handler.CustomContextResourceHandler;
import com.cisco.handler.JsonProxyHandler;
import org.apache.log4j.Logger;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.ContextHandler;
import org.eclipse.jetty.server.handler.HandlerCollection;
import org.eclipse.jetty.server.handler.ResourceHandler;

import java.util.Properties;

public class Runner {

    private static final Logger LOG = Logger.getLogger(Runner.class);
    private static int port = 8080;

    public static void main(String... args) {

        Properties properties = System.getProperties();

        try {
            if (new Integer(Integer.parseInt(properties.getProperty("port"))) instanceof Integer) {
                port = Integer.parseInt(properties.getProperty("port"));
            }
        } catch (NumberFormatException e) {
            LOG.info("Port was not set. Used default port \""+port+"\".");
        }

        // Handler for multiple web apps
        HandlerCollection handlers = new HandlerCollection();

        Server server = new Server(port);

        // Creating proxy context path
        ContextHandler proxy = new ContextHandler();
        proxy.setContextPath("/json-proxy");
        proxy.setHandler(new JsonProxyHandler());

        CustomContextResourceHandler mesos = new CustomContextResourceHandler("/mesos", false);

        // Handlers collection
        handlers.addHandler(proxy);
        handlers.addHandler(mesos);

        server.setHandler(handlers);

        LOG.info("Starting HTTP Server using port: "+port+" ...");
        try {
            server.start();
            server.join();
            LOG.info("HTTP Server started!");
        } catch (Exception e) {
            LOG.error("Start HTTP server error: " + e);
        }
    }
}
