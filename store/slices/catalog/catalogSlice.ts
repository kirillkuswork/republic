import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import calcTheLargest from '../../../tools/calc-the-largest';
import calcTheLeast from '../../../tools/calc-the-least';
import booleanSwitch from '../../../tools/boolean-switch';
import getSelectedParams from '../../../tools/get-selected-params';
import resetSortingParameter from '../../../tools/reset-sorting-parameter';
import changeStudioValue from '../../../tools/change-studio-value';
import sortNumber from '../../../tools/sort-number';
import sortAbc from '../../../tools/sort-abc';
import constants from '../../../constants/API';
import {
    checkboxesType,
    slidersType,
    IFilterParamType,
    ISortFlats,
} from '../../../models';
import { IApiCatalogFlat } from '../../api/apiTypes';
import { IDropdownValue, IFlatsSliceState } from './catalogSliceTypes';
import { fetchCatalog, flatCheck } from '../../api/api';
import { MultiValue } from 'react-select';
import editPriceInMillions from '../../../tools/edit-price-in-millions';

const refreshLocalStorage = (favoriteList: IApiCatalogFlat[]) => {
    localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
};

let initialState: IFlatsSliceState = {
    urls: {
        getResidential: {
            url: constants.urlCatalog,
            initial: false,
            status: 'pending',
            error: null,
        },
    },
    //Параметры фильтрации по чекбоксу
    filterParameters: {
        byCheckbox: {
            redPrice: [{ name: 'Квартира по акции', value: true, active: false }],
            rooms: [
                { name: 'st', value: '0', active: false, disabled: false },
                { name: '1br', value: '1', active: false, disabled: false },
                { name: '2br', value: '2', active: false, disabled: false },
                { name: '3br', value: '3', active: false, disabled: false },
                { name: '4br', value: '4', active: false, disabled: false },
            ],
            houseName: [
                { name: 'reds', value: 'reds', active: false, disabled: false },
                { name: 'platinum', value: 'platinum', active: false, disabled: false },
                { name: 'purple', value: 'purple', active: false, disabled: true },
                { name: 'whites', value: 'whites', active: false, disabled: true },
                { name: 'brown', value: 'brown', active: false, disabled: true },
                { name: 'green', value: 'green', active: false, disabled: true },
                { name: 'silver', value: 'silver', active: false, disabled: true },
                { name: 'gold', value: 'gold', active: false, disabled: true },
            ],
            advantages: [
                { name: 'Окно в ванной', value: 'oknoVVannoj', active: false, empty: null, disabled: false },
                { name: 'Потолки выше 3м', value: 'highCeiling', active: false, empty: null, disabled: false },
                { name: 'Французский балкон', value: 'frenchBalcony', active: false, empty: null, disabled: false },
                // { name: 'Ванна', value: 'bath', active: false, empty: null, disabled: false },
                { name: 'Два и более санузла', value: 'bathrooms', active: false, empty: null, disabled: false },
                { name: 'Постирочная', value: 'laundry', active: false, empty: null, disabled: false },
                { name: 'Мастер-спальня', value: 'masterBedroom', active: false, empty: null, disabled: false },
                // { name: 'Не первый этаж', value: 'notfirstfloor', active: false, empty: null, disabled: false },
                { name: 'Вид на восток', value: 'roomOnEast', active: false, empty: null, disabled: false },
                { name: 'Вид на север', value: 'roomOnNorth', active: false, empty: null, disabled: false },
                { name: 'Вид на юг', value: 'roomOnSouth', active: false, empty: null, disabled: false },
                { name: 'Вид на запад', value: 'roomOnWest', active: false, empty: null, disabled: false },
                { name: 'Балкон', value: 'balcony', active: false, empty: null, disabled: false },
                { name: 'Угловое остекление', value: 'cornerGlazing', active: false, empty: null, disabled: false },
                // { name: 'Камин', value: 'fireplace', active: false, empty: null, disabled: false },
                { name: 'Кухня-гостиная', value: 'livingKitchen', active: false, empty: null, disabled: false },
                { name: 'Лоджия', value: 'loggia', active: false, empty: null, disabled: false },
                { name: 'Панорамное остекление', value: 'panoramicGlazing', active: false, empty: null, disabled: false },
                { name: 'Патио', value: 'patio', active: false, empty: null, disabled: false },
                // { name: 'Пентхаус', value: 'penthouse', active: false, empty: null, disabled: false },
                // { name: 'Вид на реку', value: 'vidNaReku', active: false, empty: null, disabled: false },
                { name: 'Вид во двор', value: 'vidVoDvor', active: false, empty: null, disabled: false },
                { name: 'Вид на парк', value: 'vidNaPark', active: false, empty: null, disabled: false },
                // { name: 'Сауна', value: 'sauna', active: false, empty: null, disabled: false },
                { name: 'Терраса', value: 'terrace', active: false, empty: null, disabled: false },
                { name: 'Гардеробная', value: 'dressingRoom', active: false, empty: null, disabled: false },
                { name: 'Кабинет', value: 'cabinet', active: false, empty: null, disabled: false },
                { name: 'Окна на 1 сторону', value: 'oknaNa1Storony', active: false, empty: null, disabled: false },
                { name: 'Окна на 2 стороны', value: 'oknaNa2Storony', active: false, empty: null, disabled: false },
                { name: 'Окна на 3 стороны', value: 'oknaNa3Storony', active: false, empty: null, disabled: false },
            ],
            finish: [
                { name: 'White Box', value: 'whiteBox', active: false, empty: null, disabled: false },
                { name: 'Без отделки', value: 'woWhitebox', active: false, empty: null, disabled: false },
            ],
        },
        allAdvantages: [],
        advantagesSvgIcons: [
            'oknoVVannoj',
            'highCeiling',
            'cornerGlazing',
            // 'fireplace',
            'livingKitchen',
            'loggia',
            'cabinet',
            'bathrooms',
            'panoramicGlazing',
            // 'patio',
            // 'penthouse',
            // 'vidNaReku',
            'vidVoDvor',
            'vidNaPark',
            // 'sauna',
            'terrace',
            'dressingRoom',
            'balcony',
            'frenchBalcony',
            // 'bath',
            // 'countOfBathrooms',
            'laundry',
            'masterBedroom',
            // 'notfirstfloor',
            'roomOnEast',
            'roomOnNorth',
            'roomOnSouth',
            'roomOnWest',
            'oknaNa1Storony',
            'oknaNa2Storony',
            'oknaNa3Storony',
        ],
        selectedParams: {},

        //Значения ползунков в фильтре по умолчанию
        initialValues: {
            area: [0, 10],
            price: [0, 10],
            floor: [0, 10],
        },
        //Возможные параметры фильтрации
        params: ['floor', 'price', 'area'],
        //Параметры, которые были выбраны пользователем
        interactedParams: {
            floor: {
                min: false,
                max: false
            },
            price: {
                min: false,
                max: false
            },
            area: {
                min: false,
                max: false
            }
        },
        //Выбранные параметры для отображения на странице в кнопках сброса
        ableToResetParams: {
            houseName: [],
            rooms: [],
            floor: [],
            area: [],
            price: [],
            advantages: [],
            finish: [],
        },
        inactiveSliders: {
            floor: false,
            price: false,
            area: false,
        },
        //Текущие значения слайдеров
        slidersValues: {
            area: [0, 10],
            price: [0, 10],
            floor: [0, 10],
        },
        //Крайние значения слайдеров
        slidersExtremeValues: {
            area: [0, 10],
            price: [0, 10],
            floor: [0, 10],
        },
        //Значения инпутов
        inputsValues: {
            area: [0, 10],
            price: [0, 10],
            floor: [0, 10],
        },
    },
    //Возможные параметры фильтрации
    params: ['floor', 'price', 'area'],
    amountOfSelectedParams: 0,
    amountSelectedRooms: 0,
    amountSelectedHouseName: 0,
    amountSelectedAdvantages: 0,
    amountSelectedFinish: 0,
    amountSelectedRange: {
        floor: 0,
        price: 0,
        area: 0,
    },
    //Колонки таблицы для сортировки
    sortColumns: {
        scheme: 'План',
        number: 'Кв. №',
        rooms: 'Спальни',
        area: 'Площадь',
        floor: 'Этаж',
        section_number: 'Секция',
        houseName: 'Дом',
        finish: 'Отделка',
        advantages: 'Особенности',
        price: 'Цена',
    },
    //Текущий параметр сортировки
    sortParameters: {
        value: 'area',
        direction: 'asc_',
    },
    //Опции для сортировки выпадающим списком (мобилка)
    dropdownOptions: [
        { value: 'asc-price', label: 'По возрастанию цены' },
        { value: 'dec-price', label: 'По убыванию цены' },
        { value: 'asc-rooms', label: 'По возрастанию числа спален' },
        { value: 'dec-rooms', label: 'По убыванию числа спален' },
        { value: 'asc-area', label: 'По возрастанию площади' },
        { value: 'dec-area', label: 'По убыванию площади' },
        { value: 'asc-floor', label: 'По возрастанию этажа' },
        { value: 'dec-floor', label: 'По убыванию этажа' },
        { value: 'asc-houseName', label: 'По домам от A до Z' },
        { value: 'dec-houseName', label: 'По домам от Z до A' },
        { value: 'asc-number', label: 'По возрастанию номера' },
        { value: 'dec-number', label: 'По убыванию номера' },
        { value: 'with-whitebox', label: 'Сначала с White Box' },
        { value: 'without-whitebox', label: 'Сначала без отделки' },
    ],
    //Текущая опция сортировки
    selectedOption: { value: 'asc-area', label: 'По возрастанию площади' },
    potentialUniqueAttributesFlat: [''],
    //Места вызова функции
    //по клику на заголовок столбца таблицы
    inTableHead: 'inTableHead',
    //после изменения состояния формы
    inForm: 'inForm',
    //Сокращение диапазона фильтрации?
    rangeReduction: false,
    //Пагинация каталога на мобике
    countPage: 1,
    perPage: 5,
    bulks: [],
    currentBulk: 'reds',
    currentBulkId: 0,
    currentFloor: 0,
    currentFlat: 0,
    //Квартиры, которые выводятся на страницу
    shownFlats: [],
    //Все квартиры, взятые с сервера
    allFlats: [],
    favoriteList: [],
    //Квартиры после фильтрации чекбоксами
    filteredByCheckboxFlats: [],
    //Список айдишников свободных квартир из тех, что хранились в избранном
    freeFlatsId: [],
    //Отфильтрован список квартир?
    isFiltered: null,
    //Особенности выбранной квартиры
    currentAdvantages: [],
    //Статус квартиры
    flatStatus: {
        free: 'free',
        reserve: 'reserve',
    },
    onlyPromo: false,
};

