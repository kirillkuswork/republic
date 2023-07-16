import { ComponentStory, ComponentMeta } from '@storybook/react';
import AccordionQa, { IAccordionQa } from './AccordionQa';
import { Provider } from 'react-redux';
import { store } from '../../../store/reduxStore';
import React from 'react';

export default {
    title: 'templates/AccordionQa',
    component: AccordionQa,
    argTypes: {},
    decorators: [
        (story) => (
            <div className={'decorator'}>
                <div>
                    <Provider store={store}>{story()}</Provider>
                </div>
            </div>
        ),
    ],
} as ComponentMeta<typeof AccordionQa>;

const Template: ComponentStory<typeof AccordionQa> = (args) => <AccordionQa {...args} />;

export const Base = Template.bind({});

Base.args = {
  accordionItem: { title: 'СРОЧНЫЙ ВЫКУП В 11 ГОРОДАХ РОССИИ', item: 'Вы получите оценку Вашей недвижимости в день обращения.' }
} as IAccordionQa;
