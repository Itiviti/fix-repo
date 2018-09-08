import { Category } from '.';
import Repository from '../repository';
import { IRepoCodeSet, IRepoDocumentation, IRepoField } from '../schema';
import { IRepoDataType } from './../schema';
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
    get type(): IRepoCodeSet | IRepoDataType {
        const codeSet = this.codeSet;
        if (codeSet) {
            return codeSet;
        }
        return this.repo.getDataType(this.repoField.type);
    }
    get unionDataType() {
        return this.repoField.unionDataType;
    }
    get codeSet(): IRepoCodeSet | undefined {
        if (this.repoField.type.endsWith('CodeSet')) {
            return this.repo.getCodeSet(this.repoField.type);
        }
        return undefined;
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
    get documentation(): IRepoDocumentation | undefined {
        return this.repoField.documentation;
    }
    get baseCategroy(): Category | undefined {
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