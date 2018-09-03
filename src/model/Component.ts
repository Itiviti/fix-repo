import { Structure } from '.';
import Repository from '../repository';
import { IRepoComponent } from './../schema';
import { VersionInfo } from './VersionInfo';

export class Component extends VersionInfo {
    private repoComponent: IRepoComponent;
    private repo: Repository;

    constructor(repoComponent: IRepoComponent, repo: Repository) {
        super(repoComponent);
        this.repoComponent = repoComponent;
        this.repo = repo;
    }

    get id() {
        return this.repoComponent.id;
    }
    get name() {
        return this.repoComponent.name;
    }
    get abbrName() {
        return this.repoComponent.abbrName;
    }
    get documentation() {
        return this.repoComponent.documentation;
    }
    get structures() {
        return Object.values(this.repoComponent.structures).map(s => new Structure(s, this.repo));
    }

    public toJSON() {
        return this.repoComponent;
    }

    public toString() {
        return this.name;
    }
}