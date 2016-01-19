package org.apache.ambari.view.proxy.helper;

public class ProxyNewAppObject {

    String id;
    float cpus;
    float mem;
    float disk;
    int instances;
    String cmd;
    Object container;
    Object env;
    String executor;
    int[] ports;
    String[] uris;
    Object constraints;

    public String getId() {
        return id;
    }

    public float getCpus() {
        return cpus;
    }

    public float getMem() {
        return mem;
    }

    public float getDisk() {
        return disk;
    }

    public int getInstances() {
        return instances;
    }

    public String getCmd() {
        return cmd;
    }

    public Object getContainer() {
        return container;
    }

    public Object getEnv() {
        return env;
    }

    public String getExecutor() {
        return executor;
    }

    public int[] getPorts() {
        return ports;
    }

    public String[] getUris() {
        return uris;
    }

    public Object getConstraints() {
        return constraints;
    }

    public void setId(String value) {
        this.id = value;
    }

    public void setCpus(float value) {
        this.cpus = value;
    }

    public void setMem(float value) {
        this.mem = value;
    }

    public void setDisk(float value) {
        this.disk = value;
    }

    public void setInstances(int value) {
        this.instances = value;
    }

    public void setCmd(String value) {
        this.cmd = value;
    }

    public void setContainer(Object value) {
        this.container = value;
    }

    public void setEnv(Object value) {
        this.env = value;
    }

    public void setExecutor(String value) {
        this.executor = value;
    }

    public void setPorts(int[] value) {
        this.ports = value;
    }

    public void setUris(String[] value) {
        this.uris = value;
    }

    public void setConstraints(Object value) {
        this.constraints = value;
    }

}