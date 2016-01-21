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
    Object acceptedResourceRoles;
    Object args;
    float backoffFactor;
    int backoffSeconds;
    Object dependencies;
    Object healthChecks;
    Object labels;
    float maxLaunchDelaySeconds;
    boolean requirePorts;
    Object storeUrls;
    Object upgradeStrategy;
    String user;
    String version;
    Object versionInfo;

    public void setAcceptedResourceRoles(Object acceptedResourceRoles) {
        this.acceptedResourceRoles = acceptedResourceRoles;
    }

    public void setArgs(Object args) {
        this.args = args;
    }

    public void setBackoffFactor(float backoffFactor) {
        this.backoffFactor = backoffFactor;
    }

    public void setBackoffSeconds(int backoffSeconds) {
        this.backoffSeconds = backoffSeconds;
    }

    public void setDependencies(Object dependencies) {
        this.dependencies = dependencies;
    }

    public void setHealthChecks(Object healthChecks) {
        this.healthChecks = healthChecks;
    }

    public void setMaxLaunchDelaySeconds(float maxLaunchDelaySeconds) {
        this.maxLaunchDelaySeconds = maxLaunchDelaySeconds;
    }

    public void setLabels(Object labels) {
        this.labels = labels;
    }

    public void setRequirePorts(boolean requirePorts) {
        this.requirePorts = requirePorts;
    }

    public void setStoreUrls(Object storeUrls) {
        this.storeUrls = storeUrls;
    }

    public void setUpgradeStrategy(Object upgradeStrategy) {
        this.upgradeStrategy = upgradeStrategy;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public void setVersionInfo(Object versionInfo) {
        this.versionInfo = versionInfo;
    }

    public Object getAcceptedResourceRoles() {

        return acceptedResourceRoles;
    }

    public Object getArgs() {
        return args;
    }

    public float getBackoffFactor() {
        return backoffFactor;
    }

    public int getBackoffSeconds() {
        return backoffSeconds;
    }

    public Object getDependencies() {
        return dependencies;
    }

    public Object getHealthChecks() {
        return healthChecks;
    }

    public Object getLabels() {
        return labels;
    }

    public float getMaxLaunchDelaySeconds() {
        return maxLaunchDelaySeconds;
    }

    public boolean isRequirePorts() {
        return requirePorts;
    }

    public Object getStoreUrls() {
        return storeUrls;
    }

    public Object getUpgradeStrategy() {
        return upgradeStrategy;
    }

    public String getUser() {
        return user;
    }

    public String getVersion() {
        return version;
    }

    public Object getVersionInfo() {
        return versionInfo;
    }

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