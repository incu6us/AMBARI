package org.apache.ambari.view.proxy.helper;

public class ProxyNewAppObject {

    String id;
    float cpus;
    float mem;
    float disk;
    int instances;
    String cmd;
    String image;
    String network;
    boolean privileged;
    String[] portMappings;
    String[] dockerParameters;
    String[] dockerVolumes;
    String[] newappEnv;
    String executor;
    int[] ports;
    String[] uris;
    String[] constraints;

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

    public String getImage() {
        return image;
    }

    public String getNetwork() {
        return network;
    }

    public boolean getPrivileged() {
        return privileged;
    }

    public String[] getPortMappings() {
        return portMappings;
    }

    public String[] getDockerParameters() {
        return dockerParameters;
    }

    public String[] getDockerVolumes() {
        return dockerVolumes;
    }

    public String[] getNewappEnv() {
        return newappEnv;
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

    public String[] getConstraints() {
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

    public void setImage(String value) {
        this.image = value;
    }

    public void setNetwork(String value) {
        this.network = value;
    }

    public void setPrivileged(boolean value) {
        this.privileged = value;
    }

    public void setPortMappings(String[] value) {
        this.portMappings = value;
    }

    public void setDockerParameters(String[] value) {
        this.dockerParameters = value;
    }

    public void setDockerVolumes(String[] value) {
        this.dockerVolumes = value;
    }

    public void setNewappEnv(String[] value) {
        this.newappEnv = value;
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

    public void setConstraints(String[] value) {
        this.constraints = value;
    }

}