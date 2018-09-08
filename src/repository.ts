
import { Category, Component, Field, Message } from './model';
import { IRepo, IRepoCodeSet, IRepoDataType, IRepoSection } from './schema';

export default class Repository {
    private repo: IRepo;

    constructor(repo: IRepo) {
        this.repo = repo;
    }

    public getCategory(key: string) {
        if (!this.repo.categories || !this.repo.categories[key]) {
            return undefined;
        }
        return new Category(this.repo.categories[key], this);
    }

    get hasCategories() {
        return !!this.repo.categories;
    }

    get categories(): Category[] {
        if (!this.hasCategories) {
            return [];
        }
        return Object.values(this.repo.categories!).map(c => new Category(c, this));
    }

    public getCodeSet(key: string) {
        const result = this.repo.codeSets[key];
        if (!result) {
            return undefined;
        }
        return this.repo.codeSets[key];
    }

    get codeSets(): IRepoCodeSet[] {
        return Object.values(this.repo.codeSets);
    }

    public getComponent(key: string) {
        if (!this.repo.components || !this.repo.components[key]) {
            return undefined;
        }
        return new Component(this.repo.components[key], this);
    }

    get components(): Component[] {
        return Object.values(this.repo.components).map(c => new Component(c, this));
    }

    public getDataType(key: string): IRepoDataType {
        if (!this.repo.dataTypes[key]) {
            return {
                name: key
            };
        }
        return this.repo.dataTypes[key];
    }

    get dataTypes(): IRepoDataType[] {
        return Object.values(this.repo.dataTypes);
    }

    public getSection(key: string) {
        if (!this.repo.sections || !this.repo.sections[key]) {
            return undefined;
        }
        return this.repo.sections[key];
    }

    get sections(): IRepoSection[] {
        if (!this.repo.sections) {
            return [];
        }
        return Object.values(this.repo.sections);
    }

    get fields(): Field[] {
        return Object.values(this.repo.fields).map(field => new Field(field, this));
    }

    public getField(tag: string) {
        if (!this.repo.fields[tag]) {
            return undefined;
        }
        return new Field(this.repo.fields[tag], this);
    }

    get messages(): Message[] {
        return Object.values(this.repo.messages).map(message => new Message(message, this));
    }
}
