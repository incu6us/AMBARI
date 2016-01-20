package com.cisco.handler;

import org.eclipse.jetty.server.handler.ContextHandler;
import org.eclipse.jetty.server.handler.ResourceHandler;

/**
 * @author vpryimak
 */
public class CustomContextResourceHandler extends ContextHandler {

    /**
     * Create custom context with resources
     * @param context - setup context which refers to folder with static data in /resources/content
     * @param isDirectoryListed - is directory listed
     */
    public CustomContextResourceHandler(String context, Boolean isDirectoryListed){
        initHandler(context, isDirectoryListed);
    }

    private void initHandler(String context, Boolean isDirectoryListed){
        // Resources
        ResourceHandler resourceHandler = new ResourceHandler();
        resourceHandler.setDirectoriesListed(isDirectoryListed);
        resourceHandler.setResourceBase(CustomContextResourceHandler.class.getClassLoader().getResource("content/" + context).toExternalForm());

        // Context
        this.setContextPath(context);
        this.setHandler(resourceHandler);
    }
}
