import { Fix42, Fix44, Fix50 } from '../src';
import { Category, Component, Field, Group, Message, Structure } from '../src/model';

const fixRepos = [ Fix42, Fix44, Fix50 ];

describe("Example", () => {
    test('Get code value from FIX field', () => {
        const msgType = 'D';

        const msgTypeField = Fix50.getField('35');
        const msgTypeCodeSet = msgTypeField.codeSet;
        const code = msgTypeCodeSet.codes[msgType];

        expect(code.name).toEqual('NewOrderSingle');
    }),

    test('Traverse message structure from message type', () => {
        const msgType = Fix44.getMessage('D');
        msgType.structures.forEach(structureConsumer);
    });
});

function structureConsumer(structure: Structure) {
    const structureType = structure.type;
    if (structureType instanceof Group) {
        // Repeating Group
        const numTag = structureType.numInGroupId;
        const repeatingGroupStructures = structureType.structures;

        expect(numTag).toBeDefined();
        repeatingGroupStructures.forEach(s => structureConsumer(s));

    } else if (structureType instanceof Field) {
        // Field
        expect(structureType.name).toBeDefined();
    } else if (structureType instanceof Component) {
        // Component
        const componentStructures = structureType.structures;
        componentStructures.forEach(s => structureConsumer(s));
    }
}

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
                const structureJson = structure.toJSON();
                expect(structure.type);
                expect(structure.id).toEqual(structureJson.id);
                expect(structure.name).toEqual(structureJson.name);
                expect(structure.required).toEqual(structureJson.required);
                expect(structure.documentation).toEqual(structureJson.documentation);

                expect(message.getStructure(structure.id)).toEqual(structure);
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

                expect(component.getStructure(structure.id)).toEqual(structure);
            });
        });

        test.each(fixRepo.groups)('group %s property is not throwing', (group: Group) => {
            const groupJson = group.toJSON();
            expect(group.id).toEqual(groupJson.id);
            expect(group.name).toEqual(groupJson.name);
            expect(group.abbrName).toEqual(groupJson.abbrName);
            expect(group.documentation).toEqual(groupJson.documentation);
            expect(group.numInGroupId).toEqual(groupJson.numInGroupId);
            expect(group.numInGroupName).toEqual(groupJson.numInGroupName);

            group.structures.forEach(structure => {
                const structureJson = structure.toJSON();
                expect(structure.type);
                expect(structure.id).toEqual(structureJson.id);
                expect(structure.name).toEqual(structureJson.name);
                expect(structure.required).toEqual(structureJson.required);
                expect(structure.documentation).toEqual(structureJson.documentation);

                expect(group.getStructure(structure.id)).toEqual(structure);
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

        test('get unknown message type to be undefined', () => {
            expect(fixRepo.getMessage('unknown')).toBeUndefined();
        })

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