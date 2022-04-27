const defaultMessage = ' Using word of the day instead.'

export function getWordOfTheDay() {
    if (location.search) {
        try {
            const query = atob(location.search.slice(1))
            if (query.length !== 5) {
                alert(`Incorrect word length from encoded query. ${defaultMessage}`)
            } else {
                return query
            }
        } catch (e) {
            alert(`Malformed encoded word query. ${defaultMessage}`)
        }
    }

    const now = new Date()
    const start = new Date(2022, 0, 0)
    const diff = Number(now) - Number(start)
    let day = Math.floor(diff / (1000 * 60 * 60 * 24))
    while (day > answers.length) {
        day -= answers.length
    }
    return answers[day]
}

// copied from Wordle source
const answers = [
    'cigar',
    'rebut',
    'sissy',
    'humph',
    'awake',
    'blush',
    'focal',
    'evade',
    'naval',
    'serve',
    'heath',
    'dwarf',
    'model',
    'karma',
    'stink',
    'grade',
    'quiet',
    'bench',
    'abate',
    'feign',
    'major',
    'death',
    'fresh',
    'crust',
    'stool',
    'colon',
    'abase',
    'marry',
    'react',
    'batty',
    'pride',
    'floss',
    'helix',
    'croak',
    'staff',
    'paper',
    'unfed',
    'whelp',
    'trawl',
    'outdo',
    'adobe',
    'crazy',
    'sower',
    'repay',
    'digit',
    'crate',
    'cluck',
    'spike',
    'mimic',
    'pound',
    'maxim',
    'linen',
    'unmet',
    'flesh',
    'booby',
    'forth',
    'first',
    'stand',
    'belly',
    'ivory',
    'seedy',
    'print',
    'yearn',
    'drain',
    'bribe',
    'stout',
    'panel',
    'crass',
    'flume',
    'offal',
    'agree',
    'error',
    'swirl',
    'argue',
    'bleed',
    'delta',
    'flick',
    'totem',
    'wooer',
    'front',
    'shrub',
    'parry',
    'biome',
    'lapel',
    'start',
    'greet',
    'goner',
    'golem',
    'lusty',
    'loopy',
    'round',
    'audit',
    'lying',
    'gamma',
    'labor',
    'islet',
    'civic',
    'forge',
    'corny',
    'moult',
    'basic',
    'salad',
    'agate',
    'spicy',
    'spray',
    'essay'
]

export const allWords = [ ...answers]