import { ComponentStory, ComponentMeta } from '@storybook/react';
import SimpleCard from './SimpleCard';
import React from 'react';
import { ArgsTable, Description, Primary, PRIMARY_STORY, Stories, Subtitle, Title } from '@storybook/addon-docs';

export default {
    title: 'cards/SimpleCard',
    component: SimpleCard,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Subtitle />
                    <Description>
                        Обязательным пропсом является только theme, style и children переданы для красивой отрисовки примера. Помимо theme,
                        можно передать любые пропсы дива из React.ComponentProps&lt;'div'&gt;. При передаче className, если в переданном
                        классе есть те же свойства что в theme, они перезапишутся (в html будет class="theme-class your-class")
                    </Description>
                    <Primary />
                    <ArgsTable story={PRIMARY_STORY} />
                    <Stories />
                </>
            ),
        },
    },
} as ComponentMeta<typeof SimpleCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SimpleCard> = (args) => <SimpleCard {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const LightCard = Template.bind({});
LightCard.args = {
    theme: 'light',
    style: { width: '300px', height: '200px' },
    children: (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            <span>Text</span>
        </div>
    ),
};
