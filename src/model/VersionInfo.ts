import { IRepoVersionInfo } from './../schema';

export class VersionInfo {

    private versionInfo: IRepoVersionInfo;

    constructor(versionInfo: IRepoVersionInfo) {
        this.versionInfo = versionInfo;
    }

    get added() {
        return this.versionInfo.added;
    }
    get addedEP() {
        return this.versionInfo.addedEP;
    }
    get updated() {
        return this.versionInfo.updated;
    }
    get updatedEP() {
        return this.versionInfo.updatedEP;
    }
    get deprecated() {
        return this.versionInfo.deprecated;
    }
    get deprecatedEP() {
        return this.versionInfo.deprecatedEP;
    }
}