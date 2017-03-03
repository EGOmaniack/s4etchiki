class Store{
    constructor(updateState, state) {
        this._state = state;
        this._updateState = updateState;
        this._callbacks = [];
        this._history = [];
    }
    get state() {
        return this._state; /* Почему не возвращать копию? */
    }

    update(action){
        this._history.push(this._state);
        this._state = this._updateState(this._state, action);
        this._callbacks.forEach(callback => callback());
    }
    subscribe(callback) {
        this._callbacks.push(callback);
        return () => this._callbacks = this._callbacks.filter(cb => cb !== callback);
    }
}

let initialState = {
    screen : "default",
    graphicState :"electrik"
};

const store = new Store(updateState, initialState);

function updateState(state, action){
    switch(action.type){
        case "changeScreen": return Object.assign({}, state, {
                screen: action.screen
            });
        default: return state;
    }
}
let unsubscribe =  store.subscribe(function(){console.log('state is ', store.state)});

store.update({type: "changeScreen", screen : "s4etchiki"});

//unsubscribe();

store.update({type: "changeScreen", screen : "graphics"});