const catalogSlice = createSlice({
    name: 'flatsSlice',
    initialState,
    reducers: {
        //Получение минимальных и максимальных параметров для фильтрации по range-слайдерам
        setExtremeSlidersValues(state: IFlatsSliceState ) {
            if (state.allFlats.length === 0) {
                state.filterParameters.params.forEach(param => {
                    let maxParam = state.filterParameters.initialValues[param][1],
                        minParam = state.filterParameters.initialValues[param][0];

                    state.filterParameters.slidersExtremeValues[param] = [minParam, maxParam];
                    state.filterParameters.slidersValues[param] = [minParam, maxParam];
                    state.filterParameters.inputsValues[param] = [minParam, maxParam];
                })
            }

            // Расчет максимумов и минимумов для слайдеров с обновленными данными
            state.filterParameters.params.forEach(param => {
                const interactedParams = state.filterParameters.interactedParams[param]

                let maxParam = calcTheLargest(state.shownFlats, param),
                    minParam = calcTheLeast(state.shownFlats, param, maxParam)

                if (minParam === maxParam && minParam !== 0) {
                    const [initialMinParam, initialMaxParam] = state.filterParameters.initialValues[param];

                    if (!interactedParams.min) {
                        state.filterParameters.slidersValues[param][0] = initialMinParam;
                        state.filterParameters.inputsValues[param][0] = Math.floor(minParam);
                        state.filterParameters.slidersExtremeValues[param][0] = initialMinParam;
                    }

                    if (!interactedParams.max) {
                        state.filterParameters.slidersValues[param][1] = initialMaxParam;
                        state.filterParameters.inputsValues[param][1] = Math.ceil(maxParam);
                        state.filterParameters.slidersExtremeValues[param][1] = initialMaxParam;
                    }

                    if (!interactedParams.min && !interactedParams.max) {
                        state.filterParameters.inactiveSliders[param] = true;
                    }

                } else if (minParam !== 0 && minParam !== maxParam) {
                    state.filterParameters.inactiveSliders[param] = false;

                    if (!interactedParams.min) {
                        state.filterParameters.slidersValues[param][0] = Math.floor(+minParam);
                        state.filterParameters.inputsValues[param][0] = Math.floor(+minParam);
                        state.filterParameters.slidersExtremeValues[param][0] = Math.floor(+minParam);
                    }

                    if (!interactedParams.max) {
                        state.filterParameters.slidersValues[param][1] = Math.ceil(maxParam);
                        state.filterParameters.inputsValues[param][1] = Math.ceil(maxParam);
                        state.filterParameters.slidersExtremeValues[param][1] = Math.ceil(maxParam);
                    }
                }
            })
        },

        checkRelevantAttributes(state: IFlatsSliceState) {
            //Делаем все характеристики пустыми
            const advantages = state.filterParameters.byCheckbox.advantages.map(item =>
                ({value: item.value, empty: true})
            );

            //Если характеристика заполнена хотя бы у одной квартиры, то делаем её не пустой
            for (let i = 0; i < state.allFlats.length; i++) {
                const flat = state.allFlats[i];

                Object.keys(flat.attributes).forEach(key => {
                    if (flat.attributes[key]) {
                        advantages.forEach(item => {
                            if (item.value === key) {
                                item.empty = false;
                            }
                        })
                    }
                })
            }

            state.filterParameters.byCheckbox.advantages =
                state.filterParameters.byCheckbox.advantages
                    .filter((item, index) => !advantages[index].empty);
        },

        //Обновить значения для отображения в изменяемом range-слайдере
        updateInputValues(state: IFlatsSliceState, action) {
            const slider = action.payload.slider as 'floor' | 'area' | 'price';
                //Записываем новые значения в активный слайдер
            state.filterParameters.inputsValues[slider] = [+action.payload.values[0], +action.payload.values[1]];
        },

        //Обновить значения для расчетов в изменяемом range-слайдере
        updateSliderValues(state: IFlatsSliceState, action) {
            const slider = action.payload.slider as 'floor' | 'area' | 'price';
            //Проверка на изменение значений - если значения отличаются от максимальных/минимальных, то
            //пользователь взаимодействовал с ползунками, записываем это в interactedParams и
            //записываем новые значения в slidersValues
            //иначе - пользователь вернул значения в исходное положение, записываем false в interactedParams
            //и записываем значения из initialValues в slidersValues
            const newSliderValues = [+action.payload.values[0], +action.payload.values[1]]
            const extremeValues = state.filterParameters.slidersExtremeValues[slider]
            const initialValues = state.filterParameters.initialValues[slider]
            const newValuesAreEqual = newSliderValues[0] === newSliderValues[1] ;

            newSliderValues.forEach((value, index) => {
                const key = index === 0 ? 'min' : 'max';
                const preposition = index === 0 ? 'от ' : 'до ';

                if (value !== extremeValues[index]) {
                    state.filterParameters.interactedParams[slider][key] = true;
                    state.filterParameters.slidersValues[slider][index] = value;
                    state.filterParameters.ableToResetParams[slider][index] = String(
                        newValuesAreEqual
                            ? value
                            : (preposition
                                + ' '
                                + (action.payload.values[0] > 1000000 ? editPriceInMillions(value)
                                    .toFixed(1) : value)
                                + (slider === 'price' ? ' млн. руб.' : slider === 'area' ? ' м²' : '')))
                } else {
                    state.filterParameters.interactedParams[slider][key] = false;
                    state.filterParameters.slidersValues[slider][index] = initialValues[index];
                    state.filterParameters.ableToResetParams[slider][index] = '';
                }
            })

            catalogSlice.caseReducers.filterFlats(state);
        },

        resetParam(state: IFlatsSliceState, action) {

            const sliders = ['floor', 'area', 'price']
            const checkboxes = ['rooms', 'houseName', 'advantages']
            const param = action.payload;

            if (sliders.includes(param)) {
                state.filterParameters.interactedParams[param as slidersType].min = false;
                state.filterParameters.interactedParams[param as slidersType].max = false;
                catalogSlice.caseReducers.setExtremeSlidersValues(state);
            }

            if (checkboxes.includes(param)) {
                state.filterParameters.byCheckbox[param as checkboxesType].forEach((item: IFilterParamType) => item.active = false);
            }

            catalogSlice.caseReducers.filterFlats(state);
            state.filterParameters.ableToResetParams[param] = [];
        },
        toggleActiveSearchParams(state: IFlatsSliceState, action) {
            const toggleParam = <T>(array: T[], value: T) => {
                let index = array.indexOf(value);

                if (index === -1) {
                    array.push(value);
                } else {
                    array.splice(index, 1);
                }
            }

            if (action.payload.id.includes('rooms')) {
                booleanSwitch(state.filterParameters.byCheckbox, 'rooms', 'active', action.payload.value);
                toggleParam<string>(state.filterParameters.ableToResetParams.rooms, action.payload.value);
            } else if (action.payload.id.includes('houseName')) {
                booleanSwitch(state.filterParameters.byCheckbox, 'houseName', 'active', action.payload.value);
                toggleParam<string>(state.filterParameters.ableToResetParams.houseName, action.payload.value);
            } else if (action.payload.id.includes('advantages')){
                booleanSwitch(state.filterParameters.byCheckbox, 'advantages', 'active', action.payload.value);
                toggleParam<string>(state.filterParameters.ableToResetParams.advantages, action.payload.value);
            } else {
                booleanSwitch(state.filterParameters.byCheckbox, 'finish', 'active', action.payload.value);
                toggleParam<string>(state.filterParameters.ableToResetParams.finish, action.payload.value);
            }

            catalogSlice.caseReducers.filterFlats(state);
        },

        filterFlats(state: IFlatsSliceState) {
            let amountOfSelectedParams = 0;

            //Фильтрация по range-слайдерам
            const interactedParams = state.filterParameters.interactedParams;
            const interactedParamsKeys = Object.keys(interactedParams) as slidersType[];

            const slidersValues = {
                price: [0, 0],
                area: [0, 0],
                floor: [0, 0]
            }

            interactedParamsKeys.forEach((key: slidersType) => {
                if (interactedParams[key].min) {
                    slidersValues[key][0] = +state.filterParameters.slidersValues[key][0]
                } else {
                    slidersValues[key][0] = +state.filterParameters.initialValues[key][0]
                }

                if (interactedParams[key].max) {
                    slidersValues[key][1] = +state.filterParameters.slidersValues[key][1]
                } else {
                    slidersValues[key][1] = +state.filterParameters.initialValues[key][1]
                }

                if (interactedParams[key].max || interactedParams[key].min) {
                    amountOfSelectedParams++;
                }
            })

            const bySliders = (flat: IApiCatalogFlat) => {
                return flat.currentPrice >= slidersValues.price[0] && flat.currentPrice <= slidersValues.price[1] &&
                    flat.area >= slidersValues.area[0] && flat.area <= slidersValues.area[1] &&
                    flat.floor >= slidersValues.floor[0] && flat.floor <= slidersValues.floor[1];
            }

            let filtered = state.allFlats.filter(bySliders);

            //Фильтрация по чекбоксам

                //Получение актуальных параметров для фильтрации
                state.filterParameters.selectedParams = {
                    rooms: getSelectedParams(state.filterParameters.byCheckbox, 'rooms').replace('0', 'studio'),
                    houseName: getSelectedParams(state.filterParameters.byCheckbox, 'houseName'),
                    advantages: getSelectedParams(state.filterParameters.byCheckbox, 'advantages').split(','),
                finish: getSelectedParams(state.filterParameters.byCheckbox, 'finish').split(','),
                }

            //Делаем все не выбранные характеристики недоступными
            Object.keys(state.filterParameters.byCheckbox).forEach(key => {
                state.filterParameters.byCheckbox[key as checkboxesType].forEach(item => {
                    item.disabled = !item.active;
                })
            })

                const byHouseName = (flat: IApiCatalogFlat) => {
                return state.filterParameters.selectedParams.houseName ? state.filterParameters.selectedParams.houseName.includes(flat.bulk.houseName.toLowerCase()) : true;
            }

            const byAttributes = (flat: IApiCatalogFlat) => {
                for (let i = 0; i < state.filterParameters.selectedParams.advantages.length; i++) {
                    if (!flat.attributes[state.filterParameters.selectedParams.advantages[i]]) {
                        return false;
                    }
                }
                return true;
            }

            const byFinish = (flat: IApiCatalogFlat) => {
                let flatIsSuitable = false;
                for (let i = 0; i < state.filterParameters.selectedParams.finish.length; i++) {
                    if (flat.attributes[state.filterParameters.selectedParams.finish[i]]) {
                        flatIsSuitable = true;
                    }
                }
                return flatIsSuitable;
            }

            const byRooms = (flat: IApiCatalogFlat) => {
                return state.filterParameters.selectedParams.rooms ? state.filterParameters.selectedParams.rooms.includes(String(flat.rooms)) : true;
            }

            const byCheckbox = {
                rooms: byRooms,
                houseName: byHouseName,
                advantages: byAttributes,
                finish: byFinish
            }

            const findRoom = (flat: IApiCatalogFlat) => {
                state.filterParameters.byCheckbox.rooms.forEach(item => {
                    if ((item.value === '0' && flat.rooms === 'studio') || (flat.rooms === +item.value)) {
                        item.disabled = false;
                    }
                })
            }

            const findHouseName = (flat: IApiCatalogFlat) => {
                state.filterParameters.byCheckbox.houseName.forEach(item => {
                    if (flat.bulk.houseName.toLowerCase() === item.value) {
                        item.disabled = false;
                    }
                })
            }

            const findAttribute = (flat: IApiCatalogFlat) => {
                state.filterParameters.byCheckbox.advantages.forEach(item => {
                    if (flat.attributes[item.value]) {
                        item.disabled = false;
                    }
                })
            }

            const findFinish = (flat: IApiCatalogFlat) => {
                state.filterParameters.byCheckbox.finish.forEach(item => {
                    if (flat.attributes[item.value]) {
                        item.disabled = false;
                    }
                })
            }

            const findCheckbox = {
                rooms: findRoom,
                houseName: findHouseName,
                advantages: findAttribute,
                finish: findFinish
            }

            const params = ['rooms', 'houseName', 'advantages', 'finish']
            const chosenParams: checkboxesType[] = []
            const selectedParamsKeys = Object.keys(state.filterParameters.selectedParams) as checkboxesType[]
            selectedParamsKeys.forEach((key: checkboxesType) => {
                const param = state.filterParameters.selectedParams[key];
                if ((param && !param.length) || (param.length && param[0]) ) {
                    chosenParams.push(key)
                    if (key === 'rooms' || key === 'houseName' || key === 'finish') {
                        amountOfSelectedParams++;
                    } else {
                        amountOfSelectedParams += param.length;
                    }
                }
            })

            if (state.onlyPromo === true) {
              amountOfSelectedParams = amountOfSelectedParams + 1
            }

            state.amountOfSelectedParams = amountOfSelectedParams;

            const amountOfChosenParams = chosenParams.length

            if (amountOfChosenParams === 0) {
                            state.shownFlats = filtered;
                catalogSlice.caseReducers.setAvailableCheckboxes(state)
                }

            if (amountOfChosenParams === 1) {
                if (chosenParams[0] !== 'advantages') {
                    filtered.forEach(flat => {
                        findCheckbox[chosenParams[0]](flat)
                    })
                }

                state.shownFlats = filtered.filter(byCheckbox[chosenParams[0]])
                state.shownFlats.forEach((flat: IApiCatalogFlat) => {
                    findCheckbox.advantages(flat)
                })

                const restOfParams = params.filter(param => param !== chosenParams[0] && param !== 'advantages') as checkboxesType[]

                state.shownFlats.forEach(flat => {
                    restOfParams.forEach((param: checkboxesType) => {
                        findCheckbox[param](flat)
                    })
                })
            }

            if (amountOfChosenParams === 2) {
                const restOfParams = params.filter(param => param !== chosenParams[0] && param !== 'advantages' && param !== chosenParams[1]) as checkboxesType[]

                state.shownFlats = filtered.filter(byCheckbox[chosenParams[0]]).filter(byCheckbox[chosenParams[1]])

                state.shownFlats.forEach((flat) => {
                    findCheckbox.advantages(flat)
                    restOfParams.forEach((param: checkboxesType) => {
                        findCheckbox[param](flat)
                    })
                })

                if (chosenParams[1] !== 'advantages') {
                    const filteredByFirstParam = filtered.filter(byCheckbox[chosenParams[0]])
                    filteredByFirstParam.forEach(flat => {
                        findCheckbox[chosenParams[1]](flat)
                    })
                        }

                if (chosenParams[0] !== 'advantages') {
                    const filteredBySecondParam = filtered.filter(byCheckbox[chosenParams[1]])
                    filteredBySecondParam.forEach(flat => {
                        findCheckbox[chosenParams[0]](flat)
                    })
                        }
                        }
            if (amountOfChosenParams === 3) {
                const fourthParam = params.filter(param => param !== chosenParams[0] && param !== chosenParams[1] && param !== chosenParams[2])[0]

                state.shownFlats = filtered.filter(byCheckbox[chosenParams[0]]).filter(byCheckbox[chosenParams[1]]).filter(byCheckbox[chosenParams[2]])

                state.shownFlats.forEach((flat) => {
                    findCheckbox.advantages(flat)
                    findCheckbox[fourthParam as checkboxesType](flat)
                })

                if (chosenParams[2] !== 'advantages') {
                    const filteredByFirstAndSecondParam = filtered.filter(byCheckbox[chosenParams[0]]).filter(byCheckbox[chosenParams[1]])
                    filteredByFirstAndSecondParam.forEach(flat => {
                        findCheckbox[chosenParams[2]](flat)
                    })
                }

                if (chosenParams[0] !== 'advantages') {
                    const filteredBySecondAndThirdParam = filtered.filter(byCheckbox[chosenParams[1]]).filter(byCheckbox[chosenParams[2]])
                    filteredBySecondAndThirdParam.forEach(flat => {
                        findCheckbox[chosenParams[0]](flat)
                    })
                }

                if (chosenParams[1] !== 'advantages') {
                    const filteredByFirstAndThirdParam = filtered.filter(byCheckbox[chosenParams[0]]).filter(byCheckbox[chosenParams[2]])
                    filteredByFirstAndThirdParam.forEach(flat => {
                        findCheckbox[chosenParams[1]](flat)
                    })
                }
            }

            if (amountOfChosenParams === 4) {
                state.shownFlats = filtered.filter(byCheckbox.houseName).filter(byCheckbox.rooms).filter(byCheckbox.advantages).filter(byCheckbox.finish)

                state.shownFlats.forEach(flat => {
                    findCheckbox.advantages(flat)
                })

                const filteredByHouseNameAndAttributesAndFinish = filtered.filter(byCheckbox.houseName).filter(byCheckbox.advantages).filter(byCheckbox.finish)
                filteredByHouseNameAndAttributesAndFinish.forEach(flat => {
                    findCheckbox.rooms(flat)
                })

                const filteredByRoomsAndAttributesAndFinish = filtered.filter(byCheckbox.rooms).filter(byCheckbox.advantages).filter(byCheckbox.finish)
                filteredByRoomsAndAttributesAndFinish.forEach(flat => {
                    findCheckbox.houseName(flat)
                })

                const filteredByRoomsAndHouseNameAndAttributes = filtered.filter(byCheckbox.rooms).filter(byCheckbox.houseName).filter(byCheckbox.advantages)
                filteredByRoomsAndHouseNameAndAttributes.forEach(flat => {
                    findCheckbox.finish(flat)
                })
                        }

            catalogSlice.caseReducers.setExtremeSlidersValues(state);
        },

        setAvailableCheckboxes(state: IFlatsSliceState) {
            //Делаем все не выбранные характеристики недоступными
            const checkboxesKeys = Object.keys(state.filterParameters.byCheckbox) as checkboxesType[]
            checkboxesKeys.forEach((key: checkboxesType) => {
                state.filterParameters.byCheckbox[key].forEach(item => {
                    item.disabled = !item.active;
                })
            })
            //Если характеристика заполнена хотя бы у одной квартиры, то делаем её доступной
            for (let i = 0; i < state.shownFlats.length; i++) {
                const flat = state.shownFlats[i];

                Object.keys(flat.attributes).forEach(key => {
                    if (flat.attributes[key]) {
                        state.filterParameters.byCheckbox.advantages.forEach(item => {
                            if (item.value === key) {
                                item.disabled = false;
                            }
                        })
                    }
                })

                state.filterParameters.byCheckbox.houseName.forEach(item => {
                    if (flat.bulk.houseName.toLowerCase() === item.value) {
                        item.disabled = false;
                }
                })

                state.filterParameters.byCheckbox.rooms.forEach(item => {
                    if ((item.value === '0' && flat.rooms === 'studio') || (flat.rooms === +item.value)) {
                        item.disabled = false;
                    }
                })

                state.filterParameters.byCheckbox.finish.forEach(item => {
                    if (flat.attributes[item.value]) {
                        item.disabled = false;
                    }
                })
            }
        },
        resetFilters(state) {
            state.amountOfSelectedParams = 0;
            state.onlyPromo = false;
            let checkboxParams = Object.keys(state.filterParameters.byCheckbox) as checkboxesType[];

            checkboxParams.forEach((item: checkboxesType) => {
                state.filterParameters.byCheckbox[item] = resetSortingParameter(state.filterParameters.byCheckbox[item]);
            })

            let interactedParams = Object.keys(state.filterParameters.interactedParams) as slidersType[];
            interactedParams.forEach(item => {
                state.filterParameters.interactedParams[item].max = false;
                state.filterParameters.interactedParams[item].min = false;
            })

            Object.keys(state.filterParameters.ableToResetParams).forEach(key => state.filterParameters.ableToResetParams[key] = []);

            state.shownFlats = state.allFlats;
            catalogSlice.caseReducers.setExtremeSlidersValues(state);
            catalogSlice.caseReducers.setAvailableCheckboxes(state)
        },
        //Отсортировать квартиры по клику на заголовок таблицы
        sortFlats(state, action: PayloadAction<ISortFlats>) {
            let value = action.payload.value;
            // Исключаем фильтр по характеристикам/отделке/схеме
            if (value !== 'advantages' && value !== 'finish' && value !== 'scheme') {
                let direction = state.sortParameters.direction;

                if (action.payload.placeCall === state.inTableHead) {
                    //Если вызов произошел по клику на заголовок таблицы
                    //переключить направления сортировки
                    if (direction === 'asc_') {
                        direction = 'desc_';
                    } else {
                        direction = 'asc_';
                    }
                }

                state.sortParameters = {
                    value: action.payload.value,
                    direction,
                };

                let keyTyped = action.payload.array as keyof typeof state;
                let stateArray = state[keyTyped];

                if (Array.isArray(stateArray) && stateArray.length !== 0) {
                    if (action.payload.value === 'rooms') {
                        let array: IApiCatalogFlat[] = stateArray.map((flat) => changeStudioValue(flat, 'studio', 0));
                        sortNumber(array, state.sortParameters.value, state.sortParameters.direction);
                        (state[keyTyped] as any) = array.map((flat: IApiCatalogFlat) => changeStudioValue(flat, 0, 'studio'));
                    } else if (action.payload.value === 'section_number') {
                        sortNumber(stateArray, 'section.number', state.sortParameters.direction);
                    } else if (action.payload.value === 'houseName') {
                        sortAbc(stateArray, state.sortParameters.value, state.sortParameters.direction);
                    } else {
                        sortNumber(stateArray, state.sortParameters.value.replace('price', 'currentPrice'), state.sortParameters.direction);
                    }
                }
            }
        },
        //Сменить текущую опцию сортировки
        changeSelectedDropdownOption: (state, action: PayloadAction<IDropdownValue | MultiValue<IDropdownValue>>) => {
            if (action.payload) {
                // @ts-ignore
                state.selectedOption = action.payload;
            }
        },
        //Отсортировать квартиры по выпадающему списку
        sortFlatsListByDropdown: (state, action) => {
            let flatsArray: 'shownFlats' | 'favoriteList' = action.payload.array;

            if (typeof action.payload.value.value === 'string') {
                if (action.payload.value.value.includes('asc-') || action.payload.value.value.includes('dec-')) {
                    let direction = action.payload.value.value.slice(0, 3) + '_';
                    let params = action.payload.value.value.replace('asc-', '').replace('dec-', '');
                    if (params === 'rooms') {
                        let array = state[flatsArray].map((flat) => changeStudioValue(flat, 'studio', '0'));
                        sortNumber(array, 'rooms', direction);
                        state[flatsArray] = array.map((flat) => changeStudioValue(flat, '0', 'studio'));
                    } else if (params === 'houseName') {
                        sortAbc(state[flatsArray], 'houseName', direction);
                    } else {
                        sortNumber(state[flatsArray], params.replace('price', 'currentPrice'), direction);
                    }
                } else {
                    const withWhiteBox = state[flatsArray].filter((item) => item.attributes.whiteBox === true);
                    const withoutWhiteBox = state[flatsArray].filter((item) => item.attributes.whiteBox === false);

                    if (action.payload.value.value.includes('with-')) {
                        state[flatsArray] = withWhiteBox.concat(withoutWhiteBox);
                    } else {
                        state[flatsArray] = withoutWhiteBox.concat(withWhiteBox);
                    }
                }
            }
        },
        addApartmentToFavorites: (state, action) => {
            if (!state.favoriteList.find((item) => item.id === action.payload.id)) {
                state.favoriteList = [...state.favoriteList, action.payload];
            }

            refreshLocalStorage(state.favoriteList);
        },
        removeApartmentById: (state, action) => {
            state.favoriteList
                .map((item) => item.id)
                .forEach((id) => {
                    if (state.freeFlatsId.find((element) => element === id.toString())) {
                        state.freeFlatsId = state.freeFlatsId.filter((el) => el !== id.toString());
                    }
                });

            state.favoriteList = state.favoriteList.filter((apartment) => apartment.id !== action.payload);
            refreshLocalStorage(state.favoriteList);
        },
        refreshFavoriteList: (state, action) => {
            state.favoriteList = action.payload;
        },
        //Пагинация каталога на мобилке
        setCount: (state, action: PayloadAction<number | null>) => {
            if (action.payload !== null) {
                state.countPage = action.payload;
            } else {
                state.countPage = state.countPage + 1;
            }
        },
        //Записать текущую секцию по houseName
        setCurrentBulk: (state, action: PayloadAction<string>) => {
            state.currentBulk = action.payload;
        },
        //Записать текущую секцию и bulk_id
        setCurrentBulkId: (state, action: PayloadAction<number>) => {
            state.currentBulkId = action.payload;
        },
        //Записать текущий этаж
        setCurrentFloor(state, action: PayloadAction<number>) {
            state.currentFloor = action.payload;
        },
        setCurrentFlat(state, action: PayloadAction<number>) {
            state.currentFlat = action.payload;
        },
        toggleOnlyPromo(state) {
          state.onlyPromo === false
          ? state.amountOfSelectedParams = state.amountOfSelectedParams + 1
          : state.amountOfSelectedParams = state.amountOfSelectedParams - 1
          state.onlyPromo = !state.onlyPromo;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCatalog.pending, (state) => {
                state.urls.getResidential.status = 'pending';
                state.urls.getResidential.error = null;
                console.log('Идет запрос на сервер...');
            })
            .addCase(fetchCatalog.fulfilled, (state, action) => {
                state.bulks = action.payload.bulks;
                let freeFlats = action.payload.flats.filter((item: IApiCatalogFlat) => item.status === 'free') as IApiCatalogFlat[];

                state.allFlats = freeFlats;
                state.shownFlats = freeFlats;
                console.log('Квартиры загрузились');

                //Получение уникальных особенностей квартир;
                freeFlats.forEach((item) => {
                    Object.keys(item.attributes).forEach((elem) => {
                        if (!state.filterParameters.allAdvantages.find((advantage) => advantage === elem)) {
                            state.filterParameters.allAdvantages.push(elem);
                        }
                    });
                });

                const maxFloor = calcTheLargest(state.shownFlats, 'floor')
                const minFloor = calcTheLeast(state.shownFlats, 'floor', maxFloor)

                state.filterParameters.initialValues = {
                    area: [Math.floor(action.payload.area.min), Math.ceil(action.payload.area.max)],
                    price: [Math.floor(action.payload.price.min), Math.ceil(action.payload.price.max)],
                    floor: [minFloor, maxFloor]
                        }

                catalogSlice.caseReducers.checkRelevantAttributes(state);
                catalogSlice.caseReducers.setExtremeSlidersValues(state);
                catalogSlice.caseReducers.setAvailableCheckboxes(state)

                state.urls.getResidential.initial = true;
                state.urls.getResidential.status = 'fulfilled';

                let payload: ISortFlats = {
                    value: state.sortParameters.value,
                    placeCall: state.inForm,
                    array: 'shownFlats',
                };
                catalogSlice.caseReducers.sortFlats(state, { payload, type: '' });
            })
            .addCase(fetchCatalog.rejected, (state, action) => {
                console.log('Ошибка при запросе на сервер', action.payload);
                state.urls.getResidential.error = 'error';
                state.urls.getResidential.status = 'rejected';
            })
            .addCase(flatCheck.pending, () => {
                console.log('Идет проверка сохраненных квартир...');
            })
            .addCase(flatCheck.fulfilled, (state, action) => {
                //Собираем список свободных квартир
                state.freeFlatsId = Object.keys(action.payload).filter((item) => action.payload[`${item}`]);
            })
            .addCase(flatCheck.rejected, (state, action) => {
                console.log('Ошибка при запросе на сервер', action.payload);
            });
    },
});

export default catalogSlice.reducer;

export const {
    toggleActiveSearchParams,
    sortFlats,
    changeSelectedDropdownOption,
    sortFlatsListByDropdown,
    addApartmentToFavorites,
    removeApartmentById,
    setCount,
    setCurrentBulk,
    setCurrentBulkId,
    setCurrentFloor,
    setCurrentFlat,
    resetFilters,
    updateSliderValues,
    updateInputValues,
    toggleOnlyPromo,
} = catalogSlice.actions;
