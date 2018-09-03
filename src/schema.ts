export interface IRepoDocumentation {
    elaboration?: string;
    example?: string;
    synopsis: string;
}

export interface IRepoBase {
    id: string;
    name: string;
}

export interface IRepoVersionInfo {
    added?: string;
    addedEP?: string;
    updated?: string;
    updatedEP?: string;
    deprecated?: string;
    deprecatedEP?: string;
}

export interface IRepoSection extends IRepoBase {
    displayOrder: number;
    volume: string;
    FIXMLFileName: string;
    documentation: IRepoDocumentation;
}

export interface IRepoCategory extends IRepoVersionInfo {
    id: string;
    componentType: string;
    volume: string;
    FIXMLFileName: string;
    includeFile?: string;
    section?: string;
}

export interface IRepoCodeSet extends IRepoBase {
    codes: IRepoCode[];
    documentation?: IRepoDocumentation;
}

export interface IRepoCode extends IRepoBase {
    value: string;
    sort: number;
    issue?: string;
    group?: string;
    documentation: IRepoDocumentation;
}

export interface IRepoComponent extends IRepoBase, IRepoVersionInfo {
    abbrName: string;
    documentation?: IRepoDocumentation;
    structures: { [index: string]: IRepoStructure }
}

export interface IRepoField extends IRepoBase, IRepoVersionInfo {
    type: string,
    lengthId?: string,
    lengthName?: string,
    unionDataType?: string,
    baseCategory?: string,
    baseCategoryAbbrName?: string,
    issue?: string,
    abbrName?: string;
    documentation?: IRepoDocumentation;
}

export interface IRepoStructure extends IRepoBase, IRepoVersionInfo {
    type: string;
    required: boolean;
    documentation?: string;
}

export interface IRepoDataType extends IRepoVersionInfo {
    name: string;
    baseType?: string;
    documentation?: IRepoDocumentation;
    pattern?: string;
    minInclusive?: number;
}

export interface IRepoMessage extends IRepoBase, IRepoVersionInfo {
    msgType: string,
    category: string,
    section?: string,
    abbrName?: string,
    documentation?: IRepoDocumentation;
    structures: { [index: string]: IRepoStructure };
}

export interface IRepo {
    categories?: { [index: string]: IRepoCategory };
    codeSets: { [index: string]: IRepoCodeSet };
    components: { [index: string]: IRepoComponent };
    dataTypes: { [index: string]: IRepoDataType };
    fields: { [index: string]: IRepoField };
    messages: { [index: string]: IRepoMessage };
    sections?: { [index: string]: IRepoSection };
}