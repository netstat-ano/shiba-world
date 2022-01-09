const arrayChange = (
    type,
    array,
    startingPosition,
    setStartingPosition,
    setValue
) => {
    if (type === 'left') {
        if (startingPosition - 1 < 0) {
            setStartingPosition(array.length);
        } else if (startingPosition - 1 > array.length) {
            setStartingPosition(array.length);
        } else {
            setStartingPosition(startingPosition - 1);
        }
        setValue(array[startingPosition - 1]);
        if (!array[startingPosition - 1]) {
            setStartingPosition(array.length - 1);
            setValue(array[array.length - 1]);
        }
    } else if (type === 'right') {
        if (startingPosition + 1 >= array.length - 1) {
            setStartingPosition(-1); //jesli starting position + 1 jest wieksze od dlugosci tablicy - 1
        } else if (startingPosition + 1 < 0) {
            setStartingPosition(-1); //jesli starting postion + 1 jest mniejsze od zera
        } else {
            setStartingPosition(startingPosition + 1); //zawsze
        }
        setValue(array[startingPosition + 1]);
        if (!array[startingPosition + 1]) {
            setValue(array[0]);
        }
    }
};
export default arrayChange;