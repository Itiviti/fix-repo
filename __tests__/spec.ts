import { Fix42, Fix44, Fix50 } from '../src';
import { Category, Component, Field, Message } from '../src/model';

const fixRepos = [ Fix42, Fix44, Fix50 ];

fixRepos.forEach(fixRepo => {
    describe("For each Fix Repository", () => {
        test.each(fixRepo.categories)('category %s property is not throwing', (category: Category) => {
            expect(category.section);
        });

        test.each(fixRepo.fields)('field %s property is not throwing', (field: Field) => {
            const repoField: any = field.toJSON();

            expect(field.type);
            expect(field.baseCategroy);
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
            component.structures.forEach(structure => {
                expect(structure.type).toBeDefined();
            });
        });

        test('section is defined', () => {
            expect(fixRepo.sections).toBeDefined();
        })
    });
});