import { Fix42, Fix44, Fix50 } from '../src';
import { Category, Component, Field, Message } from '../src/model';

const fixRepos = [ Fix42, Fix44, Fix50 ];

fixRepos.forEach(fixRepo => {
    describe("For each Fix Repository", () => {
        test.each(fixRepo.categories)('category %s property is not throwing', (category: Category) => {
            expect(category.section);
        });

        test.each(fixRepo.fields)('field %s property is not throwing', (field: Field) => {
            expect(field.type);
            expect(field.baseCategroy);
            expect(field.added);
            expect(field.addedEP);
            expect(field.updated);
            expect(field.updatedEP);
            expect(field.deprecated);
            expect(field.deprecatedEP);
        });

        test.each(fixRepo.messages)('message %s property is not throwing', (message: Message) => {
            expect(message.category);
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