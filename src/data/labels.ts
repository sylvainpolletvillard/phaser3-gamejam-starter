export const LANGUAGES = {
    //EN: "English",
    FR: "Français",
}

const DEFAULT_LANGUAGE = "FR"

export const LABELS: { [key: string]: { [lang: string]: string }} = {
    LOADING_TEXT: {
        EN: `This is an appropriate place to introduce the game and controls`,
        FR: `Ceci est l'endroit approprié pour introduire le jeu et ses contrôles`
    },
    LOADING_INDICATOR: {
        EN: "Loading...",
        FR: "Chargement..."
    },
    LOADING_COMPLETE: {
        EN: "Okay, let's go !",
        FR: "C'est parti !"
    },
    MENU_BACK: {
        EN: "Back",
        FR: "Retour"
    },
    MENU_NEW_GAME: {
        EN: "Play game",
        FR: "Nouvelle partie"
    },
    MENU_CREDITS: {
        EN: "Credits",
        FR: "Crédits"
    },
    CLOSE: {
        EN: "Close",
        FR: "Fermer"
    },
    OPTIONS: {
        EN: "Options",
        FR: "Options"
    },
    OPTIONS_VOLUME: {
        EN: "Volume",
        FR: "Volume"
    },
    OPTIONS_SFX: {
        EN: "SFX",
        FR: "SFX"
    },
    OPTIONS_MUSIC: {
        EN: "Music",
        FR: "Musique"
    },
    OPTIONS_AMBIENCE: {
        EN: "Ambience",
        FR: "Ambiance"
    },
    BACK_TO_MENU: {
        EN: "Back to menu",
        FR: "Retour au menu"
    },
    SCORE: {
        EN: "You survived $1 seconds",
        FR: "Vous avez survécu $1 secondes"
    }
}

interface i18nProxyConstructor {
    new <T, H extends object>(target: T, handler: ProxyHandler<H>): H
}
const i18nProxy = Proxy as i18nProxyConstructor

export const L = new i18nProxy<typeof LABELS, { [name: string]: string }>(LABELS, {
    get(obj, key: string) {
        const lang = getLanguage()
        if (!(key in LABELS)) {
            console.error(`Label not found: ${key}`)
            return `???`
        }
        if (!(key in LABELS && lang in LABELS[key])) {
            console.error(`Translation not found for label: ${key}`)
            return `???`
        }
        return LABELS[key][lang]
    }
})

export function getLanguage(){
    return localStorage.getItem("language") ?? DEFAULT_LANGUAGE
}