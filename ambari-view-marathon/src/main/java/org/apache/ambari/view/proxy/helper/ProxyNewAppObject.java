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
    Array portMappings;
    Array dockerParameters;
    Array dockerVolumes;
    Array newappEnv;
    String executor;
    Array ports;
    Array uris;
    Array constraints;

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

    public Array getPortMappings() {
        return portMappings;
    }

    public Array getDockerParameters() {
        return dockerParameters;
    }

    public Array getDockerVolumes() {
        return dockerVolumes;
    }

    public Array getNewappEnv() {
        return newappEnv;
    }

    public String getExecutor() {
        return executor;
    }

    public Array getPorts() {
        return ports;
    }

    public Array getUris() {
        return uris;
    }

    public Array getConstraints() {
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

    public void setPortMappings(Array value) {
        this.portMappings = value;
    }

    public void setDockerParameters(Array value) {
        this.dockerParameters = value;
    }

    public void setDockerVolumes(Array value) {
        this.dockerVolumes = value;
    }

    public void setNewappEnv(Array value) {
        this.newappEnv = value;
    }

    public void setExecutor(String value) {
        this.executor = value;
    }

    public void setPorts(Array value) {
        this.ports = value;
    }

    public void setUris(Array value) {
        this.uris = value;
    }

    public void setConstraints(Array value) {
        this.constraints = value;
    }

}