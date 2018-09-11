import { Structure } from '.';
import Repository from '../repository';
import { IRepoGroup } from './../schema';
import { VersionInfo } from './VersionInfo';

export class Group extends VersionInfo {
    private repoGroup: IRepoGroup;
    private repo: Repository;

    constructor(repoGroup: IRepoGroup, repo: Repository) {
        super(repoGroup);
        this.repoGroup = repoGroup;
        this.repo = repo;
    }

    get id() {
        return this.repoGroup.id;
    }
    get name() {
        return this.repoGroup.name;
    }
    get abbrName() {
        return this.repoGroup.abbrName;
    }
    get documentation() {
        return this.repoGroup.documentation;
    }
    get numInGroupId() {
        return this.repoGroup.numInGroupId;
    }
    get numInGroupName() {
        return this.repoGroup.numInGroupName;
    }

    get structures(): Structure[] {
        return Object.values(this.repoGroup.structures).map(s => new Structure(s, this.repo));
    }
    public getStructure(key: string): Structure {
        const structure = this.repoGroup.structures[key];
        return new Structure(structure, this.repo);
    }

    public toJSON() {
        return this.repoGroup;
    }

    public toString() {
        return this.name;
    }
}