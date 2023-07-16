import { ComponentStory, ComponentMeta } from '@storybook/react';
import Accordion, { IAccordion } from './Accordion';
import { Provider } from 'react-redux';
import { store } from '../../../store/reduxStore';
import React from 'react';

export default {
    title: 'templates/Accordion',
    component: Accordion,
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
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args) => <Accordion {...args} />;

export const Base = Template.bind({});

Base.args = {
    iconId: 'water filter',
    text: 'Фильтрация воды',
    description: `<div>Система коммуникации и&nbsp;взаимодействия с&nbsp;Управляющей компанией через приложение.</div>
            <ol>
              <li>Возможность использования системы домофонии через мобильное приложение.</li>
              <li>Бесконтактный доступ в&nbsp;здание.</li>
              <li>Оформление заявок на&nbsp;гостевые пропуска.</li>
              <li>Формирование QR-кода/PIN-кода для прохода гостей на&nbsp;территорию.</li>
              <li>Интеграция с&nbsp;сервисами партнеров (заказ услуг, рестораны, магазины, клининг).</li>
              <li>Онлайн-доступ к&nbsp;видеокамерам, паркинг, придомовая территория, лифтовой холл.</li>
              <li>Возможность отслеживать потребление ресурсов через мобильное приложение (счетчики воды, электричества и&nbsp;тепла) и&nbsp;оплаты услуг ЖКХ.</li>
              <li>Связь с&nbsp;диспетчерской, подача заявок на&nbsp;разного рода неисправности общедомовых систем, уборки и&nbsp;т.д., а&nbsp;также отслеживание статуса выполнения заявок.</li>
              <li>Информирование жителей о&nbsp;проведении разного рода мероприятий и&nbsp;событий на&nbsp;территории квартала.</li>
            </ol>`,
} as IAccordion;
