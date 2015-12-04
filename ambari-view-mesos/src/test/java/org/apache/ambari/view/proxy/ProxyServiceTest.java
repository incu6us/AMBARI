package org.apache.ambari.view.proxy;

import org.json.simple.JSONObject;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import javax.ws.rs.core.Response;

import static org.junit.Assert.assertTrue;

/**
 * ProxyService Tester.
 *
 * @author <Authors name>
 * @version 1.0
 * @since <pre>4, 2015</pre>
 */
public class ProxyServiceTest {

    private ProxyService proxyService = new ProxyService();
    private String url = "http://ip.jsontest.com/";
    private JSONObject obj = null;
    private Response resp = null;

    @Before
    public void before() throws Exception {
    }

    @After
    public void after() throws Exception {
    }

    /**
     * Method: getJson(@QueryParam("url") String url)
     */
    @Test
    public void testGetJson() throws Exception {
        obj = proxyService.getJson(url);
        assertTrue(obj.size() > 0);
        assertTrue(obj.containsKey("ip"));
    }

    /**
     * Method: getObject(@QueryParam("url") String url)
     */
    @Test
    public void testGetObject() throws Exception {
        resp = proxyService.getObject(url);
        assertTrue(resp.getStatus() == 200);
    }


} 
