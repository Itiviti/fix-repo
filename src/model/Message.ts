import { Structure } from '.';
import Repository from '../repository';
import { IRepoMessage } from './../schema';
import { VersionInfo } from './VersionInfo';

export class Message extends VersionInfo {
    private repoMessage: IRepoMessage;
    private repo: Repository;

    constructor(repoMessage: IRepoMessage, repo: Repository) {
        super(repoMessage);
        this.repoMessage = repoMessage;
        this.repo = repo;
    }

    get id() {
        return this.repoMessage.id;
    }
    get name() {
        return this.repoMessage.name;
    }
    get abbrName() {
        return this.repoMessage.abbrName;
    }
    get msgType() {
        return this.repoMessage.msgType;
    }
    get documentation() {
        return this.repoMessage.documentation;
    }
    get structures(): Structure[] {
        return Object.values(this.repoMessage.structures).map(s => new Structure(s, this.repo));
    }
    get category() {
        if (this.repo.hasCategories) {
            return this.repo.getCategory(this.repoMessage.category);
        }
        return this.repoMessage.category;
    }

    get section() {
        return this.repoMessage.section;
    }
    public toJSON() {
        return this.repoMessage;
    }

    public toString() {
        return this.name;
    }
}