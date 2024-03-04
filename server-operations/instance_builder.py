class InstanceBuilder:
    _command = "gcloud compute instances create-with-container minecraft-server "
    envs = []
    args = []

    def add_envs(self, key: str, value: str):
        self.envs.append(f"{key.upper()}={value}")
        return self
    
    def add_args(self, key: str, value: str):
        self.args.append(f"--{key} {value}")
        return self
    
    def add_meta(self, key: str, value: str):
        self.meta.append(f"{key}={value}")
        return self

    @property
    def command(self) -> str:
        return self._command + " ".join(self.args) + " --container-env " + ",".join(self.envs)
