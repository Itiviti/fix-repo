import { Fix42, Fix44, Fix50 } from '../src';

const fixRepos = [ Fix42, Fix44, Fix50 ];

fixRepos.forEach(fixRepo => {
    describe("For each Fix Repository", () => {
        test.each(fixRepo.categories)('category %s property is not throwing', category => {
            expect(category.section);
        });

        test.each(fixRepo.fields)('field %s property is not throwing', field => {
            expect(field.type);
            expect(field.baseCategroy);
        });

        test.each(fixRepo.messages)('message %s property is not throwing', message => {
            expect(message.category);
            message.structures.forEach(structure => {
                expect(structure.type).toBeDefined();
            });
        });

        test.each(fixRepo.components)('component %s property is not throwing', component => {
            component.structures.forEach(structure => {
                expect(structure.type).toBeDefined();
            });
        });
    });
});