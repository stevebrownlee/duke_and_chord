const state = {
    instruments: [],
    instrumentTypes: [],
    chosenInstrument: 0,
    playSounds: false,
    filter: ""
}

const container = document.querySelector("#content")

export const getFilter = () => {
    return state.filter
}

export const setFilter = (type) => {
    state.filter = type
    container.dispatchEvent( new CustomEvent("stateChanged") )
}

export const setInstrument = (id) => {
    state.chosenInstrument = id
    sessionStorage.setItem("chord_instrument", id)
    container.dispatchEvent( new CustomEvent("stateChanged") )
}

export const getInstrument = () => {
    const instrument = state.instruments.find(i => i.id === state.chosenInstrument) || {}
    return instrument
}

export const turnOffSounds = () => {
    state.playSounds = false
    container.dispatchEvent( new CustomEvent("stateChanged") )
}

export const turnOnSounds = () => {
    state.playSounds = true
    container.dispatchEvent( new CustomEvent("stateChanged") )
}

export const shouldPlaySounds = () => {
    return state.playSounds
}

export const saveInstrument = (instrument) => {
    return fetch(`http://localhost:5002/api/instruments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(instrument)
    })
        .then(response => response.json())
        .then(fetchAllInstruments)
        .then(() => {
            container.dispatchEvent( new CustomEvent("stateChanged") )
        })
}

export const fetchAllInstruments = () => {
    return fetch(`http://localhost:5002/api/instruments?_expand=instrumentType&_expand=user`)
        .then(response => response.json())
        .then(
            (instrumentsArray) => {
                state.instruments = instrumentsArray
            }
        )
}

export const fetchAllInstrumentTypes = () => {
    return fetch(`http://localhost:5002/api/instrumentTypes`)
        .then(response => response.json())
        .then( typeArray  => state.instrumentTypes = typeArray )
}

export const getInstrumentTypes = () => {
    return state.instrumentTypes.map(instrument => ({...instrument}))
}

export const getInstruments = () => {
    return state.instruments.filter(
        (instrument) => {
            if (state.filter !== "" && instrument.instrumentType.name.toLowerCase() === state.filter) {
                return true
            }
            else if (state.filter === "") {
                return true
            }

            return false
        }
    )
    .sort((current, next) => next.id - current.id)
    .map(instrument => ({...instrument}))
}
