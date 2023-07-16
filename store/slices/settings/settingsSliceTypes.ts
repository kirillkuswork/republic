import { IApiGeneralSettings } from '../../api/apiTypes';

export interface ISettingsState {
    general_settings: IApiGeneralSettings[] | null;
    promo: IApiGeneralSettings | null;
}
