package com.cisco.rest;

import com.cisco.pojo.AmbariHostPojo;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Created by incu6us on 1/20/16.
 */
@Path("api")
public class AmabriHostApi {

    @GET
    @Path("getUrl")
    @Produces(MediaType.APPLICATION_JSON)
    public AmbariHostPojo getUrl(){
        try {
            return new AmbariHostPojo(System.getProperties().getProperty("ambariUrl"));
        }catch (NullPointerException e){
            return new AmbariHostPojo("http://localhost:8080");
        }
    }
}
