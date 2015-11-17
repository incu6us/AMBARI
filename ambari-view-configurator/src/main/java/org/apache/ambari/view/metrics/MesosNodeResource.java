package org.apache.ambari.view.metrics;

import java.util.Map;

/**
 * Created by Andrii Sabitov on 10/24/15.
 */
public class MesosNodeResource {

    private String id;

    private boolean enabled = false;

    private Map<String, Object> metrics;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Map<String, Object> getMetrics() {
        return metrics;
    }

    public void setMetrics(Map<String, Object> metrics) {
        this.metrics = metrics;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}
