import { Component, Field, Group } from '.';
import Repository from '../repository';
import { IRepoStructure } from '../schema';
import { VersionInfo } from './VersionInfo';

export class Structure extends VersionInfo {

    private repoStructure: IRepoStructure;
    private repo: Repository;

    constructor(repoStructure: IRepoStructure, repo: Repository) {
        super(repoStructure);
        this.repoStructure = repoStructure;
        this.repo = repo;
    }

    get id() {
        return this.repoStructure.id;
    }
    get name() {
        return this.repoStructure.name;
    }
    get type(): Field | Component | Group {
        if (this.repoStructure.type === 'fieldRef') {
            return this.repo.getField(this.id)!;
        } else if (this.repoStructure.type === 'componentRef') {
            return this.repo.getComponent(this.id)!;
        } else if (this.repoStructure.type === 'groupRef') {
            return this.repo.getGroup(this.id)!;
        }
        return new Group({
            id: this.id,
            name: this.name,
            numInGroupId: this.repoStructure.numInGroupId!,
            numInGroupName: this.repoStructure.numInGroupName!,
            structures: { }
        }, this.repo);
    }
    get required() {
        return this.repoStructure.required;
    }
    get documentation() {
        return this.repoStructure.documentation;
    }

    public toJSON() {
        return this.repoStructure;
    }
}