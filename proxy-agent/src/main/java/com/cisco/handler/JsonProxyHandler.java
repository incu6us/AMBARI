package com.cisco.handler;

import com.cisco.helper.ProxyConnection;
import org.apache.log4j.Logger;
import org.json.simple.JSONObject;
import org.eclipse.jetty.server.Request;
import org.eclipse.jetty.server.handler.AbstractHandler;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.MediaType;
import java.io.IOException;

/**
 * Created by vpryimak on 20.11.2015.
 *
 *
 */
public class JsonProxyHandler extends AbstractHandler {

    private static final Logger LOG = Logger.getLogger(JsonProxyHandler.class);

    @Override
    public void handle(String s, Request request, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws IOException, ServletException {
        ProxyConnection proxy = new ProxyConnection();
        proxy.connectWithoutBasicAuth();
//        proxy.connectWithBasicAuth("admin", "admin");

        httpServletResponse.setContentType(MediaType.APPLICATION_JSON_TYPE+";charset=utf-8");
        httpServletResponse.setStatus(HttpServletResponse.SC_OK);
        request.setHandled(true);
        try {
            JSONObject json = (JSONObject)new JSONParser().parse(proxy.getApiResponse(request.getParameter("url")));
            LOG.debug(json);
            json.writeJSONString(httpServletResponse.getWriter());
        }catch (NullPointerException e){
            LOG.error(e);
        } catch (ParseException e) {
            LOG.error(e);
        }
    }
}
