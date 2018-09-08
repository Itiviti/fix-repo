import Repository from '../repository';
import { IRepoCategory, IRepoSection } from './../schema';
import { VersionInfo } from './VersionInfo';

export class Category extends VersionInfo {
    private repoCategory: IRepoCategory;
    private repo: Repository;

    constructor(repoCategory: IRepoCategory, repo: Repository) {
        super(repoCategory);
        this.repoCategory = repoCategory;
        this.repo = repo;
    }

    get id() {
        return this.repoCategory.id;
    }
    get FIXMLFileName() {
        return this.repoCategory.FIXMLFileName;
    }
    get componentType() {
        return this.repoCategory.componentType;
    }
    get section(): IRepoSection | undefined {
        if (this.repoCategory.section) {
            return this.repo.getSection(this.repoCategory.section);
        }
        return undefined;
    }

    public toJSON() {
        return this.repoCategory;
    }
    public toString() {
        return this.id;
    }
}