import Repository from '../repository';
import { IRepoField } from '../schema';
import { VersionInfo } from './VersionInfo';

export class Field extends VersionInfo {

    private repoField: IRepoField;
    private repo: Repository;

    constructor(repoField: IRepoField, repo: Repository) {
        super(repoField);
        this.repoField = repoField;
        this.repo = repo;
    }

    get id() {
        return this.repoField.id;
    }
    get name() {
        return this.repoField.name;
    }
    get type() {
        if (this.repoField.type.endsWith('CodeSet')) {
            return this.repo.getCodeSet(this.repoField.type);
        }
        return this.repo.getDataType(this.repoField.type);
    }
    get unionDataType() {
        return this.repoField.unionDataType;
    }
    get lengthId() {
        return this.repoField.lengthId;
    }
    get lengthName() {
        return this.repoField.lengthName;
    }
    get abbrName() {
        return this.repoField.abbrName;
    }
    get issue() {
        return this.repoField.issue;
    }
    get documentation() {
        return this.repoField.documentation;
    }
    get baseCategroy() {
        if (this.repoField.baseCategory) {
            return this.repo.getCategory(this.repoField.baseCategory);
        }
        return undefined;
    }
    get baseCategoryAbbrName() {
        return this.repoField.baseCategoryAbbrName;
    }
    public toJSON() {
        return this.repoField;
    }
    public toString() {
        return this.name;
    }
}