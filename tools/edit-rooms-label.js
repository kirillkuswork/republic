const editRoomsLabel = (flat) => {
    //Вывод корректных лейблов с количеством спален

    let rooms = {
        rooms: '',
        classRooms: ''
    }

    if (flat.rooms === 'studio') {
        rooms = {
            ...rooms,
            rooms: 'ST',
            classRooms: 0,
        }
    } else {
        rooms = {
            ...rooms,
            rooms: `${flat.rooms}BR`,
            classRooms: flat.rooms,
        }
    }

    return rooms;
}

export default editRoomsLabel;