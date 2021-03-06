import { combineReducers } from 'redux';

let initialStatus = 'await'; // Enum: 'pending' | 'going' | 'await'
let initialCountDown = 0;
let initialBanker = null;
let initialPlayers = {}; // interface player { score: number, info: Object, id: String }
let initialWord = '';
let initialCanvasData = {
    size: [500, 500], // Number[]
    strokes: [] // Object[]
};

export default combineReducers({
    status (state = initialStatus, action) {
        switch (action.type) {
            case 'SET_GAME_STATUS':
                return action.status;
            default:
                return state;
        }
    },
    countDown (state = initialCountDown, action) {
        switch (action.type) {
            case 'SET_GAME_COUNTDOWN':
                return action.countDown;
            default:
                return state;
        }
    },
    banker (state = initialBanker, action) {
        switch (action.type) {
            case 'UPDATE_USER_DATA':
            {
                if (state && (state.id === action.id)) {
                    return Object.assign({}, state, {
                        id: action.id,
                        info: action.info,
                    });
                } else {
                    return state;
                }
            }
            case 'SET_GAME_BANKER':
                return action.banker;
            default:
                return state;
        }
    },
    players (state = initialPlayers, action) {
        switch (action.type) {
            case 'UPDATE_USER_DATA':
            {
                let newState = Object.assign({}, state);
                let player = newState[action.id];
                if (player) {
                    newState[action.id] = Object.assign({}, player);
                    newState[action.id].info.name = action.info.name;
                }
                return newState;
            }
            case 'SET_GAME_PLAYERS':
                return action.players;
            case 'UPDATE_GAME_PLAYER_SCORE':
            {
                let newState = Object.assign({}, state);
                let player = newState[action.playerId];
                newState[action.playerId] = Object.assign({}, player);
                newState[action.playerId].score += action.score;
                return newState;
            }
            default:
                return state;
        }
    },
    word (state = initialWord, action) {
        switch (action.type) {
            case 'SET_GAME_WORD':
                return action.word;
            default:
                return state;
        }
    },
    canvasData (state = initialCanvasData, action) {
        switch (action.type) {
            case 'SET_CANVAS_DATA':
                return {
                    size: action.canvasData.size !== undefined ? action.canvasData.size : state.size,
                    strokes: action.canvasData.strokes !== undefined ? action.canvasData.strokes : state.strokes,
                };
            case 'PUSH_CANVAS_STROKE':
                return Object.assign({}, state, {
                    strokes: state.strokes.concat(action.stroke)
                });
            default:
                return state;
        }
    }

});