import { Fix42, Fix44, Fix50 } from '../src';
import { Category, Component, Field, Message } from '../src/model';

const fixRepos = [ Fix42, Fix44, Fix50 ];

fixRepos.forEach(fixRepo => {
    describe("For each Fix Repository", () => {
        test.each(fixRepo.categories)('category %s property is not throwing', (category: Category) => {
            const categoryJson: any = category.toJSON();

            expect(category.section);
            expect(category.id).toEqual(categoryJson.id);
            expect(category.componentType).toEqual(categoryJson.componentType);
            expect(category.FIXMLFileName).toEqual(categoryJson.FIXMLFileName);
        });

        test.each(fixRepo.fields)('field %s property is not throwing', (field: Field) => {
            const repoField: any = field.toJSON();

            expect(field.type);
            expect(field.baseCategroy);
            expect(field.id).toEqual(repoField.id);
            expect(field.added).toEqual(repoField.added);
            expect(field.addedEP).toEqual(repoField.addedEP);
            expect(field.updated).toEqual(repoField.updated);
            expect(field.updatedEP).toEqual(repoField.updatedEP);
            expect(field.deprecated).toEqual(repoField.deprecated);
            expect(field.deprecatedEP).toEqual(repoField.deprecatedEP);
            expect(field.unionDataType).toEqual(repoField.unionDataType);
            expect(field.lengthId).toEqual(repoField.lengthId);
            expect(field.lengthName).toEqual(repoField.lengthName);
            expect(field.abbrName).toEqual(repoField.abbrName);
            expect(field.issue).toEqual(repoField.issue);
            expect(field.documentation).toEqual(repoField.documentation);
            expect(field.baseCategoryAbbrName).toEqual(repoField.baseCategoryAbbrName);
        });

        test.each(fixRepo.messages)('message %s property is not throwing', (message: Message) => {
            const repoMessage: any = message.toJSON();

            expect(message.category);
            expect(message.id).toEqual(repoMessage.id);
            expect(message.abbrName).toEqual(repoMessage.abbrName);
            expect(message.msgType).toEqual(repoMessage.msgType);
            expect(message.documentation).toEqual(repoMessage.documentation);
            expect(message.section).toEqual(repoMessage.section);
            message.structures.forEach(structure => {
                expect(structure.type).toBeDefined();
            });
        });

        test.each(fixRepo.components)('component %s property is not throwing', (component: Component) => {
            const componentJson = component.toJSON();
            expect(component.id).toEqual(componentJson.id);
            expect(component.name).toEqual(componentJson.name);
            expect(component.abbrName).toEqual(componentJson.abbrName);
            expect(component.documentation).toEqual(componentJson.documentation);

            component.structures.forEach(structure => {
                const structureJson = structure.toJSON();
                expect(structure.type);
                expect(structure.id).toEqual(structureJson.id);
                expect(structure.name).toEqual(structureJson.name);
                expect(structure.required).toEqual(structureJson.required);
                expect(structure.documentation).toEqual(structureJson.documentation);
            });
        });

        test('sections is defined', () => {
            expect(fixRepo.sections).toBeDefined();
        });

        test('codeSets is defined', () => {
            expect(fixRepo.codeSets).toBeDefined();
        });

        test('dataTypes is defined', () => {
            expect(fixRepo.dataTypes).toBeDefined();
        });

        test('get codes from field correctly', () => {
            const field = fixRepo.getField('35');
            expect(field.codeSet.codes.D.name).toEqual('NewOrderSingle');
        });

        test('get unknown field to be undefined', () => {
            expect(fixRepo.getField('unknown')).toBeUndefined();
        });

        test('get unknown category to be undefined', () => {
            expect(fixRepo.getCategory('unknown')).toBeUndefined();
        });

        test('get unknown codeSet to be undefined', () => {
            expect(fixRepo.getCodeSet('unknown')).toBeUndefined();
        });

        test('get unknown component to be undefined', () => {
            expect(fixRepo.getComponent('unknown')).toBeUndefined();
        });

        // in Fix42 there is some dataType exist in field but not in dataType list
        test('get unknown dateType to be unknown', () => {
            expect(fixRepo.getDataType('unknown')).toEqual({
                name: 'unknown'
            });
        });

        test('get unknown section to be undefined', () => {
            expect(fixRepo.getSection('section')).toBeUndefined();
        });
    });
});