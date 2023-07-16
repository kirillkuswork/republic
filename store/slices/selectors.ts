import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../reduxStore';
import calcTheLargest from '../../tools/calc-the-largest';
import { IApiBulk, IApiCatalogFlat } from '../api/apiTypes';

export const getAllFlats = (state: RootState) => state.catalogPage.allFlats;
export const getShownFlats = (state: RootState) => state.catalogPage.shownFlats;
export const getBulks = (state: RootState) => state.catalogPage.bulks;
export const getCurrentBulkName = (state: RootState) => state.catalogPage.currentBulk;
export const getCurrentBulkId = (state: RootState) => state.catalogPage.currentBulkId;
export const getCurrentFloor = (state: RootState) => state.catalogPage.currentFloor;
export const getFetchStatus = (state: RootState) => state.catalogPage.urls.getResidential.status;
export const getCurrentFlatOnTheFloor = (state: RootState) => state.catalogPage.currentFlat;

export const getCurrentBulk = createSelector([getBulks, getCurrentBulkId], (bulks, bulkId) => {
    return bulks.find((item: IApiBulk) => item.id === bulkId);
});

export const getActiveFloors = createSelector([getCurrentBulkId, getAllFlats], (bulkId, flats) => {
    let currentFlats = flats.filter((item) => item.bulk_id === bulkId);
    return currentFlats.map((item) => item.floor).filter((item, i, ar) => ar.indexOf(item) === i);
});

export const getActiveFlatsOnTheFloor = createSelector([getCurrentFloor, getCurrentBulkId, getAllFlats], (currentFloor, bulkId, flats) => {
    return flats.filter((item) => item.bulk_id === +bulkId).filter((item) => item.floor === +currentFloor);
});

export const getCurrentHouseNameFlats = createSelector([getAllFlats, getCurrentBulkName], (allFlats, currentBulk) => {
    return allFlats.filter((item: IApiCatalogFlat) => item.houseName.toLowerCase() === currentBulk);
});

export const getAmountCurrentBulkFlats = createSelector([getAllFlats, getCurrentBulkName], (allFlats, currentBulk) => {
    return allFlats.filter((item: IApiCatalogFlat) => item.houseName.toLowerCase() === currentBulk).length;
});

export const getAmountCurrentBulkSections = createSelector([getBulks, getCurrentBulkName], (bulks, currentBulk) => {
    return bulks.filter((item: IApiBulk) => item.houseName.toLowerCase() === currentBulk).length;
});

export const getCurrentBulkFlats = createSelector([getAllFlats, getCurrentBulkId], (allFlats, currentBulk) => {
    return allFlats.filter((item: IApiCatalogFlat) => item.bulk_id === currentBulk);
});

export const getCurrentWhiteBox = createSelector([getCurrentHouseNameFlats], (currentBulkFlats) => {
    return currentBulkFlats.find((item: IApiCatalogFlat) => item.attributes.whiteBox);
});

export const getCurrentUnfinished = createSelector([getCurrentHouseNameFlats], (currentBulkFlats) => {
    return currentBulkFlats.find((item: IApiCatalogFlat) => item.attributes.unfinished);
});

export const getAmountCurrentFloors = createSelector([getCurrentHouseNameFlats], (currentBulkFlats) => {
    return calcTheLargest(currentBulkFlats, 'floor');
});

export const getCurrentBlockSettlementDate = createSelector([getBulks, getCurrentBulkName], (bulks, currentBulk) => {
    let date = bulks.find((item: IApiBulk) => item.houseName.toLowerCase() === currentBulk);

    if (date) {
        return date.keyDate;
    }
});

export const getSortParameters = (state: RootState) => state.catalogPage.sortParameters;

export const getFlatsOnActiveFloor = createSelector([getCurrentFloor, getCurrentBulkId, getAllFlats], (floor, bulk, flats) => {
    let bulkFlats = flats.filter((item) => item.bulk_id === bulk && item.floor === floor);
    return [
        {
            id: 'ST',
            flats: bulkFlats.filter((item) => item.rooms === 'studio'),
            cost: calcTheLargest(
                bulkFlats.filter((item) => item.rooms === 'studio'),
                'price',
            ),
        },
        {
            id: '1BR',
            flats: bulkFlats.filter((item) => item.rooms == 1 && item.floor === floor),
            cost: calcTheLargest(
                bulkFlats.filter((item) => item.rooms == 1 && item.floor === floor),
                'price',
            ),
        },
        {
            id: '2BR',
            flats: bulkFlats.filter((item) => item.rooms == 2 && item.floor === floor),
            cost: calcTheLargest(
                bulkFlats.filter((item) => item.rooms == 2 && item.floor === floor),
                'price',
            ),
        },
        {
            id: '3BR',
            flats: bulkFlats.filter((item) => item.rooms == 3 && item.floor === floor),
            cost: calcTheLargest(
                bulkFlats.filter((item) => item.rooms == 3 && item.floor === floor),
                'price',
            ),
        },
        {
            id: '4BR',
            flats: bulkFlats.filter((item) => item.rooms == 4 && item.floor === floor),
            cost: calcTheLargest(
                bulkFlats.filter((item) => item.rooms == 4 && item.floor === floor),
                'price',
            ),
        },
    ];
});

export const getCurrentFlatInfo = createSelector([getCurrentFlatOnTheFloor, getAllFlats], (flat, flats) => {
    if (!flat) return;
    return flats.find((item) => item.number === flat.toString());
});

const getAmountSelectedRooms = (state: RootState) => state.catalogPage.amountSelectedRooms;
const getAmountSelectedHouseName = (state: RootState) => state.catalogPage.amountSelectedHouseName;
const getAmountSelectedAdvantages = (state: RootState) => state.catalogPage.amountSelectedAdvantages;
const getAmountSelectedFinish = (state: RootState) => state.catalogPage.amountSelectedFinish;
const getAmountSelectedRange = (state: RootState) => state.catalogPage.amountSelectedRange;

export const getAmountSelectedFilters = createSelector(
    [getAmountSelectedRooms, getAmountSelectedHouseName, getAmountSelectedAdvantages, getAmountSelectedFinish, getAmountSelectedRange],
    (rooms, houseName, advantages, finish, range) => {
        return Object.values(range).reduce((partialSum, a) => partialSum + a, 0) + rooms + houseName + advantages + finish;
    },
);
